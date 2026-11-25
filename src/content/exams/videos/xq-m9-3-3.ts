import type { Explainer } from '@/video/script.ts';

// Exam question for Math 9 lesson 3.3 (multiplying and dividing rational numbers). The question is
// a Try It from OpenStax Elementary Algebra 2e, word for word (section 1.5, Visualize Fractions,
// CC BY-NC-SA 4.0). Two negatives give a positive. Multiply by the reciprocal: 7/27 × 36/35. Cancel
// 7 into 35 (1 and 5) and 9 into 27 and 36 (3 and 4): 1/3 × 4/5 = 4/15.

const QUESTION = 'Find the quotient: −7/27 ÷ (−35/36).';

const video: Explainer = {
  id: 'xq-m9-3-3',
  lessonId: '',
  exam: {
    lesson: 'm9-3-3',
    source: 'OpenStax, Elementary Algebra 2e, Try It in section 1.5, Visualize Fractions',
    licence: 'CC BY-NC-SA 4.0, access for free at openstax.org',
    url: 'https://openstax.org/books/elementary-algebra-2e/pages/1-5-visualize-fractions',
    question: QUESTION,
  },
  title: 'Exam Question: Dividing Two Negative Fractions (Multiplying and Dividing Rational Numbers)',
  thumbnailTitle: 'Divide: −7/27 ÷ (−35/36)',
  thumbnail: 'st',
  summary:
    'A real test question, solved one small step at a time: find the quotient −7/27 ÷ (−35/36). A negative divided by a negative is positive. To divide by a fraction, multiply by its reciprocal: 7/27 × 36/35. Cancelling common factors first (7 with 35, and 9 with 27 and 36) leaves 1/3 × 4/5 = 4/15. Then we check by multiplying back and look at the traps.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Exam Question', title: 'Divide: −7/27 ÷ (−35/36)', subtitle: 'Multiplying and dividing rational numbers, step by step' }],
      lines: [
        { say: 'In this video, we solve a real test question about multiplying and dividing rational numbers. We will take it one small step at a time, so that every step makes sense.', show: 'title' },
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
          prompt: 'Find the quotient: $-\\dfrac{7}{27} \\div \\left(-\\dfrac{35}{36}\\right)$.',
          answer: '$\\tfrac{4}{15}$',
          working: '7/27 × 36/35 = 1/3 × 4/5',
        },
      ],
      lines: [
        { say: 'Here is the question, from the book.', show: 'q' },
        { say: 'Find the quotient: negative 7 over 27, divided by negative 35 over 36.' },
        { say: 'If you would like to try it first, pause the video now.', wait: 5 },
      ],
    },
    {
      chapter: 'What is it asking?',
      layout: 'center',
      main: [
        { kind: 'math', id: 'm', size: 'lg', lines: ['\\opp{-}\\dfrac{7}{27} \\div \\left(\\opp{-}\\dfrac{35}{36}\\right) = \\ ?'] },
        { kind: 'callout', id: 'c', tone: 'definition', title: 'Quotient', md: 'The **quotient** is the answer to a **division**. Here both numbers are **negative** fractions.' },
      ],
      lines: [
        { say: 'Here is the division. Both fractions are negative.', show: 'm.0' },
        { say: 'The quotient is the answer to a division.', show: 'c' },
      ],
    },
    {
      chapter: 'What you need to know',
      layout: 'center',
      main: [{ kind: 'math', id: 'm', size: 'lg', lines: ['(-) \\div (-) = (+)', '\\dfrac{a}{b} \\div \\dfrac{c}{d} = \\dfrac{a}{b} \\times \\dfrac{d}{c}'] }],
      lines: [
        { say: 'Here is what we need. A negative divided by a negative is a positive.', show: 'm.0' },
        { say: 'And to divide by a fraction, multiply by its reciprocal: flip the second fraction upside down.', show: 'm.1' },
      ],
    },
    {
      chapter: 'The plan',
      layout: 'center',
      main: [{ kind: 'bullets', id: 'plan', items: ['Decide the **sign**', 'Multiply by the **reciprocal**', '**Cancel** common factors, then multiply'] }],
      lines: [
        { say: 'Here is the plan. Decide the sign of the answer.', show: 'plan.0' },
        { say: 'Change the division to multiplying by the reciprocal.', show: 'plan.1' },
        { say: 'Cancel common factors, then multiply.', show: 'plan.2' },
      ],
    },
    {
      chapter: 'Steps 1 to 3: Sign, flip, cancel',
      layout: 'center',
      main: [{ kind: 'math', id: 'st', size: 'lg', lines: ['(-) \\div (-) = \\good{+}', '\\dfrac{7}{27} \\times \\dfrac{36}{35}', '= \\dfrac{\\adj{7} \\times \\opp{36}}{\\opp{27} \\times \\adj{35}} = \\dfrac{\\adj{1} \\times \\opp{4}}{\\opp{3} \\times \\adj{5}}', '= \\good{\\dfrac{4}{15}}'] }],
      lines: [
        { say: 'Step one. A negative divided by a negative is positive. So the answer is positive, and we can drop both minus signs.', show: 'st.0', focus: 'st.0' },
        { say: 'Step two. To divide by 35 over 36, multiply by its reciprocal, 36 over 35. Now we have 7 over 27, times 36 over 35.', show: 'st.1', focus: 'st.1' },
        { say: 'Step three. Cancel before multiplying. 7 goes into 7 once, and into 35 five times. 9 goes into 36 four times, and into 27 three times.', show: 'st.2', focus: 'st.2' },
        { say: 'Now multiply: 1 times 4 is 4, and 3 times 5 is 15. The quotient is 4 fifteenths.', show: 'st.3', focus: 'st.3' },
      ],
    },
    {
      chapter: 'Check the answer',
      layout: 'center',
      main: [{ kind: 'math', id: 'm', size: 'lg', lines: ['\\dfrac{4}{15} \\times \\left(-\\dfrac{35}{36}\\right) = -\\dfrac{140}{540}', '= -\\dfrac{7}{27} \\ \\checkmark'] }],
      lines: [
        { say: 'Let us check by multiplying back. The quotient times the divisor should give the first number. 4 fifteenths times negative 35 over 36 is negative 140 over 540.', show: 'm.0', focus: 'm.0' },
        { say: 'Divide the top and bottom by 20: negative 7 over 27. That is the number we started with. It checks out.', show: 'm.1', focus: 'm.1' },
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
            ['$-\\tfrac{4}{15}$', 'two negatives give a **positive**'],
            ['$\\tfrac{245}{972}$', 'multiplied without flipping: divide means multiply by the **reciprocal**'],
            ['$\\tfrac{36}{27} \\times \\tfrac{7}{35}$', 'flipped the **first** fraction: flip the one you divide **by**'],
          ],
        },
      ],
      lines: [
        { say: 'Here are the traps.', show: 'traps' },
        { say: 'Negative 4 fifteenths has the wrong sign. A negative divided by a negative is positive.' },
        { say: '245 over 972 multiplies the fractions straight across. To divide, flip the second fraction first.' },
        { say: 'And flipping the first fraction instead of the second gives the reciprocal of the right answer. Flip only the fraction you divide by.' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q2',
          prompt: 'Find the quotient: $-\\dfrac{5}{14} \\div \\left(-\\dfrac{15}{28}\\right)$.',
          choices: ['$-\\tfrac{2}{3}$', '$\\tfrac{3}{2}$', '$\\tfrac{2}{3}$', '$\\tfrac{75}{392}$'],
          answer: 2,
          working: '5/14 × 28/15 = 1/1 × 2/3 = 2/3.',
        },
      ],
      lines: [
        { say: 'Your turn. Find the quotient: negative 5 over 14, divided by negative 15 over 28. Pause the video and try it.', show: 'q2', wait: 8 },
        { say: 'Two negatives give a positive. Multiply by the reciprocal: 5 over 14 times 28 over 15. Cancel 5 into 15, and 14 into 28. That leaves 1 over 1 times 2 over 3: two thirds. Choice "C".', show: 'q2.answer' },
      ],
    },
    {
      chapter: 'Summary',
      layout: 'center',
      main: [{ kind: 'bullets', id: 'sum', check: true, items: ['Same signs: **positive**', 'Divide: multiply by the **reciprocal**', '**Cancel** before you multiply', 'Check by **multiplying back**'] }],
      lines: [
        { say: 'Here is what to remember. Two numbers with the same sign give a positive quotient.', show: 'sum.0' },
        { say: 'To divide by a fraction, multiply by its reciprocal.', show: 'sum.1' },
        { say: 'Cancel common factors before you multiply.', show: 'sum.2' },
        { say: 'And check by multiplying back. For more on multiplying and dividing rational numbers, watch this lesson\'s explainer video on Gradileo.', show: 'sum.3' },
      ],
    },
  ],
};

export default video;
