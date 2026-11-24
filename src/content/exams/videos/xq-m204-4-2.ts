import type { Explainer } from '@/video/script.ts';

// Exam question for Math 20-4 lesson 4.2 (simple interest). The question is an Exercise from OpenStax
// Prealgebra 2e, word for word (section 6.4, Solve Simple Interest Applications, CC BY-NC-SA 4.0).
// I = Prt = 3,900 × 0.04 × 15/12 = 156 × 1.25 = $195, as in the book's answer. Check: one year is
// $156 and the extra 3 months are a quarter of that, $39, and 156 + 39 = 195.

const QUESTION =
  'Airin borrowed $3,900 from her parents for the down payment on a car and promised to pay them back in 15 months at a 4% rate of interest. How much interest did she owe her parents?';

const video: Explainer = {
  id: 'xq-m204-4-2',
  lessonId: '',
  exam: {
    lesson: 'm204-4-2',
    source: 'OpenStax, Prealgebra 2e, Exercise in section 6.4, Solve Simple Interest Applications',
    licence: 'CC BY-NC-SA 4.0, access for free at openstax.org',
    url: 'https://openstax.org/books/prealgebra-2e/pages/6-4-solve-simple-interest-applications',
    question: QUESTION,
  },
  title: 'Exam Question: Interest on a Loan From Parents (Simple Interest)',
  thumbnailTitle: 'How Much Interest Does Airin Owe?',
  summary:
    'A real test question, solved one small step at a time: Airin borrows $3,900 from her parents and pays it back in 15 months at 4% interest. With I = Prt, the time must be in years, so 15 months is 15/12 = 1.25 years, and I = $3,900 × 0.04 × 1.25 = $195. Then we check with one year plus a quarter, and look at the traps.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Exam Question', title: 'How Much Interest Does Airin Owe?', subtitle: 'Simple interest, step by step' }],
      lines: [
        { say: 'In this video, we solve a real test question about simple interest. We will take it one small step at a time, so that every step makes sense.', show: 'title' },
        { say: 'The question comes from the free OpenStax Prealgebra textbook. You will see where it comes from at the bottom of the screen the whole way through.' },
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
          prompt: 'Airin borrowed \\$3,900 from her parents for the down payment on a car and promised to pay them back in $15$ months at a $4\\%$ rate of interest. How much interest did she owe her parents?',
          answer: '\\$195.00',
          working: '3,900 × 0.04 × 15/12 = 195',
        },
      ],
      lines: [
        { say: 'Here is the question, from the book.', show: 'q' },
        { say: 'Airin borrowed 3 thousand 900 dollars from her parents for the down payment on a car. She promised to pay them back in 15 months, at a 4 percent rate of interest. How much interest did she owe her parents?', caption: 'Airin borrowed $3,900 from her parents for the down payment on a car. She promised to pay them back in 15 months, at a 4% rate of interest. How much interest did she owe her parents?' },
        { say: 'If you would like to try it first, pause the video now.', wait: 5 },
      ],
    },
    {
      chapter: 'What is it asking?',
      layout: 'center',
      main: [{ kind: 'callout', id: 'c', tone: 'definition', title: 'Interest', md: '**Interest** is the extra money paid for borrowing. The **principal** is the amount borrowed, and the **rate** is a percent **per year**.' }],
      lines: [
        { say: 'Interest is the extra money you pay for borrowing.', show: 'c' },
        { say: 'The principal is the amount borrowed, here 3 thousand 900 dollars. And the rate, 4 percent, is a percent per year.', caption: 'The principal is the amount borrowed, here $3,900. And the rate, 4%, is a percent per year.' },
      ],
    },
    {
      chapter: 'What you need to know',
      layout: 'center',
      main: [
        { kind: 'math', id: 'm', size: 'lg', lines: ['I = P \\times r \\times t'] },
        { kind: 'callout', id: 'c', tone: 'key', title: 'Time in years', md: 'The rate is per **year**, so $t$ must be in **years**. Months $\\div 12$ gives years.' },
      ],
      lines: [
        { say: 'Here is what we need. Simple interest, I, is the principal P, times the rate r as a decimal, times the time t.', show: 'm' },
        { say: 'Because the rate is per year, the time must be in years. To change months to years, divide by 12.', show: 'c' },
      ],
    },
    {
      chapter: 'The plan',
      layout: 'center',
      main: [{ kind: 'bullets', id: 'plan', items: ['Write the rate as a **decimal**', 'Change **15 months** to years', '**Multiply** $P \\times r \\times t$'] }],
      lines: [
        { say: 'Here is the plan. Write the rate as a decimal.', show: 'plan.0' },
        { say: 'Change 15 months to years.', show: 'plan.1' },
        { say: 'Then multiply P times r times t.', show: 'plan.2' },
      ],
    },
    {
      chapter: 'Steps 1 to 3: The interest',
      layout: 'center',
      main: [
        {
          kind: 'math',
          id: 'm',
          size: 'lg',
          lines: ['r = 4\\% = 0.04', 't = \\dfrac{15}{12} = 1.25 \\text{ years}', 'I = \\$3{,}900 \\times 0.04 \\times 1.25 = \\good{\\$195}'],
        },
      ],
      lines: [
        { say: 'Step one. 4 percent is 0.04.', show: 'm.0' },
        { say: 'Step two. 15 months is 15 twelfths of a year, which is 1.25 years. That is one year and a quarter.', show: 'm.1' },
        { say: 'Step three. 3 thousand 900 times 0.04 is 156, and 156 times 1.25 is 195. Airin owes her parents 195 dollars in interest.', caption: 'Step three. $3,900 × 0.04 = $156, and $156 × 1.25 = $195. Airin owes her parents $195 in interest.', show: 'm.2', focus: 'm.2' },
      ],
    },
    {
      chapter: 'Check the answer',
      layout: 'center',
      main: [{ kind: 'math', id: 'm', size: 'lg', lines: ['\\text{1 year: } \\$3{,}900 \\times 0.04 = \\$156', '\\text{3 months} = \\tfrac{1}{4} \\text{ year: } \\$156 \\div 4 = \\$39', '\\$156 + \\$39 = \\$195 \\ \\checkmark'] }],
      lines: [
        { say: 'Let us check another way. One full year of interest is 4 percent of 3 thousand 900, which is 156 dollars.', caption: 'Let us check another way. One full year of interest is 4% of $3,900, which is $156.', show: 'm.0' },
        { say: '15 months is one year and 3 more months. 3 months is a quarter of a year, so it adds a quarter of 156, which is 39 dollars.', caption: '15 months is one year and 3 more months. 3 months is a quarter of a year, so it adds a quarter of $156, which is $39.', show: 'm.1' },
        { say: '156 plus 39 is 195 dollars. It checks out.', caption: '$156 + $39 = $195. It checks out.', show: 'm.2', focus: 'm.2' },
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
            ['\\$2,340', 'used $t = 15$: change months to **years** first'],
            ['\\$156', 'that is only **one year** of interest'],
            ['\\$4,095', 'that is the **total** paid back, not the **interest**'],
          ],
        },
      ],
      lines: [
        { say: 'Here are the traps.', show: 'traps' },
        { say: '2 thousand 340 dollars uses 15 for the time, as if it were 15 years. Change months to years first.', caption: '$2,340 uses 15 for the time, as if it were 15 years. Change months to years first.' },
        { say: '156 dollars is only one year of interest. The loan lasts 15 months.', caption: '$156 is only one year of interest. The loan lasts 15 months.' },
        { say: 'And 4 thousand 95 dollars is the whole amount Airin pays back. The question asks only for the interest.', caption: 'And $4,095 is the whole amount Airin pays back. The question asks only for the interest.' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q2',
          prompt: 'Jon borrows \\$2,000 for $6$ months at a simple interest rate of $5\\%$ per year. How much interest does he pay?',
          choices: ['\\$600', '\\$2,050', '\\$100', '\\$50'],
          answer: 3,
          working: '6 months = 0.5 years, and 2,000 × 0.05 × 0.5 = 50.',
        },
      ],
      lines: [
        { say: 'Your turn. Jon borrows 2 thousand dollars for 6 months at a simple interest rate of 5 percent per year. How much interest does he pay? Pause the video and try it.', caption: 'Your turn. Jon borrows $2,000 for 6 months at a simple interest rate of 5% per year. How much interest does he pay? Pause the video and try it.', show: 'q2', wait: 8 },
        { say: '6 months is half a year. 2 thousand times 0.05 times 0.5 is 50 dollars. Choice "D".', caption: '6 months is half a year. $2,000 × 0.05 × 0.5 = $50. Choice "D".', show: 'q2.answer' },
      ],
    },
    {
      chapter: 'Summary',
      layout: 'center',
      main: [{ kind: 'bullets', id: 'sum', check: true, items: ['$I = P \\times r \\times t$', 'Rate as a **decimal**', 'Time in **years**: months $\\div 12$', 'Interest is the **extra**, not the total'] }],
      lines: [
        { say: 'Here is what to remember. Simple interest is principal times rate times time.', show: 'sum.0' },
        { say: 'Write the rate as a decimal.', show: 'sum.1' },
        { say: 'Put the time in years: divide months by 12.', show: 'sum.2' },
        { say: 'And interest is only the extra, not the total paid back. For more on simple interest, watch this lesson\'s explainer video on Gradileo.', show: 'sum.3' },
      ],
    },
  ],
};

export default video;
