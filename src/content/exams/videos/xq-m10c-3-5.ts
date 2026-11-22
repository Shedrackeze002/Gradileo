import type { Explainer } from '@/video/script.ts';

// Exam question for Math 10 lesson 3.5 (the exponent laws, zero and negative exponents): simplify
// (m⁴n⁻³)(m⁻⁵n⁻²). The question is OpenStax Elementary Algebra 2e's own worked example, word for
// word (section 6.7, Integer Exponents and Scientific Notation, CC BY-NC-SA 4.0): group like
// bases, add the exponents to get m⁻¹n⁻⁵, then write it with positive exponents as 1 ÷ (mn⁵).

const QUESTION = 'Simplify: (m⁴n⁻³)(m⁻⁵n⁻²).';

const video: Explainer = {
  id: 'xq-m10c-3-5',
  lessonId: '',
  exam: {
    lesson: 'm10c-3-5',
    source: 'OpenStax, Elementary Algebra 2e, Example in section 6.7, Integer Exponents and Scientific Notation',
    licence: 'CC BY-NC-SA 4.0, access for free at openstax.org',
    url: 'https://openstax.org/books/elementary-algebra-2e/pages/6-7-integer-exponents-and-scientific-notation',
    question: QUESTION,
  },
  title: 'Exam Question: Simplify (m⁴n⁻³)(m⁻⁵n⁻²). Negative Exponents and the Exponent Laws',
  thumbnailTitle: 'Negative Exponents',
  thumbnail: 'm',
  summary:
    'A real test question, solved one small step at a time: we simplify (m⁴n⁻³)(m⁻⁵n⁻²). We group the powers with the same base, add their exponents with the product law, and rewrite the negative exponents as reciprocals to get 1 ÷ (mn⁵). Then we check by putting in numbers and look at the traps.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Exam Question', title: 'Negative Exponents', subtitle: 'The exponent laws, step by step' }],
      lines: [
        { say: 'In this video, we solve a real test question about multiplying powers with negative exponents. We will take it one small step at a time, so that every step makes sense.', show: 'title' },
        { say: 'The question comes from the free OpenStax Elementary Algebra textbook. You will see where it comes from at the bottom of the screen the whole way through.' },
      ],
    },
    {
      chapter: 'The question',
      layout: 'center',
      main: [{ kind: 'try', id: 'q', kicker: 'The question', prompt: 'Simplify: $(m^{4}n^{-3})(m^{-5}n^{-2})$.', answer: '$\\dfrac{1}{mn^{5}}$', working: '$m^{4-5}n^{-3-2} = m^{-1}n^{-5} = \\dfrac{1}{mn^{5}}$.' }],
      lines: [
        { say: 'Here is the question, exactly as it was printed.', show: 'q' },
        { say: 'Simplify: m to the 4, n to the minus 3, times m to the minus 5, n to the minus 2.' },
        { say: 'If you would like to try it first, pause the video now.', wait: 5 },
      ],
    },
    {
      chapter: 'What is it asking?',
      layout: 'center',
      main: [
        { kind: 'math', id: 'e', size: 'lg', lines: ['(\\good{m^{4}}\\,\\brand{n^{-3}})(\\good{m^{-5}}\\,\\brand{n^{-2}})'] },
        { kind: 'text', id: 't', size: 'md', md: '**Simplify** means: each base written **once**, with **positive** exponents.' },
      ],
      lines: [
        { say: 'Here is the expression. It is two products multiplied together. There are two powers of m, in green, and two powers of n, in purple.', show: 'e' },
        { say: 'To simplify it, we want each base written just once, and, by the usual convention, with no negative exponents.', show: 't' },
      ],
    },
    {
      chapter: 'What you need to know',
      layout: 'center',
      main: [{ kind: 'math', id: 'f', size: 'lg', lines: ['a^{m} \\cdot a^{n} = a^{m+n}', 'a^{-n} = \\dfrac{1}{a^{n}}', 'a^{1} = a'] }],
      lines: [
        { say: 'Here is what we need. The product law: when you multiply powers with the same base, keep the base and add the exponents.', show: 'f.0' },
        { say: 'A negative exponent means a reciprocal: \"a\" to the minus n is 1 over \"a\" to the n.', show: 'f.1' },
        { say: 'And \"a\" to the first power is just \"a\".', show: 'f.2' },
      ],
    },
    {
      chapter: 'The plan',
      layout: 'center',
      main: [{ kind: 'bullets', id: 'plan', items: ['**Group** the powers with the same base', '**Add** the exponents of each base', 'Make the exponents **positive**'] }],
      lines: [
        { say: 'Here is the plan. First, group the powers with the same base.', show: 'plan.0' },
        { say: 'Second, add the exponents of each base.', show: 'plan.1' },
        { say: 'Third, rewrite the negative exponents as reciprocals.', show: 'plan.2' },
      ],
    },
    {
      chapter: 'Step 1: Group like bases',
      layout: 'center',
      main: [{ kind: 'math', id: 'm', size: 'lg', lines: ['(m^{4}n^{-3})(m^{-5}n^{-2})', '= \\good{m^{4} \\cdot m^{-5}} \\cdot \\brand{n^{-3} \\cdot n^{-2}}'] }],
      lines: [
        { say: 'Step one. Everything here is multiplied, and we can multiply in any order. So put the m\'s together and the n\'s together.', show: ['m.0', 'm.1'], focus: 'm.1' },
      ],
    },
    {
      chapter: 'Step 2: Add the exponents',
      layout: 'center',
      main: [{ kind: 'math', id: 'm', size: 'lg', lines: ['m^{4} \\cdot m^{-5} = m^{4 + (-5)} = m^{-1}', 'n^{-3} \\cdot n^{-2} = n^{-3 + (-2)} = n^{-5}', '= m^{-1} n^{-5}'] }],
      lines: [
        { say: 'Step two. For m, add the exponents: 4 plus negative 5 is negative 1. So we have m to the minus 1.', show: 'm.0' },
        { say: 'For n: negative 3 plus negative 2 is negative 5. So we have n to the minus 5.', show: 'm.1' },
        { say: 'Together, that is m to the minus 1 times n to the minus 5.', show: 'm.2', focus: 'm.2' },
      ],
    },
    {
      chapter: 'Step 3: Positive exponents',
      layout: 'center',
      main: [{ kind: 'math', id: 'm', size: 'lg', lines: ['m^{-1} n^{-5} = \\dfrac{1}{m^{1}} \\cdot \\dfrac{1}{n^{5}}', '= \\good{\\dfrac{1}{mn^{5}}}'] }],
      lines: [
        { say: 'Step three. A negative exponent means a reciprocal. m to the minus 1 is 1 over m, and n to the minus 5 is 1 over n to the 5.', show: 'm.0' },
        { say: 'Multiply the fractions: the answer is 1 over m n to the 5.', show: 'm.1', focus: 'm.1' },
      ],
    },
    {
      chapter: 'Check the answer',
      layout: 'center',
      main: [{ kind: 'math', id: 'm', size: 'md', lines: ['m = 2,\\ n = 1: \\quad (2^{4} \\cdot 1)(2^{-5} \\cdot 1) = 16 \\times \\dfrac{1}{32} = \\dfrac{1}{2}', '\\dfrac{1}{mn^{5}} = \\dfrac{1}{2 \\times 1} = \\dfrac{1}{2} \\ \\checkmark'] }],
      lines: [
        { say: 'Let us check by putting in numbers. Try m equals 2 and n equals 1. The question becomes 2 to the 4, which is 16, times 2 to the minus 5, which is one thirty-second. That is one half.', show: 'm.0' },
        { say: 'Our answer, 1 over m n to the 5, is 1 over 2 times 1, which is also one half. They match.', show: 'm.1' },
      ],
    },
    {
      chapter: 'The traps',
      layout: 'center',
      main: [
        {
          kind: 'table',
          id: 'traps',
          head: ['Trap', 'Answer it gives'],
          rows: [
            ['**Multiplying** the exponents', '$m^{-20}n^{6}$: multiply exponents only for a power of a power'],
            ['Adding $-3 + (-2)$ as $-1$', '$m^{-1}n^{-1}$: watch the signs'],
            ['Leaving negative exponents', '$m^{-1}n^{-5}$: right value, but not simplified'],
          ],
        },
      ],
      lines: [
        { say: 'Here are the traps.', show: 'traps' },
        { say: 'Multiplying the exponents instead of adding gives m to the minus 20, n to the 6. You multiply exponents only when you raise a power to a power.' },
        { say: 'Be careful with the signs: negative 3 plus negative 2 is negative 5, not negative 1.' },
        { say: 'And m to the minus 1, n to the minus 5, has the right value, but simplified usually means positive exponents, so finish the job.' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q2',
          prompt: 'Simplify: $(x^{3}y^{-2})(x^{-1}y^{5})$.',
          choices: ['$x^{2}y^{3}$', '$x^{-3}y^{-10}$', '$x^{4}y^{-7}$', '$\\dfrac{1}{x^{2}y^{3}}$'],
          answer: 0,
          working: '$x^{3 + (-1)}y^{-2 + 5} = x^{2}y^{3}$.',
        },
      ],
      lines: [
        { say: 'Your turn. Simplify: x cubed, y to the minus 2, times x to the minus 1, y to the 5. Pause the video and try it.', show: 'q2', wait: 6 },
        { say: 'For x, 3 plus negative 1 is 2. For y, negative 2 plus 5 is 3. So the answer is x squared y cubed, choice A. B multiplied the exponents, C subtracted them, and D flipped a result that was already positive.', show: 'q2.answer' },
      ],
    },
    {
      chapter: 'Summary',
      layout: 'center',
      main: [{ kind: 'bullets', id: 'sum', check: true, items: ['Group powers with the **same base**', 'Multiplying powers: **add** the exponents', '$a^{-n} = \\dfrac{1}{a^{n}}$', 'Check by putting in **numbers**'] }],
      lines: [
        { say: 'Here is what to remember. Group the powers with the same base.', show: 'sum.0' },
        { say: 'When you multiply powers with the same base, add the exponents.', show: 'sum.1' },
        { say: 'A negative exponent means a reciprocal.', show: 'sum.2' },
        { say: 'And you can always check by putting in numbers. For more on the exponent laws, watch this lesson\'s explainer video on Gradileo.', show: 'sum.3' },
      ],
    },
  ],
};

export default video;
