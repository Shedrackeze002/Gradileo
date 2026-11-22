import type { Explainer } from '@/video/script.ts';

// Exam question for Math 20-1 lesson 4.3 (completing the square and the quadratic formula):
// x² − 6x = 13 by completing the square. The question is a Try It from OpenStax College Algebra 2e,
// word for word (section 2.5, Quadratic Equations, CC BY-NC-SA 4.0), whose answer gives
// x = 3 ± √22: add (−6/2)² = 9 to both sides, so (x − 3)² = 22. The quadratic formula agrees.

const QUESTION = 'Solve by completing the square: x² − 6x = 13.';

const video: Explainer = {
  id: 'xq-m201-4-3',
  lessonId: '',
  exam: {
    lesson: 'm201-4-3',
    source: 'OpenStax, College Algebra 2e, Try It in section 2.5, Quadratic Equations',
    licence: 'CC BY-NC-SA 4.0, access for free at openstax.org',
    url: 'https://openstax.org/books/college-algebra-2e/pages/2-5-quadratic-equations',
    question: QUESTION,
  },
  title: 'Exam Question: Solve x² − 6x = 13 by Completing the Square',
  thumbnailTitle: 'Complete the Square: x² − 6x = 13',
  thumbnail: 'm',
  summary:
    'A real test question, solved one small step at a time: solve x² − 6x = 13 by completing the square. We add the square of half of −6, which is 9, to both sides, write the left side as (x − 3)², and take square roots: x = 3 ± √22. Then we check with the quadratic formula and look at the traps.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Exam Question', title: 'Complete the Square', subtitle: 'Completing the square, step by step' }],
      lines: [
        { say: 'In this video, we solve a real test question about completing the square. We will take it one small step at a time, so that every step makes sense.', show: 'title' },
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
          prompt: 'Solve by completing the square: $x^2 - 6x = 13$.',
          answer: '$x = 3 \\pm \\sqrt{22}$',
          working: '$x^2 - 6x + 9 = 22$, so $(x - 3)^2 = 22$ and $x - 3 = \\pm\\sqrt{22}$.',
        },
      ],
      lines: [
        { say: 'Here is the question, exactly as it was printed.', show: 'q' },
        { say: 'Solve by completing the square: x squared minus 6 x equals 13.' },
        { say: 'If you would like to try it first, pause the video now.', wait: 5 },
      ],
    },
    {
      chapter: 'What is it asking?',
      layout: 'center',
      main: [{ kind: 'text', id: 't', size: 'md', md: 'The left side does **not** factor nicely. Completing the square turns it into **one square**, so a square root can undo it.' }],
      lines: [{ say: 'No two whole numbers multiply to negative 13 and add to negative 6, so this does not factor nicely. Completing the square turns the left side into a single perfect square, which a square root can undo.', show: 't' }],
    },
    {
      chapter: 'What you need to know',
      layout: 'center',
      main: [
        { kind: 'callout', id: 'ps', tone: 'definition', title: 'A perfect square', md: '$(x - k)^2 = x^2 - 2kx + k^2$. So $x^2 + bx$ becomes a perfect square when you add $\\left(\\dfrac{b}{2}\\right)^2$.' },
        { kind: 'callout', id: 'sr', tone: 'key', title: 'Square roots', md: 'If $X^2 = 22$, then $X = \\pm\\sqrt{22}$: there are **two** square roots.' },
      ],
      lines: [
        { say: 'Here is what we need. A perfect square, x minus k, squared, is x squared minus 2 k x plus k squared. So x squared plus b x becomes a perfect square when you add half of b, squared.', show: 'ps' },
        { say: 'And a positive number has two square roots, one positive and one negative. Do not forget the negative one.', show: 'sr' },
      ],
    },
    {
      chapter: 'The plan',
      layout: 'center',
      main: [{ kind: 'bullets', id: 'plan', items: ['Add $\\left(\\dfrac{b}{2}\\right)^2$ to **both** sides', 'Write the left side as a **square**', 'Take **both** square roots and solve'] }],
      lines: [
        { say: 'Here is the plan. First, add half of b, squared, to both sides.', show: 'plan.0' },
        { say: 'Second, write the left side as a square.', show: 'plan.1' },
        { say: 'Third, take both square roots, and solve for x.', show: 'plan.2' },
      ],
    },
    {
      chapter: 'Step 1: Add the missing piece',
      layout: 'center',
      main: [{ kind: 'math', id: 'm', size: 'lg', lines: ['b = -6, \\quad \\dfrac{b}{2} = -3, \\quad (-3)^2 = 9', 'x^2 - 6x + 9 = 13 + 9', 'x^2 - 6x + 9 = 22'] }],
      lines: [
        { say: 'Step one. Here b is negative 6. Half of it is negative 3, and negative 3 squared is 9.', show: 'm.0' },
        { say: 'Add 9 to both sides, to keep the equation balanced.', show: 'm.1' },
        { say: 'So x squared minus 6 x plus 9 equals 22.', show: 'm.2' },
      ],
    },
    {
      chapter: 'Step 2: Write it as a square',
      layout: 'center',
      main: [{ kind: 'math', id: 'm', size: 'lg', lines: ['x^2 - 6x + 9 = (x - 3)^2', '(x - 3)^2 = 22'] }],
      lines: [
        { say: 'Step two. x squared minus 6 x plus 9 is exactly x minus 3, squared. The number inside the bracket is half of b, negative 3.', show: 'm.0' },
        { say: 'So x minus 3, squared, equals 22.', show: 'm.1', focus: 'm.1' },
      ],
    },
    {
      chapter: 'Step 3: Take square roots',
      layout: 'center',
      main: [{ kind: 'math', id: 'm', size: 'lg', lines: ['x - 3 = \\pm\\sqrt{22}', 'x = \\good{3 \\pm \\sqrt{22}}', 'x \\approx 7.69 \\quad \\text{or} \\quad x \\approx -1.69'] }],
      lines: [
        { say: 'Step three. Take the square root of both sides, remembering both signs: x minus 3 is plus or minus root 22.', show: 'm.0' },
        { say: 'Add 3 to both sides: x equals 3 plus or minus root 22. That is the answer.', show: 'm.1', focus: 'm.1' },
        { say: 'As decimals, root 22 is about 4.69, so x is about 7.69 or about negative 1.69.', show: 'm.2' },
      ],
    },
    {
      chapter: 'Check the answer',
      layout: 'center',
      main: [{ kind: 'math', id: 'm', size: 'lg', lines: ['x^2 - 6x - 13 = 0', 'x = \\dfrac{6 \\pm \\sqrt{36 + 52}}{2} = \\dfrac{6 \\pm \\sqrt{88}}{2}', '= \\dfrac{6 \\pm 2\\sqrt{22}}{2} = 3 \\pm \\sqrt{22} \\ \\checkmark'] }],
      lines: [
        { say: 'Let us check with the quadratic formula. First, move the 13 across: x squared minus 6 x minus 13 equals 0. So \"a\" is 1, b is negative 6, and c is negative 13.', show: 'm.0' },
        { say: 'The formula gives 6, plus or minus the square root of 36 plus 52, all over 2. That is 6 plus or minus root 88, over 2.', show: 'm.1' },
        { say: 'Root 88 is 2 root 22, and dividing by 2 gives 3 plus or minus root 22. The same answer.', show: 'm.2' },
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
            ['$(x - 3)^2 = 13$', 'the $9$ must be added to **both** sides'],
            ['$x = 3 + \\sqrt{22}$ only', 'a square root has **two** signs: $\\pm$'],
            ['adding $36$, or $(x - 6)^2$', 'use **half** of $b$: $\\left(\\tfrac{-6}{2}\\right)^2 = 9$'],
          ],
        },
      ],
      lines: [
        { say: 'Here are the traps.', show: 'traps' },
        { say: 'If you add 9 to the left side, add 9 to the right side too. Otherwise the equation is no longer true.' },
        { say: 'Keep both square roots. There are two answers, 3 plus root 22 and 3 minus root 22.' },
        { say: 'And use half of b, not b itself. Half of negative 6 is negative 3, and its square is 9, not 36.' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q2',
          prompt: 'Solve by completing the square: $x^2 + 4x = 5$.',
          choices: ['$x = -1$ or $x = 5$', '$x = 1$ or $x = -5$', '$x = -2 \\pm \\sqrt{5}$', '$x = 2 \\pm 3$'],
          answer: 1,
          working: 'Add $\\left(\\tfrac{4}{2}\\right)^2 = 4$: $(x + 2)^2 = 9$, so $x + 2 = \\pm 3$ and $x = 1$ or $x = -5$.',
        },
      ],
      lines: [
        { say: 'Your turn. Solve by completing the square: x squared plus 4 x equals 5. Pause the video and try it.', show: 'q2', wait: 6 },
        { say: 'Half of 4 is 2, and 2 squared is 4. Add 4 to both sides: x plus 2, squared, equals 9. So x plus 2 is plus or minus 3, and x is 1 or negative 5, choice B. C forgets to add 4 to the right side, and D uses the wrong sign inside the bracket.', show: 'q2.answer' },
      ],
    },
    {
      chapter: 'Summary',
      layout: 'center',
      main: [{ kind: 'bullets', id: 'sum', check: true, items: ['Add $\\left(\\dfrac{b}{2}\\right)^2$ to **both** sides', '$x^2 + bx + \\left(\\dfrac{b}{2}\\right)^2 = \\left(x + \\dfrac{b}{2}\\right)^2$', 'Take $\\pm$ square roots', 'Check with the **quadratic formula**'] }],
      lines: [
        { say: 'Here is what to remember. Add half of b, squared, to both sides.', show: 'sum.0' },
        { say: 'Then the left side is x plus half of b, squared.', show: 'sum.1' },
        { say: 'Take the square root with both signs.', show: 'sum.2' },
        { say: 'And you can always check with the quadratic formula. For more on completing the square, watch this lesson\'s explainer video on Gradileo.', show: 'sum.3' },
      ],
    },
  ],
};

export default video;
