import type { Explainer } from '@/video/script.ts';

// Exam question for Math 10-4 lesson 3.3 (percent in everyday life). The question is a Try It from
// OpenStax Prealgebra 2e, word for word (section 6.2, Solve General Applications of Percent,
// CC BY-NC-SA 4.0). 15% of $14.40 = 0.15 × 14.40 = $2.16, as in the book's answer. Check: 10% is
// $1.44 and 5% is $0.72, and $1.44 + $0.72 = $2.16.

const QUESTION =
  'Kimngoc had lunch at her favorite restaurant. She wants to leave 15% of the total bill as her tip. If her bill was $14.40, how much will she leave for the tip?';

const video: Explainer = {
  id: 'xq-m104-3-3',
  lessonId: '',
  exam: {
    lesson: 'm104-3-3',
    source: 'OpenStax, Prealgebra 2e, Try It in section 6.2, Solve General Applications of Percent',
    licence: 'CC BY-NC-SA 4.0, access for free at openstax.org',
    url: 'https://openstax.org/books/prealgebra-2e/pages/6-2-solve-general-applications-of-percent',
    question: QUESTION,
  },
  title: 'Exam Question: A 15% Tip on a Lunch Bill (Percent in Everyday Life)',
  thumbnailTitle: 'A 15% Tip on Lunch',
  summary:
    'A real test question, solved one small step at a time: Kimngoc’s lunch bill was $14.40, and she wants to leave 15% of it as a tip. How much is the tip? We change 15% to the decimal 0.15 and multiply: 0.15 × $14.40 = $2.16. Then we check with the 10% and 5% trick and look at the traps.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Exam Question', title: 'A 15% Tip on Lunch', subtitle: 'Percent in everyday life, step by step' }],
      lines: [
        { say: 'In this video, we solve a real test question about percent in everyday life. We will take it one small step at a time, so that every step makes sense.', show: 'title' },
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
          prompt: 'Kimngoc had lunch at her favorite restaurant. She wants to leave $15\\%$ of the total bill as her tip. If her bill was \\$14.40, how much will she leave for the tip?',
          answer: '\\$2.16',
          working: '$0.15 \\times 14.40 = 2.16$',
        },
      ],
      lines: [
        { say: 'Here is the question, from the book.', show: 'q' },
        { say: 'Kimngoc had lunch at her favorite restaurant. She wants to leave 15 percent of the total bill as her tip. If her bill was 14 dollars and 40 cents, how much will she leave for the tip?' },
        { say: 'If you would like to try it first, pause the video now.', wait: 5 },
      ],
    },
    {
      chapter: 'What is it asking?',
      layout: 'center',
      main: [
        { kind: 'math', id: 'm', size: 'lg', lines: ['\\text{tip} = 15\\% \\text{ of } \\$14.40'] },
        { kind: 'text', id: 't', size: 'md', md: 'The question asks for the **tip** only, not the total she pays.' },
      ],
      lines: [
        { say: 'The tip is 15 percent of the bill, and the bill is 14 dollars and 40 cents.', show: 'm' },
        { say: 'Notice that the question asks for the tip only, not the total she pays.', show: 't' },
      ],
    },
    {
      chapter: 'What you need to know',
      layout: 'center',
      main: [
        { kind: 'math', id: 'f', size: 'lg', lines: ['\\text{percent of an amount} = \\text{decimal} \\times \\text{amount}', '15\\% = 0.15'] },
        { kind: 'callout', id: 'c', tone: 'key', title: 'A quick check', md: '$10\\%$ is the amount **divided by 10**. $5\\%$ is **half** of that. So $15\\% = 10\\% + 5\\%$.' },
      ],
      lines: [
        { say: 'Here is what we need. To find a percent of an amount, change the percent to a decimal and multiply. 15 percent is 0.15.', show: 'f' },
        { say: 'And a quick way to check: 10 percent is the amount divided by 10, and 5 percent is half of that. 15 percent is the two added together.', show: 'c' },
      ],
    },
    {
      chapter: 'The plan',
      layout: 'center',
      main: [{ kind: 'bullets', id: 'plan', items: ['Change $15\\%$ to a **decimal**', '**Multiply** by the bill', 'Check with **10% + 5%**'] }],
      lines: [
        { say: 'Here is the plan. Change 15 percent to a decimal.', show: 'plan.0' },
        { say: 'Multiply it by the bill.', show: 'plan.1' },
        { say: 'Then check with 10 percent plus 5 percent.', show: 'plan.2' },
      ],
    },
    {
      chapter: 'Step 1: The decimal',
      layout: 'center',
      main: [{ kind: 'math', id: 'm', size: 'lg', lines: ['15\\% = \\dfrac{15}{100} = 0.15'] }],
      lines: [
        { say: 'Step one. 15 percent is 15 over 100, which is 0.15.', show: 'm.0', focus: 'm.0' },
      ],
    },
    {
      chapter: 'Step 2: Multiply',
      layout: 'center',
      main: [{ kind: 'math', id: 'm', size: 'lg', lines: ['0.15 \\times \\$14.40 = \\good{\\$2.16}'] }],
      lines: [
        { say: 'Step two. 0.15 times 14.40 is 2.16. Kimngoc will leave a tip of 2 dollars and 16 cents.', show: 'm.0', focus: 'm.0' },
      ],
    },
    {
      chapter: 'Check the answer',
      layout: 'center',
      main: [{ kind: 'math', id: 'm', size: 'lg', lines: ['10\\%: \\ \\$14.40 \\div 10 = \\$1.44', '5\\%: \\ \\$1.44 \\div 2 = \\$0.72', '\\$1.44 + \\$0.72 = \\$2.16 \\ \\checkmark'] }],
      lines: [
        { say: 'Let us check. 10 percent of 14.40 is 1.44: just divide by 10.', show: 'm.0' },
        { say: '5 percent is half of that: 72 cents.', show: 'm.1' },
        { say: 'Together, 1.44 plus 0.72 is 2.16. It checks out.', show: 'm.2', focus: 'm.2' },
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
            ['\\$216', 'multiplied by $15$, not $0.15$'],
            ['\\$16.56', 'that is the **total** she pays: the question asks for the tip'],
            ['\\$0.22', 'used $0.015$: $15\\%$ is $0.15$'],
          ],
        },
      ],
      lines: [
        { say: 'Here are the traps.', show: 'traps' },
        { say: 'Multiplying by 15 instead of 0.15 gives 216 dollars, a tip far bigger than the bill.' },
        { say: '16.56 is the bill plus the tip. That is what she pays, but the question asks for the tip.' },
        { say: 'And 15 percent is 0.15, not 0.015. Move the decimal point two places, not three.' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q2',
          prompt: 'A dinner bill is \\$45.00. How much is an $18\\%$ tip?',
          choices: ['\\$8.10', '\\$81.00', '\\$53.10', '\\$0.81'],
          answer: 0,
          working: '$0.18 \\times 45.00 = 8.10$, so the tip is \\$8.10.',
        },
      ],
      lines: [
        { say: 'Your turn. A dinner bill is 45 dollars. How much is an 18 percent tip? Pause the video and try it.', show: 'q2', wait: 8 },
        { say: '18 percent is 0.18. 0.18 times 45 is 8.10. The tip is 8 dollars and 10 cents. Choice "A".', show: 'q2.answer' },
      ],
    },
    {
      chapter: 'Summary',
      layout: 'center',
      main: [{ kind: 'bullets', id: 'sum', check: true, items: ['Percent to decimal: **divide by 100**', 'Percent of an amount: **multiply**', '$10\\%$: divide by $10$. $5\\%$: half of that', 'Answer what is asked: tip or **total**?'] }],
      lines: [
        { say: 'Here is what to remember. To change a percent to a decimal, divide by 100.', show: 'sum.0' },
        { say: 'To find a percent of an amount, multiply.', show: 'sum.1' },
        { say: 'For a quick check, 10 percent is the amount divided by 10, and 5 percent is half of that.', show: 'sum.2' },
        { say: 'And answer what is asked: the tip, or the total. For more on percent in everyday life, watch this lesson\'s explainer video on Gradileo.', show: 'sum.3' },
      ],
    },
  ],
};

export default video;
