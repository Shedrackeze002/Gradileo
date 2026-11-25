import type { Explainer } from '@/video/script.ts';

// Exam question for Math 20-4 lesson 4.4 (owning a vehicle and renting a home). The question is a
// Your Turn from OpenStax Contemporary Mathematics, word for word (section 6.11, Buying or Leasing a
// Car, CC BY-NC-SA 4.0). 2,190 ÷ 12 = $182.50 a month, and 410.86 + 182.50 = $593.36, as in the
// book's answer. Check by the year: 12 × 410.86 = 4,930.32, plus 2,190 is 7,120.32, and
// 7,120.32 ÷ 12 = 593.36.

const QUESTION =
  'If your car payment is $410.86 per month and your car insurance is $2,190 per year, what is the cost of the car per month when accounting for the insurance?';

const video: Explainer = {
  id: 'xq-m204-4-4',
  lessonId: '',
  exam: {
    lesson: 'm204-4-4',
    source: 'OpenStax, Contemporary Mathematics, Your Turn in section 6.11, Buying or Leasing a Car',
    licence: 'CC BY-NC-SA 4.0, access for free at openstax.org',
    url: 'https://openstax.org/books/contemporary-mathematics/pages/6-11-buying-or-leasing-a-car',
    question: QUESTION,
  },
  title: 'Exam Question: What a Car Really Costs Each Month (Owning a Vehicle)',
  thumbnailTitle: 'What Does the Car Cost a Month?',
  summary:
    'A real test question, solved one small step at a time: a car payment is $410.86 a month and the insurance is $2,190 a year. To add them, both must be per month: $2,190 ÷ 12 = $182.50 a month, so the car costs $410.86 + $182.50 = $593.36 a month. Then we check by the year, and look at the traps.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Exam Question', title: 'What Does the Car Cost a Month?', subtitle: 'Owning a vehicle, step by step' }],
      lines: [
        { say: 'In this video, we solve a real test question about the cost of owning a car. We will take it one small step at a time, so that every step makes sense.', show: 'title' },
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
          prompt: 'If your car payment is \\$410.86 per month and your car insurance is \\$2,190 per year, what is the cost of the car per month when accounting for the insurance?',
          answer: '\\$593.36',
          working: '2,190 ÷ 12 = 182.50; 410.86 + 182.50 = 593.36',
        },
      ],
      lines: [
        { say: 'Here is the question, from the book.', show: 'q' },
        { say: 'Your car payment is 410 dollars 86 per month, and your car insurance is 2 thousand 190 dollars per year. What is the cost of the car per month, when you count the insurance?', caption: 'Your car payment is $410.86 per month, and your car insurance is $2,190 per year. What is the cost of the car per month, when you count the insurance?' },
        { say: 'If you would like to try it first, pause the video now.', wait: 5 },
      ],
    },
    {
      chapter: 'What is it asking?',
      layout: 'center',
      main: [{ kind: 'callout', id: 'c', tone: 'definition', title: 'The cost of a car', md: 'A car costs more than its **payment**. Insurance, gas and repairs all count. Here we add the **insurance** to the payment.' }],
      lines: [
        { say: 'A car costs more than its monthly payment. Insurance, gas and repairs all count too.', show: 'c' },
        { say: 'This question adds the insurance to the payment, to find the real cost each month.' },
      ],
    },
    {
      chapter: 'What you need to know',
      layout: 'center',
      main: [
        { kind: 'callout', id: 'c', tone: 'key', title: 'Same time period', md: 'You can only add costs that cover the **same** time. The payment is **per month**, but the insurance is **per year**.' },
        { kind: 'math', id: 'm', size: 'lg', lines: ['\\text{per month} = \\text{per year} \\div 12'] },
      ],
      lines: [
        { say: 'Here is what we need. You can only add costs that cover the same length of time. The payment is per month, but the insurance is per year.', show: 'c' },
        { say: 'A year has 12 months, so to change a yearly cost to a monthly cost, divide by 12.', show: 'm' },
      ],
    },
    {
      chapter: 'The plan',
      layout: 'center',
      main: [{ kind: 'bullets', id: 'plan', items: ['Change the insurance to **per month**', '**Add** it to the car payment'] }],
      lines: [
        { say: 'Here is the plan. Change the insurance to a cost per month.', show: 'plan.0' },
        { say: 'Then add it to the car payment.', show: 'plan.1' },
      ],
    },
    {
      chapter: 'Steps 1 and 2: The monthly cost',
      layout: 'center',
      main: [{ kind: 'math', id: 'm', size: 'lg', lines: ['\\$2{,}190 \\div 12 = \\$182.50 \\text{ a month}', '\\$410.86 + \\$182.50 = \\good{\\$593.36}'] }],
      lines: [
        { say: 'Step one. 2 thousand 190 divided by 12 is 182 dollars and 50 cents. That is the insurance for one month.', caption: 'Step one. $2,190 ÷ 12 = $182.50. That is the insurance for one month.', show: 'm.0' },
        { say: 'Step two. 410.86 plus 182.50 is 593 dollars and 36 cents. That is the cost of the car each month.', caption: 'Step two. $410.86 + $182.50 = $593.36. That is the cost of the car each month.', show: 'm.1', focus: 'm.1' },
      ],
    },
    {
      chapter: 'Check the answer',
      layout: 'center',
      main: [
        {
          kind: 'table',
          id: 't',
          head: ['Cost', 'Per year'],
          rows: [
            ['Payments: $12 \\times$ \\$410.86', '\\$4,930.32'],
            ['Insurance', '\\$2,190.00'],
            ['**Total**', '**\\$7,120.32**'],
            ['**Per month**: $\\div 12$', '**\\$593.36**'],
          ],
        },
      ],
      lines: [
        { say: 'Let us check by working with a whole year instead.', show: 't' },
        { say: '12 payments of 410.86 come to 4 thousand 930 dollars 32. Add the 2 thousand 190 of insurance: 7 thousand 120 dollars 32 a year.', caption: '12 payments of $410.86 come to $4,930.32. Add the $2,190 of insurance: $7,120.32 a year.', focus: ['t.0', 't.1', 't.2'] },
        { say: 'Divide by 12: 593 dollars 36 a month. It checks out.', caption: 'Divide by 12: $593.36 a month. It checks out.', focus: 't.3' },
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
            ['\\$2,600.86', 'added a **yearly** cost to a **monthly** one'],
            ['\\$228.36', '**subtracted** the insurance: it is an extra cost'],
            ['\\$7,120.32', 'that is the cost per **year**, not per month'],
          ],
        },
      ],
      lines: [
        { say: 'Here are the traps.', show: 'traps' },
        { say: '2 thousand 600 dollars 86 adds the whole year of insurance to one month’s payment. Change it to per month first.', caption: '$2,600.86 adds the whole year of insurance to one month’s payment. Change it to per month first.' },
        { say: '228 dollars 36 subtracts the insurance. The insurance is an extra cost, so add it.', caption: '$228.36 subtracts the insurance. The insurance is an extra cost, so add it.' },
        { say: 'And 7 thousand 120 dollars 32 is the cost for a whole year. The question asks per month.', caption: 'And $7,120.32 is the cost for a whole year. The question asks per month.' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q2',
          prompt: 'Your rent is \\$1,150 per month and your tenant insurance is \\$264 per year. What is the cost of your home per month when you count the insurance?',
          choices: ['\\$1,414', '\\$1,128', '\\$1,172', '\\$14,064'],
          answer: 2,
          working: '264 ÷ 12 = 22, and 1,150 + 22 = 1,172.',
        },
      ],
      lines: [
        { say: 'Your turn. Your rent is 1 thousand 150 dollars per month, and your tenant insurance is 264 dollars per year. What does your home cost per month, when you count the insurance? Pause the video and try it.', caption: 'Your turn. Your rent is $1,150 per month, and your tenant insurance is $264 per year. What does your home cost per month, when you count the insurance? Pause the video and try it.', show: 'q2', wait: 8 },
        { say: '264 divided by 12 is 22 dollars a month. Add the rent: 1 thousand 172 dollars. Choice "C".', caption: '$264 ÷ 12 = $22 a month. Add the rent: $1,172. Choice "C".', show: 'q2.answer' },
      ],
    },
    {
      chapter: 'Summary',
      layout: 'center',
      main: [{ kind: 'bullets', id: 'sum', check: true, items: ['Add costs for the **same** time period', 'Per year $\\div 12$ $=$ per month', 'Insurance is an **extra** cost', '**Check** by the year'] }],
      lines: [
        { say: 'Here is what to remember. Only add costs that cover the same length of time.', show: 'sum.0' },
        { say: 'To change a yearly cost to a monthly one, divide by 12.', show: 'sum.1' },
        { say: 'Insurance is an extra cost on top of the payment.', show: 'sum.2' },
        { say: 'And you can check by working out the whole year. For more on owning a vehicle and renting a home, watch this lesson\'s explainer video on Gradileo.', show: 'sum.3' },
      ],
    },
  ],
};

export default video;
