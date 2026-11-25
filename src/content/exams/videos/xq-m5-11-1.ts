import type { Explainer } from '@/video/script.ts';
import { dots } from '@/video/graph.ts';
import { figure } from '@/video/solids.ts';
import { guide, seqPlane, valueTable } from '@/content/math5/videos/lib/m5-11-figures.ts';

// Exam question for Math 5 lesson 11.1 (arithmetic sequences in tables and graphs). The free
// OpenStax books have no question like this at this level, so this one is written by Gradileo in the
// style of a Grade 5 mathematics unit test. The rows have 4, 7, 10, … tiles, 3 more each time, so
// the first 5 terms are 4, 7, 10, 13, 16; the points (1, 4) to (5, 16) lie on a straight line that
// goes 3 up for each 1 across.

const QUESTION =
  'A garden path is made of rows of tiles. Row 1 has 4 tiles, row 2 has 7 tiles, row 3 has 10 tiles, and the pattern continues. (a) Make a table of the position and the term for the first 5 rows. (b) Plot the points (position, term) on a grid. Do they lie on a straight line?';

const TERMS = [4, 7, 10, 13, 16];

const table = (id: string) =>
  figure(id, [valueTable({ x: { title: '\\text{Position}', values: [1, 2, 3, 4, 5] }, y: { title: '\\text{Term}', values: TERMS }, dy: ['+3', '+3', '+3', '+3'], titleW: 2.4, cellW: 1.3 })], 240);

const g = seqPlane({ x: 6, y: 18, yStep: 2, height: 6 });

/** The five points and the straight line through them. */
const graph = (id: string) =>
  figure(id, [
    g,
    guide(g, 'line', [0.5, 2.5], [5.5, 17.5], 'good', { weight: 3 }),
    dots(g, TERMS.map((t, i) => ({ id: `p${i}`, x: i + 1, y: t, tex: `(${i + 1},\\ ${t})`, place: 'below right' as const }))),
  ]);

