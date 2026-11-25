import type { Explainer } from '@/video/script.ts';

// Exam question for Math 9 lesson 6.2 (equations with brackets and fractions). The question is a
// Try It from OpenStax Elementary Algebra 2e, word for word (section 2.4, Use a General Strategy to
// Solve Linear Equations, CC BY-NC-SA 4.0). Distribute −3: 12 − 12j − 9 = −17, so 3 − 12j = −17,
// −12j = −20 and j = 20/12 = 5/3. Check: 4(5/3) + 3 = 29/3, 3 × 29/3 = 29, 12 − 29 = −17.

const QUESTION = 'Solve: 12 − 3(4j + 3) = −17.';

const video: Explainer = {
  id: 'xq-m9-6-2',
  lessonId: '',
  exam: {
    lesson: 'm9-6-2',
    source: 'OpenStax, Elementary Algebra 2e, Try It in section 2.4, Use a General Strategy to Solve Linear Equations',
    licence: 'CC BY-NC-SA 4.0, access for free at openstax.org',
    url: 'https://openstax.org/books/elementary-algebra-2e/pages/2-4-use-a-general-strategy-to-solve-linear-equations',
    question: QUESTION,
  },
  title: 'Exam Question: Solve 12 − 3(4j + 3) = −17 (Equations with Brackets and Fractions)',
  thumbnailTitle: 'Solve 12 − 3(4j + 3) = −17',
  thumbnail: 'st',
  summary:
    'A real test question, solved one small step at a time: solve 12 − 3(4j + 3) = −17. First we expand the bracket, multiplying both terms by −3: 12 − 12j − 9 = −17. Then we combine 12 − 9 = 3, so 3 − 12j = −17. Subtracting 3 gives −12j = −20, and dividing by −12 gives j = 20/12 = 5/3. Then we check by substituting and look at the traps.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Exam Question', title: 'Solve 12 − 3(4j + 3) = −17', subtitle: 'Equations with brackets and fractions, step by step' }],
      lines: [
        { say: 'In this video, we solve a real test question about equations with brackets and fractions. We will take it one small step at a time, so that every step makes sense.', show: 'title' },
        { say: 'The question comes from the free OpenStax Elementary Algebra textbook. You will see where it comes from at the bottom of the screen the whole way through.' },
      ],
    },
    {
      chapter: 'The question',
      layout: 'center',
      main: [{ kind: 'try', id: 'q', kicker: 'The question', prompt: 'Solve: $12 - 3(4j + 3) = -17$.', answer: '$j = \\tfrac{5}{3}$', working: '12 − 12j − 9 = −17, so −12j = −20' }],
      lines: [
        { say: 'Here is the question, from the book.', show: 'q' },
        { say: 'Solve: 12 minus 3 times the bracket 4 "j" plus 3, equals negative 17.' },
        { say: 'If you would like to try it first, pause the video now.', wait: 5 },
      ],
    },
    {
      chapter: 'What is it asking?',
      layout: 'center',
      main: [
        { kind: 'math', id: 'm', size: 'lg', lines: ['12 \\opp{- 3}(4j + 3) = {-17}'] },
        { kind: 'callout', id: 'c', tone: 'key', title: 'The minus belongs to the 3', md: 'The bracket is multiplied by $-3$, not by $3$. That sign is the key to this question.' },
      ],
      lines: [
        { say: 'We want the value of "j". It is inside a bracket, and the bracket is multiplied by negative 3.', show: 'm.0' },
        { say: 'The minus sign belongs to the 3. So the bracket is multiplied by negative 3. That sign is the key to this question.', show: 'c' },
      ],
    },
    {
      chapter: 'What you need to know',
      layout: 'center',
      main: [{ kind: 'math', id: 'm', size: 'lg', lines: ['-a(b + c) = -ab - ac', '\\text{then: combine, move the numbers, divide}'] }],
      lines: [
        { say: 'Here is what we need. To expand a bracket, multiply every term inside by the number in front, sign and all.', show: 'm.0' },
        { say: 'Then solve as usual: combine like terms, move the numbers, and divide.', show: 'm.1' },
      ],
    },
    {
      chapter: 'The plan',
      layout: 'center',
      main: [{ kind: 'bullets', id: 'plan', items: ['**Expand** the bracket with $-3$', '**Combine** the numbers', 'Isolate $j$: subtract, then **divide**'] }],
      lines: [
        { say: 'Here is the plan. Expand the bracket, multiplying by negative 3.', show: 'plan.0' },
        { say: 'Combine the numbers on the left.', show: 'plan.1' },
        { say: 'Then get "j" on its own: subtract, then divide.', show: 'plan.2' },
      ],
    },
    {
      chapter: 'Steps 1 to 3: Expand, combine, isolate',
      layout: 'center',
      main: [{ kind: 'math', id: 'st', size: 'lg', lines: ['12 \\opp{- 12j - 9} = {-17}', '3 - 12j = {-17}', '{-12j} = {-20}', 'j = \\dfrac{-20}{-12} = \\good{\\dfrac{5}{3}}'] }],
      lines: [
        { say: 'Step one. Expand: negative 3 times 4 "j" is negative 12 "j". Negative 3 times 3 is negative 9.', show: 'st.0', focus: 'st.0' },
        { say: 'Step two. Combine the numbers on the left: 12 minus 9 is 3. So 3 minus 12 "j" equals negative 17.', show: 'st.1', focus: 'st.1' },
        { say: 'Step three. Subtract 3 from both sides: negative 12 "j" equals negative 20.', show: 'st.2', focus: 'st.2' },
        { say: 'Divide both sides by negative 12. A negative over a negative is positive: 20 over 12, which simplifies to five thirds. "j" equals five thirds.', show: 'st.3', focus: 'st.3' },
      ],
    },
    {
      chapter: 'Check the answer',
      layout: 'center',
      main: [{ kind: 'math', id: 'm', size: 'lg', lines: ['4\\left(\\tfrac{5}{3}\\right) + 3 = \\tfrac{20}{3} + \\tfrac{9}{3} = \\tfrac{29}{3}', '12 - 3\\left(\\tfrac{29}{3}\\right) = 12 - 29 = {-17} \\ \\checkmark'] }],
      lines: [
        { say: 'Let us check by putting five thirds back in. Inside the bracket: 4 times five thirds is twenty thirds, plus 3, which is nine thirds, makes twenty-nine thirds.', show: 'm.0', focus: 'm.0' },
        { say: '3 times twenty-nine thirds is 29. And 12 minus 29 is negative 17, which is the right side. It checks out.', show: 'm.1', focus: 'm.1' },
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
            ['$12 - 12j + 9$', 'only the first term got the minus: $-3 \\times 3 = -9$'],
            ['$9(4j + 3)$', 'did $12 - 3$ first: **multiply** before you subtract'],
            ['$j = -\\tfrac{5}{3}$', '$-20 \\div (-12)$ is **positive**'],
          ],
        },
      ],
      lines: [
        { say: 'Here are the traps.', show: 'traps' },
        { say: 'Writing plus 9 multiplies only the first term by negative 3. Both terms get it: negative 3 times 3 is negative 9.' },
        { say: 'Writing 9 times the bracket does 12 minus 3 first. Multiplying comes before subtracting, so expand the bracket first.' },
        { say: 'And negative five thirds has the wrong sign. Negative 20 divided by negative 12 is positive.' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q2',
          prompt: 'Solve: $20 - 2(3k + 1) = 6$.',
          choices: ['$k = -2$', '$k = 2$', '$k = 4$', '$k = \\tfrac{8}{3}$'],
          answer: 1,
          working: '20 − 6k − 2 = 6, so 18 − 6k = 6, −6k = −12 and k = 2.',
        },
      ],
      lines: [
        { say: 'Your turn. Solve: 20 minus 2 times the bracket 3 "k" plus 1, equals 6. Pause the video and try it.', show: 'q2', wait: 8 },
        { say: 'Expand: 20 minus 6 "k" minus 2 equals 6. Combine: 18 minus 6 "k" equals 6. Subtract 18: negative 6 "k" equals negative 12. Divide by negative 6: "k" equals 2. Choice "B".', show: 'q2.answer' },
      ],
    },
    {
      chapter: 'Summary',
      layout: 'center',
      main: [{ kind: 'bullets', id: 'sum', check: true, items: ['Expand with the number **and its sign**', 'Multiply **every** term in the bracket', 'Combine, move, **divide**', 'Check by **substituting**'] }],
      lines: [
        { say: 'Here is what to remember. Expand the bracket with the number in front and its sign.', show: 'sum.0' },
        { say: 'Multiply every term in the bracket.', show: 'sum.1' },
        { say: 'Then combine, move the numbers, and divide.', show: 'sum.2' },
        { say: 'And check by substituting. For more on equations with brackets and fractions, watch this lesson\'s explainer video on Gradileo.', show: 'sum.3' },
      ],
    },
  ],
};

export default video;
