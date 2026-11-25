import type { Explainer } from '@/video/script.ts';

// Exam question for Math 9 lesson 3.4 (order of operations with rational numbers). The question is
// a Try It from OpenStax Elementary Algebra 2e, word for word (section 1.5, Visualize Fractions,
// CC BY-NC-SA 4.0). The fraction bar groups the top and the bottom. Top: 8(−2) + 4(−3) = −16 − 12
// = −28. Bottom: −5(2) + 3 = −10 + 3 = −7. Then −28 ÷ (−7) = 4.

const QUESTION = 'Simplify: (8(−2) + 4(−3)) / (−5(2) + 3).';

const video: Explainer = {
  id: 'xq-m9-3-4',
  lessonId: '',
  exam: {
    lesson: 'm9-3-4',
    source: 'OpenStax, Elementary Algebra 2e, Try It in section 1.5, Visualize Fractions',
    licence: 'CC BY-NC-SA 4.0, access for free at openstax.org',
    url: 'https://openstax.org/books/elementary-algebra-2e/pages/1-5-visualize-fractions',
    question: QUESTION,
  },
  title: 'Exam Question: A Fraction Full of Negatives (Order of Operations with Rational Numbers)',
  thumbnailTitle: 'A Fraction Full of Negatives',
  thumbnail: 'st',
  summary:
    'A real test question, solved one small step at a time: simplify (8(−2) + 4(−3)) / (−5(2) + 3). The fraction bar works like brackets, so we simplify the top and the bottom first. Top: −16 + (−12) = −28. Bottom: −10 + 3 = −7. Then −28 ÷ (−7) = 4. Then we check the signs and look at the traps.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Exam Question', title: 'A Fraction Full of Negatives', subtitle: 'Order of operations with rational numbers, step by step' }],
      lines: [
        { say: 'In this video, we solve a real test question about the order of operations with rational numbers. We will take it one small step at a time, so that every step makes sense.', show: 'title' },
        { say: 'The question comes from the free OpenStax Elementary Algebra textbook. You will see where it comes from at the bottom of the screen the whole way through.' },
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
          prompt: 'Simplify: $\\dfrac{8(-2) + 4(-3)}{-5(2) + 3}$.',
          answer: '$4$',
          working: 'top: −16 − 12 = −28, bottom: −10 + 3 = −7',
        },
      ],
      lines: [
        { say: 'Here is the question, from the book.', show: 'q' },
        { say: 'Simplify the fraction. On top: 8 times negative 2, plus 4 times negative 3. On the bottom: negative 5 times 2, plus 3.' },
        { say: 'If you would like to try it first, pause the video now.', wait: 5 },
      ],
    },
    {
      chapter: 'What is it asking?',
      layout: 'center',
      main: [
        { kind: 'math', id: 'm', size: 'lg', lines: ['\\dfrac{\\adj{8(-2) + 4(-3)}}{\\opp{-5(2) + 3}}'] },
        { kind: 'callout', id: 'c', tone: 'key', title: 'The fraction bar groups', md: 'A fraction bar works like **brackets**: it groups the whole **top** and the whole **bottom**. Simplify each one first, then divide.' },
      ],
      lines: [
        { say: 'Here is the fraction. The top is in blue, and the bottom is in orange.', show: 'm.0' },
        { say: 'A fraction bar works like brackets. It groups the whole top and the whole bottom. So we simplify each one first, then divide.', show: 'c' },
      ],
    },
    {
      chapter: 'What you need to know',
      layout: 'center',
      main: [{ kind: 'math', id: 'm', size: 'lg', lines: ['(+)(-) = (-), \\quad (-)(+) = (-)', '(-) \\div (-) = (+)', '\\text{multiply before you add}'] }],
      lines: [
        { say: 'Here is what we need. A positive times a negative is negative, and so is a negative times a positive.', show: 'm.0' },
        { say: 'A negative divided by a negative is positive.', show: 'm.1' },
        { say: 'And in each part, multiply before you add.', show: 'm.2' },
      ],
    },
    {
      chapter: 'The plan',
      layout: 'center',
      main: [{ kind: 'bullets', id: 'plan', items: ['Simplify the **top**', 'Simplify the **bottom**', '**Divide**'] }],
      lines: [
        { say: 'Here is the plan. Simplify the top.', show: 'plan.0' },
        { say: 'Simplify the bottom.', show: 'plan.1' },
        { say: 'Then divide.', show: 'plan.2' },
      ],
    },
    {
      chapter: 'Steps 1 to 3: Top, bottom, divide',
      layout: 'center',
      main: [{ kind: 'math', id: 'st', size: 'lg', lines: ['\\text{top: } {-16} + ({-12}) = \\adj{-28}', '\\text{bottom: } {-10} + 3 = \\opp{-7}', '\\dfrac{-28}{-7} = \\good{4}'] }],
      lines: [
        { say: 'Step one, the top. 8 times negative 2 is negative 16. 4 times negative 3 is negative 12. Negative 16 plus negative 12 is negative 28.', show: 'st.0', focus: 'st.0' },
        { say: 'Step two, the bottom. Negative 5 times 2 is negative 10. Negative 10 plus 3 is negative 7.', show: 'st.1', focus: 'st.1' },
        { say: 'Step three, divide. Negative 28 divided by negative 7. Two negatives give a positive, and 28 divided by 7 is 4. The answer is 4.', show: 'st.2', focus: 'st.2' },
      ],
    },
    {
      chapter: 'Check the answer',
      layout: 'center',
      main: [{ kind: 'math', id: 'm', size: 'lg', lines: ['4 \\times ({-7}) = {-28} \\ \\checkmark'] }],
      lines: [
        { say: 'Let us check by multiplying back. 4 times the bottom, negative 7, is negative 28, which is the top. It checks out.', show: 'm.0', focus: 'm.0' },
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
            ['$-4$', 'a negative over a negative is **positive**'],
            ['top $= -4$', 'added $-16 + 12$: $4(-3)$ is $-12$, not $12$'],
            ['bottom $= -13$', 'did $-10 - 3$: the bottom **adds** $3$'],
          ],
        },
      ],
      lines: [
        { say: 'Here are the traps.', show: 'traps' },
        { say: 'Negative 4 has the wrong sign. A negative divided by a negative is positive.' },
        { say: 'A top of negative 4 treats 4 times negative 3 as positive 12. A positive times a negative is negative.' },
        { say: 'And a bottom of negative 13 subtracts the 3. The bottom adds 3: negative 10 plus 3 is negative 7.' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q2',
          prompt: 'Simplify: $\\dfrac{7(-1) + 9(-3)}{-5(3) - 2}$.',
          choices: ['$-2$', '$\\tfrac{1}{2}$', '$2$', '$-\\tfrac{20}{17}$'],
          answer: 2,
          working: 'top: −7 − 27 = −34, bottom: −15 − 2 = −17: −34 ÷ (−17) = 2.',
        },
      ],
      lines: [
        { say: 'Your turn. Simplify: on top, 7 times negative 1, plus 9 times negative 3. On the bottom, negative 5 times 3, minus 2. Pause the video and try it.', show: 'q2', wait: 8 },
        { say: 'The top is negative 7 plus negative 27, which is negative 34. The bottom is negative 15 minus 2, which is negative 17. Negative 34 divided by negative 17 is 2. Choice "C".', show: 'q2.answer' },
      ],
    },
    {
      chapter: 'Summary',
      layout: 'center',
      main: [{ kind: 'bullets', id: 'sum', check: true, items: ['The fraction bar **groups** top and bottom', 'In each part, **multiply** before you add', 'Watch every **sign**', 'Check by **multiplying back**'] }],
      lines: [
        { say: 'Here is what to remember. A fraction bar groups the top and the bottom, so simplify each first.', show: 'sum.0' },
        { say: 'In each part, multiply before you add.', show: 'sum.1' },
        { say: 'Watch every sign.', show: 'sum.2' },
        { say: 'And check by multiplying back. For more on the order of operations with rational numbers, watch this lesson\'s explainer video on Gradileo.', show: 'sum.3' },
      ],
    },
  ],
};

export default video;
