import type { Explainer } from '@/video/script.ts';

// Exam question for Math 6 lesson 2.1 (addition and subtraction problems). The question is a Try It
// from OpenStax Prealgebra 2e, word for word (section 5.2, Decimal Operations, CC BY-NC-SA 4.0).
// Shoes, purse and tax: $24.75 + $36.90 + $4.32 = $61.65 + $4.32 = $65.97, as in the book's answer.
// Estimate: $25 + $37 + $4 = $66.

const QUESTION =
  'Amber bought a pair of shoes for $24.75 and a purse for $36.90. The sales tax was $4.32. How much did Amber spend?';

const video: Explainer = {
  id: 'xq-m6-2-1',
  lessonId: '',
  exam: {
    lesson: 'm6-2-1',
    source: 'OpenStax, Prealgebra 2e, Try It in section 5.2, Decimal Operations',
    licence: 'CC BY-NC-SA 4.0, access for free at openstax.org',
    url: 'https://openstax.org/books/prealgebra-2e/pages/5-2-decimal-operations',
    question: QUESTION,
  },
  title: 'Exam Question: Shoes, a Purse and the Sales Tax (Solving Addition and Subtraction Problems)',
  thumbnailTitle: 'How Much Did Amber Spend?',
  summary:
    'A real test question, solved one small step at a time: Amber bought shoes for $24.75 and a purse for $36.90, and the sales tax was $4.32. How much did she spend? We add all three amounts with the decimal points lined up: $24.75 + $36.90 = $61.65, and $61.65 + $4.32 = $65.97. Then we check with an estimate and look at the traps.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Exam Question', title: 'How Much Did Amber Spend?', subtitle: 'Addition and subtraction problems, step by step' }],
      lines: [
        { say: 'In this video, we solve a real test question about adding money. We will take it one small step at a time, so that every step makes sense.', show: 'title' },
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
          prompt: 'Amber bought a pair of shoes for \\$24.75 and a purse for \\$36.90. The sales tax was \\$4.32. How much did Amber spend?',
          answer: '\\$65.97',
          working: '24.75 + 36.90 + 4.32 = 65.97',
        },
      ],
      lines: [
        { say: 'Here is the question, from the book.', show: 'q' },
        { say: 'Amber bought a pair of shoes for 24 dollars and 75 cents, and a purse for 36 dollars and 90 cents. The sales tax was 4 dollars and 32 cents. How much did Amber spend?', caption: 'Amber bought a pair of shoes for $24.75 and a purse for $36.90. The sales tax was $4.32. How much did Amber spend?' },
        { say: 'If you would like to try it first, pause the video now.', wait: 5 },
      ],
    },
    {
      chapter: 'What is it asking?',
      layout: 'center',
      main: [{ kind: 'callout', id: 'c', tone: 'definition', title: 'Sales tax', md: '**Sales tax** is extra money added to the price when you buy something. Amber paid for the **shoes**, the **purse** and the **tax**, so we **add** all three amounts.' }],
      lines: [
        { say: 'Sales tax is extra money added to the price when you buy something.', show: 'c' },
        { say: 'Amber paid for the shoes, the purse, and the tax. So the total she spent is all three amounts added together.' },
      ],
    },
    {
      chapter: 'What you need to know',
      layout: 'center',
      main: [{ kind: 'callout', id: 'c', tone: 'key', title: 'Adding decimals', md: 'Write the numbers in a column with the **decimal points lined up**, so cents are under cents and dollars under dollars. Add from the **right**, carrying as usual, and put the point straight **down**.' }],
      lines: [
        { say: 'Here is what we need. To add decimals, write them in a column with the decimal points lined up, so cents sit under cents.', show: 'c' },
        { say: 'Then add from the right, carrying as usual, and bring the decimal point straight down.' },
      ],
    },
    {
      chapter: 'The plan',
      layout: 'center',
      main: [{ kind: 'bullets', id: 'plan', items: ['Add the **shoes** and the **purse**', 'Add the **tax**', '**Check** with an estimate'] }],
      lines: [
        { say: 'Here is the plan. Add the shoes and the purse.', show: 'plan.0' },
        { say: 'Add the tax.', show: 'plan.1' },
        { say: 'Then check with an estimate.', show: 'plan.2' },
      ],
    },
    {
      chapter: 'Steps 1 and 2: Add',
      layout: 'center',
      main: [
        {
          kind: 'math',
          id: 'm',
          size: 'lg',
          lines: ['\\begin{array}{r} \\$24.75 \\\\ +\\ \\$36.90 \\\\ \\hline \\$61.65 \\end{array}', '\\begin{array}{r} \\$61.65 \\\\ +\\ \\$4.32 \\\\ \\hline \\good{\\$65.97} \\end{array}'],
        },
      ],
      lines: [
        { say: 'Step one. Line up the decimal points of 24 dollars 75 and 36 dollars 90. 5 cents plus 0 is 5. 7 plus 9 is 16 tens of cents, so write 6 and carry 1. Then 4 plus 6 plus 1 is 11, and 2 plus 3 plus 1 is 6. That makes 61 dollars and 65 cents.', caption: 'Step one. Line up the points of $24.75 and $36.90 and add from the right: the shoes and purse cost $61.65.', show: 'm.0', focus: 'm.0' },
        { say: 'Step two. Add the tax, 4 dollars and 32 cents. 5 plus 2 is 7, 6 plus 3 is 9, 1 plus 4 is 5, and the 6 comes down. Amber spent 65 dollars and 97 cents.', caption: 'Step two. Add the tax, $4.32: Amber spent $65.97.', show: 'm.1', focus: 'm.1' },
      ],
    },
    {
      chapter: 'Check the answer',
      layout: 'center',
      main: [{ kind: 'math', id: 'm', size: 'lg', lines: ['\\$25 + \\$37 + \\$4 = \\$66', '\\$65.97 \\approx \\$66 \\ \\checkmark'] }],
      lines: [
        { say: 'Let us check with an estimate. Round each amount to the nearest dollar: 25 plus 37 plus 4 is 66 dollars.', show: 'm.0' },
        { say: 'Our answer, 65 dollars and 97 cents, is very close to 66 dollars. It checks out.', caption: 'Our answer, $65.97, is very close to $66. It checks out.', show: 'm.1', focus: 'm.1' },
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
            ['\\$61.65', 'left out the **tax**: Amber paid it too'],
            ['\\$57.33', '**subtracted** the tax: tax is **added** to the price'],
            ['\\$32.76', 'wrote $36.90$ as $3.69$: line up the **points**, not the ends'],
          ],
        },
      ],
      lines: [
        { say: 'Here are the traps.', show: 'traps' },
        { say: '61 dollars and 65 cents leaves out the tax. Amber paid the tax too.', caption: '$61.65 leaves out the tax. Amber paid the tax too.' },
        { say: '57 dollars and 33 cents subtracts the tax. Tax is added to the price.', caption: '$57.33 subtracts the tax. Tax is added to the price.' },
        { say: 'And 32 dollars and 76 cents comes from reading 36 dollars 90 as 3 dollars 69. Line up the decimal points, not the last digits.', caption: '$32.76 comes from reading $36.90 as $3.69. Line up the decimal points, not the last digits.' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q2',
          prompt: 'Ben buys a book for \\$12.50 and a pen for \\$3.25. The sales tax is \\$1.05. How much does Ben spend?',
          choices: ['\\$15.75', '\\$16.80', '\\$14.70', '\\$16.70'],
          answer: 1,
          working: '12.50 + 3.25 = 15.75, and 15.75 + 1.05 = 16.80.',
        },
      ],
      lines: [
        { say: 'Your turn. Ben buys a book for 12 dollars and 50 cents, and a pen for 3 dollars and 25 cents. The sales tax is 1 dollar and 5 cents. How much does Ben spend? Pause the video and try it.', caption: 'Your turn. Ben buys a book for $12.50 and a pen for $3.25. The sales tax is $1.05. How much does Ben spend?', show: 'q2', wait: 8 },
        { say: 'The book and pen cost 15 dollars 75, and adding the tax gives 16 dollars and 80 cents. Choice "B".', caption: 'The book and pen cost $15.75, and adding the tax gives $16.80. Choice "B".', show: 'q2.answer' },
      ],
    },
    {
      chapter: 'Summary',
      layout: 'center',
      main: [{ kind: 'bullets', id: 'sum', check: true, items: ['Add **every** amount paid, tax too', 'Line up the **decimal points**', 'Add from the **right** and carry', '**Estimate** to check'] }],
      lines: [
        { say: 'Here is what to remember. Add every amount that was paid, including the tax.', show: 'sum.0' },
        { say: 'Line up the decimal points.', show: 'sum.1' },
        { say: 'Add from the right, and carry as usual.', show: 'sum.2' },
        { say: 'And estimate to check. For more on solving addition and subtraction problems, watch this lesson\'s explainer video on Gradileo.', show: 'sum.3' },
      ],
    },
  ],
};

export default video;
