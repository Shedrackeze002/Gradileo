import type { Explainer } from '@/video/script.ts';

// Exam question for Math 7 lesson 6.4 (solving two-step equations). The question is a Try It from
// OpenStax Prealgebra 2e, word for word (section 8.3, Solve Equations with Variables and Constants
// on Both Sides, CC BY-NC-SA 4.0). 3m − 8 = 19: add 8 to both sides (3m = 27), then divide both
// sides by 3 (m = 9); 3(9) − 8 = 19 checks.

const QUESTION = 'Solve: 3m − 8 = 19.';

const video: Explainer = {
  id: 'xq-m7-6-4',
  lessonId: '',
  exam: {
    lesson: 'm7-6-4',
    source: 'OpenStax, Prealgebra 2e, Try It in section 8.3, Solve Equations with Variables and Constants on Both Sides',
    licence: 'CC BY-NC-SA 4.0, access for free at openstax.org',
    url: 'https://openstax.org/books/prealgebra-2e/pages/8-3-solve-equations-with-variables-and-constants-on-both-sides',
    question: QUESTION,
  },
  title: 'Exam Question: Solve 3m − 8 = 19 (Solving Two-Step Equations)',
  thumbnailTitle: 'Solve 3m − 8 = 19',
  summary:
    'A real test question, solved one small step at a time: solve 3m − 8 = 19. Two things happen to m: it is multiplied by 3, then 8 is taken away. Undo them in reverse order. Add 8 to both sides to get 3m = 27, then divide both sides by 3 to get m = 9. Then we check, 3 × 9 − 8 = 19, and look at the traps.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Exam Question', title: 'Solve 3m − 8 = 19', subtitle: 'Solving two-step equations, step by step' }],
      lines: [
        { say: 'In this video, we solve a real test question about a two-step equation. We will take it one small step at a time, so that every step makes sense.', show: 'title' },
        { say: 'The question comes from the free OpenStax Prealgebra textbook. You will see where it comes from at the bottom of the screen the whole way through.' },
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
          prompt: 'Solve: $3m - 8 = 19$.',
          answer: '$m = 9$',
          working: '3m = 27, m = 9',
        },
      ],
      lines: [
        { say: 'Here is the question, from the book.', show: 'q' },
        { say: 'Solve: 3 "m" minus 8 equals 19.' },
        { say: 'If you would like to try it first, pause the video now.', wait: 5 },
      ],
    },
    {
      chapter: 'What is it asking?',
      layout: 'center',
      main: [{ kind: 'callout', id: 'c', tone: 'definition', title: 'Two steps', md: 'Read what happens to $m$: first it is **multiplied by $3$**, then **$8$ is taken away**, and the result is $19$. We must find the number $m$ that makes this **true**.' }],
      lines: [
        { say: 'Read what happens to "m". First it is multiplied by 3. Then 8 is taken away. And the result is 19.', show: 'c' },
        { say: 'We must find the number "m" that makes this true.' },
      ],
    },
    {
      chapter: 'What you need to know',
      layout: 'center',
      main: [{ kind: 'callout', id: 'c', tone: 'key', title: 'Undo in reverse order', md: 'Undo the steps in **reverse order**, like taking off shoes and then socks. Undo **subtracting** by **adding**, then undo **multiplying** by **dividing**. Always do the **same to both sides**.' }],
      lines: [
        { say: 'Here is what we need. Undo the steps in reverse order, like taking off your shoes before your socks.', show: 'c' },
        { say: 'Undo subtracting by adding, then undo multiplying by dividing. And always do the same thing to both sides.' },
      ],
    },
    {
      chapter: 'The plan',
      layout: 'center',
      main: [{ kind: 'bullets', id: 'plan', items: ['**Add** $8$ to both sides', '**Divide** both sides by $3$', '**Check** in the first equation'] }],
      lines: [
        { say: 'Here is the plan. Add 8 to both sides, to undo the minus 8.', show: 'plan.0' },
        { say: 'Divide both sides by 3, to undo the times 3.', show: 'plan.1' },
        { say: 'Then check in the first equation.', show: 'plan.2' },
      ],
    },
    {
      chapter: 'Steps 1 and 2: Undo each step',
      layout: 'center',
      main: [{ kind: 'math', id: 'm', size: 'lg', lines: ['3m - 8 \\adj{+ 8} = 19 \\adj{+ 8}', '3m = 27', '\\dfrac{3m}{\\opp{3}} = \\dfrac{27}{\\opp{3}}', '\\good{m = 9}'] }],
      lines: [
        { say: 'Step one. The last thing done to "m" was taking away 8, so undo that first. Add 8 to both sides.', show: 'm.0', focus: 'm.0' },
        { say: 'On the left, minus 8 plus 8 cancels. On the right, 19 plus 8 is 27. So 3 "m" equals 27.', show: 'm.1', focus: 'm.1' },
        { say: 'Step two. "m" is multiplied by 3, so divide both sides by 3.', show: 'm.2', focus: 'm.2' },
        { say: '27 divided by 3 is 9. So "m" is 9.', show: 'm.3', focus: 'm.3' },
      ],
    },
    {
      chapter: 'Check the answer',
      layout: 'center',
      main: [{ kind: 'math', id: 'm', size: 'lg', lines: ['3(9) - 8 = 27 - 8', '= 19 \\ \\checkmark'] }],
      lines: [
        { say: 'Let us check. Put 9 back in for "m": 3 times 9 is 27, and 27 minus 8 is 19.', show: 'm.0' },
        { say: 'That is the 19 on the right side. It checks out.', show: 'm.1', focus: 'm.1' },
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
            ['$m = \\tfrac{11}{3}$', 'subtracted $8$: undo **minus** $8$ by **adding** $8$'],
            ['$m = 27$', 'stopped at $3m = 27$: that is **three** lots of $m$'],
            ['$m = 81$', 'multiplied $27$ by $3$: undo **times** by **dividing**'],
          ],
        },
      ],
      lines: [
        { say: 'Here are the traps.', show: 'traps' },
        { say: '11 thirds comes from subtracting 8 from both sides, which gives 3 "m" equals 11. To undo minus 8, add 8.' },
        { say: '"m" equals 27 stops after the first step. 27 is 3 "m", three lots of "m", so divide by 3 to find one "m".' },
        { say: 'And 81 multiplies 27 by 3. To undo times 3, divide by 3.' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q2',
          prompt: 'Solve: $5k + 4 = -21$.',
          choices: ['$k = -3.4$', '$k = 5$', '$k = -5$', '$k = -125$'],
          answer: 2,
          working: 'Subtract 4: 5k = −25. Divide by 5: k = −5.',
        },
      ],
      lines: [
        { say: 'Your turn. Solve: 5 "k" plus 4 equals negative 21. Pause the video and try it.', show: 'q2', wait: 8 },
        { say: 'Subtract 4 from both sides: 5 "k" equals negative 25. Divide both sides by 5: "k" is negative 5. Choice "C".', show: 'q2.answer' },
      ],
    },
    {
      chapter: 'Summary',
      layout: 'center',
      main: [{ kind: 'bullets', id: 'sum', check: true, items: ['Undo steps in **reverse order**', '**Add or subtract** first', 'Then **multiply or divide**', '**Substitute** back to check'] }],
      lines: [
        { say: 'Here is what to remember. Undo the steps in reverse order.', show: 'sum.0' },
        { say: 'Undo the adding or subtracting first.', show: 'sum.1' },
        { say: 'Then undo the multiplying or dividing.', show: 'sum.2' },
        { say: 'And substitute your answer back to check. For more on solving two-step equations, watch this lesson\'s explainer video on Gradileo.', show: 'sum.3' },
      ],
    },
  ],
};

export default video;
