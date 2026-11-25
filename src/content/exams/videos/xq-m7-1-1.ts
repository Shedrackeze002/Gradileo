import type { Explainer } from '@/video/script.ts';

// Exam question for Math 7 lesson 1.1 (divisibility rules). The question is a Try It from OpenStax
// Prealgebra 2e, word for word (section 2.4, Find Multiples and Factors, CC BY-NC-SA 4.0). 7248 ends
// in 8, so it is even: divisible by 2. Its digit sum is 7 + 2 + 4 + 8 = 21, a multiple of 3, so it
// is divisible by 3. It does not end in 0 or 5, so it is not divisible by 5 or by 10.

const QUESTION = 'Determine whether the given number is divisible by 2, 3, 5, and 10. 7248';

const video: Explainer = {
  id: 'xq-m7-1-1',
  lessonId: '',
  exam: {
    lesson: 'm7-1-1',
    source: 'OpenStax, Prealgebra 2e, Try It in section 2.4, Find Multiples and Factors',
    licence: 'CC BY-NC-SA 4.0, access for free at openstax.org',
    url: 'https://openstax.org/books/prealgebra-2e/pages/2-4-find-multiples-and-factors',
    question: QUESTION,
  },
  title: 'Exam Question: Is 7248 Divisible by 2, 3, 5 and 10? (Divisibility Rules)',
  thumbnailTitle: 'Divisible by 2, 3, 5 or 10?',
  summary:
    'A real test question, solved one small step at a time: is 7248 divisible by 2, 3, 5 and 10? We use the divisibility rules instead of dividing. 7248 ends in 8, an even digit, so it is divisible by 2. Its digits add to 21, which is divisible by 3, so 7248 is divisible by 3. It does not end in 0 or 5, so it is not divisible by 5 or by 10. Then we check by dividing and look at the traps.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Exam Question', title: 'Divisible by 2, 3, 5 or 10?', subtitle: 'Divisibility rules, step by step' }],
      lines: [
        { say: 'In this video, we solve a real test question about divisibility rules. We will take it one small step at a time, so that every step makes sense.', show: 'title' },
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
          prompt: 'Determine whether the given number is divisible by $2$, $3$, $5$, and $10$. $7248$',
          answer: 'divisible by $2$ and $3$; **not** by $5$ or $10$',
          working: 'last digit 8 is even; 7 + 2 + 4 + 8 = 21',
        },
      ],
      lines: [
        { say: 'Here is the question, from the book.', show: 'q' },
        { say: 'Determine whether the number 7 thousand 248 is divisible by 2, 3, 5, and 10.' },
        { say: 'If you would like to try it first, pause the video now.', wait: 5 },
      ],
    },
    {
      chapter: 'What is it asking?',
      layout: 'center',
      main: [{ kind: 'callout', id: 'c', tone: 'definition', title: 'Divisible', md: 'A number is **divisible** by another when it divides **exactly**, with **no remainder**. We must decide this for each of $2$, $3$, $5$ and $10$, **without** doing four long divisions.' }],
      lines: [
        { say: 'A number is divisible by another when it divides exactly, with no remainder left over.', show: 'c' },
        { say: 'We must decide this for 2, 3, 5 and 10. The divisibility rules let us do it without four long divisions.' },
      ],
    },
    {
      chapter: 'What you need to know',
      layout: 'center',
      main: [{ kind: 'table', id: 't', head: ['Divisible by', 'Rule'], rows: [['$2$', 'the last digit is **even**: $0, 2, 4, 6$ or $8$'], ['$3$', 'the **digit sum** is divisible by $3$'], ['$5$', 'the last digit is $0$ or $5$'], ['$10$', 'the last digit is $0$']] }],
      lines: [
        { say: 'Here is what we need. A number is divisible by 2 when its last digit is even.', show: 't.0' },
        { say: 'It is divisible by 3 when the sum of its digits is divisible by 3.', show: 't.1' },
        { say: 'It is divisible by 5 when its last digit is 0 or 5.', show: 't.2' },
        { say: 'And it is divisible by 10 when its last digit is 0.', show: 't.3' },
      ],
    },
    {
      chapter: 'The plan',
      layout: 'center',
      main: [{ kind: 'bullets', id: 'plan', items: ['Look at the **last digit** for $2$, $5$ and $10$', '**Add the digits** for $3$', 'Write yes or no for **each**'] }],
      lines: [
        { say: 'Here is the plan. Look at the last digit for 2, 5 and 10.', show: 'plan.0' },
        { say: 'Add the digits for 3.', show: 'plan.1' },
        { say: 'Then write yes or no for each one.', show: 'plan.2' },
      ],
    },
    {
      chapter: 'Steps 1 to 3: Test each one',
      layout: 'center',
      main: [{ kind: 'math', id: 'm', size: 'lg', lines: ['724\\good{8}: \\ 8 \\text{ is even} \\Rightarrow \\good{\\text{divisible by } 2}', '7 + 2 + 4 + 8 = 21 = 3 \\times 7 \\Rightarrow \\good{\\text{divisible by } 3}', '\\text{ends in } 8, \\text{ not } 0 \\text{ or } 5 \\Rightarrow \\bad{\\text{not by } 5}', '\\text{ends in } 8, \\text{ not } 0 \\Rightarrow \\bad{\\text{not by } 10}'] }],
      lines: [
        { say: 'Step one. The last digit of 7 thousand 248 is 8. 8 is even, so 7 thousand 248 is divisible by 2.', show: 'm.0', focus: 'm.0' },
        { say: 'Step two. Add the digits: 7 plus 2 plus 4 plus 8 is 21. 21 is 3 times 7, so it is divisible by 3. That means 7 thousand 248 is divisible by 3 too.', show: 'm.1', focus: 'm.1' },
        { say: 'Step three. The last digit is 8, not 0 or 5, so 7 thousand 248 is not divisible by 5.', show: 'm.2', focus: 'm.2' },
        { say: 'And it does not end in 0, so it is not divisible by 10 either.', show: 'm.3', focus: 'm.3' },
      ],
    },
    {
      chapter: 'Check the answer',
      layout: 'center',
      main: [{ kind: 'math', id: 'm', size: 'lg', lines: ['7248 \\div 2 = 3624 \\ \\checkmark', '7248 \\div 3 = 2416 \\ \\checkmark', '7248 \\div 5 = 1449.6 \\ \\text{(not whole)} \\ \\checkmark'] }],
      lines: [
        { say: 'Let us check by dividing. 7 thousand 248 divided by 2 is 3 thousand 624, a whole number.', show: 'm.0' },
        { say: '7 thousand 248 divided by 3 is 2 thousand 416, also a whole number.', show: 'm.1' },
        { say: 'But divided by 5, it is 1 thousand 449 point 6. That is not a whole number, so 5 does not divide it exactly. It checks out.', show: 'm.2', focus: 'm.2' },
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
            ['"not by $3$: $8$ is not a multiple of $3$"', 'for $3$, add **all** the digits, not just the last'],
            ['"by $3$: $7248$ has a $2$ and a $4$"', 'the digits themselves do not matter: their **sum** does'],
            ['"by $10$: it is even"', 'for $10$, the last digit must be $0$'],
          ],
        },
      ],
      lines: [
        { say: 'Here are the traps.', show: 'traps' },
        { say: 'Saying it is not divisible by 3 because 8 is not a multiple of 3 uses the last digit. The rule for 3 adds all the digits.' },
        { say: 'Looking for the digits 3, 6 or 9 inside the number does not work either. Only the digit sum counts.' },
        { say: 'And being even is not enough for 10. A number divisible by 10 must end in 0.' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q2',
          prompt: 'The rule for $9$ works like the rule for $3$: the digit sum must be divisible by $9$. Which number is divisible by $9$?',
          choices: ['$7248$', '$5832$', '$4061$', '$3205$'],
          answer: 1,
          working: '5 + 8 + 3 + 2 = 18, and 18 is divisible by 9.',
        },
      ],
      lines: [
        { say: 'Your turn. The rule for 9 works like the rule for 3: the digit sum must be divisible by 9. Which number is divisible by 9? Pause the video and try it.', show: 'q2', wait: 8 },
        { say: 'Add the digits of 5 thousand 832: 5 plus 8 plus 3 plus 2 is 18, and 18 is 2 nines. The others add to 21, 11 and 10. Choice "B".', show: 'q2.answer' },
      ],
    },
    {
      chapter: 'Summary',
      layout: 'center',
      main: [{ kind: 'bullets', id: 'sum', check: true, items: ['$2$: last digit **even**', '$3$: **digit sum** divisible by $3$', '$5$: last digit $0$ or $5$', '$10$: last digit $0$'] }],
      lines: [
        { say: 'Here is what to remember. A number is divisible by 2 when its last digit is even.', show: 'sum.0' },
        { say: 'By 3 when its digit sum is divisible by 3.', show: 'sum.1' },
        { say: 'By 5 when it ends in 0 or 5.', show: 'sum.2' },
        { say: 'And by 10 when it ends in 0. For more on divisibility rules, watch this lesson\'s explainer video on Gradileo.', show: 'sum.3' },
      ],
    },
  ],
};

export default video;
