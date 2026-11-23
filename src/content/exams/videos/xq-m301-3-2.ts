import type { Explainer } from '@/video/script.ts';

// Exam question for Math 30-1 lesson 3.2 (the remainder theorem). The question is an exercise from
// OpenStax College Algebra 2e, word for word (section 5.5, Zeros of Polynomial Functions,
// CC BY-NC-SA 4.0), with its set's instruction in front of it. x + 3 = x − (−3), so the remainder
// is P(−3) = −81 − 18 − 3 − 4 = −106, as in the book's answer; synthetic division agrees.

const QUESTION = 'Use the Remainder Theorem to find the remainder. (3x³ − 2x² + x − 4) ÷ (x + 3)';

const video: Explainer = {
  id: 'xq-m301-3-2',
  lessonId: '',
  exam: {
    lesson: 'm301-3-2',
    source: 'OpenStax, College Algebra 2e, Exercise in section 5.5, Zeros of Polynomial Functions',
    licence: 'CC BY-NC-SA 4.0, access for free at openstax.org',
    url: 'https://openstax.org/books/college-algebra-2e/pages/5-5-zeros-of-polynomial-functions',
    question: QUESTION,
  },
  title: 'Exam Question: The Remainder of (3x³ − 2x² + x − 4) ÷ (x + 3) (The Remainder Theorem)',
  thumbnailTitle: 'Find the Remainder Fast',
  thumbnail: 'rt',
  summary:
    'A real test question, solved one small step at a time: use the Remainder Theorem to find the remainder of (3x³ − 2x² + x − 4) ÷ (x + 3). Dividing by x + 3 means substituting x = −3, and P(−3) = −106. Then we check with synthetic division and look at the sign traps.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Exam Question', title: 'Find the Remainder Fast', subtitle: 'The remainder theorem, step by step' }],
      lines: [
        { say: 'In this video, we solve a real test question about the remainder theorem. We will take it one small step at a time, so that every step makes sense.', show: 'title' },
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
          prompt: 'Use the Remainder Theorem to find the remainder. $(3x^3 - 2x^2 + x - 4) \\div (x + 3)$',
          answer: '$-106$',
          working: '$x + 3 = x - (-3)$, so the remainder is $P(-3) = -81 - 18 - 3 - 4 = -106$.',
        },
      ],
      lines: [
        { say: 'Here is the question, as the textbook prints it for this set of exercises.', show: 'q' },
        { say: 'Use the Remainder Theorem to find the remainder. 3 x cubed, minus 2 x squared, plus x, minus 4, divided by x plus 3.' },
        { say: 'If you would like to try it first, pause the video now.', wait: 5 },
      ],
    },
    {
      chapter: 'What is it asking?',
      layout: 'center',
      main: [{ kind: 'text', id: 't', size: 'md', md: 'We want only what is **left over** after the division. The Remainder Theorem finds it **without dividing**.' }],
      lines: [
        { say: 'We only want the remainder, what is left over after dividing.', show: 't' },
        { say: 'The Remainder Theorem lets us find it without doing the division at all.' },
      ],
    },
    {
      chapter: 'What you need to know',
      layout: 'center',
      main: [
        { kind: 'callout', id: 'rt', tone: 'key', title: 'The Remainder Theorem', md: 'When a polynomial $P(x)$ is divided by $x - a$, the remainder is $P(a)$.' },
        { kind: 'callout', id: 'a', tone: 'tip', title: 'Find a', md: '$a$ is the value that makes the divisor **zero**: for $x + 3$, $a = -3$.' },
      ],
      lines: [
        { say: 'Here is what we need. When a polynomial P of x is divided by x minus "a", the remainder is P of "a".', show: 'rt' },
        { say: 'And "a" is the value that makes the divisor zero. For x plus 3, that is negative 3.', show: 'a' },
      ],
    },
    {
      chapter: 'The plan',
      layout: 'center',
      main: [{ kind: 'bullets', id: 'plan', items: ['Find $a$ from the **divisor**', '**Substitute** $a$ into the polynomial', '**Simplify** carefully, one term at a time'] }],
      lines: [
        { say: 'Here is the plan. First, find "a" from the divisor.', show: 'plan.0' },
        { say: 'Second, substitute "a" into the polynomial.', show: 'plan.1' },
        { say: 'Third, simplify carefully, one term at a time.', show: 'plan.2' },
      ],
    },
    {
      chapter: 'Step 1: Find a',
      layout: 'center',
      main: [{ kind: 'math', id: 'm', size: 'lg', lines: ['x + 3 = x - ({-3})', 'a = \\good{-3}'] }],
      lines: [
        { say: 'Step one. Write x plus 3 in the form x minus "a": it is x minus negative 3.', show: 'm.0' },
        { say: 'So "a" is negative 3. It is the value that makes x plus 3 equal to zero.', show: 'm.1', focus: 'm.1' },
      ],
    },
    {
      chapter: 'Step 2: Substitute',
      layout: 'center',
      main: [{ kind: 'math', id: 'm', size: 'lg', lines: ['P({-3}) = 3({-3})^3 - 2({-3})^2 + ({-3}) - 4', '({-3})^3 = {-27}, \\quad ({-3})^2 = 9'] }],
      lines: [
        { say: 'Step two. Put negative 3 in place of every x. Use brackets, so the signs stay right.', show: 'm.0' },
        { say: 'Negative 3 cubed is negative 27, because an odd power keeps the minus sign. Negative 3 squared is positive 9.', show: 'm.1', focus: 'm.1' },
      ],
    },
    {
      chapter: 'Step 3: Simplify',
      layout: 'center',
      main: [{ kind: 'math', id: 'm', size: 'lg', lines: ['P({-3}) = 3({-27}) - 2(9) - 3 - 4', '= {-81} - 18 - 3 - 4', '= \\good{-106}'] }],
      lines: [
        { say: 'Step three. Put those in: 3 times negative 27, minus 2 times 9, minus 3, minus 4.', show: 'm.0' },
        { say: 'That is negative 81, minus 18, minus 3, minus 4.', show: 'm.1' },
        { say: 'All together, negative 106. So the remainder is negative 106.', show: 'm.2', focus: 'm.2' },
      ],
    },
    {
      chapter: 'Check the answer',
      layout: 'center',
      main: [
        {
          kind: 'math',
          id: 'm',
          size: 'lg',
          lines: ['\\begin{array}{r|rrrr} {-3} & 3 & {-2} & 1 & {-4} \\\\ & & {-9} & 33 & {-102} \\\\ \\hline & 3 & {-11} & 34 & \\good{-106} \\end{array}'],
        },
      ],
      lines: [
        { say: 'Let us check with synthetic division by negative 3. Bring down the 3. 3 times negative 3 is negative 9, and negative 2 plus negative 9 is negative 11.', show: 'm.0' },
        { say: 'Negative 11 times negative 3 is 33, and 1 plus 33 is 34. Then 34 times negative 3 is negative 102, and negative 4 plus negative 102 is negative 106.', focus: 'm.0' },
        { say: 'The last number is the remainder: negative 106, the same answer. It checks out.' },
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
            ['$P(3) = 62$', 'for $x + 3$, use $a = -3$: the value that makes it **zero**'],
            ['$({-3})^3 = 27$', 'an **odd** power keeps the minus sign: $-27$'],
            ['$-2({-3})^2 = 18$', 'square **first**: $9$, then $-2 \\times 9 = -18$'],
          ],
        },
      ],
      lines: [
        { say: 'Here are the traps.', show: 'traps' },
        { say: 'Substituting positive 3 gives 62, which is the remainder for x minus 3, not x plus 3.' },
        { say: 'Negative 3 cubed is negative 27. An odd power keeps the minus sign.' },
        { say: 'And square first: negative 3 squared is 9, then negative 2 times 9 is negative 18.' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q2',
          prompt: 'What is the remainder when $x^3 - 4x + 5$ is divided by $x - 2$?',
          choices: ['$-5$', '$1$', '$5$', '$13$'],
          answer: 2,
          working: '$a = 2$, so the remainder is $P(2) = 8 - 8 + 5 = 5$.',
        },
      ],
      lines: [
        { say: 'Your turn. What is the remainder when x cubed, minus 4 x, plus 5 is divided by x minus 2? Pause the video and try it.', show: 'q2', wait: 6 },
        { say: 'Here "a" is 2. P of 2 is 8, minus 8, plus 5, which is 5: choice C.', show: 'q2.answer' },
      ],
    },
    {
      chapter: 'Summary',
      layout: 'center',
      main: [{ kind: 'bullets', id: 'sum', check: true, items: ['Dividing by $x - a$ leaves remainder $P(a)$', '$a$ makes the divisor **zero**: $x + 3 \\to -3$', 'Use **brackets** for negative values', 'Check with **synthetic division**'] }],
      lines: [
        { say: 'Here is what to remember. Dividing P of x by x minus "a" leaves the remainder P of "a".', show: 'sum.0' },
        { say: '"a" is the value that makes the divisor zero, so x plus 3 gives negative 3.', show: 'sum.1' },
        { say: 'Use brackets when you substitute a negative number.', show: 'sum.2' },
        { say: 'And check with synthetic division. For more on the remainder theorem, watch this lesson\'s explainer video on Gradileo.', show: 'sum.3' },
      ],
    },
  ],
};

export default video;
