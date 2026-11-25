import type { Explainer } from '@/video/script.ts';
import { figure } from '@/video/solids.ts';
import { tape } from '@/content/math8/videos/lib/m8-3-figures.ts';

// Exam question for Math 8 lesson 7.3 (equations with brackets). The question is a Try It from
// OpenStax Prealgebra 2e, word for word (section 8.3, Solve Equations with Variables and Constants
// on Both Sides, CC BY-NC-SA 4.0). 6(y − 4) = −18: divide by 6, y − 4 = −3; add 4, y = 1.
// Check by distributing: 6y − 24 = −18, 6y = 6, y = 1.

const QUESTION = 'Solve: 6(y − 4) = −18.';

const groups = (id: string, each: string) =>
  figure(id, [tape({ unit: 1.9, parts: [{ id: 'g', count: 6, tone: 'adj', name: '6 \\text{ equal groups}', value: each }], total: '-18' })], 230);

const video: Explainer = {
  id: 'xq-m8-7-3',
  lessonId: '',
  exam: {
    lesson: 'm8-7-3',
    source: 'OpenStax, Prealgebra 2e, Try It in section 8.3, Solve Equations with Variables and Constants on Both Sides',
    licence: 'CC BY-NC-SA 4.0, access for free at openstax.org',
    url: 'https://openstax.org/books/prealgebra-2e/pages/8-3-solve-equations-with-variables-and-constants-on-both-sides',
    question: QUESTION,
  },
  title: 'Exam Question: Solve 6(y − 4) = −18 (Equations with Brackets)',
  thumbnailTitle: 'Solve 6(y − 4) = −18',
  thumbnail: 'ask',
  summary:
    'A real test question, solved one small step at a time: solve 6(y − 4) = −18. Six equal groups of (y − 4) make −18, so divide both sides by 6: y − 4 = −3. Then add 4 to both sides: y = 1. We check by putting 1 back in, 6(1 − 4) = 6(−3) = −18, and by distributing the 6 instead, then look at the traps.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Exam Question', title: 'Solve 6(y − 4) = −18', subtitle: 'Equations with brackets, step by step' }],
      lines: [
        { say: 'In this video, we solve a real test question about equations with brackets. We will take it one small step at a time, so that every step makes sense.', show: 'title' },
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
          prompt: 'Solve: $6(y - 4) = -18$.',
          answer: '$y = 1$',
          working: 'divide by 6, then add 4',
        },
      ],
      lines: [
        { say: 'Here is the question, from the book.', show: 'q' },
        { say: 'Solve: 6 times the bracket "y" minus 4, equals negative 18.', caption: 'Solve: 6(y − 4) = −18.' },
        { say: 'If you would like to try it first, pause the video now.', wait: 5 },
      ],
    },
    {
      chapter: 'What is it asking?',
      layout: 'center',
      main: [groups('ask', 'y - 4'), { kind: 'callout', id: 'c', tone: 'definition', title: 'A bracket', md: '$6(y - 4)$ means $6$ **times** the whole bracket: $6$ equal groups of $(y - 4)$. Together they make $-18$. We want the value of $y$.' }],
      lines: [
        { say: '6 times the bracket means 6 equal groups of "y" minus 4.', show: ['ask.g', 'ask.g-v', 'c'] },
        { say: 'Together, the 6 groups make negative 18. We want the value of "y".', show: 'ask.total' },
      ],
    },
    {
      chapter: 'What you need to know',
      layout: 'center',
      main: [{ kind: 'math', id: 'm', size: 'lg', lines: ['\\text{dividing undoes multiplying}', '\\text{adding undoes subtracting}', '\\text{or: } 6(y - 4) = 6y - 24'] }],
      lines: [
        { say: 'Here is what we need. Dividing undoes multiplying.', show: 'm.0' },
        { say: 'Adding undoes subtracting.', show: 'm.1' },
        { say: 'And we could also multiply out the bracket: 6 times "y" minus 6 times 4. Both ways give the same answer.', show: 'm.2' },
      ],
    },
    {
      chapter: 'The plan',
      layout: 'center',
      main: [{ kind: 'bullets', id: 'plan', items: ['**Divide** both sides by $6$', '**Add** $4$ to both sides', '**Check** by putting $y$ back in'] }],
      lines: [
        { say: 'Here is the plan. Divide both sides by 6.', show: 'plan.0' },
        { say: 'Add 4 to both sides.', show: 'plan.1' },
        { say: 'Then check, by putting "y" back in.', show: 'plan.2' },
      ],
    },
    {
      chapter: 'Steps 1 to 3: Divide, then add',
      layout: 'center',
      main: [{ kind: 'math', id: 'm', size: 'lg', lines: ['\\dfrac{6(y - 4)}{\\adj{6}} = \\dfrac{-18}{\\adj{6}}', 'y - 4 = -3', 'y - 4 \\opp{+ 4} = -3 \\opp{+ 4}', 'y = \\good{1}'] }],
      lines: [
        { say: 'Step one. The bracket is multiplied by 6, so divide both sides by 6.', show: 'm.0', focus: 'm.0' },
        { say: 'Negative 18 divided by 6 is negative 3. So "y" minus 4 equals negative 3: each group is negative 3.', caption: '−18 ÷ 6 = −3. So y − 4 = −3: each group is −3.', show: 'm.1', focus: 'm.1' },
        { say: 'Step two. 4 is subtracted from "y", so add 4 to both sides.', show: 'm.2', focus: 'm.2' },
        { say: 'Step three. Negative 3 plus 4 is 1. So "y" equals 1.', caption: 'Step three. −3 + 4 = 1. So y = 1.', show: 'm.3', focus: 'm.3' },
      ],
    },
    {
      chapter: 'Check the answer',
      layout: 'center',
      main: [groups('ck', '-3'), { kind: 'math', id: 'm', size: 'md', lines: ['6(1 - 4) = 6(-3) = -18 \\ \\checkmark', '6y - 24 = -18 \\to 6y = 6 \\to y = 1 \\ \\checkmark'] }],
      lines: [
        { say: 'Let us check. Put 1 in for "y". 1 minus 4 is negative 3, so each group is negative 3, and 6 groups of negative 3 make negative 18.', caption: 'Let us check. Put 1 in for y. 1 − 4 = −3, so each group is −3, and 6 groups of −3 make −18.', show: ['ck.g', 'ck.g-v', 'ck.total', 'm.0'], focus: 'm.0' },
        { say: 'Or multiply out the bracket first: 6 "y" minus 24 equals negative 18. Add 24: 6 "y" equals 6. Divide by 6: "y" equals 1. The same answer. It checks out.', caption: 'Or multiply out the bracket first: 6y − 24 = −18. Add 24: 6y = 6. Divide by 6: y = 1. The same answer. It checks out.', show: 'm.1', focus: 'm.1' },
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
            ['$y = -7$', 'subtracted $4$: to undo $-4$, **add** $4$'],
            ['$y = -\\tfrac73$', 'wrote $6y - 4$: the $6$ multiplies **both** terms'],
            ['$y = -3$', 'stopped too soon: $-3$ is $y - 4$, not $y$'],
          ],
        },
      ],
      lines: [
        { say: 'Here are the traps.', show: 'traps' },
        { say: '"y" equals negative 7 subtracts 4 again. To undo minus 4, add 4.', caption: 'y = −7 subtracts 4 again. To undo − 4, add 4.' },
        { say: '"y" equals negative 7 thirds comes from writing 6 "y" minus 4. The 6 multiplies both terms in the bracket: 6 "y" minus 24.', caption: 'y = −7/3 comes from writing 6y − 4. The 6 multiplies both terms in the bracket: 6y − 24.' },
        { say: 'And "y" equals negative 3 stops too soon. Negative 3 is "y" minus 4, not "y".', caption: 'And y = −3 stops too soon. −3 is y − 4, not y.' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q2',
          prompt: 'Solve: $3(x + 2) = 15$',
          choices: ['$x = 3$', '$x = 13$', '$x = 7$', '$x = -3$'],
          answer: 0,
          working: 'Divide by 3: x + 2 = 5. Subtract 2: x = 3.',
        },
      ],
      lines: [
        { say: 'Your turn. Solve: 3 times the bracket "x" plus 2, equals 15. Pause the video and try it.', caption: 'Your turn. Solve: 3(x + 2) = 15. Pause the video and try it.', show: 'q2', wait: 8 },
        { say: 'Divide both sides by 3: "x" plus 2 equals 5. Subtract 2: "x" equals 3. Choice "A".', caption: 'Divide both sides by 3: x + 2 = 5. Subtract 2: x = 3. Choice "A".', show: 'q2.answer' },
      ],
    },
    {
      chapter: 'Summary',
      layout: 'center',
      main: [{ kind: 'bullets', id: 'sum', check: true, items: ['A number by a bracket **multiplies** all of it', '**Divide** by that number first', 'Then undo the **adding or subtracting**', 'Or multiply out the bracket: **both** terms'] }],
      lines: [
        { say: 'Here is what to remember. A number next to a bracket multiplies everything in it.', show: 'sum.0' },
        { say: 'You can divide both sides by that number first.', show: 'sum.1' },
        { say: 'Then undo the adding or subtracting.', show: 'sum.2' },
        { say: 'Or multiply out the bracket, remembering to multiply both terms. For more on equations with brackets, watch this lesson\'s explainer video on Gradileo.', show: 'sum.3' },
      ],
    },
  ],
};

export default video;
