import type { Explainer } from '@/video/script.ts';

// Exam question for Math 9 lesson 2.3 (order of operations with powers). The question is a Try It
// from OpenStax Elementary Algebra 2e, word for word (section 1.2, Use the Language of Algebra,
// CC BY-NC-SA 4.0). Brackets first, from the inside: 9 + 3 = 12, 4 × 12 = 48. Then the power:
// 5³ = 125. Then add and subtract from left to right: 9 + 125 = 134, 134 − 48 = 86.

const QUESTION = 'Simplify: 9 + 5³ − [4(9 + 3)].';

const video: Explainer = {
  id: 'xq-m9-2-3',
  lessonId: '',
  exam: {
    lesson: 'm9-2-3',
    source: 'OpenStax, Elementary Algebra 2e, Try It in section 1.2, Use the Language of Algebra',
    licence: 'CC BY-NC-SA 4.0, access for free at openstax.org',
    url: 'https://openstax.org/books/elementary-algebra-2e/pages/1-2-use-the-language-of-algebra',
    question: QUESTION,
  },
  title: 'Exam Question: Simplify 9 + 5³ − [4(9 + 3)] (Order of Operations with Powers)',
  thumbnailTitle: 'Simplify 9 + 5³ − [4(9 + 3)]',
  thumbnail: 'st',
  summary:
    'A real test question, solved one small step at a time: simplify 9 + 5³ − [4(9 + 3)]. Brackets come first, working from the inside out: 9 + 3 = 12, and 4 × 12 = 48. Next the power: 5³ = 125. Last, add and subtract from left to right: 9 + 125 = 134, and 134 − 48 = 86. Then we check in a different order and look at the traps.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Exam Question', title: 'Simplify 9 + 5³ − [4(9 + 3)]', subtitle: 'Order of operations with powers, step by step' }],
      lines: [
        { say: 'In this video, we solve a real test question about the order of operations with powers. We will take it one small step at a time, so that every step makes sense.', show: 'title' },
        { say: 'The question comes from the free OpenStax Elementary Algebra textbook. You will see where it comes from at the bottom of the screen the whole way through.' },
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
          prompt: 'Simplify: $9 + 5^3 - [4(9 + 3)]$.',
          answer: '$86$',
          working: '9 + 125 − [4 × 12] = 9 + 125 − 48',
        },
      ],
      lines: [
        { say: 'Here is the question, from the book.', show: 'q' },
        { say: 'Simplify: 9, plus 5 cubed, minus, in square brackets, 4 times the bracket 9 plus 3.' },
        { say: 'If you would like to try it first, pause the video now.', wait: 5 },
      ],
    },
    {
      chapter: 'What is it asking?',
      layout: 'center',
      main: [
        { kind: 'math', id: 'm', size: 'lg', lines: ['9 + \\opp{5^3} - \\adj{[4(9 + 3)]}'] },
        { kind: 'callout', id: 'c', tone: 'definition', title: 'Simplify', md: 'To **simplify** means to work it out to **one number**. With several operations, the **order** we do them in matters.' },
      ],
      lines: [
        { say: 'Here is the expression. It has a power, in orange, and brackets inside brackets, in blue. It also has adding, subtracting and multiplying.', show: 'm.0' },
        { say: 'To simplify means to work it out to one number. With so many operations, the order matters.', show: 'c' },
      ],
    },
    {
      chapter: 'What you need to know',
      layout: 'center',
      main: [{ kind: 'bullets', id: 'order', items: ['**B**rackets: from the **inside** out', '**E**xponents (powers)', '**D**ivide and **M**ultiply, left to right', '**A**dd and **S**ubtract, left to right'] }],
      lines: [
        { say: 'Here is what we need: the order of operations. First, brackets, starting with the innermost ones.', show: 'order.0' },
        { say: 'Next, exponents, which are powers.', show: 'order.1' },
        { say: 'Then divide and multiply, from left to right.', show: 'order.2' },
        { say: 'Last, add and subtract, from left to right.', show: 'order.3' },
      ],
    },
    {
      chapter: 'The plan',
      layout: 'center',
      main: [{ kind: 'bullets', id: 'plan', items: ['Work the **brackets**, inside first', 'Work out the **power**', '**Add** and **subtract**, left to right'] }],
      lines: [
        { say: 'Here is the plan. Work out the brackets, inside first.', show: 'plan.0' },
        { say: 'Then work out the power.', show: 'plan.1' },
        { say: 'Then add and subtract, from left to right.', show: 'plan.2' },
      ],
    },
    {
      chapter: 'Steps 1 to 3: One operation at a time',
      layout: 'center',
      main: [{ kind: 'math', id: 'st', size: 'lg', lines: ['9 + 5^3 - [4(\\adj{9 + 3})]', '= 9 + 5^3 - [\\adj{4 \\times 12}]', '= 9 + \\opp{5^3} - 48', '= \\thc{9 + 125} - 48', '= 134 - 48 = \\good{86}'] }],
      lines: [
        { say: 'Step one: brackets. Start with the innermost bracket: 9 plus 3 is 12.', show: ['st.0', 'st.1'], focus: 'st.1' },
        { say: 'Now the square bracket holds 4 times 12, which is 48.', show: 'st.2', focus: 'st.2' },
        { say: 'Step two: the power. 5 cubed is 5 times 5 times 5. 5 times 5 is 25, and 25 times 5 is 125.', show: 'st.3', focus: 'st.3' },
        { say: 'Step three: add and subtract from left to right. 9 plus 125 is 134. Then 134 minus 48 is 86.', show: 'st.4', focus: 'st.4' },
      ],
    },
    {
      chapter: 'Check the answer',
      layout: 'center',
      main: [{ kind: 'math', id: 'm', size: 'lg', lines: ['125 - 48 = 77', '77 + 9 = 86 \\ \\checkmark'] }],
      lines: [
        { say: 'Let us check by doing the adding and subtracting in a different order. 125 minus 48 is 77.', show: 'm.0', focus: 'm.0' },
        { say: '77 plus 9 is 86. The same answer. It checks out.', show: 'm.1', focus: 'm.1' },
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
            ['$5^3 = 15$', 'multiplied $5 \\times 3$: a cube is $5 \\times 5 \\times 5$'],
            ['$4(9 + 3) = 39$', 'did $4 \\times 9 + 3$: work **inside** the bracket first'],
            ['$182$', 'added the $48$: the bracket is **subtracted**'],
          ],
        },
      ],
      lines: [
        { say: 'Here are the traps.', show: 'traps' },
        { say: '5 cubed is not 15. That is 5 times 3. A cube is 5 times 5 times 5, which is 125.' },
        { say: '4 times the bracket 9 plus 3 is not 39. That multiplies first. Work inside the bracket first: 4 times 12 is 48.' },
        { say: 'And 182 adds the 48. But there is a minus sign in front of the square bracket, so the 48 is subtracted.' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q2',
          prompt: 'Simplify: $7^2 - 2[4(5 + 1)]$.',
          choices: ['$1$', '$47$', '$264$', '$25$'],
          answer: 0,
          working: '4(6) = 24, 2 × 24 = 48, 7² = 49: 49 − 48 = 1.',
        },
      ],
      lines: [
        { say: 'Your turn. Simplify 7 squared, minus 2 times, in square brackets, 4 times the bracket 5 plus 1. Pause the video and try it.', show: 'q2', wait: 8 },
        { say: 'Inside first: 5 plus 1 is 6, and 4 times 6 is 24. Then 2 times 24 is 48. 7 squared is 49. 49 minus 48 is 1. Choice "A".', show: 'q2.answer' },
      ],
    },
    {
      chapter: 'Summary',
      layout: 'center',
      main: [{ kind: 'bullets', id: 'sum', check: true, items: ['**Brackets**, from the inside out', 'Then **powers**', 'Then multiply and divide', 'Then add and subtract, **left to right**'] }],
      lines: [
        { say: 'Here is what to remember. Brackets come first, from the inside out.', show: 'sum.0' },
        { say: 'Then powers.', show: 'sum.1' },
        { say: 'Then multiply and divide.', show: 'sum.2' },
        { say: 'Then add and subtract, from left to right. For more on the order of operations with powers, watch this lesson\'s explainer video on Gradileo.', show: 'sum.3' },
      ],
    },
  ],
};

export default video;
