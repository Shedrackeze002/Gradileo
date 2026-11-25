import type { Explainer } from '@/video/script.ts';

// Exam question for Math 9 lesson 5.2 (equivalent expressions). The question is a Try It from
// OpenStax Elementary Algebra 2e, word for word (section 1.2, Use the Language of Algebra,
// CC BY-NC-SA 4.0). Group like terms: 3x² + 7x² = 10x², 7x + 9x = 16x, 9 + 8 = 17, so the
// simpler equivalent expression is 10x² + 16x + 17. Check with x = 1: 26 + 17 = 43 both ways.

const QUESTION = 'Simplify: 3x² + 7x + 9 + 7x² + 9x + 8.';

const video: Explainer = {
  id: 'xq-m9-5-2',
  lessonId: '',
  exam: {
    lesson: 'm9-5-2',
    source: 'OpenStax, Elementary Algebra 2e, Try It in section 1.2, Use the Language of Algebra',
    licence: 'CC BY-NC-SA 4.0, access for free at openstax.org',
    url: 'https://openstax.org/books/elementary-algebra-2e/pages/1-2-use-the-language-of-algebra',
    question: QUESTION,
  },
  title: 'Exam Question: Combine Like Terms (Equivalent Expressions)',
  thumbnailTitle: 'Combine Like Terms',
  thumbnail: 'st',
  summary:
    'A real test question, solved one small step at a time: simplify 3x² + 7x + 9 + 7x² + 9x + 8. Like terms have the same variable with the same exponent. We group them and add their coefficients: 3x² + 7x² = 10x², 7x + 9x = 16x and 9 + 8 = 17. The equivalent expression is 10x² + 16x + 17. Then we check by substituting x = 1 and look at the traps.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Exam Question', title: 'Combine Like Terms', subtitle: 'Equivalent expressions, step by step' }],
      lines: [
        { say: 'In this video, we solve a real test question about equivalent expressions. We will take it one small step at a time, so that every step makes sense.', show: 'title' },
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
          prompt: 'Simplify: $3x^2 + 7x + 9 + 7x^2 + 9x + 8$.',
          answer: '$10x^2 + 16x + 17$',
          working: '(3 + 7)x² + (7 + 9)x + (9 + 8)',
        },
      ],
      lines: [
        { say: 'Here is the question, from the book.', show: 'q' },
        { say: 'Simplify: 3 "x" squared, plus 7 "x", plus 9, plus 7 "x" squared, plus 9 "x", plus 8.' },
        { say: 'If you would like to try it first, pause the video now.', wait: 5 },
      ],
    },
    {
      chapter: 'What is it asking?',
      layout: 'center',
      main: [
        { kind: 'math', id: 'm', size: 'lg', lines: ['3x^2 + 7x + 9 + 7x^2 + 9x + 8'] },
        { kind: 'callout', id: 'c', tone: 'definition', title: 'Equivalent expressions', md: '**Equivalent expressions** give the same value for **every** value of $x$. To simplify, we write an equivalent expression with **fewer** terms.' },
      ],
      lines: [
        { say: 'Here is the expression. It has 6 terms.', show: 'm.0' },
        { say: 'Equivalent expressions give the same value for every value of "x". To simplify, we write an equivalent expression with fewer terms.', show: 'c' },
      ],
    },
    {
      chapter: 'What you need to know',
      layout: 'center',
      main: [{ kind: 'math', id: 'm', size: 'lg', lines: ['\\text{like terms: same variable, same exponent}', '3x^2 + 7x^2 = (3 + 7)x^2 = 10x^2', 'x^2 \\text{ and } x \\text{ are } \\textbf{not} \\text{ like terms}'] }],
      lines: [
        { say: 'Here is what we need. Like terms have the same variable, raised to the same exponent.', show: 'm.0' },
        { say: 'To combine like terms, add their coefficients and keep the variable part. 3 "x" squared plus 7 "x" squared is 10 "x" squared.', show: 'm.1' },
        { say: 'But "x" squared and "x" are not like terms, so they cannot be combined.', show: 'm.2' },
      ],
    },
    {
      chapter: 'The plan',
      layout: 'center',
      main: [{ kind: 'bullets', id: 'plan', items: ['**Sort** the terms by type', '**Add** the coefficients of each type', 'Write the answer in **order**'] }],
      lines: [
        { say: 'Here is the plan. Sort the terms by type: "x" squared terms, "x" terms and constants.', show: 'plan.0' },
        { say: 'Add the coefficients of each type.', show: 'plan.1' },
        { say: 'Write the answer in order, highest exponent first.', show: 'plan.2' },
      ],
    },
    {
      chapter: 'Steps 1 to 3: Sort, add, write',
      layout: 'center',
      main: [{ kind: 'math', id: 'st', size: 'lg', lines: ['\\adj{3x^2} + \\good{7x} + \\opp{9} + \\adj{7x^2} + \\good{9x} + \\opp{8}', '= (\\adj{3x^2 + 7x^2}) + (\\good{7x + 9x}) + (\\opp{9 + 8})', '= \\adj{10x^2} + \\good{16x} + \\opp{17}'] }],
      lines: [
        { say: 'Step one. Colour the terms by type. The "x" squared terms are blue, the "x" terms are green, and the constants are orange.', show: 'st.0', focus: 'st.0' },
        { say: 'Group each type together. We can reorder terms that are added, so the value does not change.', show: 'st.1', focus: 'st.1' },
        { say: 'Step two. Add the coefficients. 3 plus 7 is 10, so 10 "x" squared. 7 plus 9 is 16, so 16 "x". And 9 plus 8 is 17.', show: 'st.2', focus: 'st.2' },
        { say: 'Step three. Written in order, the answer is 10 "x" squared, plus 16 "x", plus 17.' },
      ],
    },
    {
      chapter: 'Check the answer',
      layout: 'center',
      main: [{ kind: 'math', id: 'm', size: 'lg', lines: ['x = 1: \\ 3 + 7 + 9 + 7 + 9 + 8 = 43', '10 + 16 + 17 = 43 \\ \\checkmark'] }],
      lines: [
        { say: 'Let us check by substituting "x" equals 1 into both expressions. In the original, every "x" term becomes its coefficient: 3 plus 7 plus 9 plus 7 plus 9 plus 8 is 43.', show: 'm.0', focus: 'm.0' },
        { say: 'In our answer: 10 plus 16 plus 17 is also 43. They match. It checks out.', show: 'm.1', focus: 'm.1' },
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
            ['$10x^4$', 'added the exponents: like terms keep their **exponent**'],
            ['$26x^2 + 17$', 'mixed $x^2$ and $x$: they are **not** like terms'],
            ['$43x$', 'added everything: only **like** terms combine'],
          ],
        },
      ],
      lines: [
        { say: 'Here are the traps.', show: 'traps' },
        { say: '10 "x" to the power of 4 adds the exponents too. When we combine like terms, the exponent stays the same.' },
        { say: '26 "x" squared adds the "x" terms to the "x" squared terms. They are not like terms.' },
        { say: 'And 43 "x" adds every number together. Only like terms can be combined.' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q2',
          prompt: 'Simplify: $4y^2 + 5y + 2 + 8y^2 + 4y + 5$.',
          choices: ['$12y^4 + 9y^2 + 7$', '$28y^2$', '$12y^2 + 9y + 7$', '$21y + 7$'],
          answer: 2,
          working: '(4 + 8)y² + (5 + 4)y + (2 + 5) = 12y² + 9y + 7.',
        },
      ],
      lines: [
        { say: 'Your turn. Simplify 4 "y" squared, plus 5 "y", plus 2, plus 8 "y" squared, plus 4 "y", plus 5. Pause the video and try it.', show: 'q2', wait: 8 },
        { say: '4 plus 8 is 12, so 12 "y" squared. 5 plus 4 is 9, so 9 "y". And 2 plus 5 is 7. 12 "y" squared plus 9 "y" plus 7. Choice "C".', show: 'q2.answer' },
      ],
    },
    {
      chapter: 'Summary',
      layout: 'center',
      main: [{ kind: 'bullets', id: 'sum', check: true, items: ['Like terms: same variable, **same exponent**', 'Add the **coefficients**', 'Keep the **exponent**', 'Check by **substituting** a value'] }],
      lines: [
        { say: 'Here is what to remember. Like terms have the same variable and the same exponent.', show: 'sum.0' },
        { say: 'To combine them, add the coefficients.', show: 'sum.1' },
        { say: 'Keep the exponent the same.', show: 'sum.2' },
        { say: 'And check by substituting a value into both expressions. For more on equivalent expressions, watch this lesson\'s explainer video on Gradileo.', show: 'sum.3' },
      ],
    },
  ],
};

export default video;
