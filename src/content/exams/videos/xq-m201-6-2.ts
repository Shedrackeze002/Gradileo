import type { Explainer } from '@/video/script.ts';

// Exam question for Math 20-1 lesson 6.2 (multiplying and dividing rational expressions):
// (9x² − 16)/(3x² + 17x − 28) ÷ (3x² − 2x − 8)/(x² + 5x − 14). The question is a Try It from
// OpenStax College Algebra 2e, word for word (section 1.6, Rational Expressions, CC BY-NC-SA 4.0),
// whose answer is 1: flip the second fraction, factor everything, and every factor cancels.

const QUESTION =
  'Divide the rational expressions and express the quotient in simplest form: (9x² − 16)/(3x² + 17x − 28) ÷ (3x² − 2x − 8)/(x² + 5x − 14)';

const video: Explainer = {
  id: 'xq-m201-6-2',
  lessonId: '',
  exam: {
    lesson: 'm201-6-2',
    source: 'OpenStax, College Algebra 2e, Try It in section 1.6, Rational Expressions',
    licence: 'CC BY-NC-SA 4.0, access for free at openstax.org',
    url: 'https://openstax.org/books/college-algebra-2e/pages/1-6-rational-expressions',
    question: QUESTION,
  },
  title: 'Exam Question: Divide Two Rational Expressions (Multiplying and Dividing Rational Expressions)',
  thumbnailTitle: 'Divide Rational Expressions',
  thumbnail: 'm',
  summary:
    'A real test question, solved one small step at a time: divide (9x² − 16)/(3x² + 17x − 28) by (3x² − 2x − 8)/(x² + 5x − 14). We multiply by the reciprocal, factor all four polynomials, and every factor cancels, so the quotient is 1. Then we check with a number and look at the traps.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Exam Question', title: 'Divide the Fractions', subtitle: 'Multiplying and dividing rational expressions, step by step' }],
      lines: [
        { say: 'In this video, we solve a real test question about dividing rational expressions. We will take it one small step at a time, so that every step makes sense.', show: 'title' },
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
          prompt: 'Divide the rational expressions and express the quotient in simplest form: $\\dfrac{9x^2 - 16}{3x^2 + 17x - 28} \\div \\dfrac{3x^2 - 2x - 8}{x^2 + 5x - 14}$',
          answer: '$1$',
          working: '$\\dfrac{(3x - 4)(3x + 4)}{(3x - 4)(x + 7)} \\cdot \\dfrac{(x + 7)(x - 2)}{(3x + 4)(x - 2)} = 1$',
        },
      ],
      lines: [
        { say: 'Here is the question, exactly as it was printed.', show: 'q' },
        { say: 'Divide 9 x squared minus 16, over 3 x squared plus 17 x minus 28, by 3 x squared minus 2 x minus 8, over x squared plus 5 x minus 14. Give the answer in simplest form.' },
        { say: 'If you would like to try it first, pause the video now.', wait: 5 },
      ],
    },
    {
      chapter: 'What is it asking?',
      layout: 'center',
      main: [{ kind: 'text', id: 't', size: 'md', md: 'Dividing fractions means **multiplying by the reciprocal**. Then we factor all four polynomials and cancel what the top and bottom share.' }],
      lines: [{ say: 'Rational expressions divide just like number fractions: keep the first, flip the second, and multiply. Then we factor everything and cancel the factors that the top and bottom share.', show: 't' }],
    },
    {
      chapter: 'What you need to know',
      layout: 'center',
      main: [
        { kind: 'callout', id: 'flip', tone: 'definition', title: 'Dividing fractions', md: '$\\dfrac{A}{B} \\div \\dfrac{C}{D} = \\dfrac{A}{B} \\cdot \\dfrac{D}{C}$, just like $\\dfrac{1}{2} \\div \\dfrac{3}{4} = \\dfrac{1}{2} \\cdot \\dfrac{4}{3}$.' },
        { kind: 'callout', id: 'dos', tone: 'key', title: 'Difference of squares', md: '$9x^2 - 16 = (3x)^2 - 4^2 = (3x - 4)(3x + 4)$' },
      ],
      lines: [
        { say: 'Here is what we need. To divide by a fraction, multiply by its reciprocal. 1 half divided by 3 quarters is 1 half times 4 thirds.', show: 'flip' },
        { say: 'And 9 x squared minus 16 is a difference of squares: 3 x squared minus 4 squared, which is 3 x minus 4, times 3 x plus 4.', show: 'dos' },
      ],
    },
    {
      chapter: 'The plan',
      layout: 'center',
      main: [{ kind: 'bullets', id: 'plan', items: ['Multiply by the **reciprocal**', '**Factor** all four polynomials', 'Cancel the **common factors**'] }],
      lines: [
        { say: 'Here is the plan. First, change the division into multiplication by the reciprocal.', show: 'plan.0' },
        { say: 'Second, factor all four polynomials.', show: 'plan.1' },
        { say: 'Third, cancel the common factors.', show: 'plan.2' },
      ],
    },
    {
      chapter: 'Step 1: Flip and multiply',
      layout: 'center',
      main: [{ kind: 'math', id: 'm', size: 'lg', lines: ['\\dfrac{9x^2 - 16}{3x^2 + 17x - 28} \\cdot \\dfrac{x^2 + 5x - 14}{3x^2 - 2x - 8}'] }],
      lines: [
        { say: 'Step one. Keep the first fraction, change divide to times, and flip the second fraction upside down.', show: 'm.0', focus: 'm.0' },
      ],
    },
    {
      chapter: 'Step 2: Factor',
      layout: 'center',
      main: [
        {
          kind: 'math',
          id: 'm',
          size: 'lg',
          lines: [
            '9x^2 - 16 = (3x - 4)(3x + 4)',
            '3x^2 + 17x - 28 = (3x - 4)(x + 7)',
            'x^2 + 5x - 14 = (x + 7)(x - 2)',
            '3x^2 - 2x - 8 = (3x + 4)(x - 2)',
          ],
        },
      ],
      lines: [
        { say: 'Step two. Factor each polynomial. The first is the difference of squares: 3 x minus 4, times 3 x plus 4.', show: 'm.0' },
        { say: '3 x squared plus 17 x minus 28: 3 times negative 28 is negative 84, and 21 and negative 4 multiply to negative 84 and add to 17. It factors as 3 x minus 4, times x plus 7.', show: 'm.1' },
        { say: 'x squared plus 5 x minus 14: 7 and negative 2 multiply to negative 14 and add to 5. So it is x plus 7, times x minus 2.', show: 'm.2' },
        { say: '3 x squared minus 2 x minus 8: 3 times negative 8 is negative 24, and negative 6 and 4 work. It factors as 3 x plus 4, times x minus 2.', show: 'm.3' },
      ],
    },
    {
      chapter: 'Step 3: Cancel',
      layout: 'center',
      main: [
        {
          kind: 'math',
          id: 'm',
          size: 'lg',
          lines: [
            '\\dfrac{\\cancel{(3x - 4)}\\cancel{(3x + 4)}}{\\cancel{(3x - 4)}\\cancel{(x + 7)}} \\cdot \\dfrac{\\cancel{(x + 7)}\\cancel{(x - 2)}}{\\cancel{(3x + 4)}\\cancel{(x - 2)}}',
            '= \\good{1}',
          ],
        },
      ],
      lines: [
        { say: 'Step three. Put the factors in. 3 x minus 4 is on the top and the bottom, so it cancels. So does 3 x plus 4, x plus 7, and x minus 2.', show: 'm.0' },
        { say: 'Every factor cancels, and what is left is 1. The quotient is 1.', show: 'm.1', focus: 'm.1' },
      ],
    },
    {
      chapter: 'Check the answer',
      layout: 'center',
      main: [{ kind: 'math', id: 'm', size: 'lg', lines: ['x = 0: \\quad \\dfrac{-16}{-28} \\div \\dfrac{-8}{-14} = \\dfrac{4}{7} \\div \\dfrac{4}{7}', '= 1 \\ \\checkmark'] }],
      lines: [
        { say: 'Let us check with a number. Take x equals 0. The first fraction is negative 16 over negative 28, which is 4 sevenths. The second is negative 8 over negative 14, also 4 sevenths.', show: 'm.0' },
        { say: '4 sevenths divided by 4 sevenths is 1. It matches. The two fractions are always equal, wherever they are defined.', show: 'm.1' },
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
            ['flipping the **first** fraction', 'keep the first, flip the **second**'],
            ['cancelling before you flip', 'flip first, then cancel top against bottom'],
            ['$9x^2 - 16 = (3x - 4)^2$', 'a difference of squares is $(3x - 4)(3x + 4)$'],
          ],
        },
      ],
      lines: [
        { say: 'Here are the traps.', show: 'traps' },
        { say: 'Flip the second fraction, the one you are dividing by, not the first.' },
        { say: 'Flip first, and only then cancel. Before the flip, a factor on the bottom of the second fraction is really on the top.' },
        { say: 'And 9 x squared minus 16 is 3 x minus 4, times 3 x plus 4, not 3 x minus 4 squared.' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q2',
          prompt: 'Simplify $\\dfrac{x^2 - 1}{x^2 + 2x} \\div \\dfrac{x - 1}{x}$.',
          choices: ['$\\dfrac{x + 1}{x}$', '$\\dfrac{x(x + 1)}{x + 2}$', '$\\dfrac{(x - 1)^2(x + 1)}{x^2(x + 2)}$', '$\\dfrac{x + 1}{x + 2}$'],
          answer: 3,
          working: '$\\dfrac{(x + 1)(x - 1)}{x(x + 2)} \\cdot \\dfrac{x}{x - 1} = \\dfrac{x + 1}{x + 2}$',
        },
      ],
      lines: [
        { say: 'Your turn. Divide x squared minus 1, over x squared plus 2 x, by x minus 1 over x. Pause the video and try it.', show: 'q2', wait: 6 },
        { say: 'Flip the second fraction to x over x minus 1. Factor: the top is x plus 1, times x minus 1, and the bottom is x times x plus 2. Cancel x and x minus 1 to get x plus 1, over x plus 2, choice D. C multiplies without flipping.', show: 'q2.answer' },
      ],
    },
    {
      chapter: 'Summary',
      layout: 'center',
      main: [{ kind: 'bullets', id: 'sum', check: true, items: ['Divide: multiply by the **reciprocal**', '**Factor** every polynomial', 'Cancel common **factors**', 'Check with a number'] }],
      lines: [
        { say: 'Here is what to remember. To divide, multiply by the reciprocal of the second fraction.', show: 'sum.0' },
        { say: 'Factor every polynomial.', show: 'sum.1' },
        { say: 'Cancel the factors that the top and bottom share.', show: 'sum.2' },
        { say: 'And check with a number. For more on multiplying and dividing rational expressions, watch this lesson\'s explainer video on Gradileo.', show: 'sum.3' },
      ],
    },
  ],
};

export default video;
