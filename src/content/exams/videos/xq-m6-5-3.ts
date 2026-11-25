import type { Explainer } from '@/video/script.ts';

// Exam question for Math 6 lesson 5.3 (percent of a number). The question is a Try It from OpenStax
// Prealgebra 2e, word for word (section 6.2, Solve General Applications of Percent, CC BY-NC-SA
// 4.0). 18% of $81.50 = 0.18 × 81.50 = 14.67, as in the book's answer. Check: 10% is $8.15 and 8%
// is $6.52, and $8.15 + $6.52 = $14.67.

const QUESTION =
  'Cierra and her sister enjoyed a special dinner in a restaurant, and the bill was $81.50. If she wants to leave 18% of the total bill as her tip, how much should she leave?';

const video: Explainer = {
  id: 'xq-m6-5-3',
  lessonId: '',
  exam: {
    lesson: 'm6-5-3',
    source: 'OpenStax, Prealgebra 2e, Try It in section 6.2, Solve General Applications of Percent',
    licence: 'CC BY-NC-SA 4.0, access for free at openstax.org',
    url: 'https://openstax.org/books/prealgebra-2e/pages/6-2-solve-general-applications-of-percent',
    question: QUESTION,
  },
  title: 'Exam Question: An 18% Tip on a Dinner Bill (Percent of a Number)',
  thumbnailTitle: 'An 18% Tip',
  summary:
    'A real test question, solved one small step at a time: Cierra\'s dinner bill was $81.50, and she wants to leave 18% of it as a tip. How much is the tip? We change 18% to the decimal 0.18 and multiply: 0.18 × $81.50 = $14.67. Then we check with 10% and 8% and look at the traps.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Exam Question', title: 'An 18% Tip', subtitle: 'Percent of a number, step by step' }],
      lines: [
        { say: 'In this video, we solve a real test question about finding a percent of an amount. We will take it one small step at a time, so that every step makes sense.', show: 'title' },
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
          prompt: 'Cierra and her sister enjoyed a special dinner in a restaurant, and the bill was \\$81.50. If she wants to leave $18\\%$ of the total bill as her tip, how much should she leave?',
          answer: '\\$14.67',
          working: '0.18 × 81.50 = 14.67',
        },
      ],
      lines: [
        { say: 'Here is the question, from the book.', show: 'q' },
        { say: 'Cierra and her sister enjoyed a special dinner in a restaurant, and the bill was 81 dollars and 50 cents. If she wants to leave 18 percent of the total bill as her tip, how much should she leave?', caption: 'Cierra and her sister enjoyed a special dinner in a restaurant, and the bill was $81.50. If she wants to leave 18% of the total bill as her tip, how much should she leave?' },
        { say: 'If you would like to try it first, pause the video now.', wait: 5 },
      ],
    },
    {
      chapter: 'What is it asking?',
      layout: 'center',
      main: [{ kind: 'callout', id: 'c', tone: 'definition', title: 'Tip and percent', md: 'A **tip** is extra money left for the people who served the meal. **Percent** means **out of 100**: $18\\%$ of the bill means $18$ cents for every \\$1, or $\\tfrac{18}{100}$ of the bill.' }],
      lines: [
        { say: 'A tip is extra money left for the people who served the meal.', show: 'c' },
        { say: 'Percent means out of 100. So 18 percent of the bill means 18 out of every 100 parts of it, or 18 cents for every dollar.' },
      ],
    },
    {
      chapter: 'What you need to know',
      layout: 'center',
      main: [{ kind: 'math', id: 'f', size: 'lg', lines: ['\\text{percent of an amount} = \\text{decimal} \\times \\text{amount}', '18\\% = \\tfrac{18}{100} = 0.18'] }],
      lines: [
        { say: 'Here is what we need. To find a percent of an amount, change the percent to a decimal, and multiply it by the amount.', show: 'f.0' },
        { say: '18 percent is 18 hundredths, which is 0.18.', show: 'f.1' },
      ],
    },
    {
      chapter: 'The plan',
      layout: 'center',
      main: [{ kind: 'bullets', id: 'plan', items: ['Change $18\\%$ to a **decimal**', '**Multiply** by the bill', '**Round** to the nearest cent if needed'] }],
      lines: [
        { say: 'Here is the plan. Change 18 percent to a decimal.', show: 'plan.0' },
        { say: 'Multiply it by the bill.', show: 'plan.1' },
        { say: 'Then round to the nearest cent if we need to.', show: 'plan.2' },
      ],
    },
    {
      chapter: 'Steps 1 to 3: Find the tip',
      layout: 'center',
      main: [{ kind: 'math', id: 'm', size: 'lg', lines: ['18\\% = 0.18', '0.18 \\times 81.50 = 14.6700', '\\text{tip} = \\good{\\$14.67}'] }],
      lines: [
        { say: 'Step one. 18 percent is 0.18.', show: 'm.0', focus: 'm.0' },
        { say: 'Step two. Multiply 0.18 by 81.50. Without the points, 18 times 8 thousand 150 is 146 thousand 700. There are 4 decimal places in all, two in each number, so the answer is 14.6700.', caption: 'Step two. Multiply 0.18 × 81.50. Without the points, 18 × 8150 = 146700. There are 4 decimal places in all, so the answer is 14.6700.', show: 'm.1', focus: 'm.1' },
        { say: 'Step three. The extra zeros change nothing, so the tip is 14 dollars and 67 cents.', caption: 'Step three. The extra zeros change nothing, so the tip is $14.67.', show: 'm.2', focus: 'm.2' },
      ],
    },
    {
      chapter: 'Check the answer',
      layout: 'center',
      main: [{ kind: 'math', id: 'm', size: 'lg', lines: ['10\\%: \\ \\$81.50 \\div 10 = \\$8.15', '8\\%: \\ 8 \\times \\$0.815 = \\$6.52', '\\$8.15 + \\$6.52 = \\$14.67 \\ \\checkmark'] }],
      lines: [
        { say: 'Let us check another way. 10 percent of the bill is the bill divided by 10: 8 dollars and 15 cents.', caption: 'Let us check another way. 10% of the bill is the bill ÷ 10: $8.15.', show: 'm.0' },
        { say: '1 percent is 81.5 cents, so 8 percent is 8 times that: 6 dollars and 52 cents.', caption: '1% is $0.815, so 8% is 8 times that: $6.52.', show: 'm.1' },
        { say: '10 percent plus 8 percent is 18 percent: 8 dollars 15 plus 6 dollars 52 is 14 dollars 67. It checks out.', caption: '10% + 8% = 18%: $8.15 + $6.52 = $14.67. It checks out.', show: 'm.2', focus: 'm.2' },
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
            ['\\$1,467.00', 'multiplied by $18$, not $0.18$: change the **percent** to a decimal'],
            ['\\$1.47', 'used $1.8\\%$: $18\\%$ is $0.18$, not $0.018$'],
            ['\\$96.17', 'that is the bill **plus** the tip: the question asks for the **tip**'],
          ],
        },
      ],
      lines: [
        { say: 'Here are the traps.', show: 'traps' },
        { say: 'A tip of over a thousand dollars multiplies by 18 instead of 0.18. Change the percent to a decimal first.' },
        { say: '1 dollar 47 moves the point too far, using 0.018. 18 percent is 0.18.', caption: '$1.47 moves the point too far, using 0.018. 18% is 0.18.' },
        { say: 'And 96 dollars 17 is the bill plus the tip. The question asks only for the tip.', caption: '$96.17 is the bill plus the tip. The question asks only for the tip.' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q2',
          prompt: 'A jacket costs \\$40. It is on sale for $15\\%$ off. How much money is taken off the price?',
          choices: ['\\$6.00', '\\$0.60', '\\$34.00', '\\$15.00'],
          answer: 0,
          working: '15% = 0.15, and 0.15 × 40 = 6, so \\$6.00 off.',
        },
      ],
      lines: [
        { say: 'Your turn. A jacket costs 40 dollars. It is on sale for 15 percent off. How much money is taken off the price? Pause the video and try it.', caption: 'Your turn. A jacket costs $40. It is on sale for 15% off. How much money is taken off the price?', show: 'q2', wait: 8 },
        { say: '15 percent is 0.15, and 0.15 times 40 is 6. So 6 dollars is taken off. Choice "A".', caption: '15% = 0.15, and 0.15 × 40 = 6. So $6.00 is taken off. Choice "A".', show: 'q2.answer' },
      ],
    },
    {
      chapter: 'Summary',
      layout: 'center',
      main: [{ kind: 'bullets', id: 'sum', check: true, items: ['Percent means **out of 100**', 'Change the percent to a **decimal**', '**Multiply** the decimal by the amount', 'Check with **10%** and smaller parts'] }],
      lines: [
        { say: 'Here is what to remember. Percent means out of 100.', show: 'sum.0' },
        { say: 'Change the percent to a decimal.', show: 'sum.1' },
        { say: 'Multiply the decimal by the amount.', show: 'sum.2' },
        { say: 'And check by finding 10 percent and building up. For more on percent of a number, watch this lesson\'s explainer video on Gradileo.', show: 'sum.3' },
      ],
    },
  ],
};

export default video;
