import type { Explainer } from '@/video/script.ts';
import { figure } from '@/video/solids.ts';
import { ratioTable } from '@/content/math6/videos/lib/m6-5-figures.ts';

// Eggs to servings: 4 : 6 = 2 : 3 = 10 : 15.
const eggs = (id: string) =>
  figure(
    id,
    [
      ratioTable({
        rows: ['\\text{Eggs}', '\\text{Servings}'],
        cols: [
          ['4', '6'],
          ['2', '3'],
          ['10', '15'],
        ],
        titleWidth: 3.6,
        colWidth: 2,
        arrows: [
          { id: 'd2', from: 0, to: 1, label: '\\div 2', tone: 'adj' },
          { id: 'x5', from: 1, to: 2, label: '\\times 5' },
        ],
      }),
    ],
    300,
  );

const video: Explainer = {
  id: 'm8-3-3-d',
  lessonId: 'm8-3-3',
  title: 'Proportional Reasoning, Part 4: The Equivalent-Ratio Method',
  thumbnailTitle: 'The Equivalent-Ratio Method',
  thumbnail: 'eg',
  summary:
    'In the equivalent-ratio method, write a proportion with the same units in the same order on both sides, then solve it. A recipe for 6 servings uses 4 eggs; for 15 servings, eggs over servings gives 4/6 = x/15. In lowest terms 4/6 = 2/3, and 3 × 5 = 15, so x = 2 × 5 = 10 eggs. Mixing up the order, as in 4/6 = 15/x, gives 22.5 eggs, which makes no sense.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Ratios, Rates and Proportional Reasoning · Part 4', title: 'The Equivalent-Ratio Method', subtitle: 'Same units, same order' }],
      lines: [
        { say: 'A pancake recipe for six servings uses four eggs. How many eggs are needed for fifteen servings?', show: 'title' },
        { say: 'In this part, you will answer questions like this with the equivalent-ratio method: write a proportion, then solve it.' },
      ],
    },
    {
      chapter: 'Setting up a proportion',
      layout: 'center',
      main: [
        { kind: 'callout', id: 'key', tone: 'key', title: 'The equivalent-ratio method', md: 'Write a proportion with the **same units** in the **same order** on both sides. Then solve it.' },
        { kind: 'text', id: 'q', size: 'md', align: 'center', md: 'A recipe for $6$ servings uses $4$ eggs. How many eggs are needed for $15$ servings?' },
        { kind: 'math', id: 'm', size: 'lg', lines: ['\\dfrac{\\text{eggs}}{\\text{servings}}\\colon \\quad \\dfrac{4}{6} = \\dfrac{x}{15}'] },
      ],
      lines: [
        { say: 'In the equivalent-ratio method, write a proportion with the same units in the same order on both sides. Then solve it.', show: 'key' },
        { say: 'A recipe for six servings uses four eggs. How many eggs are needed for fifteen servings?', show: 'q' },
        { say: 'Let x be the number of eggs we need. Write each ratio as eggs over servings. On the left, four eggs over six servings. On the right, x eggs over fifteen servings.', show: 'm.0', focus: 'm.0' },
        { say: 'Eggs are on top on both sides, and servings are on the bottom on both sides. The same units, in the same order.' },
      ],
    },
    {
      chapter: 'Solving it',
      layout: 'split',
      leftWidth: 560,
      left: [eggs('eg')],
      right: [
        { kind: 'math', id: 'm', size: 'lg', align: 'left', lines: ['\\dfrac{4}{6} = \\dfrac{x}{15}', '\\dfrac{4}{6} = \\dfrac{2}{3}', '3 \\times 5 = 15', 'x = 2 \\times 5 = 10'] },
        { kind: 'text', id: 'a', size: 'md', md: '**$10$ eggs** are needed.' },
      ],
      lines: [
        { say: 'Now solve four over six equals x over fifteen. No whole number takes six to fifteen, so write four sixths in lowest terms first.', show: ['m.0', 'eg.frame', 'eg.c0'], focus: 'm.0' },
        { say: 'Two divides both four and six. Four sixths equals two thirds: two eggs for every three servings.', show: ['m.1', 'eg.d2', 'eg.c1'], focus: ['m.1', 'eg.d2'] },
        { say: 'Now three times five is fifteen. So multiply the eggs by five as well. Two times five is ten.', show: ['m.2', 'm.3', 'eg.x5', 'eg.c2'], focus: ['m.3', 'eg.x5'] },
        { say: 'Ten eggs are needed for fifteen servings.', show: 'a' },
        { say: 'Does that make sense? Fifteen servings is two and a half times six servings, and two and a half times four eggs is ten eggs. Yes!' },
      ],
    },
    {
      chapter: 'Watch out',
      layout: 'center',
      main: [
        { kind: 'callout', id: 'oops', tone: 'mistake', title: 'Mixing up the order', md: 'Keep the same order on both sides. If the left ratio is eggs over servings, the right ratio must also be eggs over servings.' },
        { kind: 'math', id: 'm', size: 'lg', lines: ['\\bad{\\dfrac{\\text{eggs}}{\\text{servings}} = \\dfrac{\\text{servings}}{\\text{eggs}}\\colon \\quad \\dfrac{4}{6} = \\dfrac{15}{x}}', '\\bad{x = 22.5 \\text{ eggs}}'] },
      ],
      lines: [
        { say: 'Watch out for this mistake. Someone writes four over six equals fifteen over x. The left side is eggs over servings, but the right side is servings over eggs.', show: ['oops', 'm.0'], focus: 'm.0' },
        { say: 'Solving that proportion gives twenty-two and a half eggs. That is far too many! More than five times the eggs, for only two and a half times the pancakes.', show: 'm.1', focus: 'm.1' },
        { say: 'So keep the same order on both sides. If the left ratio is eggs over servings, the right ratio must be eggs over servings as well.' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q',
          prompt: 'A recipe uses $3$ cups of flour for every $2$ cups of milk. Which proportion finds $x$, the cups of flour for $5$ cups of milk?',
          choices: ['$\\dfrac{3}{2} = \\dfrac{5}{x}$', '$\\dfrac{2}{3} = \\dfrac{x}{5}$', '$\\dfrac{3}{5} = \\dfrac{x}{2}$', '$\\dfrac{3}{2} = \\dfrac{x}{5}$'],
          answer: 3,
          working: 'Flour over milk on both sides: $\\tfrac{3}{2} = \\tfrac{x}{5}$. Then $x = 5 \\times \\tfrac{3}{2} = 7.5$ cups of flour.',
        },
      ],
      lines: [
        { say: 'Your turn. A recipe uses three cups of flour for every two cups of milk. Which proportion finds x, the cups of flour for five cups of milk? Pause the video and try it.', show: 'q', wait: 6 },
        { say: 'The answer is D: three over two equals x over five. Both sides are flour over milk. Solving it gives seven and a half cups of flour. Choice A has flour over milk on the left, but milk over flour on the right. The order is mixed up.', show: 'q.answer' },
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
            '**Equivalent-ratio method:** write a proportion with the same units in the same order on both sides.',
            'Eggs over servings: $\\dfrac{4}{6} = \\dfrac{x}{15}$, so $x = 10$.',
            'Check that the answer makes sense.',
          ],
        },
      ],
      lines: [
        { say: 'Let’s sum up. In the equivalent-ratio method, write a proportion with the same units in the same order on both sides.', show: 'sum.0' },
        { say: 'Then solve it, using any of the ways you know.', show: 'sum.1' },
        { say: 'And check that the answer makes sense. In the next part, you will use this method with maps and money. See you there!', show: 'sum.2' },
      ],
    },
  ],
};

export default video;
