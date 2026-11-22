import type { Explainer } from '@/video/script.ts';

// Exam question for Math 10 lesson 4.4 (factoring x² + bx + c): two consecutive integers whose
// product is 56, described by x² + x − 56. The question is an exercise from OpenStax Elementary
// Algebra 2e, word for word (section 7.2, Factor Trinomials of the Form x² + bx + c,
// CC BY-NC-SA 4.0), whose answer key gives (x + 8)(x − 7): 8 × (−7) = −56 and 8 + (−7) = 1.

const QUESTION =
  'Deirdre is thinking of two consecutive integers whose product is 56. The trinomial x² + x − 56 describes how these numbers are related. Factor the trinomial.';

const video: Explainer = {
  id: 'xq-m10c-4-4',
  lessonId: '',
  exam: {
    lesson: 'm10c-4-4',
    source: 'OpenStax, Elementary Algebra 2e, Exercise in section 7.2, Factor Trinomials of the Form x² + bx + c',
    licence: 'CC BY-NC-SA 4.0, access for free at openstax.org',
    url: 'https://openstax.org/books/elementary-algebra-2e/pages/7-2-factor-trinomials-of-the-form-x2-bx-c',
    question: QUESTION,
  },
  title: 'Exam Question: Factor x² + x − 56. Two Consecutive Integers',
  thumbnailTitle: 'Factor x² + x − 56',
  thumbnail: 'm',
  summary:
    'A real test question, solved one small step at a time: Deirdre\'s two consecutive integers multiply to 56, and the trinomial x² + x − 56 describes them. We look for two numbers that multiply to −56 and add to 1, factor it as (x + 8)(x − 7), and check by expanding. Then we look at the traps.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Exam Question', title: 'Factor x² + x − 56', subtitle: 'Factoring x² + bx + c, step by step' }],
      lines: [
        { say: 'In this video, we solve a real test question about factoring a trinomial. We will take it one small step at a time, so that every step makes sense.', show: 'title' },
        { say: 'The question comes from the free OpenStax Elementary Algebra textbook. You will see where it comes from at the bottom of the screen the whole way through.' },
      ],
    },
    {
      chapter: 'The question',
      layout: 'center',
      main: [{ kind: 'try', id: 'q', kicker: 'The question', prompt: 'Deirdre is thinking of two consecutive integers whose product is $56$. The trinomial $x^2 + x - 56$ describes how these numbers are related. Factor the trinomial.', answer: '$(x + 8)(x - 7)$', working: '$8 \\times (-7) = -56$ and $8 + (-7) = 1$, so $x^2 + x - 56 = (x + 8)(x - 7)$.' }],
      lines: [
        { say: 'Here is the question, exactly as it was printed, from the consecutive integers exercises.', show: 'q' },
        { say: 'Deirdre is thinking of two consecutive integers whose product is 56. The trinomial x squared plus x minus 56 describes how these numbers are related. Factor the trinomial.' },
        { say: 'If you would like to try it first, pause the video now.', wait: 5 },
      ],
    },
    {
      chapter: 'What is it asking?',
      layout: 'center',
      main: [
        { kind: 'math', id: 'm', size: 'lg', lines: ['x(x + 1) = 56', 'x^2 + x - 56 = 0'] },
        { kind: 'text', id: 't', size: 'md', md: '**Consecutive** integers follow each other: $x$ and $x + 1$. **Factor** means write the trinomial as a product of two binomials.' },
      ],
      lines: [
        { say: 'Here is where the trinomial comes from. Consecutive integers follow each other, like 4 and 5. Call them x and x plus 1. Their product is 56.', show: 'm.0' },
        { say: 'Multiply out and move the 56 over, and you get x squared plus x minus 56. The question asks us to factor it: to write it as two binomials multiplied together.', show: ['m.1', 't'] },
      ],
    },
    {
      chapter: 'What you need to know',
      layout: 'center',
      main: [
        { kind: 'math', id: 'f', size: 'lg', lines: ['x^2 + bx + c = (x + m)(x + n)', 'm \\times n = c, \\quad m + n = b'] },
        { kind: 'text', id: 't', size: 'md', md: 'Expand $(x + m)(x + n)$ and you get $x^2 + (m + n)x + mn$. So we need two numbers that **multiply** to $c$ and **add** to $b$.' },
      ],
      lines: [
        { say: 'Here is what we need. A trinomial x squared plus b x plus c factors as x plus m, times x plus n.', show: 'f.0' },
        { say: 'Where m times n is c, and m plus n is b.', show: 'f.1' },
        { say: 'That is because when you expand x plus m times x plus n, the middle term is m plus n times x, and the last term is m times n.', show: 't' },
      ],
    },
    {
      chapter: 'The plan',
      layout: 'center',
      main: [{ kind: 'bullets', id: 'plan', items: ['Read off $b = 1$ and $c = -56$', 'Find two numbers that **multiply** to $-56$ and **add** to $1$', 'Write the **factors**, and check'] }],
      lines: [
        { say: 'Here is the plan. First, read off b and c. Here b is 1, because x means 1 x, and c is minus 56.', show: 'plan.0' },
        { say: 'Second, find two numbers that multiply to minus 56 and add to 1.', show: 'plan.1' },
        { say: 'Third, write the factors and check them.', show: 'plan.2' },
      ],
    },
    {
      chapter: 'Step 1: Find the two numbers',
      layout: 'center',
      main: [
        {
          kind: 'table',
          id: 'm',
          head: ['Factors of $-56$', 'Sum'],
          rows: [['$1,\\ -56$', '$-55$'], ['$2,\\ -28$', '$-26$'], ['$4,\\ -14$', '$-10$'], ['$7,\\ -8$', '$-1$'], ['$\\good{8,\\ -7}$', '$\\good{1}$']],
        },
      ],
      lines: [
        { say: 'Step one. The product is negative, so one number is positive and one is negative. The sum is positive, 1, so the bigger one is positive.', show: 'm' },
        { say: 'List the factor pairs of 56 and add them. 1 and minus 56 add to minus 55. 2 and minus 28 add to minus 26. 4 and minus 14 add to minus 10. 7 and minus 8 add to minus 1, close but the wrong sign.' },
        { say: 'And 8 and minus 7 add to 1. Those are the numbers: 8 times minus 7 is minus 56, and 8 plus minus 7 is 1.' },
      ],
    },
    {
      chapter: 'Step 2: Write the factors',
      layout: 'center',
      main: [{ kind: 'math', id: 'm', size: 'lg', lines: ['x^2 + x - 56 = \\good{(x + 8)(x - 7)}'] }],
      lines: [{ say: 'Step two. Put the numbers in the brackets: x plus 8, times x minus 7. That is the answer.', show: 'm.0', focus: 'm.0' }],
    },
    {
      chapter: 'Check the answer',
      layout: 'center',
      main: [{ kind: 'math', id: 'm', size: 'md', lines: ['(x + 8)(x - 7) = x^2 - 7x + 8x - 56 = x^2 + x - 56 \\ \\checkmark', 'x = 7: \\ 7 \\times 8 = 56 \\ \\checkmark'] }],
      lines: [
        { say: 'Let us check by expanding with FOIL. x times x is x squared, the outers give minus 7 x, the inners give 8 x, and the lasts give minus 56. Minus 7 x plus 8 x is x, so we get back x squared plus x minus 56.', show: 'm.0' },
        { say: 'And the factors tell us Deirdre\'s numbers. x minus 7 is zero when x is 7, so the integers could be 7 and 8: 7 times 8 is 56. The other factor gives minus 8 and minus 7, which also multiply to 56.', show: 'm.1' },
      ],
    },
    {
      chapter: 'The traps',
      layout: 'center',
      main: [
        {
          kind: 'table',
          id: 'traps',
          head: ['Trap', 'Expands to'],
          rows: [
            ['$(x - 8)(x + 7)$', '$x^2 - x - 56$: the middle sign is wrong'],
            ['$(x + 7)(x + 8)$', '$x^2 + 15x + 56$: the product must be **negative**'],
            ['$(x + 14)(x - 4)$', '$x^2 + 10x - 56$: the sum must be $1$'],
          ],
        },
      ],
      lines: [
        { say: 'Here are the traps, and each one is caught by expanding.', show: 'traps' },
        { say: 'Swapping the signs, x minus 8 times x plus 7, gives minus x in the middle. The bigger number must be positive.' },
        { say: 'Using plus 7 and plus 8 gives plus 56 at the end. The product must be negative, so the signs must differ.' },
        { say: 'And 14 and minus 4 multiply to minus 56, but add to 10, not 1.' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q2',
          prompt: 'Factor: $x^2 - 2x - 35$.',
          choices: ['$(x - 7)(x + 5)$', '$(x + 7)(x - 5)$', '$(x - 7)(x - 5)$', '$(x - 35)(x + 1)$'],
          answer: 0,
          working: '$-7 \\times 5 = -35$ and $-7 + 5 = -2$, so $(x - 7)(x + 5)$.',
        },
      ],
      lines: [
        { say: 'Your turn. Factor x squared minus 2 x minus 35. Pause the video and try it.', show: 'q2', wait: 6 },
        { say: 'We need two numbers that multiply to minus 35 and add to minus 2: minus 7 and 5. So it is x minus 7, times x plus 5, choice A. B gives plus 2 x in the middle, C gives plus 35 at the end, and D gives minus 34 x.', show: 'q2.answer' },
      ],
    },
    {
      chapter: 'Summary',
      layout: 'center',
      main: [{ kind: 'bullets', id: 'sum', check: true, items: ['$x^2 + bx + c = (x + m)(x + n)$', 'Find $m$ and $n$: **multiply** to $c$, **add** to $b$', '$c$ negative: the signs **differ**', 'Check by **expanding**'] }],
      lines: [
        { say: 'Here is what to remember. x squared plus b x plus c factors as x plus m, times x plus n.', show: 'sum.0' },
        { say: 'Find two numbers that multiply to c and add to b.', show: 'sum.1' },
        { say: 'If c is negative, the two numbers have different signs.', show: 'sum.2' },
        { say: 'And always check by expanding. For more on factoring trinomials, watch this lesson\'s explainer video on Gradileo.', show: 'sum.3' },
      ],
    },
  ],
};

export default video;
