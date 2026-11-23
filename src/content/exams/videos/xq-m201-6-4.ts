import type { Explainer } from '@/video/script.ts';

// Exam question for Math 20-1 lesson 6.4 (rational equations): 2/(x − 2) + 1/(x + 1) =
// 1/(x² − x − 2). The question is a Try It from OpenStax College Algebra 2e, word for word
// (section 2.2, Linear Equations in One Variable, CC BY-NC-SA 4.0), whose answer is x = 1/3:
// x² − x − 2 = (x − 2)(x + 1), and multiplying by it leaves 2(x + 1) + (x − 2) = 1.

const QUESTION = 'Solve the rational equation: 2/(x − 2) + 1/(x + 1) = 1/(x² − x − 2).';

const video: Explainer = {
  id: 'xq-m201-6-4',
  lessonId: '',
  exam: {
    lesson: 'm201-6-4',
    source: 'OpenStax, College Algebra 2e, Try It in section 2.2, Linear Equations in One Variable',
    licence: 'CC BY-NC-SA 4.0, access for free at openstax.org',
    url: 'https://openstax.org/books/college-algebra-2e/pages/2-2-linear-equations-in-one-variable',
    question: QUESTION,
  },
  title: 'Exam Question: Solve 2/(x − 2) + 1/(x + 1) = 1/(x² − x − 2) (Rational Equations)',
  thumbnailTitle: 'Solve the Rational Equation',
  thumbnail: 'm',
  summary:
    'A real test question, solved one small step at a time: solve 2/(x − 2) + 1/(x + 1) = 1/(x² − x − 2). We factor the last denominator as (x − 2)(x + 1), note that x cannot be 2 or −1, multiply every term by the LCD to clear the fractions, and get x = 1/3. Then we check it in the original equation and look at the traps.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Exam Question', title: 'Solve the Rational Equation', subtitle: 'Rational equations, step by step' }],
      lines: [
        { say: 'In this video, we solve a real test question about rational equations. We will take it one small step at a time, so that every step makes sense.', show: 'title' },
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
          prompt: 'Solve the rational equation: $\\dfrac{2}{x - 2} + \\dfrac{1}{x + 1} = \\dfrac{1}{x^2 - x - 2}$.',
          answer: '$x = \\dfrac{1}{3}$',
          working: 'Multiply by $(x - 2)(x + 1)$: $2(x + 1) + (x - 2) = 1$, so $3x = 1$.',
        },
      ],
      lines: [
        { say: 'Here is the question, exactly as it was printed.', show: 'q' },
        { say: 'Solve the rational equation: 2 over x minus 2, plus 1 over x plus 1, equals 1 over x squared minus x minus 2.' },
        { say: 'If you would like to try it first, pause the video now.', wait: 5 },
      ],
    },
    {
      chapter: 'What is it asking?',
      layout: 'center',
      main: [{ kind: 'text', id: 't', size: 'md', md: 'Find every $x$ that makes the equation true. The variable is in the **denominators**, so we clear the fractions first, and some values of $x$ are **not allowed**.' }],
      lines: [{ say: 'We want every value of x that makes the equation true. The x is in the denominators, so we clear the fractions first. And any value that makes a denominator 0 is not allowed.', show: 't' }],
    },
    {
      chapter: 'What you need to know',
      layout: 'center',
      main: [
        { kind: 'callout', id: 'lcd', tone: 'definition', title: 'Clearing fractions', md: 'Multiply **every term** on both sides by the LCD. Each denominator cancels, leaving an equation with no fractions.' },
        { kind: 'callout', id: 'npv', tone: 'key', title: 'Non-permissible values', md: 'A solution that makes any denominator $0$ must be **rejected**.' },
      ],
      lines: [
        { say: 'Here is what we need. Multiply every term on both sides by the lowest common denominator. Each denominator cancels, and the fractions are gone.', show: 'lcd' },
        { say: 'And any answer that makes a denominator 0 has to be thrown away, so we list those values first.', show: 'npv' },
      ],
    },
    {
      chapter: 'The plan',
      layout: 'center',
      main: [{ kind: 'bullets', id: 'plan', items: ['**Factor** the denominators and state the restrictions', 'Multiply every term by the **LCD**', 'Solve, and **check** against the restrictions'] }],
      lines: [
        { say: 'Here is the plan. First, factor the denominators, and state which values of x are not allowed.', show: 'plan.0' },
        { say: 'Second, multiply every term by the common denominator.', show: 'plan.1' },
        { say: 'Third, solve, and check the answer against the restrictions.', show: 'plan.2' },
      ],
    },
    {
      chapter: 'Step 1: Factor and restrict',
      layout: 'center',
      main: [{ kind: 'math', id: 'm', size: 'lg', lines: ['x^2 - x - 2 = (x - 2)(x + 1)', '\\text{LCD} = (x - 2)(x + 1)', 'x \\neq 2, \\quad x \\neq -1'] }],
      lines: [
        { say: 'Step one. Factor the last denominator. Negative 2 and 1 multiply to negative 2 and add to negative 1, so x squared minus x minus 2 is x minus 2, times x plus 1.', show: 'm.0' },
        { say: 'That is the product of the other two denominators, so it is the common denominator.', show: 'm.1' },
        { say: 'x minus 2 is 0 when x is 2, and x plus 1 is 0 when x is negative 1. So x cannot be 2 or negative 1.', show: 'm.2', focus: 'm.2' },
      ],
    },
    {
      chapter: 'Step 2: Clear the fractions',
      layout: 'center',
      main: [
        {
          kind: 'math',
          id: 'm',
          size: 'lg',
          lines: [
            '(x - 2)(x + 1) \\cdot \\dfrac{2}{x - 2} = 2(x + 1)',
            '(x - 2)(x + 1) \\cdot \\dfrac{1}{x + 1} = x - 2',
            '(x - 2)(x + 1) \\cdot \\dfrac{1}{(x - 2)(x + 1)} = 1',
            '2(x + 1) + (x - 2) = 1',
          ],
        },
      ],
      lines: [
        { say: 'Step two. Multiply every term by x minus 2, times x plus 1. In the first term, x minus 2 cancels, leaving 2 times x plus 1.', show: 'm.0' },
        { say: 'In the second term, x plus 1 cancels, leaving x minus 2.', show: 'm.1' },
        { say: 'On the right, the whole denominator cancels, leaving 1.', show: 'm.2' },
        { say: 'So the equation has no fractions: 2 times x plus 1, plus x minus 2, equals 1.', show: 'm.3', focus: 'm.3' },
      ],
    },
    {
      chapter: 'Step 3: Solve',
      layout: 'center',
      main: [{ kind: 'math', id: 'm', size: 'lg', lines: ['2x + 2 + x - 2 = 1', '3x = 1', 'x = \\good{\\dfrac{1}{3}}'] }],
      lines: [
        { say: 'Step three. Expand: 2 x plus 2, plus x minus 2, equals 1.', show: 'm.0' },
        { say: 'The 2 and negative 2 cancel, so 3 x equals 1.', show: 'm.1' },
        { say: 'Divide by 3: x equals 1 third. It is not 2 and not negative 1, so it is allowed. That is the answer.', show: 'm.2', focus: 'm.2' },
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
          lines: [
            '\\dfrac{2}{-\\frac{5}{3}} + \\dfrac{1}{\\frac{4}{3}} = -\\dfrac{6}{5} + \\dfrac{3}{4} = -\\dfrac{9}{20}',
            'x^2 - x - 2 = \\dfrac{1}{9} - \\dfrac{3}{9} - \\dfrac{18}{9} = -\\dfrac{20}{9}',
            '\\dfrac{1}{-\\frac{20}{9}} = -\\dfrac{9}{20} \\ \\checkmark',
          ],
        },
      ],
      lines: [
        { say: 'Let us check in the original equation. With x equal to 1 third, x minus 2 is negative 5 thirds and x plus 1 is 4 thirds. So the left side is negative 6 fifths plus 3 quarters, which is negative 9 twentieths.', show: 'm.0' },
        { say: 'On the right, x squared minus x minus 2 is 1 ninth, minus 3 ninths, minus 18 ninths, which is negative 20 ninths.', show: 'm.1' },
        { say: 'And 1 over negative 20 ninths is negative 9 twentieths. Both sides match.', show: 'm.2' },
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
            ['multiplying only the left side', 'multiply **every term**, on both sides'],
            ['LCD $= (x - 2)(x + 1)(x^2 - x - 2)$', 'factor first: the LCD is just $(x - 2)(x + 1)$'],
            ['skipping the restrictions', 'an answer of $2$ or $-1$ would have to be **rejected**'],
          ],
        },
      ],
      lines: [
        { say: 'Here are the traps.', show: 'traps' },
        { say: 'Multiply every term by the common denominator, including the term on the right side.' },
        { say: 'Factor before you choose the denominator. Multiplying all three denominators together works, but it makes a much harder equation.' },
        { say: 'And always state the restrictions. If the algebra had given 2 or negative 1, that answer would have to be rejected.' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q2',
          prompt: 'One pipe fills a tank in $3$ h, and another fills it in $6$ h. Solve $\\dfrac{1}{3} + \\dfrac{1}{6} = \\dfrac{1}{t}$ to find how long they take together.',
          choices: ['$4.5$ h', '$2$ h', '$9$ h', '$3$ h'],
          answer: 1,
          working: 'Multiply by $6t$: $2t + t = 6$, so $3t = 6$ and $t = 2$ h.',
        },
      ],
      lines: [
        { say: 'Your turn. One pipe fills a tank in 3 hours, and another fills it in 6 hours. Each hour, they fill 1 third and 1 sixth of the tank. Solve for t, the time together. Pause the video and try it.', show: 'q2', wait: 6 },
        { say: 'Multiply every term by 6 t: 2 t plus t equals 6, so 3 t equals 6, and t is 2 hours, choice B. Working together must be faster than the faster pipe alone, so 4.5, 9 and 3 hours cannot be right.', show: 'q2.answer' },
      ],
    },
    {
      chapter: 'Summary',
      layout: 'center',
      main: [{ kind: 'bullets', id: 'sum', check: true, items: ['**Factor** every denominator', 'State the **non-permissible values**', 'Multiply **every term** by the LCD', 'Reject any answer that makes a denominator $0$'] }],
      lines: [
        { say: 'Here is what to remember. Factor every denominator.', show: 'sum.0' },
        { say: 'State the values that make a denominator 0.', show: 'sum.1' },
        { say: 'Multiply every term by the common denominator to clear the fractions.', show: 'sum.2' },
        { say: 'And reject any answer that makes a denominator 0. For more on rational equations, watch this lesson\'s explainer video on Gradileo.', show: 'sum.3' },
      ],
    },
  ],
};

export default video;
