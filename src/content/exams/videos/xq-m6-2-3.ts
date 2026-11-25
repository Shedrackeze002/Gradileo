import type { Explainer } from '@/video/script.ts';
import { figure } from '@/video/solids.ts';
import { heightFor } from '@/content/math5/videos/lib/m5-4-figures.ts';
import { decimalDivision } from '@/content/math6/videos/lib/m6-2-figures.ts';

// Exam question for Math 6 lesson 2.3 (dividing decimal and natural numbers). The question is a Try
// It from OpenStax Prealgebra 2e, word for word (section 5.2, Decimal Operations, CC BY-NC-SA 4.0).
// $92.82 ÷ 6 by long division: 9 − 6 = 3, 32 − 30 = 2, 28 − 24 = 4, 42 − 42 = 0, so $15.47, as in
// the book's answer. Check: 6 × 15.47 = 92.82.

const QUESTION =
  'Six friends went out for dinner. The total cost of their dinner was $92.82. If they divide the bill equally, how much should each friend pay?';

/** 92.82 ÷ 6 = 15.47 as long division. */
const work = (() => {
  const part = decimalDivision({
    divisor: '6',
    dividend: '92.82',
    quotient: '1547',
    steps: [
      { prod: '6', at: 0, diff: '3', down: true },
      { prod: '30', at: 1, diff: '2', down: true },
      { prod: '24', at: 2, diff: '4', down: true },
      { prod: '42', at: 3, diff: '0' },
    ],
  });
  return figure('ld', [part], heightFor(part, 44));
})();

