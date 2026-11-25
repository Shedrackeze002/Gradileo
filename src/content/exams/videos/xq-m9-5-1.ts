import type { Explainer } from '@/video/script.ts';

// Exam question for Math 9 lesson 5.1 (introduction to polynomials). The question is a Try It from
// OpenStax Elementary Algebra 2e, word for word (section 6.1, Add and Subtract Polynomials,
// CC BY-NC-SA 4.0). Count the terms: 5b has 1 (monomial), 8y³ − 7y² − y − 3 has 4 (other
// polynomial), −3x² − 5x + 9 has 3 (trinomial), 81 − 4a² has 2 (binomial), −5x⁶ has 1 (monomial).

const QUESTION =
  'Determine whether each polynomial is a monomial, binomial, trinomial, or other polynomial: (a) 5b (b) 8y³ − 7y² − y − 3 (c) −3x² − 5x + 9 (d) 81 − 4a² (e) −5x⁶';

const video: Explainer = {
  id: 'xq-m9-5-1',
  lessonId: '',
  exam: {
    lesson: 'm9-5-1',
    source: 'OpenStax, Elementary Algebra 2e, Try It in section 6.1, Add and Subtract Polynomials',
    licence: 'CC BY-NC-SA 4.0, access for free at openstax.org',
    url: 'https://openstax.org/books/elementary-algebra-2e/pages/6-1-add-and-subtract-polynomials',
    question: QUESTION,
  },
  title: 'Exam Question: Monomial, Binomial or Trinomial? (Introduction to Polynomials)',
  thumbnailTitle: 'Monomial, Binomial or Trinomial?',
  thumbnail: 'st',
  summary:
    'A real test question, solved one small step at a time: decide whether each polynomial is a monomial, binomial, trinomial, or other polynomial: (a) 5b (b) 8y³ − 7y² − y − 3 (c) −3x² − 5x + 9 (d) 81 − 4a² (e) −5x⁶. We count the terms, which are separated by + and − signs: 1 term is a monomial, 2 a binomial, 3 a trinomial, and 4 or more just a polynomial. So (a) monomial, (b) polynomial, (c) trinomial, (d) binomial, (e) monomial. Then we check and look at the traps.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Exam Question', title: 'Monomial, Binomial or Trinomial?', subtitle: 'Introduction to polynomials, step by step' }],
      lines: [
        { say: 'In this video, we solve a real test question about polynomials. We will take it one small step at a time, so that every step makes sense.', show: 'title' },
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
          prompt: 'Determine whether each polynomial is a monomial, binomial, trinomial, or other polynomial: (a) $5b$ (b) $8y^3 - 7y^2 - y - 3$ (c) $-3x^2 - 5x + 9$ (d) $81 - 4a^2$ (e) $-5x^6$',
          answer: '(a) monomial (b) polynomial (c) trinomial (d) binomial (e) monomial',
          working: 'count the terms: 1, 4, 3, 2, 1',
        },
      ],
      lines: [
        { say: 'Here is the question, from the book.', show: 'q' },
        { say: 'Determine whether each polynomial is a monomial, binomial, trinomial, or other polynomial. Part a: 5 "b". Part b: 8 "y" cubed, minus 7 "y" squared, minus "y", minus 3. Part c: negative 3 "x" squared, minus 5 "x", plus 9. Part d: 81 minus 4 "a" squared. Part e: negative 5 "x" to the power of 6.' },
        { say: 'If you would like to try it first, pause the video now.', wait: 5 },
      ],
    },
    {
      chapter: 'What is it asking?',
      layout: 'center',
      main: [
        { kind: 'math', id: 'm', size: 'lg', lines: ['\\adj{-3x^2} \\ \\opp{- 5x} \\ \\good{+ 9}'] },
        { kind: 'callout', id: 'c', tone: 'definition', title: 'Term', md: 'A **term** is a number, a variable, or a product of them. In a polynomial, the terms are separated by $+$ and $-$ signs, and each sign belongs to the term after it.' },
      ],
      lines: [
        { say: 'Each polynomial is made of terms. Here part c has three terms, in three colours.', show: 'm.0' },
        { say: 'A term is a number, a variable, or a product of them. The terms are separated by plus and minus signs, and each sign belongs to the term after it.', show: 'c' },
      ],
    },
    {
      chapter: 'What you need to know',
      layout: 'center',
      main: [
        {
          kind: 'table',
          id: 'names',
          head: ['Number of terms', 'Name'],
          rows: [
            ['$1$', '**mono**mial (mono means one)'],
            ['$2$', '**bi**nomial (bi means two)'],
            ['$3$', '**tri**nomial (tri means three)'],
            ['$4$ or more', 'polynomial'],
          ],
        },
      ],
      lines: [
        { say: 'Here is what we need. A polynomial with 1 term is a monomial. Mono means one.', show: 'names' },
        { say: 'With 2 terms, it is a binomial. Bi means two, like a bicycle with two wheels. With 3 terms, a trinomial. Tri means three.' },
        { say: 'With 4 or more terms, there is no special name. We just call it a polynomial.' },
      ],
    },
    {
      chapter: 'The plan',
      layout: 'center',
      main: [{ kind: 'bullets', id: 'plan', items: ['Find the $+$ and $-$ signs **between** terms', '**Count** the terms', '**Name** it by the count'] }],
      lines: [
        { say: 'Here is the plan. Find the plus and minus signs between terms.', show: 'plan.0' },
        { say: 'Count the terms.', show: 'plan.1' },
        { say: 'Then name the polynomial by its number of terms.', show: 'plan.2' },
      ],
    },
    {
      chapter: 'Steps 1 to 5: Count the terms',
      layout: 'center',
      main: [{ kind: 'math', id: 'st', size: 'md', align: 'left', lines: ['\\text{(a) } \\adj{5b}: 1 \\text{ term} \\to \\good{\\text{monomial}}', '\\text{(b) } \\adj{8y^3} \\opp{- 7y^2} \\adj{- y} \\opp{- 3}: 4 \\text{ terms} \\to \\good{\\text{polynomial}}', '\\text{(c) } \\adj{-3x^2} \\opp{- 5x} \\adj{+ 9}: 3 \\text{ terms} \\to \\good{\\text{trinomial}}', '\\text{(d) } \\adj{81} \\opp{- 4a^2}: 2 \\text{ terms} \\to \\good{\\text{binomial}}', '\\text{(e) } \\adj{-5x^6}: 1 \\text{ term} \\to \\good{\\text{monomial}}'] }],
      lines: [
        { say: 'Part a. 5 "b" is one term: 5 times "b". It is a monomial.', show: 'st.0', focus: 'st.0' },
        { say: 'Part b. 8 "y" cubed, minus 7 "y" squared, minus "y", minus 3. That is 4 terms, so it is just a polynomial.', show: 'st.1', focus: 'st.1' },
        { say: 'Part c. Negative 3 "x" squared, minus 5 "x", plus 9. 3 terms: a trinomial.', show: 'st.2', focus: 'st.2' },
        { say: 'Part d. 81, minus 4 "a" squared. 2 terms: a binomial.', show: 'st.3', focus: 'st.3' },
        { say: 'Part e. Negative 5 "x" to the power of 6 is one term. The minus sign at the front is part of the number, not a sign between terms. It is a monomial.', show: 'st.4', focus: 'st.4' },
      ],
    },
    {
      chapter: 'Check the answer',
      layout: 'center',
      main: [{ kind: 'math', id: 'm', size: 'lg', lines: ['\\text{signs between terms: } 0,\\ 3,\\ 2,\\ 1,\\ 0', '\\text{terms} = \\text{signs between} + 1: \\ 1,\\ 4,\\ 3,\\ 2,\\ 1 \\ \\checkmark'] }],
      lines: [
        { say: 'Let us check another way. Count only the signs between terms, not a sign at the very front: 0, 3, 2, 1 and 0.', show: 'm.0', focus: 'm.0' },
        { say: 'The number of terms is always one more: 1, 4, 3, 2 and 1. The same counts as before. It checks out.', show: 'm.1', focus: 'm.1' },
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
            ['(e) binomial', 'the front minus is part of the term, not a **separator**'],
            ['(a) binomial', '$5b$ is $5 \\times b$: **one** term'],
            ['(c) by its degree', 'the **name** counts terms, not the exponent'],
          ],
        },
      ],
      lines: [
        { say: 'Here are the traps.', show: 'traps' },
        { say: 'Calling part e a binomial counts the front minus sign. A sign at the front belongs to the first term. It does not separate two terms.' },
        { say: 'Calling 5 "b" a binomial splits the 5 and the "b". But 5 "b" means 5 times "b", which is one term.' },
        { say: 'And the name depends on the number of terms, not on the exponents. Part c is a trinomial because it has 3 terms.' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q2',
          prompt: 'What is $-7x^2 + 4x$?',
          choices: ['a binomial', 'a monomial', 'a trinomial', 'none of these'],
          answer: 0,
          working: 'Two terms, −7x² and 4x, so it is a binomial.',
        },
      ],
      lines: [
        { say: 'Your turn. What is negative 7 "x" squared plus 4 "x"? Pause the video and try it.', show: 'q2', wait: 8 },
        { say: 'There is one plus sign between terms, so there are 2 terms: negative 7 "x" squared, and 4 "x". It is a binomial. Choice "A".', show: 'q2.answer' },
      ],
    },
    {
      chapter: 'Summary',
      layout: 'center',
      main: [{ kind: 'bullets', id: 'sum', check: true, items: ['Terms are separated by $+$ and $-$', 'A front sign **belongs** to the first term', '$1$, $2$, $3$ terms: mono, bi, **tri**nomial', '$4$ or more: **polynomial**'] }],
      lines: [
        { say: 'Here is what to remember. Terms are separated by plus and minus signs.', show: 'sum.0' },
        { say: 'A sign at the front belongs to the first term.', show: 'sum.1' },
        { say: '1, 2 and 3 terms make a monomial, binomial and trinomial.', show: 'sum.2' },
        { say: 'And 4 or more terms is just called a polynomial. For more on polynomials, watch this lesson\'s explainer video on Gradileo.', show: 'sum.3' },
      ],
    },
  ],
};

export default video;
