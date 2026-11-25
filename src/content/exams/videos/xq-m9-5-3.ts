import type { Explainer } from '@/video/script.ts';

// Exam question for Math 9 lesson 5.3 (adding and subtracting polynomials). The question is a Try
// It from OpenStax Elementary Algebra 2e, word for word (section 6.1, Add and Subtract Polynomials,
// CC BY-NC-SA 4.0). Subtracting means adding the opposite: (8x² + 3x − 19) − 7x² + 14. Then combine
// like terms: x² + 3x − 5. Check with x = 1: (8 + 3 − 19) − (7 − 14) = −8 + 7 = −1 = 1 + 3 − 5.

const QUESTION = 'Find the difference: (8x² + 3x − 19) − (7x² − 14).';

const video: Explainer = {
  id: 'xq-m9-5-3',
  lessonId: '',
  exam: {
    lesson: 'm9-5-3',
    source: 'OpenStax, Elementary Algebra 2e, Try It in section 6.1, Add and Subtract Polynomials',
    licence: 'CC BY-NC-SA 4.0, access for free at openstax.org',
    url: 'https://openstax.org/books/elementary-algebra-2e/pages/6-1-add-and-subtract-polynomials',
    question: QUESTION,
  },
  title: 'Exam Question: Subtract Two Polynomials (Adding and Subtracting Polynomials)',
  thumbnailTitle: 'Subtract: (8x² + 3x − 19) − (7x² − 14)',
  thumbnail: 'st',
  summary:
    'A real test question, solved one small step at a time: find the difference (8x² + 3x − 19) − (7x² − 14). To subtract a polynomial, add its opposite: change the sign of every term in the second bracket, so −(7x² − 14) becomes −7x² + 14. Then combine like terms: 8x² − 7x² = x², 3x stays, and −19 + 14 = −5. The answer is x² + 3x − 5. Then we check with x = 1 and look at the traps.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Exam Question', title: 'Subtract Two Polynomials', subtitle: 'Adding and subtracting polynomials, step by step' }],
      lines: [
        { say: 'In this video, we solve a real test question about adding and subtracting polynomials. We will take it one small step at a time, so that every step makes sense.', show: 'title' },
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
          prompt: 'Find the difference: $(8x^2 + 3x - 19) - (7x^2 - 14)$.',
          answer: '$x^2 + 3x - 5$',
          working: '8x² + 3x − 19 − 7x² + 14',
        },
      ],
      lines: [
        { say: 'Here is the question, from the book.', show: 'q' },
        { say: 'Find the difference: the bracket 8 "x" squared plus 3 "x" minus 19, minus the bracket 7 "x" squared minus 14.' },
        { say: 'If you would like to try it first, pause the video now.', wait: 5 },
      ],
    },
    {
      chapter: 'What is it asking?',
      layout: 'center',
      main: [
        { kind: 'math', id: 'm', size: 'lg', lines: ['(8x^2 + 3x - 19) \\ \\opp{-} \\ (7x^2 - 14)'] },
        { kind: 'callout', id: 'c', tone: 'definition', title: 'Difference', md: 'The **difference** is the result of a **subtraction**. Here we take the **whole** second polynomial away from the first.' },
      ],
      lines: [
        { say: 'Here are the two polynomials. The minus sign in orange is in front of the whole second bracket.', show: 'm.0' },
        { say: 'The difference is the result of a subtraction. We take the whole second polynomial away from the first.', show: 'c' },
      ],
    },
    {
      chapter: 'What you need to know',
      layout: 'center',
      main: [{ kind: 'math', id: 'm', size: 'lg', lines: ['-(a - b) = -a + b', '\\text{subtract: add the opposite of every term}'] }],
      lines: [
        { say: 'Here is what we need. A minus sign in front of a bracket changes the sign of every term inside.', show: 'm.0' },
        { say: 'So to subtract a polynomial, add the opposite of every one of its terms.', show: 'm.1' },
      ],
    },
    {
      chapter: 'The plan',
      layout: 'center',
      main: [{ kind: 'bullets', id: 'plan', items: ['Remove the first bracket as it is', 'Change the sign of **every** term in the second', '**Combine** like terms'] }],
      lines: [
        { say: 'Here is the plan. The first bracket can be removed as it is.', show: 'plan.0' },
        { say: 'Change the sign of every term in the second bracket.', show: 'plan.1' },
        { say: 'Then combine like terms.', show: 'plan.2' },
      ],
    },
    {
      chapter: 'Steps 1 to 3: Opposites, then like terms',
      layout: 'center',
      main: [{ kind: 'math', id: 'st', size: 'lg', lines: ['(8x^2 + 3x - 19) - (7x^2 - 14)', '= 8x^2 + 3x - 19 \\opp{- 7x^2 + 14}', '= (\\adj{8x^2 - 7x^2}) + \\good{3x} + (\\thc{-19 + 14})', '= \\good{x^2 + 3x - 5}'] }],
      lines: [
        { say: 'Here is the subtraction.', show: 'st.0' },
        { say: 'Step one. The first bracket has a plus in front, so it comes off as it is. Step two. The second bracket has a minus in front, so change every sign inside: 7 "x" squared becomes negative 7 "x" squared, and negative 14 becomes plus 14.', show: 'st.1', focus: 'st.1' },
        { say: 'Step three. Group like terms. The "x" squared terms, the "x" term, and the constants.', show: 'st.2', focus: 'st.2' },
        { say: '8 "x" squared minus 7 "x" squared is 1 "x" squared, which we write as "x" squared. 3 "x" has no partner, so it stays. Negative 19 plus 14 is negative 5. The answer is "x" squared plus 3 "x" minus 5.', show: 'st.3', focus: 'st.3' },
      ],
    },
    {
      chapter: 'Check the answer',
      layout: 'center',
      main: [{ kind: 'math', id: 'm', size: 'lg', lines: ['x = 1: \\ (8 + 3 - 19) - (7 - 14) = {-8} - ({-7}) = {-1}', '1 + 3 - 5 = {-1} \\ \\checkmark'] }],
      lines: [
        { say: 'Let us check with "x" equals 1. The first bracket is 8 plus 3 minus 19, which is negative 8. The second is 7 minus 14, which is negative 7. Negative 8 minus negative 7 is negative 1.', show: 'm.0', focus: 'm.0' },
        { say: 'Our answer gives 1 plus 3 minus 5, which is also negative 1. It checks out.', show: 'm.1', focus: 'm.1' },
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
            ['$x^2 + 3x - 33$', 'changed only the first sign: $-(-14)$ is $+14$'],
            ['$15x^2 + 3x - 33$', 'added the brackets: this is a **difference**'],
            ['$x^2 - 5$', 'lost $3x$: a term with no partner **stays**'],
          ],
        },
      ],
      lines: [
        { say: 'Here are the traps.', show: 'traps' },
        { say: 'Negative 33 comes from changing only the first sign. The minus sign changes every term: minus negative 14 is plus 14.' },
        { say: '15 "x" squared adds the two polynomials. The question asks for the difference.' },
        { say: 'And dropping 3 "x" loses a term. A term with no like term to combine with stays in the answer.' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q2',
          prompt: 'Find the difference: $(9b^2 - 5b - 4) - (3b^2 - 5b - 7)$.',
          choices: ['$6b^2 - 10b - 11$', '$6b^2 + 3$', '$6b^2 - 3$', '$12b^2 - 10b - 11$'],
          answer: 1,
          working: '9b² − 5b − 4 − 3b² + 5b + 7 = 6b² + 3.',
        },
      ],
      lines: [
        { say: 'Your turn. Find the difference: the bracket 9 "b" squared minus 5 "b" minus 4, minus the bracket 3 "b" squared minus 5 "b" minus 7. Pause the video and try it.', show: 'q2', wait: 8 },
        { say: 'Change every sign in the second bracket: minus 3 "b" squared, plus 5 "b", plus 7. Then 9 minus 3 is 6 "b" squared. Negative 5 "b" plus 5 "b" is zero. Negative 4 plus 7 is 3. So 6 "b" squared plus 3. Choice "B".', show: 'q2.answer' },
      ],
    },
    {
      chapter: 'Summary',
      layout: 'center',
      main: [{ kind: 'bullets', id: 'sum', check: true, items: ['Subtract: add the **opposite**', 'Change the sign of **every** term', '**Combine** like terms', 'Check with a **value**'] }],
      lines: [
        { say: 'Here is what to remember. To subtract a polynomial, add its opposite.', show: 'sum.0' },
        { say: 'Change the sign of every term in the bracket being subtracted.', show: 'sum.1' },
        { say: 'Then combine like terms.', show: 'sum.2' },
        { say: 'And check by substituting a value. For more on adding and subtracting polynomials, watch this lesson\'s explainer video on Gradileo.', show: 'sum.3' },
      ],
    },
  ],
};

export default video;
