import type { Explainer } from '@/video/script.ts';

// Exam question for Math 30-1 lesson 7.6 (laws of logarithms). The question is an exercise from
// OpenStax College Algebra 2e, word for word (section 6.5, Logarithmic Properties, CC BY-NC-SA 4.0),
// with its set's instruction in front of it. The cube root is the power 1/3, so the inside is
// x^(2 + 2/3) y^(3 + 5/3) = x^(8/3) y^(14/3), and the product and power laws give
// (8/3)log(x) + (14/3)log(y), as in the book's answer. At x = y = 10 both sides are 22/3.

const QUESTION =
  'Use the properties of logarithms to expand each logarithm as much as possible. Rewrite each expression as a sum, difference, or product of logs. log(x²y³ ∛(x²y⁵))';

const video: Explainer = {
  id: 'xq-m301-7-6',
  lessonId: '',
  exam: {
    lesson: 'm301-7-6',
    source: 'OpenStax, College Algebra 2e, Exercise in section 6.5, Logarithmic Properties',
    licence: 'CC BY-NC-SA 4.0, access for free at openstax.org',
    url: 'https://openstax.org/books/college-algebra-2e/pages/6-5-logarithmic-properties',
    question: QUESTION,
  },
  title: 'Exam Question: Expand log(x²y³ ∛(x²y⁵)) (Laws of Logarithms)',
  thumbnailTitle: 'Expand log(x²y³ ∛(x²y⁵))',
  thumbnail: 'laws',
  summary:
    'A real test question, solved one small step at a time: use the laws of logarithms to expand log(x²y³ ∛(x²y⁵)) as much as possible. We write the cube root as a power of 1/3, collect the powers of x and of y, and then use the product and power laws to get (8/3) log x + (14/3) log y. Then we check with x = y = 10 and look at the traps.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Exam Question', title: 'Expand log(x²y³ ∛(x²y⁵))', subtitle: 'Laws of logarithms, step by step' }],
      lines: [
        { say: 'In this video, we solve a real test question about the laws of logarithms. We will take it one small step at a time, so that every step makes sense.', show: 'title' },
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
          prompt: 'Use the properties of logarithms to expand each logarithm as much as possible. Rewrite each expression as a sum, difference, or product of logs. $\\log\\left(x^2 y^3 \\sqrt[3]{x^2 y^5}\\right)$',
          answer: '$\\dfrac{8}{3}\\log x + \\dfrac{14}{3}\\log y$',
          working: '$x^2 y^3 \\cdot x^{2/3} y^{5/3} = x^{8/3} y^{14/3}$, then the product and power laws.',
        },
      ],
      lines: [
        { say: 'Here is the question, as the textbook prints it for this set of exercises.', show: 'q' },
        { say: 'Use the properties of logarithms to expand each logarithm as much as possible. Rewrite each expression as a sum, difference, or product of logs. Log of x squared y cubed, times the cube root of x squared y to the fifth.' },
        { say: 'If you would like to try it first, pause the video now.', wait: 5 },
      ],
    },
    {
      chapter: 'What is it asking?',
      layout: 'center',
      main: [{ kind: 'text', id: 't', size: 'md', md: 'Break **one** big log into **simple** logs, $\\log x$ and $\\log y$, each with a number in front. No products, roots or powers left inside.' }],
      lines: [
        { say: 'Expand means: break one big logarithm into simple ones.', show: 't' },
        { say: 'At the end we want only log x and log y, each with a number in front, and nothing complicated left inside.' },
      ],
    },
    {
      chapter: 'What you need to know',
      layout: 'center',
      main: [
        { kind: 'math', id: 'laws', size: 'lg', lines: ['\\text{product: } \\log(MN) = \\log M + \\log N', '\\text{power: } \\log(M^k) = k\\log M', '\\sqrt[3]{M} = M^{1/3}'] },
      ],
      lines: [
        { say: 'Here is what we need. The product law: the log of a product is the sum of the logs.', show: 'laws.0' },
        { say: 'The power law: a power inside comes out in front, as a multiplier.', show: 'laws.1' },
        { say: 'And a cube root is the same as the power one third.', show: 'laws.2' },
      ],
    },
    {
      chapter: 'The plan',
      layout: 'center',
      main: [{ kind: 'bullets', id: 'plan', items: ['Write the **cube root** as a power', 'Collect the powers of $x$ and of $y$', 'Use the **product** and **power** laws'] }],
      lines: [
        { say: 'Here is the plan. First, write the cube root as a power.', show: 'plan.0' },
        { say: 'Second, collect all the powers of x, and all the powers of y.', show: 'plan.1' },
        { say: 'Third, use the product and power laws.', show: 'plan.2' },
      ],
    },
    {
      chapter: 'Step 1: The cube root',
      layout: 'center',
      main: [{ kind: 'math', id: 'm', size: 'lg', lines: ['\\sqrt[3]{x^2 y^5} = (x^2 y^5)^{1/3}', '= \\good{x^{2/3} \\, y^{5/3}}'] }],
      lines: [
        { say: 'Step one. The cube root of x squared y to the fifth is that whole thing to the power one third.', show: 'm.0' },
        { say: 'A power of a power multiplies the exponents. 2 times one third is two thirds, and 5 times one third is five thirds. So it is x to the two thirds, y to the five thirds.', show: 'm.1', focus: 'm.1' },
      ],
    },
    {
      chapter: 'Step 2: Collect the powers',
      layout: 'center',
      main: [{ kind: 'math', id: 'm', size: 'lg', lines: ['x^2 y^3 \\cdot x^{2/3} y^{5/3}', 'x^{2 + 2/3} = x^{8/3}, \\quad y^{3 + 5/3} = y^{14/3}', '\\log\\left(\\good{x^{8/3} \\, y^{14/3}}\\right)'] }],
      lines: [
        { say: 'Step two. Now the inside is x squared y cubed, times x to the two thirds, y to the five thirds.', show: 'm.0' },
        { say: 'Multiplying the same base adds the exponents. For x: 2 plus two thirds is eight thirds. For y: 3 plus five thirds is fourteen thirds.', show: 'm.1' },
        { say: 'So we have the log of x to the eight thirds, times y to the fourteen thirds.', show: 'm.2', focus: 'm.2' },
      ],
    },
    {
      chapter: 'Step 3: The log laws',
      layout: 'center',
      main: [{ kind: 'math', id: 'm', size: 'lg', lines: ['= \\log x^{8/3} + \\log y^{14/3}', '= \\good{\\dfrac{8}{3}\\log x + \\dfrac{14}{3}\\log y}'] }],
      lines: [
        { say: 'Step three. By the product law, the log of a product is a sum: log of x to the eight thirds, plus log of y to the fourteen thirds.', show: 'm.0' },
        { say: 'By the power law, each power comes out in front. The answer is eight thirds log x, plus fourteen thirds log y.', show: 'm.1', focus: 'm.1' },
      ],
    },
    {
      chapter: 'Check the answer',
      layout: 'center',
      main: [{ kind: 'math', id: 'm', size: 'lg', lines: ['x = y = 10: \\quad \\log\\left(10^5 \\cdot \\sqrt[3]{10^7}\\right) = 5 + \\dfrac{7}{3} = \\dfrac{22}{3}', '\\dfrac{8}{3} + \\dfrac{14}{3} = \\dfrac{22}{3} \\ \\checkmark'] }],
      lines: [
        { say: 'Let us check with x and y both equal to 10, since log of 10 is 1. Inside, x squared y cubed is 10 to the 5, and the cube root of 10 to the 7 is 10 to the seven thirds. The log is 5 plus seven thirds, which is twenty-two thirds.', show: 'm.0' },
        { say: 'Our answer gives eight thirds times 1, plus fourteen thirds times 1, which is also twenty-two thirds. It checks out.', show: 'm.1', focus: 'm.1' },
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
            ['$\\log(MN) = \\log M \\cdot \\log N$', 'a log of a product is a **sum** of logs'],
            ['$\\sqrt[3]{y^5} = y^{3/5}$', 'the root goes on the **bottom**: $y^{5/3}$'],
            ['$x^2 y^3 = (xy)^5$', 'only **the same base** adds exponents'],
          ],
        },
      ],
      lines: [
        { say: 'Here are the traps.', show: 'traps' },
        { say: 'The log of a product is a sum of logs, not a product of logs.' },
        { say: 'In a fraction power, the root goes on the bottom. The cube root of y to the fifth is y to the five thirds, not three fifths.' },
        { say: 'And only add exponents for the same base. Keep x and y separate.' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q2',
          prompt: 'Expand $\\log_2\\left(\\dfrac{8x^3}{y}\\right)$ as much as possible.',
          choices: ['$3\\log_2 x - \\log_2 y$', '$3\\log_2(8x) - \\log_2 y$', '$24\\log_2 x - \\log_2 y$', '$3 + 3\\log_2 x - \\log_2 y$'],
          answer: 3,
          working: '$\\log_2 8 + \\log_2 x^3 - \\log_2 y = 3 + 3\\log_2 x - \\log_2 y$',
        },
      ],
      lines: [
        { say: 'Your turn. Expand log base 2 of 8 x cubed over y as much as possible. Pause the video and try it.', show: 'q2', wait: 8 },
        { say: 'A quotient gives a difference, and a product gives a sum: log base 2 of 8, plus log base 2 of x cubed, minus log base 2 of y. Log base 2 of 8 is 3, and the power 3 comes out in front. So it is 3, plus 3 log base 2 of x, minus log base 2 of y: choice D.', show: 'q2.answer' },
      ],
    },
    {
      chapter: 'Summary',
      layout: 'center',
      main: [{ kind: 'bullets', id: 'sum', check: true, items: ['Roots become **fraction powers**', 'Same base: **add** the exponents', 'Product law: a product becomes a **sum** of logs', 'Power law: powers come out **in front**'] }],
      lines: [
        { say: 'Here is what to remember. Write roots as fraction powers.', show: 'sum.0' },
        { say: 'For the same base, add the exponents.', show: 'sum.1' },
        { say: 'The product law turns a product into a sum of logs.', show: 'sum.2' },
        { say: 'And the power law brings each power out in front. For more on the laws of logarithms, watch this lesson\'s explainer video on Gradileo.', show: 'sum.3' },
      ],
    },
  ],
};

export default video;
