import type { Explainer } from '@/video/script.ts';
import { figure, type Part } from '@/video/solids.ts';
import { pt } from '@/content/math5/videos/lib/m5-9-figures.ts';
import { cart } from '@/content/math6/videos/lib/m6-8-figures.ts';

// Exam question for Math 7 lesson 5.2 (tables of values and graphs). The question is a Try It from
// OpenStax Prealgebra 2e, word for word (section 11.1, Use the Rectangular Coordinate System,
// CC BY-NC-SA 4.0). Substitute each x into y = 3x − 1: (0, −1), (−1, −4) and (2, 5).

const QUESTION = 'Complete the table to find three solutions to the equation: y = 3x − 1. Table (x; y; (x, y)): 0; blank; blank. −1; blank; blank. 2; blank; blank.';

const g = cart();

const tex = (v: number) => (v < 0 ? `{-${-v}}` : String(v));

const SOLS: [string, number, number, 'left' | 'below right' | 'right'][] = [
  ['a', 0, -1, 'below right'],
  ['b', -1, -4, 'left'],
  ['c', 2, 5, 'right'],
];

/** The line y = 3x − 1 from (−4/3, −5) to (2, 5), the edge of the grid. */
const line: Part = {
  points: { 'ln-a': g.map(-4 / 3, -5), 'ln-b': g.map(2, 5) },
  items: [{ kind: 'line', id: 'ln', from: 'ln-a', to: 'ln-b', tone: 'good', weight: 3 }],
};

const graph = (id: string) =>
  figure(id, [g, line, ...SOLS.map(([p, x, y, place]) => pt(g, p, x, y, `(${tex(x)},\\ ${tex(y)})`, place, 'theta'))]);

