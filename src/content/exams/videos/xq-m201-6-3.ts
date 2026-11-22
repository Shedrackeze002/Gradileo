import type { Explainer } from '@/video/script.ts';

// Exam question for Math 20-1 lesson 6.3 (adding and subtracting rational expressions):
// 3/(x + 5) − 1/(x − 3). The question is a Try It from OpenStax College Algebra 2e, word for word
// (section 1.6, Rational Expressions, CC BY-NC-SA 4.0), whose answer is 2(x − 7)/((x + 5)(x − 3)):
// over the common denominator, the top is 3(x − 3) − (x + 5) = 2x − 14.

const QUESTION = 'Subtract the rational expressions: 3/(x + 5) − 1/(x − 3).';

const video: Explainer = {
  id: 'xq-m201-6-3',
  lessonId: '',
  exam: {
    lesson: 'm201-6-3',
    source: 'OpenStax, College Algebra 2e, Try It in section 1.6, Rational Expressions',
    licence: 'CC BY-NC-SA 4.0, access for free at openstax.org',
    url: 'https://openstax.org/books/college-algebra-2e/pages/1-6-rational-expressions',
    question: QUESTION,
  },
  title: 'Exam Question: Subtract 3/(x + 5) − 1/(x − 3) (Adding and Subtracting Rational Expressions)',
  thumbnailTitle: 'Subtract 3/(x + 5) − 1/(x − 3)',
  thumbnail: 'm',
  summary:
    'A real test question, solved one small step at a time: subtract 3/(x + 5) − 1/(x − 3). We write both fractions over the common denominator (x + 5)(x − 3), subtract the numerators carefully with brackets, and get 2(x − 7)/((x + 5)(x − 3)). Then we check with a number and look at the traps.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Exam Question', title: 'Subtract the Fractions', subtitle: 'Adding and subtracting rational expressions, step by step' }],
      lines: [
        { say: 'In this video, we solve a real test question about subtracting rational expressions. We will take it one small step at a time, so that every step makes sense.', show: 'title' },
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
          prompt: 'Subtract the rational expressions: $\\dfrac{3}{x + 5} - \\dfrac{1}{x - 3}$.',
          answer: '$\\dfrac{2(x - 7)}{(x + 5)(x - 3)}$',
          working: '$\\dfrac{3(x - 3) - (x + 5)}{(x + 5)(x - 3)} = \\dfrac{2x - 14}{(x + 5)(x - 3)}$',
        },
      ],
      lines: [
        { say: 'Here is the question, exactly as it was printed.', show: 'q' },
        { say: 'Subtract the rational expressions: 3 over x plus 5, minus 1 over x minus 3.' },
        { say: 'If you would like to try it first, pause the video now.', wait: 5 },
      ],
    },
    {
      chapter: 'What is it asking?',
      layout: 'center',
      main: [{ kind: 'text', id: 't', size: 'md', md: 'We can only subtract fractions with the **same denominator**. Here the bottoms are $x + 5$ and $x - 3$, so first we need a **common denominator**.' }],
      lines: [{ say: 'Just like with number fractions, we can only add or subtract when the denominators are the same. Here they are x plus 5 and x minus 3, so first we rewrite both fractions over a common denominator.', show: 't' }],
    },
    {
      chapter: 'What you need to know',
      layout: 'center',
      main: [
        { kind: 'callout', id: 'lcd', tone: 'definition', title: 'Common denominator', md: '$\\dfrac{1}{4} - \\dfrac{1}{6} = \\dfrac{3}{12} - \\dfrac{2}{12} = \\dfrac{1}{12}$. With no shared factor, the LCD is the **product** of the denominators.' },
        { kind: 'callout', id: 'br', tone: 'key', title: 'Brackets', md: 'The minus sign applies to the **whole** second numerator: $-(x + 5) = -x - 5$.' },
      ],
      lines: [
        { say: 'Here is what we need. 1 quarter minus 1 sixth is 3 twelfths minus 2 twelfths, which is 1 twelfth. When the denominators share no factor, the lowest common denominator is their product.', show: 'lcd' },
        { say: 'And when we subtract a numerator with two terms, the minus sign applies to both of them. Negative, x plus 5, is negative x, minus 5.', show: 'br' },
      ],
    },
    {
      chapter: 'The plan',
      layout: 'center',
      main: [{ kind: 'bullets', id: 'plan', items: ['Find the **common denominator**', 'Rewrite both fractions over it', 'Subtract the numerators, with **brackets**'] }],
      lines: [
        { say: 'Here is the plan. First, find the common denominator.', show: 'plan.0' },
        { say: 'Second, rewrite both fractions over it.', show: 'plan.1' },
        { say: 'Third, subtract the numerators, keeping the brackets.', show: 'plan.2' },
      ],
    },
    {
      chapter: 'Step 1: The common denominator',
      layout: 'center',
      main: [{ kind: 'math', id: 'm', size: 'lg', lines: ['\\text{LCD} = (x + 5)(x - 3)', 'x \\neq -5, \\quad x \\neq 3'] }],
      lines: [
        { say: 'Step one. x plus 5 and x minus 3 share no factor, so the common denominator is their product: x plus 5, times x minus 3.', show: 'm.0', focus: 'm.0' },
        { say: 'Neither bottom can be 0, so x cannot be negative 5 or 3.', show: 'm.1' },
      ],
    },
    {
      chapter: 'Step 2: Rewrite both fractions',
      layout: 'center',
      main: [{ kind: 'math', id: 'm', size: 'lg', lines: ['\\dfrac{3}{x + 5} \\cdot \\dfrac{x - 3}{x - 3} = \\dfrac{3(x - 3)}{(x + 5)(x - 3)}', '\\dfrac{1}{x - 3} \\cdot \\dfrac{x + 5}{x + 5} = \\dfrac{x + 5}{(x + 5)(x - 3)}'] }],
      lines: [
        { say: 'Step two. The first fraction is missing the factor x minus 3, so multiply its top and bottom by x minus 3.', show: 'm.0' },
        { say: 'The second fraction is missing x plus 5, so multiply its top and bottom by x plus 5. Both are multiplied by 1, so their values do not change.', show: 'm.1' },
      ],
    },
    {
      chapter: 'Step 3: Subtract the numerators',
      layout: 'center',
      main: [
        {
          kind: 'math',
          id: 'm',
          size: 'lg',
          lines: [
            '\\dfrac{3(x - 3) - (x + 5)}{(x + 5)(x - 3)}',
            '= \\dfrac{3x - 9 - x - 5}{(x + 5)(x - 3)}',
            '= \\good{\\dfrac{2x - 14}{(x + 5)(x - 3)} = \\dfrac{2(x - 7)}{(x + 5)(x - 3)}}',
          ],
        },
      ],
      lines: [
        { say: 'Step three. Now subtract the numerators over the common denominator. Keep the brackets around x plus 5.', show: 'm.0' },
        { say: 'Expand: 3 x minus 9, minus x, minus 5.', show: 'm.1' },
        { say: 'Collect like terms: 2 x minus 14, which factors as 2 times x minus 7. So the answer is 2 times x minus 7, over x plus 5, times x minus 3.', show: 'm.2', focus: 'm.2' },
      ],
    },
    {
      chapter: 'Check the answer',
      layout: 'center',
      main: [{ kind: 'math', id: 'm', size: 'lg', lines: ['x = 1: \\quad \\dfrac{3}{6} - \\dfrac{1}{-2} = \\dfrac{1}{2} + \\dfrac{1}{2} = 1', '\\dfrac{2(1 - 7)}{(6)(-2)} = \\dfrac{-12}{-12} = 1 \\ \\checkmark'] }],
      lines: [
        { say: 'Let us check with a number. Take x equals 1. The question gives 3 over 6, minus 1 over negative 2. That is 1 half plus 1 half, which is 1.', show: 'm.0' },
        { say: 'Our answer gives 2 times negative 6, over 6 times negative 2. That is negative 12 over negative 12, also 1. It matches.', show: 'm.1' },
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
            ['$\\dfrac{3 - 1}{(x + 5) - (x - 3)} = \\dfrac{2}{8}$', 'never subtract the **denominators**'],
            ['$3x - 9 - x + 5$', 'the minus applies to **both** terms: $-x - 5$'],
            ['$\\dfrac{3(x - 3) - 1}{(x + 5)(x - 3)}$', 'multiply the second top by $x + 5$ too'],
          ],
        },
      ],
      lines: [
        { say: 'Here are the traps.', show: 'traps' },
        { say: 'Never subtract the tops and the bottoms separately. Fractions need a common denominator first.' },
        { say: 'The minus sign belongs to all of x plus 5. Writing minus x plus 5 gives 2 x minus 4, which is wrong.' },
        { say: 'And each fraction is multiplied by what it is missing. The second top becomes x plus 5, not just 1.' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q2',
          prompt: 'Add $\\dfrac{2}{x} + \\dfrac{3}{x + 1}$.',
          choices: ['$\\dfrac{5x + 2}{x(x + 1)}$', '$\\dfrac{5}{2x + 1}$', '$\\dfrac{5x + 1}{x(x + 1)}$', '$\\dfrac{5}{x(x + 1)}$'],
          answer: 0,
          working: '$\\dfrac{2(x + 1) + 3x}{x(x + 1)} = \\dfrac{5x + 2}{x(x + 1)}$',
        },
      ],
      lines: [
        { say: 'Your turn. Add 2 over x, plus 3 over x plus 1. Pause the video and try it.', show: 'q2', wait: 6 },
        { say: 'The common denominator is x times x plus 1. The tops become 2 times x plus 1, and 3 x. Adding gives 2 x plus 2 plus 3 x, which is 5 x plus 2, choice A. B adds the tops and the bottoms, C forgets to multiply the 1 by 2, and D forgets to multiply the tops at all.', show: 'q2.answer' },
      ],
    },
    {
      chapter: 'Summary',
      layout: 'center',
      main: [{ kind: 'bullets', id: 'sum', check: true, items: ['Find the **common denominator**', 'Multiply each fraction by what it is **missing**', 'Subtract with **brackets**', 'Check with a number'] }],
      lines: [
        { say: 'Here is what to remember. Find the common denominator.', show: 'sum.0' },
        { say: 'Multiply the top and bottom of each fraction by the factor it is missing.', show: 'sum.1' },
        { say: 'When subtracting, keep the brackets, so the minus sign reaches every term.', show: 'sum.2' },
        { say: 'And check with a number. For more on adding and subtracting rational expressions, watch this lesson\'s explainer video on Gradileo.', show: 'sum.3' },
      ],
    },
  ],
};

export default video;