const video: Explainer = {
  id: 'xq-m5-11-1',
  lessonId: '',
  exam: {
    lesson: 'm5-11-1',
    source: 'Exam-style question written by Gradileo, in the style of a Grade 5 mathematics unit test',
    licence: 'Written by Gradileo',
    question: QUESTION,
  },
  title: 'Exam Question: Rows of Tiles in a Table and on a Grid (Arithmetic Sequences)',
  thumbnailTitle: 'Do the Points Make a Line?',
  thumbnail: 'gr',
  summary:
    'An exam-style question, solved one small step at a time: the rows of a garden path have 4, 7, 10, … tiles. Make a table of the first 5 rows, plot the points (position, term), and say whether they lie on a straight line. Each row has 3 more tiles, so the terms are 4, 7, 10, 13, 16. The points go 1 across and 3 up each time, so they lie on a straight line. Then we check and look at the traps.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Exam Question', title: 'Do the Points Make a Line?', subtitle: 'Arithmetic sequences in tables and graphs, step by step' }],
      lines: [
        { say: 'In this video, we solve an exam-style question about a pattern in a table and on a grid. We will take it one small step at a time, so that every step makes sense.', show: 'title' },
        { say: 'Gradileo wrote this question in the style of a unit test, because the free textbooks we use have no question like it.' },
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
          prompt: 'A garden path is made of rows of tiles. Row $1$ has $4$ tiles, row $2$ has $7$ tiles, row $3$ has $10$ tiles, and the pattern continues. (a) Make a table of the position and the term for the first $5$ rows. (b) Plot the points (position, term) on a grid. Do they lie on a straight line?',
          answer: '(a) $4, 7, 10, 13, 16$ (b) yes',
          working: 'Add 3 each time; the points go 1 across, 3 up',
        },
      ],
      lines: [
        { say: 'Here is the question.', show: 'q' },
        { say: 'A garden path is made of rows of tiles. Row 1 has 4 tiles, row 2 has 7 tiles, row 3 has 10 tiles, and the pattern continues. Part a. Make a table of the position and the term for the first 5 rows. Part b. Plot the points, position then term, on a grid. Do they lie on a straight line?' },
        { say: 'If you would like to try it first, pause the video now.', wait: 5 },
      ],
    },
    {
      chapter: 'What is it asking?',
      layout: 'center',
      main: [{ kind: 'callout', id: 'c', tone: 'definition', title: 'Position and term', md: 'The **position** is the row number: $1$, $2$, $3$, … The **term** is the number of tiles in that row. Each position and its term make a point: **(position, term)**.' }],
      lines: [
        { say: 'The position is the row number: 1, 2, 3, and so on. The term is the number of tiles in that row.', show: 'c' },
        { say: 'Each position and its term make a point, with the position first and the term second.' },
      ],
    },
    {
      chapter: 'What you need to know',
      layout: 'center',
      main: [{ kind: 'callout', id: 'c', tone: 'key', title: 'Arithmetic sequence', md: 'In an **arithmetic sequence**, the same number is **added** each time. Its points on a grid go the **same** steps across and up each time, so they lie on a **straight line**.' }],
      lines: [
        { say: 'Here is what we need. In an arithmetic sequence, the same number is added each time.', show: 'c' },
        { say: 'So on a grid, each point is the same steps across and up from the one before. That makes the points lie on a straight line.' },
      ],
    },
    {
      chapter: 'The plan',
      layout: 'center',
      main: [{ kind: 'bullets', id: 'plan', items: ['Find what is **added** each time', '**Fill in** the table to row $5$', '**Plot** the points and look for a line'] }],
      lines: [
        { say: 'Here is the plan. Find what is added each time.', show: 'plan.0' },
        { say: 'Fill in the table to row 5.', show: 'plan.1' },
        { say: 'Then plot the points, and see if they lie on a straight line.', show: 'plan.2' },
      ],
    },
    {
      chapter: 'Steps 1 and 2: The table',
      layout: 'center',
      main: [table('t'), { kind: 'math', id: 'm', size: 'md', lines: ['7 - 4 = 3, \\quad 10 - 7 = 3', '10 + 3 = \\good{13}, \\quad 13 + 3 = \\good{16}'] }],
      lines: [
        { say: 'Step one. Row 1 has 4 tiles, row 2 has 7, and row 3 has 10. From 4 to 7 is 3 more, and from 7 to 10 is 3 more. So we add 3 each time.', show: ['t.frame', 't.xs', 't.y0', 't.y1', 't.y2', 't.dy0', 't.dy1', 'm.0'], focus: 'm.0' },
        { say: 'Step two. Row 4 has 10 plus 3, which is 13 tiles. Row 5 has 13 plus 3, which is 16 tiles.', show: ['t.y3', 't.y4', 't.dy2', 't.dy3', 'm.1'], focus: 'm.1' },
      ],
    },
    {
      chapter: 'Step 3: The grid',
      layout: 'split',
      leftWidth: 560,
      left: [graph('gr')],
      right: [{ kind: 'math', id: 'm', size: 'md', align: 'left', lines: ['(1,\\ 4),\\ (2,\\ 7),\\ (3,\\ 10),', '(4,\\ 13),\\ (5,\\ 16)', '1 \\text{ across}, \\ 3 \\text{ up each time}', '\\good{\\text{a straight line}}'] }],
      lines: [
        { say: 'Step three. Each position and its term make a point: one, four; two, seven; three, ten; four, thirteen; and five, sixteen.', caption: 'Step three. Each position and its term make a point: (1, 4), (2, 7), (3, 10), (4, 13) and (5, 16).', show: ['gr.grid', 'gr.axes', 'm.0', 'm.1'] },
        { say: 'Plot them: position across, and term up.', show: ['gr.p0', 'gr.p1', 'gr.p2', 'gr.p3', 'gr.p4'] },
        { say: 'From each point to the next, we go 1 across and 3 up, every time.', show: 'm.2' },
        { say: 'So yes, the points lie on a straight line.', show: ['gr.line', 'm.3'], focus: 'm.3' },
      ],
    },
    {
      chapter: 'Check the answer',
      layout: 'center',
      main: [{ kind: 'math', id: 'm', size: 'lg', lines: ['4 + 3 + 3 + 3 + 3 = 16 \\ \\checkmark'] }],
      lines: [
        { say: 'Let us check row 5. Start with 4 tiles, and add 3 for each of the next four rows: 4 plus 3, plus 3, plus 3, plus 3 is 16. It checks out.', show: 'm', focus: 'm' },
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
            ['row 5: $15$', 'counted on by **ones** or slipped a step: add $3$ **each** time'],
            ['point $(4,\\ 1)$', 'swapped the order: **position** first, then **term**'],
            ['"no line"', 'the same **steps** each time always make a straight line'],
          ],
        },
      ],
      lines: [
        { say: 'Here are the traps.', show: 'traps' },
        { say: '15 for row 5 slips a step. Add exactly 3 each time: 4, 7, 10, 13, 16.' },
        { say: 'Plotting four, one for row 1 swaps the order. The position comes first, so the point is one, four.' },
        { say: 'And saying there is no line forgets that the same steps every time keep the points in a straight line.' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q2',
          prompt: 'A sequence starts $5, 9, 13, 17$, and the pattern continues. Which point (position, term) is on its graph?',
          choices: ['$(5,\\ 1)$', '$(4,\\ 13)$', '$(2,\\ 5)$', '$(5,\\ 21)$'],
          answer: 3,
          working: 'Add 4 each time: position 5 has 17 + 4 = 21, so (5, 21).',
        },
      ],
      lines: [
        { say: 'Your turn. A sequence starts 5, 9, 13, 17, and the pattern continues. Which point, position then term, is on its graph? Pause the video and try it.', show: 'q2', wait: 8 },
        { say: 'The pattern adds 4 each time, so position 5 has 17 plus 4, which is 21. The point is five, twenty-one. Choice "D".', show: 'q2.answer' },
      ],
    },
    {
      chapter: 'Summary',
      layout: 'center',
      main: [{ kind: 'bullets', id: 'sum', check: true, items: ['Find what is **added** each time', 'Each point is **(position, term)**', 'Position **across**, term **up**', 'Same steps: a **straight line**'] }],
      lines: [
        { say: 'Here is what to remember. Find what is added each time.', show: 'sum.0' },
        { say: 'Each point is the position, then the term.', show: 'sum.1' },
        { say: 'Plot the position across and the term up.', show: 'sum.2' },
        { say: 'And the same steps each time make a straight line. For more on arithmetic sequences in tables and graphs, watch this lesson\'s explainer video on Gradileo.', show: 'sum.3' },
      ],
    },
  ],
};

export default video;
