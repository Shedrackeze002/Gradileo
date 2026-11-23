import type { Explainer } from '@/video/script.ts';

// Exam question for Math 30-2 lesson 4.2 (operations on rational expressions). The question is an
// exercise from OpenStax Intermediate Algebra 2e, word for word (section 7.2, Add and Subtract
// Rational Expressions, CC BY-NC-SA 4.0), with its set's instruction in front of it. With the LCD
// (m − 6)(m + 6), the difference is (6m − 36 − 12m)/((m − 6)(m + 6)) = −6(m + 6)/((m − 6)(m + 6)) =
// −6/(m − 6), as in the book's answer, with m ≠ ±6. The check puts m = 0 into both forms.

const QUESTION = 'Perform the indicated operations. 6/(m + 6) − 12m/(m² − 36)';

const video: Explainer = {
  id: 'xq-m302-4-2',
  lessonId: '',
  exam: {
    lesson: 'm302-4-2',
    source: 'OpenStax, Intermediate Algebra 2e, Exercise in section 7.2, Add and Subtract Rational Expressions',
    licence: 'CC BY-NC-SA 4.0, access for free at openstax.org',
    url: 'https://openstax.org/books/intermediate-algebra-2e/pages/7-2-add-and-subtract-rational-expressions',
    question: QUESTION,
  },
  title: 'Exam Question: 6/(m + 6) − 12m/(m² − 36) (Operations on Rational Expressions)',
  thumbnailTitle: 'Subtract Rational Expressions',
  thumbnail: 'm',
  summary:
    'A real test question, solved one small step at a time: work out 6/(m + 6) − 12m/(m² − 36). We factor m² − 36 to find the common denominator (m − 6)(m + 6), rewrite the first fraction over it, subtract the numerators, and then factor again to simplify. The answer is −6/(m − 6), with m ≠ ±6. Then we check with m = 0 and look at the traps.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Exam Question', title: 'Subtract Rational Expressions', subtitle: 'Operations on rational expressions, step by step' }],
      lines: [
        { say: 'In this video, we solve a real test question about subtracting rational expressions. We will take it one small step at a time, so that every step makes sense.', show: 'title' },
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
          prompt: 'Perform the indicated operations. $\\dfrac{6}{m + 6} - \\dfrac{12m}{m^2 - 36}$',
          answer: '${-\\dfrac{6}{m - 6}}$, $\\ m \\ne 6, \\ m \\ne {-6}$',
          working: 'LCD $(m - 6)(m + 6)$: $\\ \\dfrac{6(m - 6) - 12m}{(m - 6)(m + 6)} = \\dfrac{-6(m + 6)}{(m - 6)(m + 6)}$.',
        },
      ],
      lines: [
        { say: 'Here is the question, as the textbook prints it for this set of exercises.', show: 'q' },
        { say: 'Perform the indicated operations. 6 over m plus 6, minus 12 m over m squared minus 36.' },
        { say: 'If you would like to try it first, pause the video now.', wait: 5 },
      ],
    },
    {
      chapter: 'What is it asking?',
      layout: 'center',
      main: [{ kind: 'text', id: 't', size: 'md', md: 'Subtract the two fractions and write the answer as **one** simplified fraction, with its **non-permissible values**.' }],
      lines: [
        { say: 'We subtract the two fractions and write the answer as one fraction, simplified as far as it goes.', show: 't' },
        { say: 'And we give the non-permissible values, where a denominator would be zero.' },
      ],
    },
    {
      chapter: 'What you need to know',
      layout: 'center',
      main: [
        { kind: 'callout', id: 'lcd', tone: 'key', title: 'Common denominators', md: 'To add or subtract, rewrite both fractions over the **lowest common denominator** (LCD), then combine the numerators.' },
        { kind: 'math', id: 'dos', size: 'lg', lines: ['m^2 - 36 = (m - 6)(m + 6)'] },
      ],
      lines: [
        { say: 'Here is what we need. To add or subtract fractions, rewrite them over the lowest common denominator, then combine the numerators.', show: 'lcd' },
        { say: 'And m squared minus 36 is a difference of squares: m minus 6, times m plus 6.', show: 'dos' },
      ],
    },
    {
      chapter: 'The plan',
      layout: 'center',
      main: [{ kind: 'bullets', id: 'plan', items: ['**Factor** the denominators and find the LCD', 'Rewrite and **subtract** the numerators', '**Factor** again and simplify'] }],
      lines: [
        { say: 'Here is the plan. First, factor the denominators and find the LCD.', show: 'plan.0' },
        { say: 'Second, rewrite the fractions and subtract the numerators.', show: 'plan.1' },
        { say: 'Third, factor again and simplify.', show: 'plan.2' },
      ],
    },
    {
      chapter: 'Step 1: The LCD',
      layout: 'center',
      main: [{ kind: 'math', id: 'm', size: 'lg', lines: ['\\dfrac{6}{m + 6} - \\dfrac{12m}{(m - 6)(m + 6)}', '\\text{LCD} = (m - 6)(m + 6), \\quad \\good{m \\ne 6, \\ m \\ne {-6}}'] }],
      lines: [
        { say: 'Step one. Factor the second denominator: m minus 6, times m plus 6.', show: 'm.0' },
        { say: 'The first denominator, m plus 6, is already inside it, so the LCD is m minus 6, times m plus 6. That also tells us m cannot be 6 or negative 6.', show: 'm.1', focus: 'm.1' },
      ],
    },
    {
      chapter: 'Step 2: Subtract',
      layout: 'center',
      main: [{ kind: 'math', id: 'm', size: 'lg', lines: ['\\dfrac{6\\good{(m - 6)}}{(m + 6)\\good{(m - 6)}} - \\dfrac{12m}{(m - 6)(m + 6)}', '= \\dfrac{6m - 36 - 12m}{(m - 6)(m + 6)} = \\dfrac{-6m - 36}{(m - 6)(m + 6)}'] }],
      lines: [
        { say: 'Step two. The first fraction is missing the factor m minus 6, so multiply its top and bottom by m minus 6.', show: 'm.0' },
        { say: 'Now subtract the numerators: 6 m minus 36, minus 12 m, is negative 6 m minus 36.', show: 'm.1', focus: 'm.1' },
      ],
    },
    {
      chapter: 'Step 3: Simplify',
      layout: 'center',
      main: [{ kind: 'math', id: 'm', size: 'lg', lines: ['\\dfrac{-6\\bad{(m + 6)}}{(m - 6)\\bad{(m + 6)}}', '= \\good{-\\dfrac{6}{m - 6}}, \\quad m \\ne 6, \\ m \\ne {-6}'] }],
      lines: [
        { say: 'Step three. Factor the top: negative 6 m minus 36 is negative 6, times m plus 6. Now m plus 6 is a factor of the top and the bottom, so it divides out.', show: 'm.0' },
        { say: 'The answer is negative 6 over m minus 6, with m not equal to 6 or negative 6.', show: 'm.1', focus: 'm.1' },
      ],
    },
    {
      chapter: 'Check the answer',
      layout: 'center',
      main: [{ kind: 'math', id: 'm', size: 'lg', lines: ['m = 0: \\quad \\dfrac{6}{6} - \\dfrac{0}{-36} = 1', '-\\dfrac{6}{0 - 6} = 1 \\ \\checkmark'] }],
      lines: [
        { say: 'Let us check with m equals 0, which is allowed. The original gives 6 over 6, minus 0, which is 1.', show: 'm.0' },
        { say: 'Our answer gives negative 6 over negative 6, which is also 1. It checks out.', show: 'm.1', focus: 'm.1' },
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
            ['$\\dfrac{6 - 12m}{m^2 - 36}$', 'rewrite $6$ as $6(m - 6)$ over the LCD first'],
            ['$\\dfrac{-6m - 36}{m^2 - 36}$', 'not finished: **factor** and divide out $m + 6$'],
            ['$6m - 36 + 12m$', 'the minus sign applies to the **whole** second numerator'],
          ],
        },
      ],
      lines: [
        { say: 'Here are the traps.', show: 'traps' },
        { say: 'You cannot just subtract the tops. The first fraction has to be rewritten over the common denominator first.' },
        { say: 'Negative 6 m minus 36 over m squared minus 36 is right, but not finished. Factor and divide out m plus 6.' },
        { say: 'And the minus sign applies to the whole second numerator. Minus 12 m, not plus.' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q2',
          prompt: 'Simplify $\\dfrac{3}{x - 2} + \\dfrac{1}{x + 2}$.',
          choices: ['$\\dfrac{4}{2x}$', '$\\dfrac{4}{x^2 - 4}$', '$\\dfrac{4(x + 1)}{(x - 2)(x + 2)}$', '$\\dfrac{4x}{x^2 - 4}$'],
          answer: 2,
          working: '$\\dfrac{3(x + 2) + (x - 2)}{(x - 2)(x + 2)} = \\dfrac{4x + 4}{(x - 2)(x + 2)}$.',
        },
      ],
      lines: [
        { say: 'Your turn. Simplify 3 over x minus 2, plus 1 over x plus 2. Pause the video and try it.', show: 'q2', wait: 8 },
        { say: 'The LCD is x minus 2, times x plus 2. The top is 3 times x plus 2, plus x minus 2, which is 4 x plus 4, or 4 times x plus 1: choice C.', show: 'q2.answer' },
      ],
    },
    {
      chapter: 'Summary',
      layout: 'center',
      main: [{ kind: 'bullets', id: 'sum', check: true, items: ['**Factor** every denominator', 'Rewrite each fraction over the **LCD**', 'Subtract the **whole** second numerator', '**Factor** again to simplify, and state the non-permissible values'] }],
      lines: [
        { say: 'Here is what to remember. Factor every denominator.', show: 'sum.0' },
        { say: 'Rewrite each fraction over the lowest common denominator.', show: 'sum.1' },
        { say: 'When subtracting, subtract the whole second numerator.', show: 'sum.2' },
        { say: 'And factor again to simplify, stating the non-permissible values. For more on operations on rational expressions, watch this lesson\'s explainer video on Gradileo.', show: 'sum.3' },
      ],
    },
  ],
};

export default video;
