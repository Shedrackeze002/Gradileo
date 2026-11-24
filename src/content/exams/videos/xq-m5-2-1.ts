import type { Explainer } from '@/video/script.ts';

// Exam question for Math 5 lesson 2.1 (adding with the standard algorithm). The question is an
// Exercise from OpenStax Prealgebra 2e, word for word (section 1.2, Add Whole Numbers, CC BY-NC-SA
// 4.0). 82,572 + 79,316 + 75,298 = 237,186, as in the book's answer. Column by column: ones
// 2 + 6 + 8 = 16, tens 7 + 1 + 9 + 1 = 18, hundreds 5 + 3 + 2 + 1 = 11, thousands 2 + 9 + 5 + 1 = 17,
// ten thousands 8 + 7 + 7 + 1 = 23. Estimate: 80,000 + 80,000 + 80,000 = 240,000.

const QUESTION =
  'Salary Last year Natalie’s salary was $82,572. Two years ago, her salary was $79,316, and three years ago it was $75,298. What is the total amount of Natalie’s salary for the past three years?';

const video: Explainer = {
  id: 'xq-m5-2-1',
  lessonId: '',
  exam: {
    lesson: 'm5-2-1',
    source: 'OpenStax, Prealgebra 2e, Exercise in section 1.2, Add Whole Numbers',
    licence: 'CC BY-NC-SA 4.0, access for free at openstax.org',
    url: 'https://openstax.org/books/prealgebra-2e/pages/1-2-add-whole-numbers',
    question: QUESTION,
  },
  title: 'Exam Question: Three Years of Salary (Adding Big Numbers)',
  thumbnailTitle: 'Add Three Salaries',
  summary:
    'A real test question, solved one small step at a time: Natalie earned $82,572, $79,316 and $75,298 in three years. What did she earn in total? We line the numbers up by place value and add column by column, regrouping as we go: the total is $237,186. Then we check with an estimate and look at the traps.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Exam Question', title: 'Add Three Salaries', subtitle: 'The standard algorithm, step by step' }],
      lines: [
        { say: 'In this video, we solve a real test question about adding big numbers. We will take it one small step at a time, so that every step makes sense.', show: 'title' },
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
          prompt: '**Salary** Last year Natalie’s salary was \\$82,572. Two years ago, her salary was \\$79,316, and three years ago it was \\$75,298. What is the total amount of Natalie’s salary for the past three years?',
          answer: '\\$237,186',
          working: '82,572 + 79,316 + 75,298 = 237,186',
        },
      ],
      lines: [
        { say: 'Here is the question, from the book.', show: 'q' },
        { say: 'Last year, Natalie\'s salary was 82 thousand 572 dollars. Two years ago, it was 79 thousand 316 dollars, and three years ago, it was 75 thousand 298 dollars. What is the total of her salary for the past three years?', caption: 'Last year Natalie’s salary was $82,572. Two years ago it was $79,316, and three years ago it was $75,298. What is the total of her salary for the past three years?' },
        { say: 'If you would like to try it first, pause the video now.', wait: 5 },
      ],
    },
    {
      chapter: 'What is it asking?',
      layout: 'center',
      main: [{ kind: 'callout', id: 'c', tone: 'definition', title: 'Total', md: 'A **salary** is the money someone earns in a year. The **total** means we **add** the three salaries together.' }],
      lines: [
        { say: 'A salary is the money someone earns in one year.', show: 'c' },
        { say: 'The total for three years means we add the three salaries together.' },
      ],
    },
    {
      chapter: 'What you need to know',
      layout: 'center',
      main: [{ kind: 'bullets', id: 'k', items: ['Line up the numbers by **place value**: ones under ones', 'Add each **column**, starting with the **ones**', 'A column sum of $10$ or more: **regroup**, carrying the tens digit to the next column'] }],
      lines: [
        { say: 'Here is what we need. To add with the standard algorithm, line up the numbers by place value, with ones under ones.', show: 'k.0' },
        { say: 'Add each column, starting on the right, with the ones.', show: 'k.1' },
        { say: 'When a column adds to 10 or more, write the ones digit, and carry the tens digit to the next column. That is called regrouping.', show: 'k.2' },
      ],
    },
    {
      chapter: 'The plan',
      layout: 'center',
      main: [{ kind: 'bullets', id: 'plan', items: ['**Line up** the three salaries', '**Add** column by column, regrouping', '**Check** with an estimate'] }],
      lines: [
        { say: 'Here is the plan. Line up the three salaries.', show: 'plan.0' },
        { say: 'Add column by column, regrouping when we need to.', show: 'plan.1' },
        { say: 'Then check with an estimate.', show: 'plan.2' },
      ],
    },
    {
      chapter: 'Steps 1 and 2: Add',
      layout: 'split',
      leftWidth: 420,
      left: [
        { kind: 'math', id: 'add', size: 'lg', lines: ['\\begin{array}{r} 82{,}572 \\\\ 79{,}316 \\\\ +\\ 75{,}298 \\\\ \\hline \\end{array}'] },
        { kind: 'math', id: 'tot', size: 'lg', lines: ['\\good{237{,}186}'] },
      ],
      right: [
        {
          kind: 'math',
          id: 'cols',
          size: 'md',
          lines: ['\\text{ones: } 2 + 6 + 8 = 16', '\\text{tens: } 1 + 7 + 1 + 9 = 18', '\\text{hundreds: } 1 + 5 + 3 + 2 = 11', '\\text{thousands: } 1 + 2 + 9 + 5 = 17', '\\text{ten thousands: } 1 + 8 + 7 + 7 = 23'],
        },
      ],
      lines: [
        { say: 'Step one. Write the salaries one under another, with the ones lined up.', show: 'add' },
        { say: 'Step two. Add the ones: 2 plus 6 plus 8 is 16. Write the 6, and carry the 1 to the tens.', show: 'cols.0', focus: 'cols.0' },
        { say: 'The tens: the carried 1, plus 7, plus 1, plus 9 is 18. Write the 8, and carry the 1.', show: 'cols.1', focus: 'cols.1' },
        { say: 'The hundreds: 1 plus 5 plus 3 plus 2 is 11. Write the 1, and carry the 1.', show: 'cols.2', focus: 'cols.2' },
        { say: 'The thousands: 1 plus 2 plus 9 plus 5 is 17. Write the 7, and carry the 1.', show: 'cols.3', focus: 'cols.3' },
        { say: 'The ten thousands: 1 plus 8 plus 7 plus 7 is 23. Write the whole 23. The total is 237 thousand 186 dollars.', caption: 'The ten thousands: 1 + 8 + 7 + 7 = 23. Write the whole 23. The total is $237,186.', show: ['cols.4', 'tot'], focus: 'tot' },
      ],
    },
    {
      chapter: 'Step 3: Check the answer',
      layout: 'center',
      main: [{ kind: 'math', id: 'm', size: 'lg', lines: ['80{,}000 + 80{,}000 + 80{,}000 = 240{,}000', '237{,}186 \\approx 240{,}000 \\ \\checkmark'] }],
      lines: [
        { say: 'Let us check with an estimate. Each salary is about 80 thousand dollars, and 3 times 80 thousand is 240 thousand.', show: 'm.0' },
        { say: 'Our answer, 237 thousand 186, is close to 240 thousand. It checks out.', caption: 'Our answer, $237,186, is close to $240,000. It checks out.', show: 'm.1', focus: 'm.1' },
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
            ['\\$226,076', 'forgot to **carry**: every column here needs regrouping'],
            ['\\$161,888', 'added only **two** of the salaries'],
            ['\\$237,176', 'dropped the **carried** $1$ from the ones into the tens'],
          ],
        },
      ],
      lines: [
        { say: 'Here are the traps.', show: 'traps' },
        { say: 'Forgetting to carry gives the wrong total, too small. Every column in this sum needs regrouping.' },
        { say: 'Adding only two of the salaries leaves out a whole year. The question asks for three years.' },
        { say: 'And 237 thousand 176 drops the 1 carried from the ones into the tens. Write every carried 1 at the top of its column, so you do not forget it.', caption: 'And $237,176 drops the 1 carried from the ones into the tens. Write every carried 1 at the top of its column, so you do not forget it.' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q2',
          prompt: 'A farm sold $46{,}385$ kg of wheat in June and $38{,}947$ kg in July. How much wheat did it sell in the two months?',
          choices: ['$74{,}222$ kg', '$84{,}232$ kg', '$85{,}332$ kg', '$7{,}438$ kg'],
          answer: 2,
          working: '46,385 + 38,947 = 85,332',
        },
      ],
      lines: [
        { say: 'Your turn. A farm sold 46 thousand 385 kilograms of wheat in June, and 38 thousand 947 kilograms in July. How much wheat did it sell in the two months? Pause the video and try it.', caption: 'Your turn. A farm sold 46,385 kg of wheat in June and 38,947 kg in July. How much wheat did it sell in the two months? Pause the video and try it.', show: 'q2', wait: 8 },
        { say: 'Line them up and add, carrying in every column. The total is 85 thousand 332 kilograms. Choice "C".', caption: 'Line them up and add, carrying in every column. The total is 85,332 kg. Choice "C".', show: 'q2.answer' },
      ],
    },
    {
      chapter: 'Summary',
      layout: 'center',
      main: [{ kind: 'bullets', id: 'sum', check: true, items: ['Line up **ones under ones**', 'Add from the **right**', '$10$ or more: **carry** to the next column', '**Estimate** to check'] }],
      lines: [
        { say: 'Here is what to remember. Line up the numbers, ones under ones.', show: 'sum.0' },
        { say: 'Add column by column, from the right.', show: 'sum.1' },
        { say: 'When a column makes 10 or more, carry to the next column.', show: 'sum.2' },
        { say: 'And estimate to check your answer. For more on adding and subtracting, watch this lesson\'s explainer video on Gradileo.', show: 'sum.3' },
      ],
    },
  ],
};

export default video;
