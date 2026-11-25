import type { Explainer } from '@/video/script.ts';

// Exam question for Math 5 lesson 4.1 (multiplying with the standard algorithm). The question is a
// Try It from OpenStax Prealgebra 2e, word for word (section 1.4, Multiply Whole Numbers, CC BY-NC-SA
// 4.0). 24 rows of 45: 45 × 24 = 45 × 4 + 45 × 20 = 180 + 900 = 1,080 shingles, as in the book's
// answer (which says "tiles"). Estimate: 50 × 20 = 1,000.

const QUESTION =
  'Yousef is putting shingles on his garage roof. He will need 24 rows of shingles, with 45 shingles in each row. How many shingles does he need for the garage roof?';

const video: Explainer = {
  id: 'xq-m5-4-1',
  lessonId: '',
  exam: {
    lesson: 'm5-4-1',
    source: 'OpenStax, Prealgebra 2e, Try It in section 1.4, Multiply Whole Numbers',
    licence: 'CC BY-NC-SA 4.0, access for free at openstax.org',
    url: 'https://openstax.org/books/prealgebra-2e/pages/1-4-multiply-whole-numbers',
    question: QUESTION,
  },
  title: 'Exam Question: Shingles for a Garage Roof (Multiplying)',
  thumbnailTitle: 'How Many Shingles?',
  summary:
    'A real test question, solved one small step at a time: Yousef needs 24 rows of shingles, with 45 shingles in each row. How many shingles is that? Equal rows mean multiplication: 45 × 24. With the standard algorithm, 45 × 4 = 180 and 45 × 20 = 900, and 180 + 900 = 1,080 shingles. Then we check with an estimate and look at the traps.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Exam Question', title: 'How Many Shingles?', subtitle: 'Multiplying, step by step' }],
      lines: [
        { say: 'In this video, we solve a real test question about multiplying. We will take it one small step at a time, so that every step makes sense.', show: 'title' },
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
          prompt: 'Yousef is putting shingles on his garage roof. He will need $24$ rows of shingles, with $45$ shingles in each row. How many shingles does he need for the garage roof?',
          answer: '$1{,}080$ shingles',
          working: '45 × 24 = 180 + 900 = 1,080',
        },
      ],
      lines: [
        { say: 'Here is the question, from the book.', show: 'q' },
        { say: 'Yousef is putting shingles on his garage roof. He will need 24 rows of shingles, with 45 shingles in each row. How many shingles does he need for the roof?' },
        { say: 'If you would like to try it first, pause the video now.', wait: 5 },
      ],
    },
    {
      chapter: 'What is it asking?',
      layout: 'center',
      main: [{ kind: 'callout', id: 'c', tone: 'definition', title: 'Equal rows', md: '**Shingles** are flat pieces that cover a roof in **rows**. There are $24$ rows, and **every** row has $45$. Equal groups mean we **multiply**: $45 \\times 24$.' }],
      lines: [
        { say: 'Shingles are the flat pieces that cover a roof, laid in rows.', show: 'c' },
        { say: 'There are 24 rows, and every row has the same number, 45. When we have equal groups, we multiply. So we need 45 times 24.' },
      ],
    },
    {
      chapter: 'What you need to know',
      layout: 'center',
      main: [{ kind: 'bullets', id: 'k', items: ['Split $24$ into **$20 + 4$**', 'Multiply $45$ by **each part**', '**Add** the two partial products'] }],
      lines: [
        { say: 'Here is what we need. The standard algorithm splits the 24 into its tens and ones: 20 and 4.', show: 'k.0' },
        { say: 'Multiply 45 by each part. These answers are called partial products.', show: 'k.1' },
        { say: 'Then add the partial products.', show: 'k.2' },
      ],
    },
    {
      chapter: 'The plan',
      layout: 'center',
      main: [{ kind: 'bullets', id: 'plan', items: ['$45 \\times 4$', '$45 \\times 20$', '**Add** them, then **estimate** to check'] }],
      lines: [
        { say: 'Here is the plan. Multiply 45 by 4.', show: 'plan.0' },
        { say: 'Multiply 45 by 20.', show: 'plan.1' },
        { say: 'Add them, then check with an estimate.', show: 'plan.2' },
      ],
    },
    {
      chapter: 'Steps 1 to 3: Multiply',
      layout: 'split',
      leftWidth: 560,
      left: [{ kind: 'math', id: 'col', size: 'lg', lines: ['\\begin{array}{r} 45 \\\\ \\times\\ 24 \\\\ \\hline 180 \\\\ +\\ 900 \\\\ \\hline \\good{1{,}080} \\end{array}'] }],
      right: [{ kind: 'math', id: 'm', size: 'md', lines: ['45 \\times 4 = 180', '45 \\times 20 = 900', '180 + 900 = \\good{1{,}080}'] }],
      lines: [
        { say: 'Here is the multiplication set out in columns.', show: 'col' },
        { say: 'Step one. Multiply 45 by the 4 ones. 4 times 5 is 20: write 0, carry 2. 4 times 4 is 16, plus 2 is 18. So 45 times 4 is 180.', show: 'm.0', focus: 'm.0' },
        { say: 'Step two. Multiply 45 by the 2 tens, which is 20. Put a 0 in the ones place first, then 2 times 45 is 90. So 45 times 20 is 900.', show: 'm.1', focus: 'm.1' },
        { say: 'Step three. Add the partial products: 180 plus 900 is 1 thousand 80. Yousef needs 1 thousand 80 shingles.', caption: 'Step three. Add the partial products: 180 + 900 = 1,080. Yousef needs 1,080 shingles.', show: 'm.2', focus: ['m.2', 'col'] },
      ],
    },
    {
      chapter: 'Check the answer',
      layout: 'center',
      main: [{ kind: 'math', id: 'm', size: 'lg', lines: ['45 \\approx 50, \\quad 24 \\approx 20', '50 \\times 20 = 1{,}000 \\approx 1{,}080 \\ \\checkmark'] }],
      lines: [
        { say: 'Let us check with an estimate. 45 is about 50, and 24 is about 20.', show: 'm.0' },
        { say: '50 times 20 is 1 thousand, which is close to 1 thousand 80. It checks out.', caption: '50 × 20 = 1,000, which is close to 1,080. It checks out.', show: 'm.1', focus: 'm.1' },
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
            ['$69$', '**added** $45 + 24$: equal rows mean **multiply**'],
            ['$270$', 'forgot the **$0$** for the tens: $45 \\times 2$ tens is $900$'],
            ['$1{,}060$', 'forgot to add the **carried** $2$ in $45 \\times 4$'],
          ],
        },
      ],
      lines: [
        { say: 'Here are the traps.', show: 'traps' },
        { say: '69 adds 45 and 24. But 24 equal rows of 45 means multiplying.' },
        { say: '270 forgets that the 2 in 24 means 2 tens. Without the 0, the second line is 90 instead of 900, and 180 plus 90 is 270.' },
        { say: 'And 1 thousand 60 forgets the carried 2, so 45 times 4 becomes 160. Add the carried digit after you multiply.', caption: 'And 1,060 forgets the carried 2, so 45 × 4 becomes 160. Add the carried digit after you multiply.' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q2',
          prompt: 'A theatre has $32$ rows of seats, with $26$ seats in each row. How many seats are there?',
          choices: ['$832$', '$58$', '$256$', '$842$'],
          answer: 0,
          working: '26 × 2 = 52 and 26 × 30 = 780; 52 + 780 = 832.',
        },
      ],
      lines: [
        { say: 'Your turn. A theatre has 32 rows of seats, with 26 seats in each row. How many seats are there? Pause the video and try it.', show: 'q2', wait: 8 },
        { say: '26 times 2 is 52, and 26 times 30 is 780. 52 plus 780 is 832 seats. Choice "A".', show: 'q2.answer' },
      ],
    },
    {
      chapter: 'Summary',
      layout: 'center',
      main: [{ kind: 'bullets', id: 'sum', check: true, items: ['Equal groups: **multiply**', 'Multiply by the **ones**, then the **tens**', 'Put a **$0$** in the ones place for the tens', '**Estimate** to check'] }],
      lines: [
        { say: 'Here is what to remember. Equal groups mean multiply.', show: 'sum.0' },
        { say: 'Multiply by the ones digit, then by the tens digit.', show: 'sum.1' },
        { say: 'When you multiply by the tens, put a 0 in the ones place first.', show: 'sum.2' },
        { say: 'And estimate to check. For more on multiplying, watch this lesson\'s explainer video on Gradileo.', show: 'sum.3' },
      ],
    },
  ],
};

export default video;
