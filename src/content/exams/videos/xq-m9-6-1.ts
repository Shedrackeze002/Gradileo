import type { Explainer } from '@/video/script.ts';

// Exam question for Math 9 lesson 6.1 (solving equations with variables on both sides). The
// question is a Try It from OpenStax Elementary Algebra 2e, word for word (section 2.3, Solve
// Equations with Variables and Constants on Both Sides, CC BY-NC-SA 4.0). Subtract 7y: 2y + 4 = 12.
// Subtract 4: 2y = 8. Divide by 2: y = 4. Check: 9(4) + 4 = 40 and 7(4) + 12 = 40.

const QUESTION = 'Solve: 9y + 4 = 7y + 12.';

const video: Explainer = {
  id: 'xq-m9-6-1',
  lessonId: '',
  exam: {
    lesson: 'm9-6-1',
    source: 'OpenStax, Elementary Algebra 2e, Try It in section 2.3, Solve Equations with Variables and Constants on Both Sides',
    licence: 'CC BY-NC-SA 4.0, access for free at openstax.org',
    url: 'https://openstax.org/books/elementary-algebra-2e/pages/2-3-solve-equations-with-variables-and-constants-on-both-sides',
    question: QUESTION,
  },
  title: 'Exam Question: Solve 9y + 4 = 7y + 12 (Solving Equations with Variables on Both Sides)',
  thumbnailTitle: 'Solve 9y + 4 = 7y + 12',
  thumbnail: 'st',
  summary:
    'A real test question, solved one small step at a time: solve 9y + 4 = 7y + 12. We collect the variable terms on one side by subtracting 7y from both sides, which gives 2y + 4 = 12. Then we subtract 4 from both sides, 2y = 8, and divide by 2: y = 4. Then we check by substituting and look at the traps.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Exam Question', title: 'Solve 9y + 4 = 7y + 12', subtitle: 'Solving equations with variables on both sides, step by step' }],
      lines: [
        { say: 'In this video, we solve a real test question about solving equations with variables on both sides. We will take it one small step at a time, so that every step makes sense.', show: 'title' },
        { say: 'The question comes from the free OpenStax Elementary Algebra textbook. You will see where it comes from at the bottom of the screen the whole way through.' },
      ],
    },
    {
      chapter: 'The question',
      layout: 'center',
      main: [{ kind: 'try', id: 'q', kicker: 'The question', prompt: 'Solve: $9y + 4 = 7y + 12$.', answer: '$y = 4$', working: '2y + 4 = 12, so 2y = 8' }],
      lines: [
        { say: 'Here is the question, from the book.', show: 'q' },
        { say: 'Solve: 9 "y" plus 4 equals 7 "y" plus 12.' },
        { say: 'If you would like to try it first, pause the video now.', wait: 5 },
      ],
    },
    {
      chapter: 'What is it asking?',
      layout: 'center',
      main: [
        { kind: 'math', id: 'm', size: 'lg', lines: ['\\adj{9y} + 4 = \\adj{7y} + 12'] },
        { kind: 'callout', id: 'c', tone: 'definition', title: 'Solve', md: 'To **solve** an equation is to find the value of the variable that makes both sides **equal**. Here $y$ appears on **both** sides.' },
      ],
      lines: [
        { say: 'Here is the equation. The variable "y" appears on both sides, in blue.', show: 'm.0' },
        { say: 'To solve it is to find the value of "y" that makes both sides equal.', show: 'c' },
      ],
    },
    {
      chapter: 'What you need to know',
      layout: 'center',
      main: [{ kind: 'math', id: 'm', size: 'lg', lines: ['\\text{do the same thing to both sides}', '\\text{collect the variable on one side, the numbers on the other}'] }],
      lines: [
        { say: 'Here is what we need. An equation is like a balance. If we do the same thing to both sides, it stays balanced.', show: 'm.0' },
        { say: 'Our goal is to collect the variable terms on one side, and the numbers on the other.', show: 'm.1' },
      ],
    },
    {
      chapter: 'The plan',
      layout: 'center',
      main: [{ kind: 'bullets', id: 'plan', items: ['Subtract $7y$: variables on **one side**', 'Subtract $4$: numbers on the **other**', '**Divide** by the coefficient'] }],
      lines: [
        { say: 'Here is the plan. Subtract 7 "y" from both sides, to get the variable on one side.', show: 'plan.0' },
        { say: 'Subtract 4, to get the numbers on the other side.', show: 'plan.1' },
        { say: 'Then divide by the coefficient of "y".', show: 'plan.2' },
      ],
    },
    {
      chapter: 'Steps 1 to 3: Collect, then divide',
      layout: 'center',
      main: [{ kind: 'math', id: 'st', size: 'lg', lines: ['9y \\opp{- 7y} + 4 = 7y \\opp{- 7y} + 12', '2y + 4 \\opp{- 4} = 12 \\opp{- 4}', '\\dfrac{2y}{\\opp{2}} = \\dfrac{8}{\\opp{2}}', '\\good{y = 4}'] }],
      lines: [
        { say: 'Step one. Subtract 7 "y" from both sides. We pick 7 "y" because it is the smaller "y" term, so the "y" stays positive. On the left, 9 "y" minus 7 "y" is 2 "y". On the right, the "y" terms are gone.', show: 'st.0', focus: 'st.0' },
        { say: 'Now we have 2 "y" plus 4 equals 12. Step two. Subtract 4 from both sides. That leaves 2 "y" equals 8.', show: 'st.1', focus: 'st.1' },
        { say: 'Step three. Divide both sides by 2.', show: 'st.2', focus: 'st.2' },
        { say: '"y" equals 4.', show: 'st.3', focus: 'st.3' },
      ],
    },
    {
      chapter: 'Check the answer',
      layout: 'center',
      main: [{ kind: 'math', id: 'm', size: 'lg', lines: ['\\text{left: } 9(4) + 4 = 36 + 4 = 40', '\\text{right: } 7(4) + 12 = 28 + 12 = 40 \\ \\checkmark'] }],
      lines: [
        { say: 'Let us check by putting 4 back in for "y". The left side: 9 times 4 is 36, plus 4 is 40.', show: 'm.0', focus: 'm.0' },
        { say: 'The right side: 7 times 4 is 28, plus 12 is 40. Both sides are 40. It checks out.', show: 'm.1', focus: 'm.1' },
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
            ['$y = 1$', 'added $4 + 12$ wrongly: subtract $4$ from **both** sides, $12 - 4 = 8$'],
            ['$y = 8$', 'stopped at $2y = 8$: still **divide** by $2$'],
            ['$16y = 8$', 'added $7y$: use the **opposite** operation, subtract'],
          ],
        },
      ],
      lines: [
        { say: 'Here are the traps.', show: 'traps' },
        { say: 'Getting "y" equals 1 usually comes from moving the 4 the wrong way. Subtract 4 from both sides: 12 minus 4 is 8.' },
        { say: '"y" equals 8 stops too early. 2 "y" equals 8 means 2 times "y" is 8, so divide by 2.' },
        { say: 'And 16 "y" comes from adding 7 "y" instead of subtracting it. To remove 7 "y", subtract it from both sides.' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q2',
          prompt: 'Solve: $2a - 2 = 6a + 18$.',
          choices: ['$a = -5$', '$a = 5$', '$a = -4$', '$a = 4$'],
          answer: 0,
          working: 'Subtract 2a: −2 = 4a + 18. Subtract 18: −20 = 4a, so a = −5.',
        },
      ],
      lines: [
        { say: 'Your turn. Solve: 2 "a" minus 2 equals 6 "a" plus 18. Pause the video and try it.', show: 'q2', wait: 8 },
        { say: 'Subtract 2 "a" from both sides: negative 2 equals 4 "a" plus 18. Subtract 18: negative 20 equals 4 "a". Divide by 4: "a" equals negative 5. Choice "A".', show: 'q2.answer' },
      ],
    },
    {
      chapter: 'Summary',
      layout: 'center',
      main: [{ kind: 'bullets', id: 'sum', check: true, items: ['Do the **same** to both sides', 'Move the **smaller** variable term', 'Then the numbers, then **divide**', 'Check by **substituting**'] }],
      lines: [
        { say: 'Here is what to remember. Whatever you do to one side, do to the other.', show: 'sum.0' },
        { say: 'Move the smaller variable term, so the variable stays positive.', show: 'sum.1' },
        { say: 'Then move the numbers, and divide by the coefficient.', show: 'sum.2' },
        { say: 'And check by substituting your answer into both sides. For more on solving equations with variables on both sides, watch this lesson\'s explainer video on Gradileo.', show: 'sum.3' },
      ],
    },
  ],
};

export default video;
