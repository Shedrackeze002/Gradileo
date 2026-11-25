import type { Explainer } from '@/video/script.ts';

// Exam question for Math 5 lesson 3.1 (divisibility tests). The question is a Try It from OpenStax
// Prealgebra 2e, word for word (section 2.4, Find Multiples and Factors, CC BY-NC-SA 4.0). 3765 ends
// in 5, so it is not divisible by 2 or 10 but is divisible by 5; its digit sum 3 + 7 + 6 + 5 = 21 is
// divisible by 3, so 3765 is too. Answer: divisible by 3 and 5, as in the book. Check:
// 3765 ÷ 3 = 1255 and 3765 ÷ 5 = 753.

const QUESTION = 'Determine whether the given number is divisible by 2, 3, 5, and 10. 3765';

const video: Explainer = {
  id: 'xq-m5-3-1',
  lessonId: '',
  exam: {
    lesson: 'm5-3-1',
    source: 'OpenStax, Prealgebra 2e, Try It in section 2.4, Find Multiples and Factors',
    licence: 'CC BY-NC-SA 4.0, access for free at openstax.org',
    url: 'https://openstax.org/books/prealgebra-2e/pages/2-4-find-multiples-and-factors',
    question: QUESTION,
  },
  title: 'Exam Question: Is 3,765 Divisible by 2, 3, 5 or 10? (Divisibility Tests)',
  thumbnailTitle: 'Divisible or Not?',
  summary:
    'A real test question, solved one small step at a time: is 3,765 divisible by 2, by 3, by 5 and by 10? Divisibility tests answer this without dividing. 3,765 ends in 5, so it is divisible by 5 but not by 2 or 10. Its digits add to 21, which 3 divides, so it is divisible by 3. Then we check by dividing and look at the traps.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Exam Question', title: 'Divisible or Not?', subtitle: 'Divisibility tests, step by step' }],
      lines: [
        { say: 'In this video, we solve a real test question about divisibility. We will take it one small step at a time, so that every step makes sense.', show: 'title' },
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
          prompt: 'Determine whether the given number is divisible by $2$, $3$, $5$, and $10$. $\\quad 3765$',
          answer: 'divisible by $3$ and $5$, not by $2$ or $10$',
          working: 'Ends in 5; digit sum 21',
        },
      ],
      lines: [
        { say: 'Here is the question, from the book.', show: 'q' },
        { say: 'Decide whether 3 thousand 765 is divisible by 2, by 3, by 5, and by 10.', caption: 'Decide whether 3765 is divisible by 2, by 3, by 5, and by 10.' },
        { say: 'If you would like to try it first, pause the video now.', wait: 5 },
      ],
    },
    {
      chapter: 'What is it asking?',
      layout: 'center',
      main: [{ kind: 'callout', id: 'c', tone: 'definition', title: 'Divisible', md: 'A number is **divisible** by another if it divides **exactly**, with **no remainder**. For example, $12$ is divisible by $3$, because $12 \\div 3 = 4$.' }],
      lines: [
        { say: 'A number is divisible by another number if it divides exactly, with no remainder.', show: 'c' },
        { say: 'For example, 12 is divisible by 3, because 12 divided by 3 is 4, with nothing left over. We need to test 3 thousand 765 four times: for 2, 3, 5 and 10.', caption: 'For example, 12 is divisible by 3, because 12 ÷ 3 = 4, with nothing left over. We need to test 3765 four times: for 2, 3, 5 and 10.' },
      ],
    },
    {
      chapter: 'What you need to know',
      layout: 'center',
      main: [
        {
          kind: 'table',
          id: 't',
          head: ['Divisible by', 'Test'],
          rows: [
            ['$2$', 'the last digit is **even**: $0, 2, 4, 6$ or $8$'],
            ['$3$', 'the **sum of the digits** is divisible by $3$'],
            ['$5$', 'the last digit is $0$ or $5$'],
            ['$10$', 'the last digit is $0$'],
          ],
        },
      ],
      lines: [
        { say: 'Here is what we need: four divisibility tests. A number is divisible by 2 when its last digit is even: 0, 2, 4, 6 or 8.', show: 't', focus: 't.0' },
        { say: 'It is divisible by 3 when the sum of its digits is divisible by 3.', focus: 't.1' },
        { say: 'It is divisible by 5 when its last digit is 0 or 5.', focus: 't.2' },
        { say: 'And it is divisible by 10 when its last digit is 0.', focus: 't.3' },
      ],
    },
    {
      chapter: 'The plan',
      layout: 'center',
      main: [{ kind: 'bullets', id: 'plan', items: ['Look at the **last digit**: tests for $2$, $5$ and $10$', '**Add the digits**: test for $3$', 'Write which **pass**'] }],
      lines: [
        { say: 'Here is the plan. Look at the last digit, for the tests for 2, 5 and 10.', show: 'plan.0' },
        { say: 'Add the digits, for the test for 3.', show: 'plan.1' },
        { say: 'Then write down which tests the number passes.', show: 'plan.2' },
      ],
    },
    {
      chapter: 'Steps 1 to 3: The tests',
      layout: 'center',
      main: [
        {
          kind: 'table',
          id: 't',
          head: ['By', 'What we see', 'Divisible?'],
          rows: [
            ['$2$', 'last digit $5$ is **odd**', 'no'],
            ['$5$', 'last digit is $5$', '**yes**'],
            ['$10$', 'last digit is not $0$', 'no'],
            ['$3$', '$3 + 7 + 6 + 5 = 21$, and $21 = 3 \\times 7$', '**yes**'],
          ],
        },
        { kind: 'text', id: 'a', md: '$3765$ is divisible by **$3$ and $5$**, but not by $2$ or $10$.' },
      ],
      lines: [
        { say: 'Step one. The last digit of 3 thousand 765 is 5. 5 is odd, so the number is not divisible by 2.', caption: 'Step one. The last digit of 3765 is 5. 5 is odd, so the number is not divisible by 2.', show: 't', focus: 't.0' },
        { say: 'The last digit is 5, so it is divisible by 5.', focus: 't.1' },
        { say: 'The last digit is not 0, so it is not divisible by 10.', focus: 't.2' },
        { say: 'Step two. Add the digits: 3 plus 7 plus 6 plus 5 is 21. 21 is 3 times 7, so 21 is divisible by 3, and so is 3 thousand 765.', caption: 'Step two. Add the digits: 3 + 7 + 6 + 5 = 21. 21 is 3 × 7, so 21 is divisible by 3, and so is 3765.', focus: 't.3' },
        { say: 'Step three. 3 thousand 765 is divisible by 3 and by 5, but not by 2 or 10.', caption: 'Step three. 3765 is divisible by 3 and by 5, but not by 2 or 10.', show: 'a', focus: 'a' },
      ],
    },
    {
      chapter: 'Check the answer',
      layout: 'center',
      main: [{ kind: 'math', id: 'm', size: 'lg', lines: ['3765 \\div 3 = 1255 \\ \\checkmark', '3765 \\div 5 = 753 \\ \\checkmark'] }],
      lines: [
        { say: 'Let us check by dividing. 3 thousand 765 divided by 3 is 1 thousand 255, with no remainder.', caption: 'Let us check by dividing. 3765 ÷ 3 = 1255, with no remainder.', show: 'm.0' },
        { say: 'And 3 thousand 765 divided by 5 is 753, with no remainder. It checks out.', caption: 'And 3765 ÷ 5 = 753, with no remainder. It checks out.', show: 'm.1', focus: 'm.1' },
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
            ['not by $3$', 'looked at the last digit: for $3$, **add the digits**'],
            ['by $10$', 'the last digit must be **$0$**, not $5$'],
            ['by $2$', 'the number is not even: it ends in an **odd** digit'],
          ],
        },
      ],
      lines: [
        { say: 'Here are the traps.', show: 'traps' },
        { say: 'The test for 3 does not use the last digit. 3 thousand 765 does not end in 3, but its digits add to 21, so it is divisible by 3.', caption: 'The test for 3 does not use the last digit. 3765 does not end in 3, but its digits add to 21, so it is divisible by 3.' },
        { say: 'Ending in 5 is enough for 5, but not for 10. A number divisible by 10 must end in 0.' },
        { say: 'And a number ending in 5 is odd, so it is never divisible by 2.' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q2',
          prompt: 'Which numbers divide $2{,}478$ with no remainder?',
          choices: ['$2$ only', '$2$, $5$ and $10$', '$3$ and $5$', '$2$ and $3$'],
          answer: 3,
          working: 'It ends in 8 (even, not 0 or 5); 2 + 4 + 7 + 8 = 21.',
        },
      ],
      lines: [
        { say: 'Your turn. Which numbers divide 2 thousand 478 with no remainder? Pause the video and try it.', caption: 'Your turn. Which numbers divide 2,478 with no remainder? Pause the video and try it.', show: 'q2', wait: 8 },
        { say: 'It ends in 8, which is even, so 2 works, but 5 and 10 do not. Its digits add to 21, so 3 works too. Choice "D".', caption: 'It ends in 8, which is even, so 2 works, but 5 and 10 do not. 2 + 4 + 7 + 8 = 21, so 3 works too. Choice "D".', show: 'q2.answer' },
      ],
    },
    {
      chapter: 'Summary',
      layout: 'center',
      main: [{ kind: 'bullets', id: 'sum', check: true, items: ['By $2$: ends in an **even** digit', 'By $3$: the **digits add** to a multiple of $3$', 'By $5$: ends in **$0$ or $5$**', 'By $10$: ends in **$0$**'] }],
      lines: [
        { say: 'Here is what to remember. A number is divisible by 2 when it ends in an even digit.', show: 'sum.0' },
        { say: 'By 3, when its digits add up to a multiple of 3.', show: 'sum.1' },
        { say: 'By 5, when it ends in 0 or 5.', show: 'sum.2' },
        { say: 'And by 10, when it ends in 0. For more on divisibility tests, watch this lesson\'s explainer video on Gradileo.', show: 'sum.3' },
      ],
    },
  ],
};

export default video;
