import type { DiagramItem, Explainer } from '@/video/script.ts';
import { figure, type Part } from '@/video/solids.ts';

// Exam question for Math 10-3 lesson 6.4 (spatial puzzles and games). The free OpenStax books have
// no puzzles of this kind, so this one is written by Gradileo in the style of a Grade 10 workplace
// mathematics unit test. A 4 by 4 grid holds 16 squares 1 by 1, 9 squares 2 by 2 (3 places across
// and 3 down), 4 squares 3 by 3 and 1 square 4 by 4: 16 + 9 + 4 + 1 = 30 squares. Check: the same
// count for a 2 by 2 grid gives 4 + 1 = 5, which can be counted by hand.

/** A 4 by 4 grid, with one square of each size shaded. */
function grid(): Part {
  const points: Record<string, [number, number]> = {};
  const items: DiagramItem[] = [];
  const sq = (id: string, x: number, y: number, k: number, tone: 'adj' | 'opp' | 'theta' | 'good', group: string) => {
    const c = [[x, y], [x + k, y], [x + k, y + k], [x, y + k]].map(([a, b], i) => {
      points[`${id}${i}`] = [a, b];
      return `${id}${i}`;
    });
    if (k < 4) items.push({ kind: 'region', id: `${id}-fill`, points: c, tone, shade: 0.35, group });
    items.push({ kind: 'curve', id: `${id}-edge`, points: c, closed: true, tone, weight: k < 4 ? 4 : 6, group });
  };
  for (let i = 0; i <= 4; i++) {
    points[`v${i}a`] = [i, 0];
    points[`v${i}b`] = [i, 4];
    points[`h${i}a`] = [0, i];
    points[`h${i}b`] = [4, i];
    items.push({ kind: 'line', id: `v${i}`, from: `v${i}a`, to: `v${i}b`, group: 'grid' }, { kind: 'line', id: `h${i}`, from: `h${i}a`, to: `h${i}b`, group: 'grid' });
  }
  sq('a', 0, 3, 1, 'adj', 's1');
  sq('b', 1, 1, 2, 'opp', 's2');
  sq('c', 1, 0, 3, 'theta', 's3');
  sq('d', 0, 0, 4, 'good', 's4');
  return { points, items };
}

const fig = (height = 400) => figure('gr', [grid()], height);

const QUESTION = 'A 4 by 4 grid is made of 16 small squares. How many squares of any size can be found in the grid?';

