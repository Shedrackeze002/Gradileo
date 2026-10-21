import type { Explainer } from '@/video/script.ts';
import { figure } from '@/video/solids.ts';
import { valueTable } from '@/content/math5/videos/lib/m5-11-figures.ts';
import { toothpicks } from '@/content/math7/videos/lib/m7-5-figures.ts';

const table = (id: string) =>
  figure(
    id,
    [valueTable({ x: { title: '\\text{Figure, } n', values: [1, 2, 3, 4] }, y: { title: '\\text{Toothpicks, } t', values: [4, 7, 10, 13] }, titleW: 3.8, cellW: 1.5 })],
    220,
  );

// Figure 2: the two squares share a side, so 7 toothpicks, not 8.
const two = (id: string) =>
  figure(id, [toothpicks({ name: 'f2', squares: 2, size: 1.4, fresh: [1], label: '\\text{Figure 2}', count: '7 \\text{ toothpicks, not } 8' })], 280);

const video: Explainer = {
  id: 'm9-4-1-b',
  lessonId: 'm9-4-1',
  title: 'Writing Equations to Describe Patterns, Part 2: Verifying an Equation',
  thumbnailTitle: 'Verifying an Equation',
  thumbnail: 'tw',
  summary:
    'To verify an equation is to check that it gives the right value for every known pair: substitute values from the table and compare. For the toothpick pattern t = 3n + 1, Figure 4 gives 3(4) + 1 = 13, which matches the table, and so do Figures 1, 2 and 3. Checking only one figure is not enough: t = 4n works for Figure 1, but gives 8 for Figure 2, which has only 7 toothpicks.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Linear Relations · Part 2', title: 'Verifying an Equation', subtitle: 'Does it work for every figure?' }],
      lines: [
        { say: 'You have written an equation for a pattern. But how do you know it is right? Before you trust an equation, you should check it.', show: 'title' },
        { say: 'In this part, you will verify an equation by substituting values from a table.' },
      ],
    },
    {
      chapter: 'What verify means',
      layout: 'center',
      main: [
        { kind: 'callout', id: 'def', tone: 'definition', title: 'Verify', md: 'To **verify** an equation is to check that it gives the right value for **every** known pair. **Substitute** values from the table and compare.' },
        { kind: 'math', id: 'm', size: 'lg', lines: ['t = 3n + 1'] },
      ],
      lines: [
        { say: 'To verify an equation is to check that it gives the right value for every known pair of values.', show: 'def' },
        { say: 'You do this by substituting: replacing the variable with a number from the table, then working out the other value and comparing it with the table.' },
        { say: 'In the last part, you wrote t equals three n plus one for the toothpick squares. Now verify it.', show: 'm.0', focus: 'm.0' },
      ],
    },
    {
      chapter: 'Check Figure 4',
      layout: 'center',
      main: [
        table('tb'),
        { kind: 'math', id: 'm', size: 'lg', lines: ['n = 4: \\quad t = 3(4) + 1 = 12 + 1 = 13 \\;\\good{\\checkmark}', 'n = 2: \\quad t = 3(2) + 1 = 6 + 1 = 7 \\;\\good{\\checkmark}'] },
      ],
      lines: [
        { say: 'Here is the table of values for the toothpick squares.', show: ['tb.frame', 'tb.xs', 'tb.ys'] },
        { say: 'Verify the equation with Figure four. Substitute n equals four: three times four, plus one, is twelve plus one, which is thirteen.', show: ['m.0', 'tb.hl3'], focus: 'm.0' },
        { say: 'The table shows thirteen toothpicks for Figure four. It matches, so the equation is verified for Figure four.' },
        { say: 'Checking another figure makes you even more sure. For Figure two: three times two, plus one, is seven. That matches as well.', show: ['m.1', 'tb.hl1'], hide: 'tb.hl3', focus: 'm.1' },
      ],
    },
    {
      chapter: 'Every pair',
      layout: 'center',
      main: [
        {
          kind: 'table',
          id: 't',
          head: ['Figure, $n$', '$3n + 1$', 'Table', 'Match?'],
          rows: [
            ['$1$', '$3(1) + 1 = 4$', '$4$', '$\\good{\\checkmark}$'],
            ['$2$', '$3(2) + 1 = 7$', '$7$', '$\\good{\\checkmark}$'],
            ['$3$', '$3(3) + 1 = 10$', '$10$', '$\\good{\\checkmark}$'],
            ['$4$', '$3(4) + 1 = 13$', '$13$', '$\\good{\\checkmark}$'],
          ],
        },
      ],
      lines: [
        { say: 'An equation must work for every figure, so check them all. For Figure one, three times one, plus one, is four. That matches.', show: 't.0', focus: 't.0' },
        { say: 'Figure two gives seven, and Figure three gives ten. Both match.', show: ['t.1', 't.2'], focus: ['t.1', 't.2'] },
        { say: 'And Figure four gives thirteen. Every pair in the table matches, so t equals three n plus one is verified.', show: 't.3', focus: 't.3' },
      ],
    },
    {
      chapter: 'Watch out',
      layout: 'center',
      main: [
        { kind: 'callout', id: 'oops', tone: 'mistake', title: 'Checking only one figure', md: 'Figure 1 has $4$ toothpicks, so someone might guess $t = 4n$. Check Figure 2: $4(2) = 8$, but there are only $7$. The equation must work for **every** figure.' },
        two('tw'),
      ],
      lines: [
        { say: 'Watch out for this mistake. Figure one has four toothpicks, so someone might guess the equation t equals four n. For Figure one, four times one is four, and it matches.', show: 'oops' },
        { say: 'But check Figure two. Four times two is eight, and Figure two has only seven toothpicks, because the two squares share a side.', show: ['tw.f2-sq0', 'tw.f2-sq1', 'tw.f2-label', 'tw.f2-count'], focus: 'tw.f2-count' },
        { say: 'One wrong value is enough. The equation must work for every figure, so t equals four n is wrong.' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q',
          prompt: 'A table shows $x = 1,\\ 2,\\ 3$ and $y = 5,\\ 8,\\ 11$. Which equation is verified by all three pairs?',
          choices: ['$y = 5x$', '$y = 3x + 2$', '$y = 2x + 3$', '$y = x + 4$'],
          answer: 1,
          working: '$3(1) + 2 = 5$, $\\ 3(2) + 2 = 8$ and $3(3) + 2 = 11$: all three match. The other equations work for $x = 1$ only.',
        },
      ],
      lines: [
        { say: 'Your turn. A table shows x equals one, two and three, and y equals five, eight and eleven. Which equation is verified by all three pairs? Pause the video and try it.', show: 'q', wait: 6 },
        { say: 'The answer is B, y equals three x plus two. It gives five, eight and eleven. Choice C works for x equals one, but for x equals two it gives seven, not eight, so it is not verified.', show: 'q.answer' },
      ],
    },
    {
      chapter: 'Summary',
      layout: 'center',
      main: [
        {
          kind: 'bullets',
          id: 'sum',
          check: true,
          items: [
            'To verify, substitute known values and compare with the table.',
            '$t = 3n + 1$: Figure 4 gives $3(4) + 1 = 13$, which matches.',
            'An equation must work for every pair; one figure is not enough.',
          ],
        },
      ],
      lines: [
        { say: 'Let’s sum up. To verify an equation, substitute known values and compare the results with the table.', show: 'sum.0' },
        { say: 'For the toothpick squares, Figure four gives thirteen, which matches.', show: 'sum.1' },
        { say: 'And an equation must work for every pair. Checking one figure is not enough. In the next part, you will write equations for real situations. See you there!', show: 'sum.2' },
      ],
    },
  ],
};

export default video;
