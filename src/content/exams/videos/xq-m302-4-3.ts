import type { Explainer } from '@/video/script.ts';

// Exam question for Math 30-2 lesson 4.3 (rational equations). The question is an exercise from
// OpenStax Intermediate Algebra 2e, word for word (section 7.4, Solve Rational Equations, CC
// BY-NC-SA 4.0), with its set's instruction in front of it. q cannot be 2 or −4. Multiplying by
// (q − 2)(q + 4) gives −10(q + 4) − 7(q − 2) = (q − 2)(q + 4), so q² + 19q + 18 = 0 and q = −18 or
// q = −1, as in the book's answer. The check puts both back into the equation.

const QUESTION = 'Solve each rational equation. −10/(q − 2) − 7/(q + 4) = 1';

const video: Explainer = {
  id: 'xq-m302-4-3',
  lessonId: '',
  exam: {
    lesson: 'm302-4-3',
    source: 'OpenStax, Intermediate Algebra 2e, Exercise in section 7.4, Solve Rational Equations',
    licence: 'CC BY-NC-SA 4.0, access for free at openstax.org',
    url: 'https://openstax.org/books/intermediate-algebra-2e/pages/7-4-solve-rational-equations',
    question: QUESTION,
  },
  title: 'Exam Question: Solve −10/(q − 2) − 7/(q + 4) = 1 (Rational Equations)',
  thumbnailTitle: 'Solve a Rational Equation',
  thumbnail: 'm',
  summary:
    'A real test question, solved one small step at a time: solve −10/(q − 2) − 7/(q + 4) = 1. We note that q cannot be 2 or −4, multiply every term by (q − 2)(q + 4) to clear the fractions, and solve the quadratic q² + 19q + 18 = 0, which gives q = −18 or q = −1. Neither is a non-permissible value, so both are solutions. Then we check both and look at the traps.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Exam Question', title: 'Solve a Rational Equation', subtitle: 'Rational equations, step by step' }],
      lines: [
        { say: 'In this video, we solve a real test question about rational equations. We will take it one small step at a time, so that every step makes sense.', show: 'title' },
        { say: 'The question comes from the free OpenStax Intermediate Algebra textbook. You will see where it comes from at the bottom of the screen the whole way through.' },
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
          prompt: 'Solve each rational equation. $\\dfrac{-10}{q - 2} - \\dfrac{7}{q + 4} = 1$',
          answer: '$q = {-18}$ or $q = {-1}$',
          working: 'Multiply by $(q - 2)(q + 4)$: $\\ q^2 + 19q + 18 = 0$.',
        },
      ],
      lines: [
        { say: 'Here is the question, as the textbook prints it for this set of exercises.', show: 'q' },
        { say: 'Solve each rational equation. Negative 10 over q minus 2, minus 7 over q plus 4, equals 1.' },
        { say: 'If you would like to try it first, pause the video now.', wait: 5 },
      ],
    },
    {
      chapter: 'What is it asking?',
      layout: 'center',
      main: [{ kind: 'text', id: 't', size: 'md', md: 'Find every value of $q$ that makes the two sides **equal**, without ever dividing by zero.' }],
      lines: [
        { say: 'We need every value of q that makes the two sides equal.', show: 't' },
        { say: 'And none of them may make a denominator zero.' },
      ],
    },
    {
      chapter: 'What you need to know',
      layout: 'center',
      main: [
        { kind: 'callout', id: 'clear', tone: 'key', title: 'Clear the fractions', md: 'Multiply **every** term on **both** sides by the LCD. The fractions disappear.' },
        { kind: 'callout', id: 'npv', tone: 'tip', title: 'Non-permissible values', md: 'List them **first**. A solution equal to one of them is **extraneous** and is rejected.' },
      ],
      lines: [
        { say: 'Here is what we need. Multiply every term, on both sides, by the lowest common denominator. That clears the fractions.', show: 'clear' },
        { say: 'And list the non-permissible values first. If a solution equals one of them, it is extraneous, and we reject it.', show: 'npv' },
      ],
    },
    {
      chapter: 'The plan',
      layout: 'center',
      main: [{ kind: 'bullets', id: 'plan', items: ['List the **non-permissible** values', 'Multiply by the **LCD**', 'Solve the **quadratic** and check'] }],
      lines: [
        { say: 'Here is the plan. First, list the non-permissible values.', show: 'plan.0' },
        { say: 'Second, multiply every term by the LCD.', show: 'plan.1' },
        { say: 'Third, solve the quadratic and check the solutions.', show: 'plan.2' },
      ],
    },
    {
      chapter: 'Step 1: Not allowed',
      layout: 'center',
      main: [{ kind: 'math', id: 'm', size: 'lg', lines: ['q - 2 \\ne 0, \\quad q + 4 \\ne 0', '\\good{q \\ne 2, \\ q \\ne {-4}}'] }],
      lines: [
        { say: 'Step one. The denominators are q minus 2 and q plus 4. Neither may be zero.', show: 'm.0' },
        { say: 'So q cannot be 2, and q cannot be negative 4.', show: 'm.1', focus: 'm.1' },
      ],
    },
    {
      chapter: 'Step 2: Clear the fractions',
      layout: 'center',
      main: [{ kind: 'math', id: 'm', size: 'lg', lines: ['\\text{LCD} = (q - 2)(q + 4)', '-10(q + 4) - 7(q - 2) = (q - 2)(q + 4)', '-17q - 26 = q^2 + 2q - 8'] }],
      lines: [
        { say: 'Step two. The LCD is q minus 2, times q plus 4.', show: 'm.0' },
        { say: 'Multiply every term by it. In the first fraction q minus 2 cancels, leaving negative 10 times q plus 4. In the second, q plus 4 cancels, leaving negative 7 times q minus 2. And 1 becomes the whole LCD.', show: 'm.1' },
        { say: 'Expand: negative 10 q minus 40 minus 7 q plus 14 is negative 17 q minus 26. On the right, q squared plus 2 q minus 8.', show: 'm.2', focus: 'm.2' },
      ],
    },
    {
      chapter: 'Step 3: Solve',
      layout: 'center',
      main: [{ kind: 'math', id: 'm', size: 'lg', lines: ['0 = q^2 + 19q + 18', '0 = (q + 18)(q + 1)', '\\good{q = {-18} \\text{ or } q = {-1}}'] }],
      lines: [
        { say: 'Step three. Move everything to the right: q squared plus 19 q plus 18 equals 0.', show: 'm.0' },
        { say: 'Two numbers that multiply to 18 and add to 19: 18 and 1. So q plus 18, times q plus 1, equals 0.', show: 'm.1' },
        { say: 'q is negative 18 or negative 1. Neither is 2 or negative 4, so both are solutions.', show: 'm.2', focus: 'm.2' },
      ],
    },
    {
      chapter: 'Check the answer',
      layout: 'center',
      main: [{ kind: 'math', id: 'm', size: 'lg', lines: ['q = {-18}: \\quad \\dfrac{-10}{-20} - \\dfrac{7}{-14} = \\dfrac{1}{2} + \\dfrac{1}{2} = 1 \\ \\checkmark', 'q = {-1}: \\quad \\dfrac{-10}{-3} - \\dfrac{7}{3} = \\dfrac{10}{3} - \\dfrac{7}{3} = 1 \\ \\checkmark'] }],
      lines: [
        { say: 'Let us check both. At q equals negative 18: negative 10 over negative 20 is one half, and minus 7 over negative 14 is plus one half. One half plus one half is 1.', show: 'm.0' },
        { say: 'At q equals negative 1: negative 10 over negative 3 is 10 thirds, minus 7 thirds is 3 thirds, which is 1. Both check out.', show: 'm.1', focus: 'm.1' },
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
            ['right side stays $1$', 'multiply **every** term, the $1$ as well'],
            ['$-10q - 40 - 7q - 14$', '$-7(q - 2) = -7q \\bad{+} 14$'],
            ['skipping the check', 'a root equal to $2$ or $-4$ would be **extraneous**'],
          ],
        },
      ],
      lines: [
        { say: 'Here are the traps.', show: 'traps' },
        { say: 'Multiply every term by the LCD, including the 1 on the right. Otherwise the equation changes.' },
        { say: 'Watch the signs. Negative 7 times negative 2 is plus 14.' },
        { say: 'And always compare your solutions with the non-permissible values. Here both are fine, but a root of 2 or negative 4 would have to be rejected.' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q2',
          prompt: 'Solve $1 + \\dfrac{2}{x} = \\dfrac{15}{x^2}$.',
          choices: ['$x = {-5}$ or $x = 3$', '$x = 5$ or $x = {-3}$', '$x = {-5}$ only', '$x = 3$ only'],
          answer: 0,
          working: 'Multiply by $x^2$: $\\ x^2 + 2x - 15 = 0$, so $(x + 5)(x - 3) = 0$. Neither is $0$.',
        },
      ],
      lines: [
        { say: 'Your turn. Solve 1 plus 2 over x equals 15 over x squared. Pause the video and try it.', show: 'q2', wait: 8 },
        { say: 'x cannot be 0. Multiply every term by x squared: x squared plus 2 x minus 15 equals 0, which factors as x plus 5, times x minus 3. So x is negative 5 or 3: choice "A".', show: 'q2.answer' },
      ],
    },
    {
      chapter: 'Summary',
      layout: 'center',
      main: [{ kind: 'bullets', id: 'sum', check: true, items: ['List the **non-permissible** values first', 'Multiply **every** term by the LCD', 'Solve, then **reject** any non-permissible root', 'Check each answer in the **original** equation'] }],
      lines: [
        { say: 'Here is what to remember. List the non-permissible values first.', show: 'sum.0' },
        { say: 'Multiply every term by the LCD.', show: 'sum.1' },
        { say: 'Solve, then reject any root that is not permitted.', show: 'sum.2' },
        { say: 'And check each answer in the original equation. For more on rational equations, watch this lesson\'s explainer video on Gradileo.', show: 'sum.3' },
      ],
    },
  ],
};

export default video;
