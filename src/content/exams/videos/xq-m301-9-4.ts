import type { Explainer } from '@/video/script.ts';

// Exam question for Math 30-1 lesson 9.4 (the binomial theorem). The question is an exercise from
// OpenStax College Algebra 2e, word for word (section 13.6, Binomial Theorem, CC BY-NC-SA 4.0), with
// its set's instruction in front of it. The fourth term of (a + b)^n is C(n, 3) a^(n − 3) b^3, so
// with a = 3x, b = −2y and n = 5 it is 10 × 9x² × (−8y³) = −720x²y³, as in the book's answer. The
// check writes out all six terms, whose coefficients add up to (3 − 2)^5 = 1.

const QUESTION = 'Find the indicated term of each binomial without fully expanding the binomial. The fourth term of (3x − 2y)^5';

const video: Explainer = {
  id: 'xq-m301-9-4',
  lessonId: '',
  exam: {
    lesson: 'm301-9-4',
    source: 'OpenStax, College Algebra 2e, Exercise in section 13.6, Binomial Theorem',
    licence: 'CC BY-NC-SA 4.0, access for free at openstax.org',
    url: 'https://openstax.org/books/college-algebra-2e/pages/13-6-binomial-theorem',
    question: QUESTION,
  },
  title: 'Exam Question: The Fourth Term of (3x − 2y)^5 (The Binomial Theorem)',
  thumbnailTitle: 'The Fourth Term of (3x − 2y)⁵',
  thumbnail: 'm',
  summary:
    'A real test question, solved one small step at a time: find the fourth term of (3x − 2y)^5 without expanding it all. The terms of a binomial power are C(n, k) a^(n − k) b^k, and the fourth term has k = 3. With a = 3x and b = −2y, that is 10 × 9x² × (−8y³) = −720x²y³. Then we check by writing out all six terms and look at the traps.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Exam Question', title: 'Find the Fourth Term', subtitle: 'Of (3x − 2y)⁵, with the binomial theorem, step by step' }],
      lines: [
        { say: 'In this video, we solve a real test question about the binomial theorem. We will take it one small step at a time, so that every step makes sense.', show: 'title' },
        { say: 'The question comes from the free OpenStax College Algebra textbook. You will see where it comes from at the bottom of the screen the whole way through.' },
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
          prompt: 'Find the indicated term of each binomial without fully expanding the binomial. The fourth term of $(3x - 2y)^5$',
          answer: '${-720x^2y^3}$',
          working: '$k = 3$: $\\ C(5, 3)(3x)^2(-2y)^3 = 10 \\cdot 9x^2 \\cdot (-8y^3)$.',
        },
      ],
      lines: [
        { say: 'Here is the question, as the textbook prints it for this set of exercises.', show: 'q' },
        { say: 'Find the indicated term of each binomial without fully expanding the binomial. The fourth term of 3 x minus 2 y, all to the power 5.' },
        { say: 'If you would like to try it first, pause the video now.', wait: 5 },
      ],
    },
    {
      chapter: 'What is it asking?',
      layout: 'center',
      main: [{ kind: 'text', id: 't', size: 'md', md: 'Multiplied out, $(3x - 2y)^5$ has $6$ terms. We want **only** the **fourth** one, without writing out all six.' }],
      lines: [
        { say: 'If we multiplied out 3 x minus 2 y to the power 5, we would get 6 terms.', show: 't' },
        { say: 'We only want the fourth one, and we want to find it without writing out all six.' },
      ],
    },
    {
      chapter: 'What you need to know',
      layout: 'center',
      main: [
        { kind: 'callout', id: 'bt', tone: 'key', title: 'The general term', md: 'In $(a + b)^n$, the term with $b^k$ is $\\ C(n, k) \\, a^{n - k} \\, b^k$, and it is term number $k + 1$.' },
        { kind: 'math', id: 'pas', size: 'lg', lines: ['n = 5: \\quad 1 \\quad 5 \\quad 10 \\quad 10 \\quad 5 \\quad 1'] },
      ],
      lines: [
        { say: 'Here is what we need. In "a" plus b to the power n, the term with b to the power k is n choose k, times "a" to the power n minus k, times b to the power k. And it is term number k plus 1, because the first term has k equal to 0.', show: 'bt' },
        { say: 'For n equals 5, the numbers n choose k are row 5 of Pascal\'s triangle: 1, 5, 10, 10, 5, 1.', show: 'pas' },
      ],
    },
    {
      chapter: 'The plan',
      layout: 'center',
      main: [{ kind: 'bullets', id: 'plan', items: ['Name $a$, $b$, $n$ and $k$', 'Write the **general term**', 'Work out each **power** and multiply'] }],
      lines: [
        { say: 'Here is the plan. First, name "a", b, n and k.', show: 'plan.0' },
        { say: 'Second, write the general term.', show: 'plan.1' },
        { say: 'Third, work out each power and multiply.', show: 'plan.2' },
      ],
    },
    {
      chapter: 'Step 1: Name the parts',
      layout: 'center',
      main: [{ kind: 'math', id: 'm', size: 'lg', lines: ['a = 3x, \\quad b = {-2y}, \\quad n = 5', '\\text{fourth term: } k + 1 = 4, \\ \\text{so } \\good{k = 3}'] }],
      lines: [
        { say: 'Step one. "a" is 3 x, and b is negative 2 y. Keep the minus sign with the b. And n is 5.', show: 'm.0' },
        { say: 'The fourth term is term number k plus 1, so k is 3, not 4.', show: 'm.1', focus: 'm.1' },
      ],
    },
    {
      chapter: 'Step 2: The general term',
      layout: 'center',
      main: [{ kind: 'math', id: 'm', size: 'lg', lines: ['C(5, 3) \\, (3x)^{5 - 3} \\, ({-2y})^3', '= C(5, 3) \\, (3x)^2 \\, ({-2y})^3'] }],
      lines: [
        { say: 'Step two. Put these into the general term: 5 choose 3, times 3 x to the power 5 minus 3, times negative 2 y to the power 3.', show: 'm.0' },
        { say: '5 minus 3 is 2, so it is 5 choose 3, times 3 x squared, times negative 2 y cubed.', show: 'm.1' },
      ],
    },
    {
      chapter: 'Step 3: Work it out',
      layout: 'center',
      main: [{ kind: 'math', id: 'm', size: 'lg', lines: ['C(5, 3) = 10, \\quad (3x)^2 = 9x^2, \\quad ({-2y})^3 = {-8y^3}', '10 \\times 9x^2 \\times ({-8y^3}) = \\good{-720x^2y^3}'] }],
      lines: [
        { say: 'Step three. 5 choose 3 is 10. 3 x squared is 9 x squared, since the 3 is squared too. And negative 2 y cubed is negative 8 y cubed, since a negative number cubed stays negative.', show: 'm.0' },
        { say: 'Multiply: 10 times 9 is 90, and 90 times negative 8 is negative 720. The fourth term is negative 720 x squared y cubed.', show: 'm.1', focus: 'm.1' },
      ],
    },
    {
      chapter: 'Check the answer',
      layout: 'center',
      main: [
        {
          kind: 'table',
          id: 'all',
          head: ['$k$', '$C(5, k)$', 'Term'],
          rows: [
            ['$0$', '$1$', '$243x^5$'],
            ['$1$', '$5$', '${-810x^4y}$'],
            ['$2$', '$10$', '$1080x^3y^2$'],
            ['$3$', '$10$', '$\\good{-720x^2y^3}$'],
            ['$4$', '$5$', '$240xy^4$'],
            ['$5$', '$1$', '${-32y^5}$'],
          ],
        },
        { kind: 'math', id: 'm', size: 'md', lines: ['243 - 810 + 1080 - 720 + 240 - 32 = 1 = (3 - 2)^5 \\ \\checkmark'] },
      ],
      lines: [
        { say: 'Let us check by writing out all six terms, one for each k from 0 to 5. The fourth row, with k equal to 3, is negative 720 x squared y cubed.', show: 'all' },
        { say: 'If we put x and y both equal to 1, the terms must add up to 3 minus 2, to the power 5, which is 1. And 243 minus 810, plus 1,080, minus 720, plus 240, minus 32 is exactly 1. It checks out.', show: 'm', focus: 'm' },
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
            ['$k = 4$: $\\ 240xy^4$', 'that is the **fifth** term; the fourth has $k = 3$'],
            ['$720x^2y^3$', '$({-2})^3 = {-8}$: keep the **minus** sign'],
            ['$10x^2y^3$', 'raise the $3$ and the $2$ too: $(3x)^2 = 9x^2$'],
          ],
        },
      ],
      lines: [
        { say: 'Here are the traps.', show: 'traps' },
        { say: 'Using k equals 4 gives the fifth term, because the first term has k equal to 0.' },
        { say: 'Dropping the minus sign gives positive 720. Negative 2, cubed, is negative 8.' },
        { say: 'And the numbers in front of x and y are raised to the power too. 3 x squared is 9 x squared, not x squared.' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q2',
          prompt: 'Find the third term of $(x + 2)^6$.',
          choices: ['$15x^4$', '$30x^4$', '$60x^4$', '$160x^3$'],
          answer: 2,
          working: 'Third term: $k = 2$. $\\ C(6, 2) \\, x^4 \\, 2^2 = 15 \\cdot x^4 \\cdot 4 = 60x^4$.',
        },
      ],
      lines: [
        { say: 'Your turn. Find the third term of x plus 2, all to the power 6. Pause the video and try it.', show: 'q2', wait: 8 },
        { say: 'The third term has k equal to 2. 6 choose 2 is 15, times x to the power 4, times 2 squared, which is 4. 15 times 4 is 60, so the term is 60 x to the power 4: choice C.', show: 'q2.answer' },
      ],
    },
    {
      chapter: 'Summary',
      layout: 'center',
      main: [{ kind: 'bullets', id: 'sum', check: true, items: ['Term with $b^k$: $\\ C(n, k) \\, a^{n - k} \\, b^k$', 'Term number $k + 1$: the **fourth** term has $k = 3$', 'Keep the **sign** with $b$', 'Raise the **whole** of $a$ and $b$ to their powers'] }],
      lines: [
        { say: 'Here is what to remember. The term with b to the power k is n choose k, times "a" to the power n minus k, times b to the power k.', show: 'sum.0' },
        { say: 'It is term number k plus 1, so the fourth term has k equal to 3.', show: 'sum.1' },
        { say: 'Keep the sign with b.', show: 'sum.2' },
        { say: 'And raise the whole of "a" and b, numbers included, to their powers. For more on the binomial theorem, watch this lesson\'s explainer video on Gradileo.', show: 'sum.3' },
      ],
    },
  ],
};

export default video;