const video: Explainer = {
  id: 'xq-m103-6-4',
  lessonId: '',
  exam: {
    lesson: 'm103-6-4',
    source: 'Exam-style question written by Gradileo, in the style of a Grade 10 workplace mathematics unit test',
    licence: 'Written by Gradileo',
    question: QUESTION,
  },
  title: 'Exam Question: How Many Squares in a 4 by 4 Grid? (Spatial Puzzles)',
  thumbnailTitle: 'How Many Squares Can You Find?',
  thumbnail: 'gr',
  summary:
    'An exam-style question, solved one small step at a time: a 4 by 4 grid is made of 16 small squares. How many squares of any size can be found in it? We count each size in turn: 16 squares 1 by 1, 9 squares 2 by 2, 4 squares 3 by 3 and 1 square 4 by 4, for 30 squares in all. Then we check the pattern on a smaller grid and look at the traps.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Exam Question', title: 'How Many Squares Can You Find?', subtitle: 'Spatial puzzles, step by step' }],
      lines: [
        { say: 'In this video, we solve a test-style puzzle about counting squares. We will take it one small step at a time, so that every step makes sense.', show: 'title' },
        { say: 'Gradileo wrote this question in the style of a Grade 10 workplace maths test. You will see that at the bottom of the screen the whole way through.' },
      ],
    },
    {
      chapter: 'The question',
      layout: 'split',
      leftWidth: 560,
      left: [fig()],
      right: [{ kind: 'text', id: 'q', size: 'lg', md: '**The question:** A $4$ by $4$ grid is made of $16$ small squares. How many squares **of any size** can be found in the grid?' }],
      lines: [
        { say: 'Here is the question.', show: ['gr.grid', 'q'] },
        { say: 'A 4 by 4 grid is made of 16 small squares. How many squares of any size can be found in the grid?' },
        { say: 'If you would like to try it first, pause the video now.', wait: 5 },
      ],
    },
    {
      chapter: 'What is it asking?',
      layout: 'split',
      leftWidth: 560,
      left: [fig()],
      right: [{ kind: 'text', id: 't', size: 'md', md: 'Squares come in **four sizes**: $1$ by $1$, $2$ by $2$, $3$ by $3$ and $4$ by $4$. Bigger squares **overlap** each other.' }],
      lines: [
        { say: 'Squares can be any size. Here is a small one, 1 by 1.', show: ['gr.grid', 'gr.s1'] },
        { say: 'Here is a 2 by 2 square, made of four small squares.', show: 'gr.s2' },
        { say: 'Here is a 3 by 3 square.', show: 'gr.s3' },
        { say: 'And the whole grid is a 4 by 4 square. So there are four sizes, and the bigger squares overlap each other.', show: ['gr.s4', 't'] },
      ],
    },
    {
      chapter: 'What you need to know',
      layout: 'center',
      main: [
        { kind: 'math', id: 'f', size: 'lg', lines: ['\\text{places across} = 4 - k + 1', '\\text{squares } k \\text{ by } k = (\\text{places across})^2'] },
        { kind: 'callout', id: 'c', tone: 'key', title: 'Slide the square', md: 'Count each size **on its own**. Slide a $k$ by $k$ square across and down the grid, one small square at a time.' },
      ],
      lines: [
        { say: 'Here is the method. Count each size on its own. Slide a square of that size across the grid, one small square at a time, and count the places it fits.', show: 'c' },
        { say: 'A square k wide fits in 4 minus k plus 1 places across. It fits in the same number of places down, so the number of squares of that size is that number squared.', show: 'f' },
      ],
    },
    {
      chapter: 'The plan',
      layout: 'center',
      main: [{ kind: 'bullets', id: 'plan', items: ['Count the **small** squares', 'Count the **bigger** squares, size by size', '**Add** all the sizes'] }],
      lines: [
        { say: 'Here is the plan. Count the small squares.', show: 'plan.0' },
        { say: 'Count the bigger squares, one size at a time.', show: 'plan.1' },
        { say: 'Then add all the sizes together.', show: 'plan.2' },
      ],
    },
    {
      chapter: 'Step 1: The small squares',
      layout: 'center',
      main: [{ kind: 'math', id: 'm', size: 'lg', lines: ['1 \\text{ by } 1: \\ 4 \\times 4 = 16'] }],
      lines: [
        { say: 'Step one. There are 4 rows of 4 small squares. That is 16 squares, 1 by 1.', show: 'm.0', focus: 'm.0' },
      ],
    },
    {
      chapter: 'Step 2: The bigger squares',
      layout: 'center',
      main: [{ kind: 'math', id: 'm', size: 'lg', lines: ['2 \\text{ by } 2: \\ 3 \\times 3 = 9', '3 \\text{ by } 3: \\ 2 \\times 2 = 4', '4 \\text{ by } 4: \\ 1 \\times 1 = 1'] }],
      lines: [
        { say: 'Step two. A 2 by 2 square fits in 3 places across, and 3 places down. That is 3 times 3, which is 9 squares.', show: 'm.0' },
        { say: 'A 3 by 3 square fits in 2 places across and 2 down. That is 4 squares.', show: 'm.1' },
        { say: 'And a 4 by 4 square fits in just one place: the whole grid. That is 1 square.', show: 'm.2' },
      ],
    },
    {
      chapter: 'Step 3: Add',
      layout: 'center',
      main: [{ kind: 'math', id: 'm', size: 'lg', lines: ['16 + 9 + 4 + 1 = \\good{30 \\text{ squares}}'] }],
      lines: [
        { say: 'Step three. Add all the sizes: 16 plus 9 plus 4 plus 1 is 30. There are 30 squares in the grid.', show: 'm.0', focus: 'm.0' },
      ],
    },
    {
      chapter: 'Check the answer',
      layout: 'center',
      main: [{ kind: 'math', id: 'm', size: 'lg', lines: ['2 \\text{ by } 2 \\text{ grid: } 4 + 1 = 5 \\ \\checkmark', '4 \\text{ by } 4 \\text{ grid: } 4^2 + 3^2 + 2^2 + 1^2 = 30'] }],
      lines: [
        { say: 'Let us check the method on a grid small enough to count by hand. A 2 by 2 grid has 4 small squares and 1 big one: 5 squares. The method gives 2 squared plus 1 squared, which is 5. It works.', show: 'm.0' },
        { say: 'So for the 4 by 4 grid, the count is 4 squared plus 3 squared plus 2 squared plus 1 squared, which is 30. It checks out.', show: 'm.1', focus: 'm.1' },
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
            ['$16$', 'that counts only the **small** squares'],
            ['$17$', 'forgot the $2$ by $2$ and $3$ by $3$ squares'],
            ['$4$ squares $2$ by $2$', 'they can **overlap**: there are $9$'],
          ],
        },
      ],
      lines: [
        { say: 'Here are the traps.', show: 'traps' },
        { say: '16 counts only the small squares. The question asks for squares of any size.' },
        { say: '17 adds the whole grid but forgets the middle sizes, 2 by 2 and 3 by 3.' },
        { say: 'And there are not just 4 squares 2 by 2. Squares can overlap, so sliding one square at a time gives 9.' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q2',
          prompt: 'How many squares of any size can be found in a $3$ by $3$ grid of small squares?',
          choices: ['$14$', '$9$', '$10$', '$13$'],
          answer: 0,
          working: '$9 + 4 + 1 = 14$.',
        },
      ],
      lines: [
        { say: 'Your turn. How many squares of any size can be found in a 3 by 3 grid of small squares? Pause the video and try it.', show: 'q2', wait: 8 },
        { say: 'There are 9 small squares, 4 squares 2 by 2, and 1 square 3 by 3. 9 plus 4 plus 1 is 14. Choice A.', show: 'q2.answer' },
      ],
    },
    {
      chapter: 'Summary',
      layout: 'center',
      main: [{ kind: 'bullets', id: 'sum', check: true, items: ['Count **each size** on its own', '**Slide** the square to count where it fits', 'Bigger squares can **overlap**', 'Check the method on a **smaller** case'] }],
      lines: [
        { say: 'Here is what to remember. Count each size of square on its own.', show: 'sum.0' },
        { say: 'Slide the square across and down to count the places it fits.', show: 'sum.1' },
        { say: 'Bigger squares can overlap, so count every place.', show: 'sum.2' },
        { say: 'And check your method on a smaller case you can count by hand. For more on spatial puzzles and games, watch this lesson\'s explainer video on Gradileo.', show: 'sum.3' },
      ],
    },
  ],
};

export default video;
