import type { Explainer } from '@/video/script.ts';

// Exam question for Math 20-1 lesson 4.1 (factoring polynomial expressions, by decomposition):
// 12x² + 11x + 2 = 0 by grouping. The question is a Try It from OpenStax College Algebra 2e, word
// for word (section 2.5, Quadratic Equations, CC BY-NC-SA 4.0), whose answer gives (3x + 2)(4x + 1)
// = 0, so x = −2/3 or x = −1/4. ac = 24 = 3 × 8 and 3 + 8 = 11.

const QUESTION = 'Solve using factoring by grouping: 12x² + 11x + 2 = 0.';

const video: Explainer = {
  id: 'xq-m201-4-1',
  lessonId: '',
  exam: {
    lesson: 'm201-4-1',
    source: 'OpenStax, College Algebra 2e, Try It in section 2.5, Quadratic Equations',
    licence: 'CC BY-NC-SA 4.0, access for free at openstax.org',
    url: 'https://openstax.org/books/college-algebra-2e/pages/2-5-quadratic-equations',
    question: QUESTION,
  },
  title: 'Exam Question: Solve 12x² + 11x + 2 = 0 by Factoring by Grouping (Decomposition)',
  thumbnailTitle: 'Factor 12x² + 11x + 2',
  thumbnail: 'm',
  summary:
    'A real test question, solved one small step at a time: solve 12x² + 11x + 2 = 0 by factoring by grouping. We look for two numbers that multiply to 12 × 2 = 24 and add to 11, split the middle term, group, and get (3x + 2)(4x + 1) = 0, so x = −2/3 or x = −1/4. Then we check the answer and look at the traps.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Exam Question', title: 'Factor by Grouping', subtitle: 'Factoring by decomposition, step by step' }],
      lines: [
        { say: 'In this video, we solve a real test question about factoring by decomposition, also called factoring by grouping. We will take it one small step at a time, so that every step makes sense.', show: 'title' },
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
          prompt: 'Solve using factoring by grouping: $12x^2 + 11x + 2 = 0$.',
          answer: '$x = -\\dfrac{2}{3}$ or $x = -\\dfrac{1}{4}$',
          working: '$12x^2 + 3x + 8x + 2 = 3x(4x + 1) + 2(4x + 1) = (3x + 2)(4x + 1)$',
        },
      ],
      lines: [
        { say: 'Here is the question, exactly as it was printed.', show: 'q' },
        { say: 'Solve using factoring by grouping: 12 x squared, plus 11 x, plus 2, equals 0.' },
        { say: 'If you would like to try it first, pause the video now.', wait: 5 },
      ],
    },
    {
      chapter: 'What is it asking?',
      layout: 'center',
      main: [{ kind: 'text', id: 't', size: 'md', md: 'Write the left side as a **product** of two brackets. Then a product equal to $0$ tells us the values of $x$.' }],
      lines: [{ say: 'We want to write the left side as two brackets multiplied together. Once a product equals 0, it is easy to find the values of x. The leading coefficient is 12, not 1, so we use decomposition.', show: 't' }],
    },
    {
      chapter: 'What you need to know',
      layout: 'center',
      main: [
        { kind: 'callout', id: 'dec', tone: 'definition', title: 'Decomposition', md: 'For $ax^2 + bx + c$, find two numbers that **multiply to $ac$** and **add to $b$**. Split $bx$ into two terms with them, then factor each pair.' },
        { kind: 'callout', id: 'zp', tone: 'key', title: 'Zero product property', md: 'If $AB = 0$, then $A = 0$ or $B = 0$.' },
      ],
      lines: [
        { say: 'Here is what we need. To factor \"a\" x squared plus b x plus c by decomposition, find two numbers that multiply to \"a\" times c, and add to b. Use them to split the middle term into two, then factor each pair of terms.', show: 'dec' },
        { say: 'And the zero product property: if two things multiply to 0, then one of them must be 0.', show: 'zp' },
      ],
    },
    {
      chapter: 'The plan',
      layout: 'center',
      main: [{ kind: 'bullets', id: 'plan', items: ['Find two numbers: **product** $ac$, **sum** $b$', '**Split** the middle term and **group**', 'Set each bracket to **zero**'] }],
      lines: [
        { say: 'Here is the plan. First, find two numbers with the right product and sum.', show: 'plan.0' },
        { say: 'Second, split the middle term and factor in groups.', show: 'plan.1' },
        { say: 'Third, set each bracket equal to zero and solve.', show: 'plan.2' },
      ],
    },
    {
      chapter: 'Step 1: The two numbers',
      layout: 'split',
      left: [{ kind: 'math', id: 'm', size: 'md', lines: ['ac = 12 \\times 2 = 24', 'b = 11'] }],
      right: [
        {
          kind: 'table',
          id: 'pairs',
          head: ['Factors of 24', 'Sum'],
          rows: [['$1 \\times 24$', '$25$'], ['$2 \\times 12$', '$14$'], ['$3 \\times 8$', '$\\good{11}$'], ['$4 \\times 6$', '$10$']],
        },
      ],
      lines: [
        { say: 'Step one. \"a\" times c is 12 times 2, which is 24. And b is 11.', show: 'm' },
        { say: 'List the pairs of numbers that multiply to 24, and add each pair: 1 and 24 add to 25, 2 and 12 add to 14, 3 and 8 add to 11, and 4 and 6 add to 10.', show: 'pairs' },
        { say: '3 and 8 multiply to 24 and add to 11. Those are our two numbers.', focus: 'pairs' },
      ],
    },
    {
      chapter: 'Step 2: Split and group',
      layout: 'center',
      main: [{ kind: 'math', id: 'm', size: 'lg', lines: ['12x^2 + 3x + 8x + 2 = 0', '3x(4x + 1) + 2(4x + 1) = 0', '(3x + 2)(4x + 1) = 0'] }],
      lines: [
        { say: 'Step two. Split 11 x into 3 x plus 8 x. The value has not changed.', show: 'm.0' },
        { say: 'Factor each pair. The first two terms share 3 x, leaving 4 x plus 1. The last two share 2, also leaving 4 x plus 1.', show: 'm.1' },
        { say: 'Both groups contain 4 x plus 1, so take it out as a common factor: 3 x plus 2, times 4 x plus 1, equals 0.', show: 'm.2', focus: 'm.2' },
      ],
    },
    {
      chapter: 'Step 3: Solve',
      layout: 'center',
      main: [{ kind: 'math', id: 'm', size: 'lg', lines: ['3x + 2 = 0 \\quad \\text{or} \\quad 4x + 1 = 0', 'x = \\good{-\\dfrac{2}{3}} \\quad \\text{or} \\quad x = \\good{-\\dfrac{1}{4}}'] }],
      lines: [
        { say: 'Step three. The product is 0, so one of the brackets is 0: 3 x plus 2 equals 0, or 4 x plus 1 equals 0.', show: 'm.0' },
        { say: 'Take away and divide: x is negative 2 thirds, or x is negative 1 quarter. That is the answer.', show: 'm.1', focus: 'm.1' },
      ],
    },
    {
      chapter: 'Check the answer',
      layout: 'center',
      main: [{ kind: 'math', id: 'm', size: 'lg', lines: ['(3x + 2)(4x + 1) = 12x^2 + 3x + 8x + 2', '= 12x^2 + 11x + 2 \\ \\checkmark', 'x = -\\tfrac{1}{4}: \\ \\ 12\\left(\\tfrac{1}{16}\\right) - \\tfrac{11}{4} + 2 = \\tfrac{3}{4} - \\tfrac{11}{4} + \\tfrac{8}{4} = 0 \\ \\checkmark'] }],
      lines: [
        { say: 'Let us check. Multiply the brackets back out: 12 x squared, plus 3 x, plus 8 x, plus 2. That is the original expression.', show: ['m.0', 'm.1'] },
        { say: 'And put x equals negative 1 quarter into the equation: 3 quarters, minus 11 quarters, plus 8 quarters, is 0. It works.', show: 'm.2' },
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
            ['numbers that multiply to $2$', 'multiply **$a$ and $c$** first: $12 \\times 2 = 24$'],
            ['$x = \\dfrac{2}{3}$', '$3x + 2 = 0$ gives $3x = -2$: the sign flips'],
            ['$x = -2$ or $x = -1$', 'divide by the **coefficient** of $x$ too'],
          ],
        },
      ],
      lines: [
        { say: 'Here are the traps.', show: 'traps' },
        { say: 'With a leading coefficient that is not 1, the two numbers multiply to \"a\" times c, which is 24, not just c.' },
        { say: '3 x plus 2 equals 0 gives 3 x equals negative 2. Moving the 2 across changes its sign.' },
        { say: 'And divide by the coefficient of x. 3 x equals negative 2 gives x equals negative 2 thirds, not negative 2.' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q2',
          prompt: 'Factor $6x^2 + 7x + 2$.',
          choices: ['$(6x + 1)(x + 2)$', '$(2x + 2)(3x + 1)$', '$(6x + 2)(x + 1)$', '$(2x + 1)(3x + 2)$'],
          answer: 3,
          working: '$ac = 12 = 3 \\times 4$ and $3 + 4 = 7$: $6x^2 + 3x + 4x + 2 = 3x(2x + 1) + 2(2x + 1)$.',
        },
      ],
      lines: [
        { say: 'Your turn. Factor 6 x squared, plus 7 x, plus 2. Pause the video and try it.', show: 'q2', wait: 6 },
        { say: '\"a\" times c is 12, and 3 times 4 is 12 with 3 plus 4 equal to 7. Split the middle: 6 x squared plus 3 x plus 4 x plus 2. That is 3 x times 2 x plus 1, plus 2 times 2 x plus 1, so the answer is 2 x plus 1, times 3 x plus 2, choice D. Each of the others multiplies out to the wrong middle term.', show: 'q2.answer' },
      ],
    },
    {
      chapter: 'Summary',
      layout: 'center',
      main: [{ kind: 'bullets', id: 'sum', check: true, items: ['Two numbers: product $ac$, sum $b$', 'Split $bx$, factor **each pair**', 'Take out the **common bracket**', 'Set each factor to $0$, and divide by the coefficient'] }],
      lines: [
        { say: 'Here is what to remember. Find two numbers whose product is \"a\" times c and whose sum is b.', show: 'sum.0' },
        { say: 'Split the middle term, and factor each pair of terms.', show: 'sum.1' },
        { say: 'Take out the common bracket.', show: 'sum.2' },
        { say: 'Then set each factor equal to 0, and remember to divide by the coefficient of x. For more on factoring, watch this lesson\'s explainer video on Gradileo.', show: 'sum.3' },
      ],
    },
  ],
};

export default video;
