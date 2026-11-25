import type { Explainer } from '@/video/script.ts';
import { figure } from '@/video/solids.ts';
import { tileBalance } from '@/content/math8/videos/lib/m8-7-figures.ts';

// Exam question for Math 8 lesson 7.2 (solving two-step equations). The question is a Try It from
// OpenStax Prealgebra 2e, word for word (section 8.3, Solve Equations with Variables and Constants
// on Both Sides, CC BY-NC-SA 4.0). 3x + 4 = −8: subtract 4, 3x = −12; divide by 3, x = −4.

const QUESTION = 'Solve: 3x + 4 = −8.';

const bal = (id: string) =>
  figure(
    id,
    [
      tileBalance({
        left: { blocks: [{ id: 'x', x: 3 }, { id: 'four', units: 4, perRow: 2, tone: 'opp' }] },
        right: { blocks: [{ id: 'neg', units: 8, perRow: 4, tone: 'bad' }] },
        labels: ['3x + 4', '-8'],
      }),
    ],
    320,
  );

const video: Explainer = {
  id: 'xq-m8-7-2',
  lessonId: '',
  exam: {
    lesson: 'm8-7-2',
    source: 'OpenStax, Prealgebra 2e, Try It in section 8.3, Solve Equations with Variables and Constants on Both Sides',
    licence: 'CC BY-NC-SA 4.0, access for free at openstax.org',
    url: 'https://openstax.org/books/prealgebra-2e/pages/8-3-solve-equations-with-variables-and-constants-on-both-sides',
    question: QUESTION,
  },
  title: 'Exam Question: Solve 3x + 4 = −8 (Two-Step Equations)',
  thumbnailTitle: 'Solve 3x + 4 = −8',
  thumbnail: 'ask',
  summary:
    'A real test question, solved one small step at a time: solve 3x + 4 = −8. Undo the steps in reverse order. First subtract 4 from both sides: 3x = −12. Then divide both sides by 3: x = −4. Then we check by putting −4 back into the equation (3 × (−4) + 4 = −8) and look at the traps.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Exam Question', title: 'Solve 3x + 4 = −8', subtitle: 'Two-step equations, step by step' }],
      lines: [
        { say: 'In this video, we solve a real test question about two-step equations. We will take it one small step at a time, so that every step makes sense.', show: 'title' },
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
          prompt: 'Solve: $3x + 4 = -8$.',
          answer: '$x = -4$',
          working: 'subtract 4, then divide by 3',
        },
      ],
      lines: [
        { say: 'Here is the question, from the book.', show: 'q' },
        { say: 'Solve: 3 "x" plus 4 equals negative 8.', caption: 'Solve: 3x + 4 = −8.' },
        { say: 'If you would like to try it first, pause the video now.', wait: 5 },
      ],
    },
    {
      chapter: 'What is it asking?',
      layout: 'center',
      main: [bal('ask'), { kind: 'callout', id: 'c', tone: 'definition', title: 'Two steps', md: 'Think of the equation as a **balance**: both sides are equal. To get $3x + 4$, two things were done to $x$: it was **multiplied by 3**, then **4 was added**. We undo both.' }],
      lines: [
        { say: 'Think of the equation as a balance. On the left, 3 "x" tiles and 4 unit tiles. On the right, 8 negative tiles. Both sides are equal.', show: ['ask.stand', 'ask.l-x', 'ask.l-four', 'ask.r-neg', 'ask.labels'] },
        { say: 'Two things were done to "x": it was multiplied by 3, then 4 was added. To solve, we undo both.', show: 'c' },
      ],
    },
    {
      chapter: 'What you need to know',
      layout: 'center',
      main: [{ kind: 'math', id: 'm', size: 'lg', lines: ['\\text{undo in reverse order}', '\\text{subtracting undoes adding; dividing undoes multiplying}', '\\text{do the same to both sides}'] }],
      lines: [
        { say: 'Here is what we need. Undo the steps in reverse order: the last thing done is the first thing undone.', show: 'm.0' },
        { say: 'Subtracting undoes adding, and dividing undoes multiplying.', show: 'm.1' },
        { say: 'And whatever we do to one side, we do to the other, so it stays balanced.', show: 'm.2' },
      ],
    },
    {
      chapter: 'The plan',
      layout: 'center',
      main: [{ kind: 'bullets', id: 'plan', items: ['**Subtract** $4$ from both sides', '**Divide** both sides by $3$', '**Check** the answer'] }],
      lines: [
        { say: 'Here is the plan. Subtract 4 from both sides.', show: 'plan.0' },
        { say: 'Divide both sides by 3.', show: 'plan.1' },
        { say: 'Then check the answer.', show: 'plan.2' },
      ],
    },
    {
      chapter: 'Steps 1 to 3: Subtract, then divide',
      layout: 'center',
      main: [{ kind: 'math', id: 'm', size: 'lg', lines: ['3x + 4 \\opp{- 4} = -8 \\opp{- 4}', '3x = -12', '\\dfrac{3x}{\\adj{3}} = \\dfrac{-12}{\\adj{3}}', 'x = \\good{-4}'] }],
      lines: [
        { say: 'Step one. The last thing done to "x" was adding 4, so undo it first. Subtract 4 from both sides.', show: 'm.0', focus: 'm.0' },
        { say: 'On the left, plus 4 minus 4 cancels, leaving 3 "x". On the right, negative 8 minus 4 is negative 12.', caption: 'On the left, +4 − 4 cancels, leaving 3x. On the right, −8 − 4 = −12.', show: 'm.1', focus: 'm.1' },
        { say: 'Step two. "x" is multiplied by 3, so divide both sides by 3.', show: 'm.2', focus: 'm.2' },
        { say: 'Step three. Negative 12 divided by 3 is negative 4. So "x" equals negative 4.', caption: 'Step three. −12 ÷ 3 = −4. So x = −4.', show: 'm.3', focus: 'm.3' },
      ],
    },
    {
      chapter: 'Check the answer',
      layout: 'center',
      main: [{ kind: 'math', id: 'm', size: 'lg', lines: ['3(-4) + 4', '= -12 + 4', '= -8 \\ \\checkmark'] }],
      lines: [
        { say: 'Let us check. Put negative 4 back in for "x". 3 times negative 4 is negative 12.', caption: 'Let us check. Put −4 back in for x. 3 × (−4) = −12.', show: ['m.0', 'm.1'], focus: 'm.1' },
        { say: 'Negative 12 plus 4 is negative 8: the right side. It checks out.', caption: '−12 + 4 = −8: the right side. It checks out.', show: 'm.2', focus: 'm.2' },
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
            ['$x = -\\tfrac43$', 'added $4$: to undo $+4$, **subtract** $4$'],
            ['$x = 4$', 'sign slip: $-12 \\div 3 = -4$'],
            ['$x = -36$', 'multiplied by $3$: to undo $\\times 3$, **divide**'],
          ],
        },
      ],
      lines: [
        { say: 'Here are the traps.', show: 'traps' },
        { say: 'Negative 4 thirds comes from adding 4 to negative 8. To undo plus 4, subtract 4.', caption: '−4/3 comes from adding 4 to −8. To undo +4, subtract 4.' },
        { say: 'Positive 4 is a sign slip. Negative 12 divided by 3 is negative 4.', caption: '+4 is a sign slip. −12 ÷ 3 = −4.' },
        { say: 'And negative 36 multiplies by 3. To undo times 3, divide by 3.', caption: 'And −36 multiplies by 3. To undo × 3, divide by 3.' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q2',
          prompt: 'Solve: $2y - 5 = 9$',
          choices: ['$y = 2$', '$y = -2$', '$y = 14$', '$y = 7$'],
          answer: 3,
          working: 'Add 5: 2y = 14. Divide by 2: y = 7.',
        },
      ],
      lines: [
        { say: 'Your turn. Solve: 2 "y" minus 5 equals 9. Pause the video and try it.', caption: 'Your turn. Solve: 2y − 5 = 9. Pause the video and try it.', show: 'q2', wait: 8 },
        { say: 'Add 5 to both sides: 2 "y" equals 14. Divide both sides by 2: "y" equals 7. Choice "D".', caption: 'Add 5 to both sides: 2y = 14. Divide both sides by 2: y = 7. Choice "D".', show: 'q2.answer' },
      ],
    },
    {
      chapter: 'Summary',
      layout: 'center',
      main: [{ kind: 'bullets', id: 'sum', check: true, items: ['Undo in **reverse** order', 'First undo the **adding or subtracting**', 'Then undo the **multiplying or dividing**', '**Check** in the original equation'] }],
      lines: [
        { say: 'Here is what to remember. Undo the steps in reverse order.', show: 'sum.0' },
        { say: 'First undo the adding or subtracting.', show: 'sum.1' },
        { say: 'Then undo the multiplying or dividing.', show: 'sum.2' },
        { say: 'And check in the original equation. For more on solving two-step equations, watch this lesson\'s explainer video on Gradileo.', show: 'sum.3' },
      ],
    },
  ],
};

export default video;
