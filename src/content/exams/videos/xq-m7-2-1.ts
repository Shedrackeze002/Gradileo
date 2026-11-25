import type { Explainer } from '@/video/script.ts';

// Exam question for Math 7 lesson 2.1 (adding and subtracting decimals). The question is an
// exercise from OpenStax Prealgebra 2e, word for word (section 5.2, Decimal Operations, CC BY-NC-SA
// 4.0). Line up the decimal points: 18.49 + 8.92 = 27.41, and 27.41 + 1.65 = 29.06.

const QUESTION = 'Shopping Adam bought a t-shirt for $18.49 and a book for $8.92 The sales tax was $1.65. How much did Adam spend?';

const video: Explainer = {
  id: 'xq-m7-2-1',
  lessonId: '',
  exam: {
    lesson: 'm7-2-1',
    source: 'OpenStax, Prealgebra 2e, Exercise in section 5.2, Decimal Operations',
    licence: 'CC BY-NC-SA 4.0, access for free at openstax.org',
    url: 'https://openstax.org/books/prealgebra-2e/pages/5-2-decimal-operations',
    question: QUESTION,
  },
  title: 'Exam Question: How Much Did Adam Spend? (Adding and Subtracting Decimals)',
  thumbnailTitle: 'How Much Did Adam Spend?',
  summary:
    'A real test question, solved one small step at a time: Adam bought a t-shirt for $18.49 and a book for $8.92, and the sales tax was $1.65. How much did he spend? Add all three amounts, lining up the decimal points: 18.49 + 8.92 = 27.41, and 27.41 + 1.65 = 29.06. Adam spent $29.06. Then we check with an estimate and look at the traps.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Exam Question', title: 'How Much Did Adam Spend?', subtitle: 'Adding and subtracting decimals, step by step' }],
      lines: [
        { say: 'In this video, we solve a real test question about adding decimals. We will take it one small step at a time, so that every step makes sense.', show: 'title' },
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
          prompt: '**Shopping** Adam bought a t-shirt for \\$18.49 and a book for \\$8.92 The sales tax was \\$1.65. How much did Adam spend?',
          answer: '\\$29.06',
          working: '18.49 + 8.92 + 1.65 = 29.06',
        },
      ],
      lines: [
        { say: 'Here is the question, from the book.', show: 'q' },
        { say: 'Adam bought a t-shirt for 18 dollars and 49 cents, and a book for 8 dollars and 92 cents. The sales tax was 1 dollar and 65 cents. How much did Adam spend?', caption: 'Adam bought a t-shirt for $18.49 and a book for $8.92. The sales tax was $1.65. How much did Adam spend?' },
        { say: 'If you would like to try it first, pause the video now.', wait: 5 },
      ],
    },
    {
      chapter: 'What is it asking?',
      layout: 'center',
      main: [{ kind: 'callout', id: 'c', tone: 'definition', title: 'Sales tax', md: '**Sales tax** is an extra amount added to a price when you buy something. The question tells us it was \\$1.65. Adam paid for the t-shirt, the book **and** the tax, so we **add** all three.' }],
      lines: [
        { say: 'Sales tax is an extra amount added to the price when you buy something. Here it was 1 dollar and 65 cents.', caption: 'Sales tax is an extra amount added to the price when you buy something. Here it was $1.65.', show: 'c' },
        { say: 'Adam paid for the t-shirt, the book and the tax, so we add all three amounts.' },
      ],
    },
    {
      chapter: 'What you need to know',
      layout: 'center',
      main: [{ kind: 'callout', id: 'c', tone: 'key', title: 'Line up the points', md: 'To add decimals, write them in a column with the **decimal points lined up**, so hundredths are added to hundredths and tenths to tenths. Then add as with whole numbers, **carrying** as usual, and bring the point straight down.' }],
      lines: [
        { say: 'Here is what we need. To add decimals, write them in a column with the decimal points lined up. Then hundredths are added to hundredths, and tenths to tenths.', show: 'c' },
        { say: 'Add as you would with whole numbers, carrying as usual, and bring the decimal point straight down.' },
      ],
    },
    {
      chapter: 'The plan',
      layout: 'center',
      main: [{ kind: 'bullets', id: 'plan', items: ['Add the **t-shirt** and the **book**', 'Add the **tax**', 'Write the answer in **dollars**'] }],
      lines: [
        { say: 'Here is the plan. Add the t-shirt and the book.', show: 'plan.0' },
        { say: 'Add the tax.', show: 'plan.1' },
        { say: 'Then write the answer in dollars.', show: 'plan.2' },
      ],
    },
    {
      chapter: 'Steps 1 to 3: Add in a column',
      layout: 'center',
      main: [{ kind: 'math', id: 'm', size: 'lg', lines: ['\\begin{array}{r} 18.49 \\\\ +\\ \\ 8.92 \\\\ \\hline 27.41 \\end{array}', '\\begin{array}{r} 27.41 \\\\ +\\ \\ 1.65 \\\\ \\hline 29.06 \\end{array}', '\\text{Adam spent } \\good{\\$29.06}'] }],
      lines: [
        { say: 'Step one. Write 18.49 and 8.92 with the points lined up. Hundredths: 9 plus 2 is 11. Write 1, carry 1. Tenths: 4 plus 9 plus 1 is 14. Write 4, carry 1. Ones: 8 plus 8 plus 1 is 17. Write 7, carry 1. Tens: 1 plus 1 is 2. That makes 27.41.', show: 'm.0', focus: 'm.0' },
        { say: 'Step two. Add the tax, 1.65. Hundredths: 1 plus 5 is 6. Tenths: 4 plus 6 is 10. Write 0, carry 1. Ones: 7 plus 1 plus 1 is 9. Tens: 2. That makes 29.06.', show: 'm.1', focus: 'm.1' },
        { say: 'Step three. Adam spent 29 dollars and 6 cents.', caption: 'Step three. Adam spent $29.06.', show: 'm.2', focus: 'm.2' },
      ],
    },
    {
      chapter: 'Check the answer',
      layout: 'center',
      main: [{ kind: 'math', id: 'm', size: 'lg', lines: ['18 + 9 + 2 = 29 \\approx 29.06 \\ \\checkmark'] }],
      lines: [
        { say: 'Let us check with an estimate. Round each amount to the nearest dollar: 18, 9 and 2. 18 plus 9 plus 2 is 29, very close to our answer. It checks out.', show: 'm.0', focus: 'm.0' },
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
            ['\\$27.41', 'left out the **tax**: Adam paid it too'],
            ['\\$28.06', 'forgot to **carry** from the tenths to the ones'],
            ['\\$29.6', 'dropped the **zero**: $6$ cents is $0.06$'],
          ],
        },
      ],
      lines: [
        { say: 'Here are the traps.', show: 'traps' },
        { say: '27 dollars and 41 cents leaves out the tax. Adam paid the tax too.', caption: '$27.41 leaves out the tax. Adam paid the tax too.' },
        { say: '28 dollars and 6 cents forgets a carry. When the tenths add up to 14, write 4 and carry 1 to the ones.', caption: '$28.06 forgets a carry. When the tenths add up to 14, write 4 and carry 1 to the ones.' },
        { say: 'And 29.6 drops the zero. 6 cents is 0.06 of a dollar, so the answer is 29.06.', caption: '$29.6 drops the zero. 6 cents is $0.06, so the answer is $29.06.' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q2',
          prompt: 'Lena pays for a \\$12.75 sandwich and a \\$3.40 drink with a \\$20 bill. How much change does she get?',
          choices: ['\\$16.15', '\\$4.95', '\\$3.85', '\\$4.85'],
          answer: 2,
          working: '12.75 + 3.40 = 16.15, and 20.00 − 16.15 = 3.85.',
        },
      ],
      lines: [
        { say: 'Your turn. Lena pays for a 12 dollar and 75 cent sandwich and a 3 dollar and 40 cent drink with a 20 dollar bill. How much change does she get? Pause the video and try it.', caption: 'Your turn. Lena pays for a $12.75 sandwich and a $3.40 drink with a $20 bill. How much change does she get? Pause the video and try it.', show: 'q2', wait: 8 },
        { say: 'The food costs 12.75 plus 3.40, which is 16.15. Then 20.00 minus 16.15 is 3.85. Her change is 3 dollars and 85 cents. Choice "C".', caption: 'The food costs 12.75 + 3.40 = 16.15. Then 20.00 − 16.15 = 3.85. Her change is $3.85. Choice "C".', show: 'q2.answer' },
      ],
    },
    {
      chapter: 'Summary',
      layout: 'center',
      main: [{ kind: 'bullets', id: 'sum', check: true, items: ['**Line up** the decimal points', 'Add as with whole numbers, **carrying**', 'Bring the point **straight down**', '**Estimate** to check'] }],
      lines: [
        { say: 'Here is what to remember. Line up the decimal points.', show: 'sum.0' },
        { say: 'Add as with whole numbers, carrying as usual.', show: 'sum.1' },
        { say: 'Bring the decimal point straight down.', show: 'sum.2' },
        { say: 'And estimate to check. For more on adding and subtracting decimals, watch this lesson\'s explainer video on Gradileo.', show: 'sum.3' },
      ],
    },
  ],
};

export default video;
