import type { Explainer } from '@/video/script.ts';

// Exam question for Math 6 lesson 6.1 (order of operations with powers). The question is a Try It
// from OpenStax Prealgebra 2e, word for word (section 2.1, Use the Language of Algebra, CC BY-NC-SA
// 4.0). Powers first: 9 + 16 ÷ 2 + 64; then division: 9 + 8 + 64; then add: 81, as in the book's
// answer.

const QUESTION = 'Simplify: 3² + 2⁴ ÷ 2 + 4³';

const video: Explainer = {
  id: 'xq-m6-6-1',
  lessonId: '',
  exam: {
    lesson: 'm6-6-1',
    source: 'OpenStax, Prealgebra 2e, Try It in section 2.1, Use the Language of Algebra',
    licence: 'CC BY-NC-SA 4.0, access for free at openstax.org',
    url: 'https://openstax.org/books/prealgebra-2e/pages/2-1-use-the-language-of-algebra',
    question: QUESTION,
  },
  title: 'Exam Question: Simplify 3² + 2⁴ ÷ 2 + 4³ (Order of Operations with Powers)',
  thumbnailTitle: 'Powers, Then Divide, Then Add',
  summary:
    'A real test question, solved one small step at a time: simplify 3² + 2⁴ ÷ 2 + 4³. The order of operations says powers come first: 9 + 16 ÷ 2 + 64. Then division: 16 ÷ 2 = 8, giving 9 + 8 + 64. Then addition: 81. Then we check and look at the traps, like adding before dividing.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Exam Question', title: 'Powers, Then Divide, Then Add', subtitle: 'Order of operations with powers, step by step' }],
      lines: [
        { say: 'In this video, we solve a real test question about the order of operations. We will take it one small step at a time, so that every step makes sense.', show: 'title' },
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
          prompt: 'Simplify: $3^2 + 2^4 \\div 2 + 4^3$',
          answer: '$81$',
          working: '9 + 16 ÷ 2 + 64 = 9 + 8 + 64 = 81',
        },
      ],
      lines: [
        { say: 'Here is the question, from the book.', show: 'q' },
        { say: 'Simplify: 3 squared, plus 2 to the power 4 divided by 2, plus 4 cubed.' },
        { say: 'If you would like to try it first, pause the video now.', wait: 5 },
      ],
    },
    {
      chapter: 'What is it asking?',
      layout: 'center',
      main: [{ kind: 'callout', id: 'c', tone: 'definition', title: 'Simplify', md: '**Simplify** means work the expression out to **one number**. It has **powers**, a **division** and **additions**, so the **order** we do them in matters.' }],
      lines: [
        { say: 'Simplify means work out the expression until it is one number.', show: 'c' },
        { say: 'It has powers, a division, and additions. Doing them in a different order gives a different answer, so the order matters.' },
      ],
    },
    {
      chapter: 'What you need to know',
      layout: 'center',
      main: [{ kind: 'bullets', id: 'k', items: ['First, **brackets**', 'Second, **powers** (exponents)', 'Third, **multiply and divide**, left to right', 'Last, **add and subtract**, left to right'] }],
      lines: [
        { say: 'Here is what we need: the order of operations. First, anything in brackets.', show: 'k.0' },
        { say: 'Second, powers.', show: 'k.1' },
        { say: 'Third, multiplication and division, from left to right.', show: 'k.2' },
        { say: 'And last, addition and subtraction, from left to right.', show: 'k.3' },
      ],
    },
    {
      chapter: 'The plan',
      layout: 'center',
      main: [{ kind: 'bullets', id: 'plan', items: ['Work out the **powers**', 'Then the **division**', 'Then the **additions**'] }],
      lines: [
        { say: 'Here is the plan. There are no brackets, so start with the powers.', show: 'plan.0' },
        { say: 'Then do the division.', show: 'plan.1' },
        { say: 'Then the additions.', show: 'plan.2' },
      ],
    },
    {
      chapter: 'Steps 1 to 3: Simplify',
      layout: 'center',
      main: [{ kind: 'math', id: 'm', size: 'lg', lines: ['3^2 + 2^4 \\div 2 + 4^3', '= 9 + 16 \\div 2 + 64', '= 9 + 8 + 64', '= \\good{81}'] }],
      lines: [
        { say: 'Here is the expression.', show: 'm.0' },
        { say: 'Step one. The powers. 3 squared is 3 times 3, which is 9. 2 to the power 4 is 2 times 2 times 2 times 2, which is 16. 4 cubed is 4 times 4 times 4, which is 64.', show: 'm.1', focus: 'm.1' },
        { say: 'Step two. The division. 16 divided by 2 is 8.', show: 'm.2', focus: 'm.2' },
        { say: 'Step three. The additions, left to right. 9 plus 8 is 17, and 17 plus 64 is 81.', show: 'm.3', focus: 'm.3' },
      ],
    },
    {
      chapter: 'Check the answer',
      layout: 'center',
      main: [{ kind: 'math', id: 'm', size: 'lg', lines: ['2^4 \\div 2 = 2^3 = 8 \\ \\checkmark', '9 + 8 + 64 = 81 \\ \\checkmark'] }],
      lines: [
        { say: 'Let us check the middle part another way. Dividing 2 to the power 4 by 2 takes away one 2, leaving 2 cubed, which is 8. Same as before.', show: 'm.0' },
        { say: 'And 9 plus 8 plus 64 is 81. It checks out.', show: 'm.1', focus: 'm.1' },
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
            ['$76.5$', 'added $9 + 16$ **before** dividing: divide **first**'],
            ['$22$', 'read the powers as **multiplying**: $3^2$ is $9$, not $6$'],
            ['$77$', 'read $2^4$ as $8$: it is $2 \\cdot 2 \\cdot 2 \\cdot 2 = 16$'],
          ],
        },
      ],
      lines: [
        { say: 'Here are the traps.', show: 'traps' },
        { say: '76.5 adds 9 and 16 first, divides 25 by 2, and then adds 64. Division comes before addition.' },
        { say: '22 treats each power as multiplying: 6 plus 8 divided by 2 plus 12. 3 squared is 9, not 6.' },
        { say: 'And 77 reads 2 to the power 4 as 2 times 4. It is four 2s multiplied together, which is 16.' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q2',
          prompt: 'Simplify: $2^3 + 6^2 \\div 4$',
          choices: ['$11$', '$17$', '$12$', '$15$'],
          answer: 1,
          working: '8 + 36 ÷ 4 = 8 + 9 = 17.',
        },
      ],
      lines: [
        { say: 'Your turn. Simplify: 2 cubed plus 6 squared divided by 4. Pause the video and try it.', show: 'q2', wait: 8 },
        { say: 'Powers first: 8 plus 36 divided by 4. Then divide: 8 plus 9. Then add: 17. Choice "B".', show: 'q2.answer' },
      ],
    },
    {
      chapter: 'Summary',
      layout: 'center',
      main: [{ kind: 'bullets', id: 'sum', check: true, items: ['**Brackets** first', 'Then **powers**', 'Then **multiply and divide**, left to right', 'Then **add and subtract**, left to right'] }],
      lines: [
        { say: 'Here is what to remember. Brackets first.', show: 'sum.0' },
        { say: 'Then powers.', show: 'sum.1' },
        { say: 'Then multiplication and division, from left to right.', show: 'sum.2' },
        { say: 'Then addition and subtraction, from left to right. For more on the order of operations with powers, watch this lesson\'s explainer video on Gradileo.', show: 'sum.3' },
      ],
    },
  ],
};

export default video;
