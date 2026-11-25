import type { Explainer } from '@/video/script.ts';

// Exam question for Math 5 lesson 2.2 (estimating and solving problems). The question is an
// Exercise from OpenStax Prealgebra 2e, word for word (section 1.2, Add Whole Numbers, CC BY-NC-SA
// 4.0). 1,100 + 250 + 525 = 1,875, as in the book's answer. Estimate first, to the nearest hundred:
// 1,100 + 300 + 500 = 1,900, which is close to 1,875.

const QUESTION =
  'Home remodeling Sophia remodeled her kitchen and bought a new range, microwave, and dishwasher. The range cost $1,100, the microwave cost $250, and the dishwasher cost $525. What was the total cost of these three appliances?';

const video: Explainer = {
  id: 'xq-m5-2-2',
  lessonId: '',
  exam: {
    lesson: 'm5-2-2',
    source: 'OpenStax, Prealgebra 2e, Exercise in section 1.2, Add Whole Numbers',
    licence: 'CC BY-NC-SA 4.0, access for free at openstax.org',
    url: 'https://openstax.org/books/prealgebra-2e/pages/1-2-add-whole-numbers',
    question: QUESTION,
  },
  title: 'Exam Question: The Cost of Three Kitchen Appliances (Estimating)',
  thumbnailTitle: 'What Did the Kitchen Cost?',
  summary:
    'A real test question, solved one small step at a time: Sophia bought a range for $1,100, a microwave for $250 and a dishwasher for $525. What was the total cost? First we estimate, rounding each price to the nearest hundred: about $1,900. Then we add exactly and get $1,875, which is close to the estimate. Then we look at the traps.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Exam Question', title: 'What Did the Kitchen Cost?', subtitle: 'Estimating and adding, step by step' }],
      lines: [
        { say: 'In this video, we solve a real test question about money, with an estimate to check our answer. We will take it one small step at a time, so that every step makes sense.', show: 'title' },
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
          prompt: '**Home remodeling** Sophia remodeled her kitchen and bought a new range, microwave, and dishwasher. The range cost \\$1,100, the microwave cost \\$250, and the dishwasher cost \\$525. What was the total cost of these three appliances?',
          answer: '\\$1,875',
          working: '1,100 + 250 + 525 = 1,875',
        },
      ],
      lines: [
        { say: 'Here is the question, from the book.', show: 'q' },
        { say: 'Sophia remodeled her kitchen, and bought a new range, microwave and dishwasher. The range cost 1 thousand 100 dollars, the microwave cost 250 dollars, and the dishwasher cost 525 dollars. What was the total cost of these three appliances?', caption: 'Sophia remodeled her kitchen and bought a new range, microwave, and dishwasher. The range cost $1,100, the microwave cost $250, and the dishwasher cost $525. What was the total cost of these three appliances?' },
        { say: 'If you would like to try it first, pause the video now.', wait: 5 },
      ],
    },
    {
      chapter: 'What is it asking?',
      layout: 'center',
      main: [
        {
          kind: 'table',
          id: 't',
          head: ['Appliance', 'Cost'],
          rows: [['Range (a stove and oven)', '\\$1,100'], ['Microwave', '\\$250'], ['Dishwasher', '\\$525'], ['**Total**', '**?**']],
        },
      ],
      lines: [
        { say: 'Sophia bought three appliances. A range is a stove and oven together.', show: 't' },
        { say: 'The total cost means all three prices added together.', focus: 't.3' },
      ],
    },
    {
      chapter: 'What you need to know',
      layout: 'center',
      main: [{ kind: 'callout', id: 'c', tone: 'key', title: 'Estimate first', md: 'Round each number to an easy place, such as the nearest **hundred**, and add those. The **estimate** tells you roughly what the answer should be, so you can spot a **mistake**.' }],
      lines: [
        { say: 'Here is what we need. Before adding exactly, make an estimate. Round each number to an easy place, such as the nearest hundred, and add the rounded numbers.', show: 'c' },
        { say: 'The estimate tells us roughly what the answer should be. If the exact answer is far from it, we know something went wrong.' },
      ],
    },
    {
      chapter: 'The plan',
      layout: 'center',
      main: [{ kind: 'bullets', id: 'plan', items: ['**Estimate**: round to the nearest hundred and add', 'Add the **exact** prices', '**Compare** the answer with the estimate'] }],
      lines: [
        { say: 'Here is the plan. Estimate, by rounding to the nearest hundred and adding.', show: 'plan.0' },
        { say: 'Add the exact prices.', show: 'plan.1' },
        { say: 'Then compare the answer with the estimate.', show: 'plan.2' },
      ],
    },
    {
      chapter: 'Step 1: Estimate',
      layout: 'center',
      main: [{ kind: 'math', id: 'm', size: 'lg', lines: ['1{,}100 \\to 1{,}100 \\qquad 250 \\to 300 \\qquad 525 \\to 500', '1{,}100 + 300 + 500 = 1{,}900'] }],
      lines: [
        { say: 'Step one. Round each price to the nearest hundred. 1 thousand 100 stays the same. 250 is halfway, and halfway rounds up, to 300. 525 rounds down, to 500.', caption: 'Step one. Round each price to the nearest hundred. $1,100 stays the same. $250 is halfway, and halfway rounds up, to $300. $525 rounds down, to $500.', show: 'm.0' },
        { say: 'Add the rounded prices: 1 thousand 100, plus 300, plus 500, is 1 thousand 900. So the total should be about 1 thousand 900 dollars.', caption: 'Add the rounded prices: 1,100 + 300 + 500 = 1,900. So the total should be about $1,900.', show: 'm.1', focus: 'm.1' },
      ],
    },
    {
      chapter: 'Step 2: Add exactly',
      layout: 'split',
      leftWidth: 560,
      left: [{ kind: 'math', id: 'add', size: 'lg', lines: ['\\begin{array}{r} 1{,}100 \\\\ 250 \\\\ +\\ 525 \\\\ \\hline \\good{1{,}875} \\end{array}'] }],
      right: [{ kind: 'math', id: 'cols', size: 'md', lines: ['\\text{ones: } 0 + 0 + 5 = 5', '\\text{tens: } 0 + 5 + 2 = 7', '\\text{hundreds: } 1 + 2 + 5 = 8', '\\text{thousands: } 1'] }],
      lines: [
        { say: 'Step two. Line up the prices, ones under ones, and add each column.', show: 'add' },
        { say: 'Ones: 0 plus 0 plus 5 is 5. Tens: 0 plus 5 plus 2 is 7.', show: ['cols.0', 'cols.1'] },
        { say: 'Hundreds: 1 plus 2 plus 5 is 8. Thousands: just the 1. The total is 1 thousand 875 dollars.', caption: 'Hundreds: 1 + 2 + 5 = 8. Thousands: just the 1. The total is $1,875.', show: ['cols.2', 'cols.3'], focus: 'add' },
      ],
    },
    {
      chapter: 'Step 3: Compare',
      layout: 'center',
      main: [{ kind: 'math', id: 'm', size: 'lg', lines: ['\\text{exact } \\$1{,}875 \\quad \\text{estimate } \\$1{,}900', '\\text{close} \\ \\checkmark'] }],
      lines: [
        { say: 'Step three. The exact total, 1 thousand 875 dollars, is close to our estimate of 1 thousand 900 dollars.', caption: 'Step three. The exact total, $1,875, is close to our estimate of $1,900.', show: 'm.0' },
        { say: 'So the answer makes sense. Sophia spent 1 thousand 875 dollars on the three appliances.', caption: 'So the answer makes sense. Sophia spent $1,875 on the three appliances.', show: 'm.1', focus: 'm.1' },
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
            ['\\$1,900', 'gave the **estimate**: the question wants the **exact** total'],
            ['\\$1,350', 'added only **two** appliances'],
            ['\\$8,850', 'lined up on the **left**: ones must sit under ones'],
          ],
        },
      ],
      lines: [
        { say: 'Here are the traps.', show: 'traps' },
        { say: '1 thousand 900 is the estimate. It is for checking. The question asks for the exact total.', caption: '$1,900 is the estimate. It is for checking. The question asks for the exact total.' },
        { say: '1 thousand 350 adds only the range and the microwave. There are three appliances.', caption: '$1,350 adds only the range and the microwave. There are three appliances.' },
        { say: 'And 8 thousand 850 lines the numbers up on the left, so 250 is treated as 2 thousand 500, and 525 as 5 thousand 250. Our estimate shows at once that this is far too big.', caption: 'And $8,850 lines the numbers up on the left, so 250 is treated as 2,500, and 525 as 5,250. Our estimate shows at once that this is far too big.' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q2',
          prompt: 'Leo buys a bike for \\$389 and a helmet for \\$62. Which is the best estimate of the total?',
          choices: ['\\$450', '\\$350', '\\$400', '\\$1,000'],
          answer: 0,
          working: '389 is about 390 and 62 is about 60: 390 + 60 = 450.',
        },
      ],
      lines: [
        { say: 'Your turn. Leo buys a bike for 389 dollars and a helmet for 62 dollars. Which is the best estimate of the total? Pause the video and try it.', caption: 'Your turn. Leo buys a bike for $389 and a helmet for $62. Which is the best estimate of the total? Pause the video and try it.', show: 'q2', wait: 8 },
        { say: '389 is about 390, and 62 is about 60. 390 plus 60 is 450 dollars. The exact total, 451 dollars, is very close. Choice "A".', caption: '389 is about 390, and 62 is about 60. 390 + 60 = 450. The exact total, $451, is very close. Choice "A".', show: 'q2.answer' },
      ],
    },
    {
      chapter: 'Summary',
      layout: 'center',
      main: [{ kind: 'bullets', id: 'sum', check: true, items: ['**Estimate** first by rounding', 'Add the **exact** amounts', '**Compare**: they should be close', 'Give the **exact** answer'] }],
      lines: [
        { say: 'Here is what to remember. Estimate first, by rounding.', show: 'sum.0' },
        { say: 'Add the exact amounts.', show: 'sum.1' },
        { say: 'Compare: the answer should be close to the estimate.', show: 'sum.2' },
        { say: 'And give the exact answer, unless the question asks for an estimate. For more on estimating and solving problems, watch this lesson\'s explainer video on Gradileo.', show: 'sum.3' },
      ],
    },
  ],
};

export default video;
