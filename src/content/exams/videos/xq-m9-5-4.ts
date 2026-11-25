import type { Explainer } from '@/video/script.ts';

// Exam question for Math 9 lesson 5.4 (multiplying and dividing by a monomial). The question is a
// Try It from OpenStax Elementary Algebra 2e, word for word (section 6.6, Divide Polynomials,
// CC BY-NC-SA 4.0). Divide each term by 3b: 27b³ ÷ 3b = 9b² and −33b² ÷ 3b = −11b, so the
// quotient is 9b² − 11b. Check by multiplying back: 3b(9b² − 11b) = 27b³ − 33b².

const QUESTION = 'Find the quotient: (27b³ − 33b²) ÷ 3b.';

const video: Explainer = {
  id: 'xq-m9-5-4',
  lessonId: '',
  exam: {
    lesson: 'm9-5-4',
    source: 'OpenStax, Elementary Algebra 2e, Try It in section 6.6, Divide Polynomials',
    licence: 'CC BY-NC-SA 4.0, access for free at openstax.org',
    url: 'https://openstax.org/books/elementary-algebra-2e/pages/6-6-divide-polynomials',
    question: QUESTION,
  },
  title: 'Exam Question: Divide a Binomial by 3b (Multiplying and Dividing by a Monomial)',
  thumbnailTitle: 'Divide: (27b³ − 33b²) ÷ 3b',
  thumbnail: 'st',
  summary:
    'A real test question, solved one small step at a time: find the quotient (27b³ − 33b²) ÷ 3b. To divide a polynomial by a monomial, divide each term by it: divide the coefficients, and subtract the exponents of b. 27b³ ÷ 3b = 9b² and −33b² ÷ 3b = −11b, so the quotient is 9b² − 11b. Then we check by multiplying back and look at the traps.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Exam Question', title: 'Divide: (27b³ − 33b²) ÷ 3b', subtitle: 'Multiplying and dividing by a monomial, step by step' }],
      lines: [
        { say: 'In this video, we solve a real test question about multiplying and dividing by a monomial. We will take it one small step at a time, so that every step makes sense.', show: 'title' },
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
          prompt: 'Find the quotient: $(27b^3 - 33b^2) \\div 3b$.',
          answer: '$9b^2 - 11b$',
          working: '27b³ ÷ 3b − 33b² ÷ 3b',
        },
      ],
      lines: [
        { say: 'Here is the question, from the book.', show: 'q' },
        { say: 'Find the quotient: the bracket 27 "b" cubed minus 33 "b" squared, divided by 3 "b".' },
        { say: 'If you would like to try it first, pause the video now.', wait: 5 },
      ],
    },
    {
      chapter: 'What is it asking?',
      layout: 'center',
      main: [
        { kind: 'math', id: 'm', size: 'lg', lines: ['\\dfrac{\\adj{27b^3} \\opp{- 33b^2}}{3b}'] },
        { kind: 'callout', id: 'c', tone: 'definition', title: 'Monomial divisor', md: 'We divide a **binomial** (two terms) by a **monomial** ($3b$, one term). The bar shows that the **whole** top is divided by $3b$.' },
      ],
      lines: [
        { say: 'Here is the division written as a fraction. The top has two terms, in blue and orange.', show: 'm.0' },
        { say: 'We divide a binomial by a monomial, 3 "b". The whole top is divided by 3 "b".', show: 'c' },
      ],
    },
    {
      chapter: 'What you need to know',
      layout: 'center',
      main: [{ kind: 'math', id: 'm', size: 'lg', lines: ['\\dfrac{a + c}{d} = \\dfrac{a}{d} + \\dfrac{c}{d}', '\\dfrac{b^m}{b^n} = b^{m - n}'] }],
      lines: [
        { say: 'Here is what we need. To divide a sum by a number, divide each term by it.', show: 'm.0' },
        { say: 'And to divide powers with the same base, subtract the exponents.', show: 'm.1' },
      ],
    },
    {
      chapter: 'The plan',
      layout: 'center',
      main: [{ kind: 'bullets', id: 'plan', items: ['Split into **one fraction per term**', 'Divide the **coefficients**', '**Subtract** the exponents of $b$'] }],
      lines: [
        { say: 'Here is the plan. Split it into one fraction for each term.', show: 'plan.0' },
        { say: 'Divide the coefficients.', show: 'plan.1' },
        { say: 'Then subtract the exponents of "b".', show: 'plan.2' },
      ],
    },
    {
      chapter: 'Steps 1 to 3: Term by term',
      layout: 'center',
      main: [{ kind: 'math', id: 'st', size: 'lg', lines: ['= \\dfrac{\\adj{27b^3}}{3b} \\opp{-} \\dfrac{\\opp{33b^2}}{3b}', '= \\adj{9b^{3 - 1}} \\opp{- 11b^{2 - 1}}', '= \\good{9b^2 - 11b}'] }],
      lines: [
        { say: 'Step one. Divide each term by 3 "b": 27 "b" cubed over 3 "b", minus 33 "b" squared over 3 "b".', show: 'st.0', focus: 'st.0' },
        { say: 'Step two. Divide the coefficients: 27 divided by 3 is 9, and 33 divided by 3 is 11.', show: 'st.1', focus: 'st.1' },
        { say: 'Step three. Subtract the exponents. "b" cubed over "b" is "b" to the power of 3 minus 1, which is "b" squared. "b" squared over "b" is "b". The quotient is 9 "b" squared minus 11 "b".', show: 'st.2', focus: 'st.2' },
      ],
    },
    {
      chapter: 'Check the answer',
      layout: 'center',
      main: [{ kind: 'math', id: 'm', size: 'lg', lines: ['3b(9b^2 - 11b)', '= 27b^3 - 33b^2 \\ \\checkmark'] }],
      lines: [
        { say: 'Let us check by multiplying back. The quotient times 3 "b" should give the top. 3 "b" times 9 "b" squared is 27 "b" cubed.', show: 'm.0', focus: 'm.0' },
        { say: '3 "b" times negative 11 "b" is negative 33 "b" squared. That is exactly where we started. It checks out.', show: 'm.1', focus: 'm.1' },
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
            ['$9b^2 - 33b^2$', 'divided only the **first** term: divide **every** term'],
            ['$9b^3 - 11b^2$', 'forgot the $b$ in $3b$: **subtract** $1$ from each exponent'],
            ['$81b^4 - 99b^3$', '**multiplied** by $3b$: the question **divides**'],
          ],
        },
      ],
      lines: [
        { say: 'Here are the traps.', show: 'traps' },
        { say: 'Dividing only the first term leaves the second untouched. The whole top is divided, so divide every term.' },
        { say: 'Keeping the exponents forgets the "b" in 3 "b". Dividing by "b" takes 1 off each exponent.' },
        { say: 'And 81 "b" to the power of 4 multiplies by 3 "b". The question asks us to divide.' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q2',
          prompt: 'Find the quotient: $(18x^3 - 36x^2) \\div 6x$.',
          choices: ['$3x^3 - 6x^2$', '$12x^2 - 30x$', '$3x - 6$', '$3x^2 - 6x$'],
          answer: 3,
          working: '18x³ ÷ 6x = 3x² and −36x² ÷ 6x = −6x.',
        },
      ],
      lines: [
        { say: 'Your turn. Find the quotient: the bracket 18 "x" cubed minus 36 "x" squared, divided by 6 "x". Pause the video and try it.', show: 'q2', wait: 8 },
        { say: '18 divided by 6 is 3, and "x" cubed over "x" is "x" squared: 3 "x" squared. 36 divided by 6 is 6, and "x" squared over "x" is "x": minus 6 "x". Choice "D".', show: 'q2.answer' },
      ],
    },
    {
      chapter: 'Summary',
      layout: 'center',
      main: [{ kind: 'bullets', id: 'sum', check: true, items: ['Divide **every** term by the monomial', 'Divide the **coefficients**', '**Subtract** the exponents', 'Check by **multiplying back**'] }],
      lines: [
        { say: 'Here is what to remember. Divide every term by the monomial.', show: 'sum.0' },
        { say: 'Divide the coefficients.', show: 'sum.1' },
        { say: 'Subtract the exponents of the variable.', show: 'sum.2' },
        { say: 'And check by multiplying back. For more on multiplying and dividing by a monomial, watch this lesson\'s explainer video on Gradileo.', show: 'sum.3' },
      ],
    },
  ],
};

export default video;