const video: Explainer = {
  id: 'xq-m6-2-3',
  lessonId: '',
  exam: {
    lesson: 'm6-2-3',
    source: 'OpenStax, Prealgebra 2e, Try It in section 5.2, Decimal Operations',
    licence: 'CC BY-NC-SA 4.0, access for free at openstax.org',
    url: 'https://openstax.org/books/prealgebra-2e/pages/5-2-decimal-operations',
    question: QUESTION,
  },
  title: 'Exam Question: Six Friends Share the Dinner Bill (Dividing Decimal and Natural Numbers)',
  thumbnailTitle: 'Split the Bill Six Ways',
  thumbnail: 'ld',
  summary:
    'A real test question, solved one small step at a time: six friends share a dinner bill of $92.82 equally. How much should each friend pay? Sharing equally means dividing: $92.82 ÷ 6. With long division, and the decimal point straight above the point in 92.82, each friend pays $15.47. Then we check by multiplying and look at the traps.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Exam Question', title: 'Split the Bill Six Ways', subtitle: 'Dividing decimal and natural numbers, step by step' }],
      lines: [
        { say: 'In this video, we solve a real test question about dividing a decimal by a whole number. We will take it one small step at a time, so that every step makes sense.', show: 'title' },
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
          prompt: 'Six friends went out for dinner. The total cost of their dinner was \\$92.82. If they divide the bill equally, how much should each friend pay?',
          answer: '\\$15.47',
          working: '92.82 ÷ 6 = 15.47',
        },
      ],
      lines: [
        { say: 'Here is the question, from the book.', show: 'q' },
        { say: 'Six friends went out for dinner. The total cost of their dinner was 92 dollars and 82 cents. If they divide the bill equally, how much should each friend pay?', caption: 'Six friends went out for dinner. The total cost of their dinner was $92.82. If they divide the bill equally, how much should each friend pay?' },
        { say: 'If you would like to try it first, pause the video now.', wait: 5 },
      ],
    },
    {
      chapter: 'What is it asking?',
      layout: 'center',
      main: [{ kind: 'callout', id: 'c', tone: 'definition', title: 'Divide equally', md: 'The **bill** is the total cost. **Divide equally** means each of the $6$ friends pays the **same** share, so we split \\$92.82 into $6$ equal parts: $92.82 \\div 6$.' }],
      lines: [
        { say: 'The bill is the total cost of the dinner.', show: 'c' },
        { say: 'Dividing it equally means each of the 6 friends pays the same share. So we divide 92.82 by 6.' },
      ],
    },
    {
      chapter: 'What you need to know',
      layout: 'center',
      main: [{ kind: 'callout', id: 'c', tone: 'key', title: 'Dividing a decimal', md: 'Use **long division** as with whole numbers: divide, multiply, subtract, bring down. Put the **decimal point** in the answer **straight above** the point in the number you divide.' }],
      lines: [
        { say: 'Here is what we need. To divide a decimal by a whole number, use long division, just as with whole numbers: divide, multiply, subtract, bring down.', show: 'c' },
        { say: 'The only new thing is the decimal point. Put it in the answer straight above the point in the number you are dividing.' },
      ],
    },
    {
      chapter: 'The plan',
      layout: 'center',
      main: [{ kind: 'bullets', id: 'plan', items: ['Set up $92.82 \\div 6$', 'Put the **point** in the answer', 'Divide **digit by digit**'] }],
      lines: [
        { say: 'Here is the plan. Set up 92.82 divided by 6.', show: 'plan.0' },
        { say: 'Put the decimal point in the answer first.', show: 'plan.1' },
        { say: 'Then divide one digit at a time.', show: 'plan.2' },
      ],
    },
    {
      chapter: 'Steps 1 to 3: Long division',
      layout: 'split',
      leftWidth: 520,
      left: [work],
      right: [{ kind: 'math', id: 'm', size: 'md', align: 'left', lines: ['6 \\times 1 = 6', '6 \\times 5 = 30', '6 \\times 4 = 24', '6 \\times 7 = 42', '\\text{each pays } \\good{\\$15.47}'] }],
      lines: [
        { say: 'Step one. Write 92.82 inside the bracket and 6 outside. Put the decimal point in the answer, straight above the point in 92.82.', show: ['ld.bracket', 'ld.dividend', 'ld.dv', 'ld.qp'], focus: ['ld.dp', 'ld.qp'] },
        { say: 'Step two. 6 goes into 9 once. Write 1, subtract 6, and 3 is left. Bring down the 2 to make 32.', show: ['ld.q0', 'ld.s0-prod', 'ld.s0-rule', 'ld.s0-diff', 'ld.s0-arrow', 'ld.s0-down', 'm.0'], focus: 'ld.s0-down' },
        { say: '6 goes into 32 five times. 5 times 6 is 30, and 2 is left. Bring down the 8 to make 28.', show: ['ld.q1', 'ld.s1-prod', 'ld.s1-rule', 'ld.s1-diff', 'ld.s1-arrow', 'ld.s1-down', 'm.1'], hide: 'ld.s0-arrow', focus: 'ld.s1-down' },
        { say: '6 goes into 28 four times. 4 times 6 is 24, and 4 is left. Bring down the last 2 to make 42.', show: ['ld.q2', 'ld.s2-prod', 'ld.s2-rule', 'ld.s2-diff', 'ld.s2-arrow', 'ld.s2-down', 'm.2'], hide: 'ld.s1-arrow', focus: 'ld.s2-down' },
        { say: '6 goes into 42 seven times exactly, with nothing left over.', show: ['ld.q3', 'ld.s3-prod', 'ld.s3-rule', 'ld.s3-diff', 'm.3'], hide: 'ld.s2-arrow', focus: 'ld.q3' },
        { say: 'Step three. Read the answer: 15.47. Each friend should pay 15 dollars and 47 cents.', caption: 'Step three. Read the answer: 15.47. Each friend should pay $15.47.', show: 'm.4', focus: ['ld.quotient', 'm.4'] },
      ],
    },
    {
      chapter: 'Check the answer',
      layout: 'center',
      main: [{ kind: 'math', id: 'm', size: 'lg', lines: ['6 \\times \\$15.47 = \\$92.82 \\ \\checkmark'] }],
      lines: [
        { say: 'Let us check by multiplying. 6 shares of 15 dollars 47 is 92 dollars and 82 cents, the whole bill. It checks out.', caption: 'Let us check by multiplying. 6 × $15.47 = $92.82, the whole bill. It checks out.', show: 'm', focus: 'm' },
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
            ['\\$1.547', 'the point is not **above** the point in $92.82$'],
            ['\\$154.70', 'a share must be **less** than the whole bill'],
            ['\\$86.82', '**subtracted** $6$: sharing equally means **dividing**'],
          ],
        },
      ],
      lines: [
        { say: 'Here are the traps.', show: 'traps' },
        { say: '1 dollar 547 puts the decimal point in the wrong place. It goes straight above the point in 92.82.', caption: '$1.547 puts the decimal point in the wrong place. It goes straight above the point in 92.82.' },
        { say: '154 dollars and 70 cents is more than the whole bill. One share must be less than the total.', caption: '$154.70 is more than the whole bill. One share must be less than the total.' },
        { say: 'And 86 dollars and 82 cents subtracts 6. Sharing equally means dividing.', caption: '$86.82 subtracts 6. Sharing equally means dividing.' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q2',
          prompt: 'Four friends share a taxi fare of \\$30.60 equally. How much does each friend pay?',
          choices: ['\\$26.60', '\\$76.50', '\\$7.15', '\\$7.65'],
          answer: 3,
          working: '30.60 ÷ 4 = 7.65; check: 4 × 7.65 = 30.60.',
        },
      ],
      lines: [
        { say: 'Your turn. Four friends share a taxi fare of 30 dollars and 60 cents equally. How much does each friend pay? Pause the video and try it.', caption: 'Your turn. Four friends share a taxi fare of $30.60 equally. How much does each friend pay?', show: 'q2', wait: 8 },
        { say: '30.60 divided by 4 is 7.65, so each pays 7 dollars and 65 cents. Check: 4 times 7.65 is 30.60. Choice "D".', caption: '30.60 ÷ 4 = 7.65, so each pays $7.65. Check: 4 × 7.65 = 30.60. Choice "D".', show: 'q2.answer' },
      ],
    },
    {
      chapter: 'Summary',
      layout: 'center',
      main: [{ kind: 'bullets', id: 'sum', check: true, items: ['Sharing equally: **divide**', 'Put the **point** straight above the point', 'Divide, multiply, subtract, **bring down**', '**Multiply** back to check'] }],
      lines: [
        { say: 'Here is what to remember. Sharing equally means divide.', show: 'sum.0' },
        { say: 'Put the decimal point in the answer straight above the point in the number you divide.', show: 'sum.1' },
        { say: 'Then divide, multiply, subtract, and bring down, one digit at a time.', show: 'sum.2' },
        { say: 'And multiply back to check. For more on dividing decimal and natural numbers, watch this lesson\'s explainer video on Gradileo.', show: 'sum.3' },
      ],
    },
  ],
};

export default video;
