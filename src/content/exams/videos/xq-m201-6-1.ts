import type { Explainer } from '@/video/script.ts';

// Exam question for Math 20-1 lesson 6.1 (rational expressions): Brenda's tiles, simplify
// (15x² − 8x − 7)/(x² − 2x + 1). The question is an exercise from OpenStax College Algebra 2e,
// word for word (section 1.6, Rational Expressions, CC BY-NC-SA 4.0), whose answer is
// (15x + 7)/(x − 1): the top is (15x + 7)(x − 1) and the bottom is (x − 1)², so one x − 1 cancels.

const QUESTION =
  'Brenda is placing tile on her bathroom floor. The area of the floor is 15x² − 8x − 7 ft². The area of one tile is x² − 2x + 1 ft². To find the number of tiles needed, simplify the rational expression: (15x² − 8x − 7)/(x² − 2x + 1).';

const video: Explainer = {
  id: 'xq-m201-6-1',
  lessonId: '',
  exam: {
    lesson: 'm201-6-1',
    source: 'OpenStax, College Algebra 2e, Exercise in section 1.6, Rational Expressions',
    licence: 'CC BY-NC-SA 4.0, access for free at openstax.org',
    url: 'https://openstax.org/books/college-algebra-2e/pages/1-6-rational-expressions',
    question: QUESTION,
  },
  title: 'Exam Question: How Many Tiles? Simplify (15x² − 8x − 7)/(x² − 2x + 1) (Rational Expressions)',
  thumbnailTitle: 'How Many Tiles?',
  thumbnail: 'm',
  summary:
    'A real test question, solved one small step at a time: Brenda\'s floor has area 15x² − 8x − 7 square feet and each tile has area x² − 2x + 1, so simplify the rational expression. We factor the top as (15x + 7)(x − 1) and the bottom as (x − 1)², cancel the common factor and get (15x + 7)/(x − 1), with x ≠ 1. Then we check with x = 3 and look at the traps.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Exam Question', title: 'How Many Tiles?', subtitle: 'Rational expressions, step by step' }],
      lines: [
        { say: 'In this video, we solve a real test question about rational expressions. We will take it one small step at a time, so that every step makes sense.', show: 'title' },
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
          prompt: 'Brenda is placing tile on her bathroom floor. The area of the floor is $15x^2 - 8x - 7$ ft². The area of one tile is $x^2 - 2x + 1$ ft². To find the number of tiles needed, simplify the rational expression: $\\dfrac{15x^2 - 8x - 7}{x^2 - 2x + 1}$.',
          answer: '$\\dfrac{15x + 7}{x - 1}$',
          working: '$\\dfrac{(15x + 7)(x - 1)}{(x - 1)(x - 1)} = \\dfrac{15x + 7}{x - 1}$, $x \\neq 1$',
        },
      ],
      lines: [
        { say: 'Here is the question, exactly as it was printed.', show: 'q' },
        { say: 'Brenda is tiling her bathroom floor. The floor has an area of 15 x squared, minus 8 x, minus 7 square feet. One tile has an area of x squared, minus 2 x, plus 1 square feet. To find the number of tiles, simplify the floor area over the tile area.' },
        { say: 'If you would like to try it first, pause the video now.', wait: 5 },
      ],
    },
    {
      chapter: 'What is it asking?',
      layout: 'center',
      main: [{ kind: 'text', id: 't', size: 'md', md: 'Number of tiles $=$ **floor area** $\\div$ **tile area**. To simplify, **factor** the top and the bottom, then cancel any **common factor**.' }],
      lines: [{ say: 'The number of tiles is the floor area divided by the area of one tile. To simplify that fraction, we factor the top and the bottom, and cancel any factor they share, just like simplifying 6 over 8 to 3 over 4.', show: 't' }],
    },
    {
      chapter: 'What you need to know',
      layout: 'center',
      main: [
        { kind: 'callout', id: 'cancel', tone: 'definition', title: 'Simplifying', md: 'Cancel common **factors**, never terms: $\\dfrac{6}{8} = \\dfrac{2 \\cdot 3}{2 \\cdot 4} = \\dfrac{3}{4}$.' },
        { kind: 'callout', id: 'npv', tone: 'key', title: 'Non-permissible values', md: 'The denominator can never be $0$. Find these values **before** you cancel.' },
      ],
      lines: [
        { say: 'Here is what we need. We can only cancel factors, things that are multiplied. 6 over 8 is 2 times 3 over 2 times 4, and the 2s cancel to leave 3 over 4.', show: 'cancel' },
        { say: 'And the denominator can never be 0. The values of x that make it 0 are non-permissible, and we find them before we cancel anything.', show: 'npv' },
      ],
    },
    {
      chapter: 'The plan',
      layout: 'center',
      main: [{ kind: 'bullets', id: 'plan', items: ['Factor the **denominator** and state the restriction', 'Factor the **numerator**', 'Cancel the **common factor**'] }],
      lines: [
        { say: 'Here is the plan. First, factor the denominator, and state which value of x is not allowed.', show: 'plan.0' },
        { say: 'Second, factor the numerator.', show: 'plan.1' },
        { say: 'Third, cancel the common factor.', show: 'plan.2' },
      ],
    },
    {
      chapter: 'Step 1: The denominator',
      layout: 'center',
      main: [{ kind: 'math', id: 'm', size: 'lg', lines: ['x^2 - 2x + 1 = (x - 1)(x - 1) = (x - 1)^2', 'x - 1 \\neq 0, \\quad \\text{so} \\quad \\good{x \\neq 1}'] }],
      lines: [
        { say: 'Step one. x squared minus 2 x plus 1 is a perfect square: x minus 1, times x minus 1.', show: 'm.0' },
        { say: 'The bottom is 0 when x is 1. So x cannot be 1.', show: 'm.1', focus: 'm.1' },
      ],
    },
    {
      chapter: 'Step 2: The numerator',
      layout: 'center',
      main: [
        {
          kind: 'math',
          id: 'm',
          size: 'lg',
          lines: [
            '15 \\times (-7) = -105, \\quad (-15) + 7 = -8',
            '15x^2 - 15x + 7x - 7',
            '= 15x(x - 1) + 7(x - 1)',
            '= \\good{(15x + 7)(x - 1)}',
          ],
        },
      ],
      lines: [
        { say: 'Step two. Factor 15 x squared minus 8 x minus 7 by decomposition. Multiply 15 by negative 7 to get negative 105. We need two numbers that multiply to negative 105 and add to negative 8: negative 15 and 7.', show: 'm.0' },
        { say: 'Split the middle term: 15 x squared, minus 15 x, plus 7 x, minus 7.', show: 'm.1' },
        { say: 'Group in pairs. The first pair is 15 x times x minus 1, and the second is 7 times x minus 1.', show: 'm.2' },
        { say: 'So the top is 15 x plus 7, times x minus 1.', show: 'm.3', focus: 'm.3' },
      ],
    },
    {
      chapter: 'Step 3: Cancel',
      layout: 'center',
      main: [{ kind: 'math', id: 'm', size: 'lg', lines: ['\\dfrac{(15x + 7)\\cancel{(x - 1)}}{\\cancel{(x - 1)}(x - 1)}', '= \\good{\\dfrac{15x + 7}{x - 1}}, \\quad x \\neq 1'] }],
      lines: [
        { say: 'Step three. Top and bottom share one factor of x minus 1, so it cancels.', show: 'm.0' },
        { say: 'The number of tiles is 15 x plus 7, over x minus 1, with x not equal to 1. That is the answer.', show: 'm.1', focus: 'm.1' },
      ],
    },
    {
      chapter: 'Check the answer',
      layout: 'center',
      main: [{ kind: 'math', id: 'm', size: 'lg', lines: ['x = 3:', '\\text{floor: } 15(9) - 24 - 7 = 104', '\\text{tile: } 9 - 6 + 1 = 4', '\\dfrac{104}{4} = 26 \\quad \\text{and} \\quad \\dfrac{15(3) + 7}{3 - 1} = \\dfrac{52}{2} = 26 \\ \\checkmark'] }],
      lines: [
        { say: 'Let us check with a number. Take x equals 3. The floor is 135 minus 24 minus 7, which is 104 square feet.', show: ['m.0', 'm.1'] },
        { say: 'One tile is 9 minus 6 plus 1, which is 4 square feet.', show: 'm.2' },
        { say: '104 divided by 4 is 26 tiles. Our answer gives 45 plus 7, over 2, which is 52 over 2, also 26. It matches.', show: 'm.3' },
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
            ['cancelling the $x^2$ terms', 'cancel **factors**, never terms joined by $+$ or $-$'],
            ['$(x - 1)^2$ cancels completely', 'only **one** $x - 1$ is on top, so one stays below'],
            ['forgetting $x \\neq 1$', 'state the restriction from the **original** bottom'],
          ],
        },
      ],
      lines: [
        { say: 'Here are the traps.', show: 'traps' },
        { say: 'You cannot cancel the x squared on top with the x squared on the bottom. They are terms, joined to the rest by plus and minus signs. Only factors cancel.' },
        { say: 'The bottom has two factors of x minus 1 and the top has one. Only one pair cancels, so x minus 1 stays in the denominator.' },
        { say: 'And state that x cannot be 1. It comes from the original denominator, before cancelling.' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q2',
          prompt: 'Simplify $\\dfrac{x^2 - 9}{x^2 + 5x + 6}$.',
          choices: ['$\\dfrac{-9}{5x + 6}$', '$\\dfrac{x + 3}{x + 2}$', '$\\dfrac{x - 3}{x + 2}$', '$\\dfrac{x - 3}{x + 3}$'],
          answer: 2,
          working: '$\\dfrac{(x + 3)(x - 3)}{(x + 3)(x + 2)} = \\dfrac{x - 3}{x + 2}$, $x \\neq -3, -2$',
        },
      ],
      lines: [
        { say: 'Your turn. Simplify x squared minus 9, over x squared plus 5 x plus 6. Pause the video and try it.', show: 'q2', wait: 6 },
        { say: 'The top is x plus 3, times x minus 3. The bottom is x plus 3, times x plus 2. Cancel x plus 3 to get x minus 3, over x plus 2, choice C, with x not equal to negative 3 or negative 2. A cancels terms, and B and D cancel the wrong factor.', show: 'q2.answer' },
      ],
    },
    {
      chapter: 'Summary',
      layout: 'center',
      main: [{ kind: 'bullets', id: 'sum', check: true, items: ['**Factor** the top and the bottom', 'State the **non-permissible values** first', 'Cancel common **factors**, never terms', 'Check with a number'] }],
      lines: [
        { say: 'Here is what to remember. Factor the numerator and the denominator.', show: 'sum.0' },
        { say: 'State the values that make the denominator 0, before you cancel.', show: 'sum.1' },
        { say: 'Cancel common factors, never terms.', show: 'sum.2' },
        { say: 'And check with a number. For more on rational expressions, watch this lesson\'s explainer video on Gradileo.', show: 'sum.3' },
      ],
    },
  ],
};

export default video;
