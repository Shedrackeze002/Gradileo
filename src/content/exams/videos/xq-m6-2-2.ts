import type { Explainer } from '@/video/script.ts';

// Exam question for Math 6 lesson 2.2 (multiplying decimal and natural numbers). The question is a
// Try It from OpenStax Prealgebra 2e, word for word (section 5.2, Decimal Operations, CC BY-NC-SA
// 4.0). 5 pizzas at $9.75: 975 × 5 = 4875, and 9.75 has 2 decimal places, so $48.75, as in the
// book's answer. Check: 5 × $10 = $50, less 5 × $0.25 = $1.25, gives $48.75.

const QUESTION = 'Christopher bought 5 pizzas for the team. Each pizza cost $9.75. How much did all the pizzas cost?';

const video: Explainer = {
  id: 'xq-m6-2-2',
  lessonId: '',
  exam: {
    lesson: 'm6-2-2',
    source: 'OpenStax, Prealgebra 2e, Try It in section 5.2, Decimal Operations',
    licence: 'CC BY-NC-SA 4.0, access for free at openstax.org',
    url: 'https://openstax.org/books/prealgebra-2e/pages/5-2-decimal-operations',
    question: QUESTION,
  },
  title: 'Exam Question: Five Pizzas for the Team (Multiplying Decimal and Natural Numbers)',
  thumbnailTitle: 'Five Pizzas for the Team',
  summary:
    'A real test question, solved one small step at a time: Christopher bought 5 pizzas, and each cost $9.75. How much did they all cost? Equal prices mean we multiply: 5 × $9.75. We multiply 975 × 5 = 4875 as whole numbers, then put back the 2 decimal places: $48.75. Then we check with $10 a pizza and look at the traps.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Exam Question', title: 'Five Pizzas for the Team', subtitle: 'Multiplying decimal and natural numbers, step by step' }],
      lines: [
        { say: 'In this video, we solve a real test question about multiplying a decimal by a whole number. We will take it one small step at a time, so that every step makes sense.', show: 'title' },
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
          prompt: 'Christopher bought $5$ pizzas for the team. Each pizza cost \\$9.75. How much did all the pizzas cost?',
          answer: '\\$48.75',
          working: '5 × 9.75 = 48.75',
        },
      ],
      lines: [
        { say: 'Here is the question, from the book.', show: 'q' },
        { say: 'Christopher bought 5 pizzas for the team. Each pizza cost 9 dollars and 75 cents. How much did all the pizzas cost?', caption: 'Christopher bought 5 pizzas for the team. Each pizza cost $9.75. How much did all the pizzas cost?' },
        { say: 'If you would like to try it first, pause the video now.', wait: 5 },
      ],
    },
    {
      chapter: 'What is it asking?',
      layout: 'center',
      main: [{ kind: 'callout', id: 'c', tone: 'definition', title: 'Equal groups', md: '**Each** pizza costs the **same**, \\$9.75, and there are $5$ of them. Five equal amounts means we **multiply**: $5 \\times 9.75$.' }],
      lines: [
        { say: 'Each pizza costs the same amount, 9 dollars and 75 cents, and there are 5 pizzas.', caption: 'Each pizza costs the same amount, $9.75, and there are 5 pizzas.', show: 'c' },
        { say: 'Five equal amounts means we multiply: 5 times 9.75.' },
      ],
    },
    {
      chapter: 'What you need to know',
      layout: 'center',
      main: [{ kind: 'callout', id: 'c', tone: 'key', title: 'Multiplying a decimal', md: 'Multiply as if there were **no decimal point**. Then **count** the decimal places in the decimal number, and give the answer the **same number** of decimal places.' }],
      lines: [
        { say: 'Here is what we need. To multiply a decimal by a whole number, first multiply as if there were no decimal point.', show: 'c' },
        { say: 'Then count the decimal places in the decimal number, and give the answer the same number of decimal places.' },
      ],
    },
    {
      chapter: 'The plan',
      layout: 'center',
      main: [{ kind: 'bullets', id: 'plan', items: ['Multiply **975** by $5$', 'Count the **decimal places**', 'Put the **point** back'] }],
      lines: [
        { say: 'Here is the plan. Multiply 975 by 5.', show: 'plan.0' },
        { say: 'Count the decimal places in 9.75.', show: 'plan.1' },
        { say: 'Then put the decimal point back in the answer.', show: 'plan.2' },
      ],
    },
    {
      chapter: 'Steps 1 to 3: Multiply',
      layout: 'center',
      main: [
        {
          kind: 'math',
          id: 'm',
          size: 'lg',
          lines: ['\\begin{array}{r} 975 \\\\ \\times\\ \\ 5 \\\\ \\hline 4875 \\end{array}', '9.\\underline{75} \\ \\text{has } 2 \\text{ decimal places}', '5 \\times \\$9.75 = \\good{\\$48.75}'],
        },
      ],
      lines: [
        { say: 'Step one. Leave out the point and multiply 975 by 5. 5 times 5 is 25: write 5, carry 2. 5 times 7 is 35, plus 2 is 37: write 7, carry 3. 5 times 9 is 45, plus 3 is 48. So we get 4 thousand 875.', caption: 'Step one. Leave out the point and multiply 975 × 5 = 4875.', show: 'm.0', focus: 'm.0' },
        { say: 'Step two. 9.75 has 2 digits after the decimal point, so it has 2 decimal places.', show: 'm.1', focus: 'm.1' },
        { say: 'Step three. The answer needs 2 decimal places too. Count 2 digits from the right of 4 thousand 875, and put the point there: 48.75. All the pizzas cost 48 dollars and 75 cents.', caption: 'Step three. The answer needs 2 decimal places too: 48.75. All the pizzas cost $48.75.', show: 'm.2', focus: 'm.2' },
      ],
    },
    {
      chapter: 'Check the answer',
      layout: 'center',
      main: [{ kind: 'math', id: 'm', size: 'lg', lines: ['5 \\times \\$10 = \\$50', '\\$50 - 5 \\times \\$0.25 = \\$50 - \\$1.25 = \\$48.75 \\ \\checkmark'] }],
      lines: [
        { say: 'Let us check another way. If each pizza cost 10 dollars, 5 pizzas would cost 50 dollars.', show: 'm.0' },
        { say: 'But each pizza is 25 cents less than 10 dollars, so take away 5 times 25 cents, which is 1 dollar and 25 cents. 50 dollars minus 1 dollar 25 is 48 dollars and 75 cents. It checks out.', caption: 'But each pizza is 25 cents less than $10, so take away 5 × $0.25 = $1.25. $50 − $1.25 = $48.75. It checks out.', show: 'm.1', focus: 'm.1' },
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
            ['\\$487.50', 'the point is in the wrong place: **2** decimal places, not $1$'],
            ['\\$14.75', '**added** $5$ instead of multiplying'],
            ['\\$45.75', 'multiplied only the **dollars**: the cents count $5$ times too'],
          ],
        },
      ],
      lines: [
        { say: 'Here are the traps.', show: 'traps' },
        { say: '487 dollars and 50 cents puts the point in the wrong place. The answer needs 2 decimal places, and it should be close to 50 dollars.', caption: '$487.50 puts the point in the wrong place. The answer needs 2 decimal places, and it should be close to $50.' },
        { say: '14 dollars and 75 cents adds 5 instead of multiplying by 5.', caption: '$14.75 adds 5 instead of multiplying by 5.' },
        { say: 'And 45 dollars and 75 cents multiplies only the 9 dollars. The 75 cents is paid 5 times too.', caption: '$45.75 multiplies only the $9. The 75 cents is paid 5 times too.' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q2',
          prompt: 'Movie tickets cost \\$6.25 each. How much do $4$ tickets cost?',
          choices: ['\\$10.25', '\\$24.25', '\\$25.00', '\\$250.00'],
          answer: 2,
          working: '625 × 4 = 2500, with 2 decimal places: 25.00.',
        },
      ],
      lines: [
        { say: 'Your turn. Movie tickets cost 6 dollars and 25 cents each. How much do 4 tickets cost? Pause the video and try it.', caption: 'Your turn. Movie tickets cost $6.25 each. How much do 4 tickets cost?', show: 'q2', wait: 8 },
        { say: '625 times 4 is 2 thousand 500, and with 2 decimal places that is 25 dollars. Choice "C".', caption: '625 × 4 = 2500, and with 2 decimal places that is $25.00. Choice "C".', show: 'q2.answer' },
      ],
    },
    {
      chapter: 'Summary',
      layout: 'center',
      main: [{ kind: 'bullets', id: 'sum', check: true, items: ['Equal amounts: **multiply**', 'Multiply **without** the point', 'Give the answer the **same** decimal places', '**Estimate** to check where the point goes'] }],
      lines: [
        { say: 'Here is what to remember. Equal amounts mean multiply.', show: 'sum.0' },
        { say: 'Multiply without the decimal point.', show: 'sum.1' },
        { say: 'Give the answer the same number of decimal places as the decimal number.', show: 'sum.2' },
        { say: 'And estimate to check where the point goes. For more on multiplying decimal and natural numbers, watch this lesson\'s explainer video on Gradileo.', show: 'sum.3' },
      ],
    },
  ],
};

export default video;
