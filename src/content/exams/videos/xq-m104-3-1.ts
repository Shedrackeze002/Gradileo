import type { Explainer } from '@/video/script.ts';

// Exam question for Math 10-4 lesson 3.1 (decimals and money). The question is a Try It from
// OpenStax Prealgebra 2e, word for word (section 5.2, Decimal Operations, CC BY-NC-SA 4.0).
// $35.00 − $18.48 = $16.52, as in the book's answer. Check: $16.52 + $18.48 = $35.00.

const QUESTION =
  'Nicole earned $35 for babysitting her cousins, then went to the bookstore and spent $18.48 on books and coffee. How much of her babysitting money was left?';

const video: Explainer = {
  id: 'xq-m104-3-1',
  lessonId: '',
  exam: {
    lesson: 'm104-3-1',
    source: 'OpenStax, Prealgebra 2e, Try It in section 5.2, Decimal Operations',
    licence: 'CC BY-NC-SA 4.0, access for free at openstax.org',
    url: 'https://openstax.org/books/prealgebra-2e/pages/5-2-decimal-operations',
    question: QUESTION,
  },
  title: 'Exam Question: How Much Money Is Left? (Decimals and Money)',
  thumbnailTitle: 'How Much Money Is Left?',
  summary:
    'A real test question, solved one small step at a time: Nicole earned $35 babysitting and spent $18.48 at the bookstore. How much of her babysitting money was left? We write $35 as $35.00, line up the decimal points, and subtract, borrowing where we need to: $16.52. Then we check by adding and look at the traps.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Exam Question', title: 'How Much Money Is Left?', subtitle: 'Decimals and money, step by step' }],
      lines: [
        { say: 'In this video, we solve a real test question about decimals and money. We will take it one small step at a time, so that every step makes sense.', show: 'title' },
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
          prompt: 'Nicole earned \\$35 for babysitting her cousins, then went to the bookstore and spent \\$18.48 on books and coffee. How much of her babysitting money was left?',
          answer: '\\$16.52',
          working: '\\$35.00 − \\$18.48 = \\$16.52',
        },
      ],
      lines: [
        { say: 'Here is the question, from the book.', show: 'q' },
        { say: 'Nicole earned 35 dollars for babysitting her cousins, then went to the bookstore and spent 18 dollars and 48 cents on books and coffee. How much of her babysitting money was left?' },
        { say: 'If you would like to try it first, pause the video now.', wait: 5 },
      ],
    },
    {
      chapter: 'What is it asking?',
      layout: 'center',
      main: [
        { kind: 'math', id: 'm', size: 'lg', lines: ['\\text{left} = \\$35 - \\$18.48'] },
        { kind: 'text', id: 't', size: 'md', md: 'She **spent** part of her money, so we **subtract**.' },
      ],
      lines: [
        { say: 'Nicole started with 35 dollars and spent 18 dollars and 48 cents. The money left is 35 dollars minus 18 dollars 48.', show: 'm' },
        { say: 'Spending takes money away, so this is a subtraction.', show: 't' },
      ],
    },
    {
      chapter: 'What you need to know',
      layout: 'center',
      main: [
        { kind: 'math', id: 'f', size: 'lg', lines: ['\\$35 = \\$35.00'] },
        { kind: 'callout', id: 'c', tone: 'key', title: 'Line up the decimal points', md: 'Write both amounts with **two decimal places** (dollars and cents), line up the **decimal points**, and subtract like whole numbers.' },
      ],
      lines: [
        { say: 'Here is what we need. 35 dollars is the same as 35 dollars and zero cents, written 35.00.', show: 'f' },
        { say: 'Write both amounts with two decimal places, line up the decimal points, and subtract just like whole numbers.', show: 'c' },
      ],
    },
    {
      chapter: 'The plan',
      layout: 'center',
      main: [{ kind: 'bullets', id: 'plan', items: ['Write \\$35 as **\\$35.00**', '**Line up** the decimal points', '**Subtract**, borrowing where needed'] }],
      lines: [
        { say: 'Here is the plan. Write 35 dollars as 35.00.', show: 'plan.0' },
        { say: 'Line up the decimal points.', show: 'plan.1' },
        { say: 'Then subtract, borrowing where we need to.', show: 'plan.2' },
      ],
    },
    {
      chapter: 'Step 1: Line up',
      layout: 'center',
      main: [{ kind: 'math', id: 'm', size: 'lg', lines: ['\\begin{array}{r} 35.00 \\\\ -\\ 18.48 \\\\ \\hline \\end{array}'] }],
      lines: [
        { say: 'Step one. Write 35.00 on top and 18.48 below it, with the decimal points in a line. Cents are under cents, and dollars under dollars.', show: 'm.0', focus: 'm.0' },
      ],
    },
    {
      chapter: 'Step 2: Subtract',
      layout: 'center',
      main: [{ kind: 'math', id: 'm', size: 'lg', lines: ['\\begin{array}{r} 35.00 \\\\ -\\ 18.48 \\\\ \\hline \\good{16.52} \\end{array}'] }],
      lines: [
        { say: 'Step two. We cannot take 8 from 0, so borrow. The 5 dollars becomes 4, and the zero cents become 100 cents. 100 cents minus 48 cents is 52 cents.', show: 'm.0' },
        { say: 'Then the dollars: 34 minus 18 is 16. Nicole has 16 dollars and 52 cents left.', focus: 'm.0' },
      ],
    },
    {
      chapter: 'Check the answer',
      layout: 'center',
      main: [{ kind: 'math', id: 'm', size: 'lg', lines: ['\\$16.52 + \\$18.48 = \\$35.00 \\ \\checkmark'] }],
      lines: [
        { say: 'Let us check. What she has left, plus what she spent, should make what she started with. 16.52 plus 18.48 is 35.00. It checks out.', show: 'm.0', focus: 'm.0' },
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
            ['\\$17.52', 'forgot to **borrow** from the dollars'],
            ['\\$53.48', '**added**: she spent money, so subtract'],
            ['\\$18.13', 'lined up the **last digits**, not the decimal points'],
          ],
        },
      ],
      lines: [
        { say: 'Here are the traps.', show: 'traps' },
        { say: 'When the cents borrow, one dollar goes with them. 35 becomes 34, so the dollars give 16, not 17.' },
        { say: 'Adding gives more than she started with. She spent money, so subtract.' },
        { say: 'And lining up 35 under the 48 cents mixes dollars with cents. Line up the decimal points.' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q2',
          prompt: 'Jo buys groceries that cost \\$27.65 and pays with a \\$50 bill. How much change should Jo get?',
          choices: ['\\$23.45', '\\$77.65', '\\$22.35', '\\$32.35'],
          answer: 2,
          working: '\\$50.00 − \\$27.65 = \\$22.35',
        },
      ],
      lines: [
        { say: 'Your turn. Jo buys groceries that cost 27 dollars and 65 cents and pays with a 50 dollar bill. How much change should Jo get? Pause the video and try it.', show: 'q2', wait: 8 },
        { say: 'Write 50 as 50.00 and subtract 27.65. The change is 22 dollars and 35 cents. Choice "C".', show: 'q2.answer' },
      ],
    },
    {
      chapter: 'Summary',
      layout: 'center',
      main: [{ kind: 'bullets', id: 'sum', check: true, items: ['Money spent: **subtract**', 'Write whole dollars with **.00**', 'Line up the **decimal points**', 'Check: left $+$ spent $=$ start'] }],
      lines: [
        { say: 'Here is what to remember. Money spent is taken away, so subtract.', show: 'sum.0' },
        { say: 'Write whole dollars with point zero zero.', show: 'sum.1' },
        { say: 'Line up the decimal points before you subtract.', show: 'sum.2' },
        { say: 'And check: what is left plus what was spent gives what you started with. For more on decimals and money, watch this lesson\'s explainer video on Gradileo.', show: 'sum.3' },
      ],
    },
  ],
};

export default video;