const video: Explainer = {
  id: 'xq-m7-5-2',
  lessonId: '',
  exam: {
    lesson: 'm7-5-2',
    source: 'OpenStax, Prealgebra 2e, Try It in section 11.1, Use the Rectangular Coordinate System',
    licence: 'CC BY-NC-SA 4.0, access for free at openstax.org',
    url: 'https://openstax.org/books/prealgebra-2e/pages/11-1-use-the-rectangular-coordinate-system',
    question: QUESTION,
  },
  title: 'Exam Question: A Table of Values for y = 3x − 1 (Tables of Values and Graphs)',
  thumbnailTitle: 'A Table for y = 3x − 1',
  thumbnail: 'gr',
  summary:
    'A real test question, solved one small step at a time: complete the table to find three solutions of y = 3x − 1, for x = 0, −1 and 2. Put each x into the equation: 3 · 0 − 1 = −1, 3 · (−1) − 1 = −4 and 3 · 2 − 1 = 5, so the solutions are (0, −1), (−1, −4) and (2, 5). Then we check on a graph, where all three points lie on one straight line, and look at the traps.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Exam Question', title: 'A Table for y = 3x − 1', subtitle: 'Tables of values and graphs, step by step' }],
      lines: [
        { say: 'In this video, we solve a real test question about a table of values. We will take it one small step at a time, so that every step makes sense.', show: 'title' },
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
          prompt: 'Complete the table to find three solutions to the equation: $y = 3x - 1$.',
          answer: '$(0, -1)$, $(-1, -4)$, $(2, 5)$',
          working: 'y = 3(0) − 1 = −1; y = 3(−1) − 1 = −4; y = 3(2) − 1 = 5',
        },
        {
          kind: 'table',
          id: 't',
          head: ['$x$', '$y$', '$(x, y)$'],
          rows: [
            ['$0$', '', ''],
            ['$-1$', '', ''],
            ['$2$', '', ''],
          ],
        },
      ],
      lines: [
        { say: 'Here is the question, from the book.', show: ['q', 't'] },
        { say: 'Complete the table to find three solutions to the equation "y" equals 3 "x" minus 1. The table gives "x" as 0, negative 1 and 2.' },
        { say: 'If you would like to try it first, pause the video now.', wait: 5 },
      ],
    },
    {
      chapter: 'What is it asking?',
      layout: 'center',
      main: [{ kind: 'callout', id: 'c', tone: 'definition', title: 'A solution', md: 'A **solution** of $y = 3x - 1$ is a pair $(x, y)$ that makes the equation **true**. For each $x$ in the table, we find the $y$ that goes with it, and write the pair.' }],
      lines: [
        { say: 'A solution of this equation is a pair of numbers, "x" and "y", that makes the equation true.', show: 'c' },
        { say: 'For each "x" in the table, we find the "y" that goes with it, and write them as a pair.' },
      ],
    },
    {
      chapter: 'What you need to know',
      layout: 'center',
      main: [{ kind: 'callout', id: 'c', tone: 'key', title: 'Substitute', md: '**Substitute** means put the number in place of the letter. Use **brackets** for a negative: $3(-1) - 1$. Then follow the **order of operations**: multiply first, then subtract.' }],
      lines: [
        { say: 'Here is what we need. To substitute, put the number in place of the letter. Put a negative number in brackets.', show: 'c' },
        { say: 'Then follow the order of operations: multiply first, then subtract.' },
      ],
    },
    {
      chapter: 'The plan',
      layout: 'center',
      main: [{ kind: 'bullets', id: 'plan', items: ['Put each $x$ into $y = 3x - 1$', 'Work out $y$: **multiply**, then **subtract**', 'Write each **ordered pair** $(x, y)$'] }],
      lines: [
        { say: 'Here is the plan. Put each "x" into the equation.', show: 'plan.0' },
        { say: 'Work out "y": multiply, then subtract.', show: 'plan.1' },
        { say: 'Then write each ordered pair, "x" first.', show: 'plan.2' },
      ],
    },
    {
      chapter: 'Steps 1 to 3: Substitute each x',
      layout: 'center',
      main: [
        {
          kind: 'table',
          id: 'f',
          head: ['$x$', '$y = 3x - 1$', '$(x, y)$'],
          rows: [
            ['$0$', '$3(0) - 1 = \\good{-1}$', '$\\good{(0, -1)}$'],
            ['$-1$', '$3(-1) - 1 = -3 - 1 = \\good{-4}$', '$\\good{(-1, -4)}$'],
            ['$2$', '$3(2) - 1 = 6 - 1 = \\good{5}$', '$\\good{(2, 5)}$'],
          ],
        },
      ],
      lines: [
        { say: 'Step one. "x" is 0. 3 times 0 is 0, and 0 minus 1 is negative 1. The pair is 0, negative 1.', show: 'f.0' },
        { say: 'Step two. "x" is negative 1. 3 times negative 1 is negative 3, and negative 3 minus 1 is negative 4. The pair is negative 1, negative 4.', show: 'f.1' },
        { say: 'Step three. "x" is 2. 3 times 2 is 6, and 6 minus 1 is 5. The pair is 2, 5.', show: 'f.2' },
      ],
    },
    {
      chapter: 'Check the answer',
      layout: 'split',
      leftWidth: 560,
      left: [graph('gr')],
      right: [{ kind: 'math', id: 'm', size: 'md', align: 'left', lines: ['\\text{each step right: up } 3', '\\text{all on one line} \\ \\checkmark'] }],
      lines: [
        { say: 'Let us check on a graph. Plot the three pairs.', show: ['gr.grid', 'gr.axes', 'gr.a', 'gr.b', 'gr.c'] },
        { say: 'Each time "x" goes up by 1, "y" goes up by 3, because of the 3 in front of "x".', show: 'm.0', focus: 'm.0' },
        { say: 'So the three points lie on one straight line. If one of them were wrong, it would sit off the line. It checks out.', show: ['gr.ln', 'm.1'], focus: 'gr.ln' },
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
            ['$(-1, -2)$', 'did $3 + (-1) - 1$: $3x$ means $3$ **times** $x$'],
            ['$(-1, -4)$ written $(-4, -1)$', 'swapped the order: **$x$ first**, then $y$'],
            ['$(0, 2)$', 'took $3 - 1$ for $x = 0$: $3 \\times 0$ is $0$'],
          ],
        },
      ],
      lines: [
        { say: 'Here are the traps.', show: 'traps' },
        { say: 'Negative 1, negative 2 adds 3 and negative 1. But 3 "x" means 3 times "x", so it is negative 3, then minus 1.' },
        { say: 'Writing negative 4, negative 1 swaps the order. An ordered pair always has "x" first, then "y".' },
        { say: 'And 0, 2 forgets that 3 times 0 is 0. Then 0 minus 1 is negative 1.' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q2',
          prompt: 'Which ordered pair is a solution of $y = 2x + 3$?',
          choices: ['$(1, 5)$', '$(2, 5)$', '$(0, 2)$', '$(-1, 5)$'],
          answer: 0,
          working: 'x = 1: y = 2(1) + 3 = 5, so (1, 5).',
        },
      ],
      lines: [
        { say: 'Your turn. Which ordered pair is a solution of "y" equals 2 "x" plus 3? Pause the video and try it.', show: 'q2', wait: 8 },
        { say: 'Put "x" equals 1 in: 2 times 1 plus 3 is 5. So 1, 5 is a solution. Choice "A".', show: 'q2.answer' },
      ],
    },
    {
      chapter: 'Summary',
      layout: 'center',
      main: [{ kind: 'bullets', id: 'sum', check: true, items: ['**Substitute** each $x$', '**Brackets** for a negative', '**Multiply**, then add or subtract', 'Points on a **line** check the table'] }],
      lines: [
        { say: 'Here is what to remember. Substitute each "x" into the equation.', show: 'sum.0' },
        { say: 'Put a negative number in brackets.', show: 'sum.1' },
        { say: 'Multiply first, then add or subtract.', show: 'sum.2' },
        { say: 'And the points should lie on a straight line. For more on tables of values and graphs, watch this lesson\'s explainer video on Gradileo.', show: 'sum.3' },
      ],
    },
  ],
};

export default video;
