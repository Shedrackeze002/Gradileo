import type { Explainer } from '@/video/script.ts';

// Exam question for Math 20-4 lesson 3.3 (deductions and net pay). The question is an Exercise from
// OpenStax Prealgebra 2e, word for word (section 6.2, Solve General Applications of Percent, CC
// BY-NC-SA 4.0). 12% of $2,165 = 0.12 × 2,165 = $259.80, as in the book's answer, which leaves
// 2,165 − 259.80 = $1,905.20 of the paycheque. Check: 10% is 216.50 and 2% is 43.30, which add to
// 259.80.

const QUESTION = 'Trong has 12% of each paycheck automatically deposited to his savings account. His last paycheck was $2,165. How much money was deposited to Trong’s savings account?';

const video: Explainer = {
  id: 'xq-m204-3-3',
  lessonId: '',
  exam: {
    lesson: 'm204-3-3',
    source: 'OpenStax, Prealgebra 2e, Exercise in section 6.2, Solve General Applications of Percent',
    licence: 'CC BY-NC-SA 4.0, access for free at openstax.org',
    url: 'https://openstax.org/books/prealgebra-2e/pages/6-2-solve-general-applications-of-percent',
    question: QUESTION,
  },
  title: 'Exam Question: Saving Part of Every Paycheque (Deductions and Net Pay)',
  thumbnailTitle: 'How Much Goes to Savings?',
  summary:
    'A real test question, solved one small step at a time: Trong has 12% of each paycheque deposited straight into his savings account. His last paycheque was $2,165. How much went to savings? 0.12 × $2,165 = $259.80, which leaves $1,905.20 for everything else. Then we check with 10% and 2%, and look at the traps.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Exam Question', title: 'How Much Goes to Savings?', subtitle: 'Deductions, step by step' }],
      lines: [
        { say: 'In this video, we solve a real test question about money taken out of a paycheque. We will take it one small step at a time, so that every step makes sense.', show: 'title' },
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
          prompt: 'Trong has $12\\%$ of each paycheck automatically deposited to his savings account. His last paycheck was \\$2,165. How much money was deposited to Trong’s savings account?',
          answer: '\\$259.80',
          working: '0.12 × 2,165 = 259.80',
        },
      ],
      lines: [
        { say: 'Here is the question, from the book.', show: 'q' },
        { say: 'Trong has 12 percent of each paycheque automatically deposited to his savings account. His last paycheque was 2 thousand 165 dollars. How much money was deposited to his savings account?', caption: 'Trong has 12% of each paycheque automatically deposited to his savings account. His last paycheque was $2,165. How much money was deposited to his savings account?' },
        { say: 'If you would like to try it first, pause the video now.', wait: 5 },
      ],
    },
    {
      chapter: 'What is it asking?',
      layout: 'center',
      main: [{ kind: 'callout', id: 'c', tone: 'definition', title: 'An automatic deduction', md: 'Some money is taken from a paycheque **before** it reaches you, such as savings, a pension plan or union dues. Here, **$12\\%$** of every paycheque goes to savings.' }],
      lines: [
        { say: 'Some money is taken out of a paycheque before it reaches you, such as savings, a pension plan, or union dues. These are deductions.', show: 'c' },
        { say: 'Here, 12 percent of every paycheque goes straight to Trong’s savings. We want 12 percent of 2 thousand 165 dollars.', caption: 'Here, 12% of every paycheque goes straight to Trong’s savings. We want 12% of $2,165.' },
      ],
    },
    {
      chapter: 'What you need to know',
      layout: 'center',
      main: [{ kind: 'math', id: 'm', size: 'lg', lines: ['\\text{part} = \\text{percent (as a decimal)} \\times \\text{whole}', '12\\% = 0.12'] }],
      lines: [
        { say: 'Here is what we need. A percent of an amount is the percent, as a decimal, times the whole amount.', show: 'm.0' },
        { say: '12 percent as a decimal is 0.12.', show: 'm.1' },
      ],
    },
    {
      chapter: 'The plan',
      layout: 'center',
      main: [{ kind: 'bullets', id: 'plan', items: ['Write $12\\%$ as a **decimal**', '**Multiply** by the paycheque', 'Round to the **cent**'] }],
      lines: [
        { say: 'Here is the plan. Write 12 percent as a decimal.', show: 'plan.0' },
        { say: 'Multiply by the paycheque.', show: 'plan.1' },
        { say: 'Then round to the cent.', show: 'plan.2' },
      ],
    },
    {
      chapter: 'Steps 1 to 3: The deposit',
      layout: 'center',
      main: [{ kind: 'math', id: 'm', size: 'lg', lines: ['0.12 \\times \\$2{,}165 = \\good{\\$259.80}', '\\$2{,}165 - \\$259.80 = \\$1{,}905.20 \\text{ left}'] }],
      lines: [
        { say: '0.12 times 2 thousand 165 is 259.8. In money, that is 259 dollars and 80 cents. That went into Trong’s savings.', caption: '0.12 × $2,165 = 259.8. In money, that is $259.80. That went into Trong’s savings.', show: 'm.0', focus: 'm.0' },
        { say: 'It also tells us how much reaches his chequing account: 2 thousand 165 minus 259.80 leaves 1 thousand 905 dollars and 20 cents.', caption: 'It also tells us how much reaches his chequing account: $2,165 − $259.80 leaves $1,905.20.', show: 'm.1' },
      ],
    },
    {
      chapter: 'Check the answer',
      layout: 'center',
      main: [{ kind: 'math', id: 'm', size: 'lg', lines: ['10\\% = \\$216.50 \\qquad 2\\% = \\$43.30', '\\$216.50 + \\$43.30 = \\$259.80 \\ \\checkmark'] }],
      lines: [
        { say: 'Let us check by splitting 12 percent into 10 and 2 percent. 10 percent of 2 thousand 165 is 216.50, and 1 percent is 21.65, so 2 percent is 43.30.', caption: 'Let us check by splitting 12% into 10% and 2%. 10% of $2,165 is $216.50, and 1% is $21.65, so 2% is $43.30.', show: 'm.0' },
        { say: 'Together, 259 dollars 80. It checks out.', caption: 'Together, $259.80. It checks out.', show: 'm.1', focus: 'm.1' },
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
            ['\\$25.98', 'used $0.012$: $12\\%$ is $0.12$'],
            ['\\$1,905.20', 'that is what is **left**, not what was **saved**'],
            ['\\$25,980', 'used $12$: write the percent as a **decimal**'],
          ],
        },
      ],
      lines: [
        { say: 'Here are the traps.', show: 'traps' },
        { say: '25 dollars 98 uses 0.012. 12 percent is 0.12: move the decimal point two places.', caption: '$25.98 uses 0.012. 12% is 0.12: move the decimal point two places.' },
        { say: '1 thousand 905 dollars 20 is what is left after the deposit. The question asks how much was saved.', caption: '$1,905.20 is what is left after the deposit. The question asks how much was saved.' },
        { say: 'And 25 thousand 980 dollars multiplies by 12, not 0.12. The savings can never be more than the paycheque. Write the percent as a decimal.', caption: 'And $25,980 multiplies by 12, not 0.12. The savings can never be more than the paycheque. Write the percent as a decimal.' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q2',
          prompt: 'Lee has $8\\%$ of a \\$1,850 paycheque deducted for a pension plan. How much of the paycheque is left?',
          choices: ['\\$148', '\\$1,998', '\\$1,850', '\\$1,702'],
          answer: 3,
          working: '0.08 × 1,850 = 148, and 1,850 − 148 = 1,702.',
        },
      ],
      lines: [
        { say: 'Your turn. Lee has 8 percent of a 1 thousand 850 dollar paycheque deducted for a pension plan. How much of the paycheque is left? Pause the video and try it.', caption: 'Your turn. Lee has 8% of a $1,850 paycheque deducted for a pension plan. How much of the paycheque is left? Pause the video and try it.', show: 'q2', wait: 8 },
        { say: '8 percent of 1 thousand 850 is 148 dollars. Take it off: 1 thousand 702 dollars is left. Choice "D".', caption: '8% of $1,850 is $148. Take it off: $1,702 is left. Choice "D".', show: 'q2.answer' },
      ],
    },
    {
      chapter: 'Summary',
      layout: 'center',
      main: [{ kind: 'bullets', id: 'sum', check: true, items: ['Deduction $=$ percent $\\times$ pay', 'Percent as a **decimal**', 'Left $=$ pay $-$ deduction', 'Read the question: **saved** or **left**?'] }],
      lines: [
        { say: 'Here is what to remember. A percent deduction is the percent times the pay.', show: 'sum.0' },
        { say: 'Write the percent as a decimal.', show: 'sum.1' },
        { say: 'What is left is the pay minus the deduction.', show: 'sum.2' },
        { say: 'And read the question carefully: does it ask what was taken, or what is left? For more on deductions and net pay, watch this lesson\'s explainer video on Gradileo.', show: 'sum.3' },
      ],
    },
  ],
};

export default video;
