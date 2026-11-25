import type { Explainer } from '@/video/script.ts';

// Exam question for Math 7 lesson 2.3 (order of operations with decimals). The question is a Try It
// from OpenStax Prealgebra 2e, word for word (section 5.2, Decimal Operations, CC BY-NC-SA 4.0).
// Total = 3 × 0.75 + 6 × 0.62: multiply first (2.25 and 3.72), then add: 5.97.

const QUESTION = 'Suzanne buys 3 cans of beans that cost $0.75 each and 6 cans of corn that cost $0.62 each. How much is the total cost of these groceries?';

const video: Explainer = {
  id: 'xq-m7-2-3',
  lessonId: '',
  exam: {
    lesson: 'm7-2-3',
    source: 'OpenStax, Prealgebra 2e, Try It in section 5.2, Decimal Operations',
    licence: 'CC BY-NC-SA 4.0, access for free at openstax.org',
    url: 'https://openstax.org/books/prealgebra-2e/pages/5-2-decimal-operations',
    question: QUESTION,
  },
  title: 'Exam Question: Suzanne\'s Beans and Corn (Order of Operations with Decimals)',
  thumbnailTitle: 'Beans and Corn',
  summary:
    'A real test question, solved one small step at a time: Suzanne buys 3 cans of beans at $0.75 each and 6 cans of corn at $0.62 each. What is the total cost? Write it as one expression, 3 × 0.75 + 6 × 0.62, and follow the order of operations: multiply first, 3 × 0.75 = 2.25 and 6 × 0.62 = 3.72, then add: 2.25 + 3.72 = 5.97. The groceries cost $5.97. Then we check and look at the traps.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Exam Question', title: 'Beans and Corn', subtitle: 'Order of operations with decimals, step by step' }],
      lines: [
        { say: 'In this video, we solve a real test question about the order of operations with decimals. We will take it one small step at a time, so that every step makes sense.', show: 'title' },
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
          prompt: 'Suzanne buys $3$ cans of beans that cost \\$0.75 each and $6$ cans of corn that cost \\$0.62 each. How much is the total cost of these groceries?',
          answer: '\\$5.97',
          working: '3 × 0.75 + 6 × 0.62 = 2.25 + 3.72 = 5.97',
        },
      ],
      lines: [
        { say: 'Here is the question, from the book.', show: 'q' },
        { say: 'Suzanne buys 3 cans of beans that cost 75 cents each, and 6 cans of corn that cost 62 cents each. How much is the total cost of these groceries?', caption: 'Suzanne buys 3 cans of beans that cost $0.75 each and 6 cans of corn that cost $0.62 each. How much is the total cost of these groceries?' },
        { say: 'If you would like to try it first, pause the video now.', wait: 5 },
      ],
    },
    {
      chapter: 'What is it asking?',
      layout: 'center',
      main: [{ kind: 'callout', id: 'c', tone: 'definition', title: 'One expression for the cost', md: 'The beans cost $3 \\times 0.75$ and the corn costs $6 \\times 0.62$. The **total** adds them, so the whole cost is one expression:\n\n$3 \\times 0.75 + 6 \\times 0.62$' }],
      lines: [
        { say: 'The beans cost 3 times 75 cents, and the corn costs 6 times 62 cents.', show: 'c' },
        { say: 'The total adds them, so the whole cost is one expression: 3 times 0.75, plus 6 times 0.62.' },
      ],
    },
    {
      chapter: 'What you need to know',
      layout: 'center',
      main: [{ kind: 'bullets', id: 'order', items: ['**Brackets** first', '**Exponents**', '**Multiply and divide**, left to right', '**Add and subtract**, left to right'] }],
      lines: [
        { say: 'Here is what we need: the order of operations. Work out brackets first.', show: 'order.0' },
        { say: 'Then exponents.', show: 'order.1' },
        { say: 'Then multiply and divide, from left to right.', show: 'order.2' },
        { say: 'And last, add and subtract, from left to right. Decimals follow the same order as whole numbers.', show: 'order.3' },
      ],
    },
    {
      chapter: 'The plan',
      layout: 'center',
      main: [{ kind: 'bullets', id: 'plan', items: ['Write **one expression** for the total', 'Do both **multiplications** first', 'Then **add**'] }],
      lines: [
        { say: 'Here is the plan. Write one expression for the total.', show: 'plan.0' },
        { say: 'Do both multiplications first.', show: 'plan.1' },
        { say: 'Then add.', show: 'plan.2' },
      ],
    },
    {
      chapter: 'Steps 1 to 3: Multiply, then add',
      layout: 'center',
      main: [{ kind: 'math', id: 'm', size: 'lg', lines: ['3 \\times 0.75 + 6 \\times 0.62', '= \\adj{2.25} + 6 \\times 0.62', '= 2.25 + \\opp{3.72}', '= \\good{5.97}'] }],
      lines: [
        { say: 'Step one. The total cost is 3 times 0.75, plus 6 times 0.62.', show: 'm.0', focus: 'm.0' },
        { say: 'Step two. Multiply first. 3 times 75 is 225, and 0.75 has two decimal places, so 3 times 0.75 is 2.25. The beans cost 2 dollars and 25 cents.', caption: 'Step two. Multiply first. 3 × 75 = 225, and 0.75 has two decimal places, so 3 × 0.75 = 2.25. The beans cost $2.25.', show: 'm.1', focus: 'm.1' },
        { say: '6 times 62 is 372, so 6 times 0.62 is 3.72. The corn costs 3 dollars and 72 cents.', caption: '6 × 62 = 372, so 6 × 0.62 = 3.72. The corn costs $3.72.', show: 'm.2', focus: 'm.2' },
        { say: 'Step three. Now add. 2.25 plus 3.72 is 5.97. The groceries cost 5 dollars and 97 cents.', caption: 'Step three. Now add. 2.25 + 3.72 = 5.97. The groceries cost $5.97.', show: 'm.3', focus: 'm.3' },
      ],
    },
    {
      chapter: 'Check the answer',
      layout: 'center',
      main: [{ kind: 'math', id: 'm', size: 'lg', lines: ['3 \\times 0.75 = 2.25, \\quad 6 \\times 0.6 = 3.6', '2.25 + 3.6 = 5.85 \\approx 5.97 \\ \\checkmark'] }],
      lines: [
        { say: 'Let us check with an estimate. The beans are 3 quarters, 2.25 exactly. The corn is about 6 times 60 cents, which is 3.60.', caption: 'Let us check with an estimate. The beans are 3 quarters, $2.25 exactly. The corn is about 6 × $0.60 = $3.60.', show: 'm.0' },
        { say: '2.25 plus 3.60 is 5.85, close to 5.97. It checks out.', caption: '$2.25 + $3.60 = $5.85, close to $5.97. It checks out.', show: 'm.1', focus: 'm.1' },
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
            ['\\$1.37', 'added one can of each: count **every** can'],
            ['\\$5.12', 'worked **left to right**: multiply **before** adding'],
            ['\\$59.70', 'gave the products **one** decimal place: $0.75$ and $0.62$ have **two**'],
          ],
        },
      ],
      lines: [
        { say: 'Here are the traps.', show: 'traps' },
        { say: '1 dollar and 37 cents adds one can of beans and one can of corn. Suzanne bought 9 cans.', caption: '$1.37 adds one can of beans and one can of corn. Suzanne bought 9 cans.' },
        { say: '5 dollars and 12 cents works from left to right: 3 times 0.75 is 2.25, plus 6 is 8.25, times 0.62. Multiply before you add.', caption: '$5.12 works from left to right: 3 × 0.75 = 2.25, + 6 = 8.25, × 0.62. Multiply before you add.' },
        { say: 'And 59 dollars and 70 cents puts the points in the wrong places. 0.75 and 0.62 each have two decimal places, so each product needs two.', caption: '$59.70 puts the points in the wrong places. 0.75 and 0.62 each have two decimal places, so each product needs two.' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q2',
          prompt: 'Evaluate $10 - 4 \\times 1.5$.',
          choices: ['$9$', '$6$', '$7.5$', '$4$'],
          answer: 3,
          working: 'Multiply first: 4 × 1.5 = 6. Then 10 − 6 = 4.',
        },
      ],
      lines: [
        { say: 'Your turn. Evaluate 10 minus 4 times 1.5. Pause the video and try it.', show: 'q2', wait: 8 },
        { say: 'Multiply first: 4 times 1.5 is 6. Then 10 minus 6 is 4. Choice "D".', show: 'q2.answer' },
      ],
    },
    {
      chapter: 'Summary',
      layout: 'center',
      main: [{ kind: 'bullets', id: 'sum', check: true, items: ['Write **one expression**', '**Multiply and divide** before adding', 'Count the **decimal places**', '**Estimate** to check'] }],
      lines: [
        { say: 'Here is what to remember. Write the problem as one expression.', show: 'sum.0' },
        { say: 'Multiply and divide before you add and subtract.', show: 'sum.1' },
        { say: 'Count the decimal places when you multiply.', show: 'sum.2' },
        { say: 'And estimate to check. For more on the order of operations with decimals, watch this lesson\'s explainer video on Gradileo.', show: 'sum.3' },
      ],
    },
  ],
};

export default video;
