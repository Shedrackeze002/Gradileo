import type { Explainer } from '@/video/script.ts';
import { figure } from '@/video/solids.ts';
import { cells } from './lib/m302-8-figures.ts';

const col = (c: string) => [1, 2, 3, 4].map((r) => `${c}${r}`);
const row = (r: number) => ['A', 'B', 'C', 'D'].map((c) => `${c}${r}`);

/** The Sudoku from the lesson, its solution, and a shading for each row, column or box used. */
const grid = (id: string) =>
  figure(id, [
    cells({
      n: 4,
      box: 2,
      labels: true,
      given: { A1: '1', D1: '4', B2: '4', C2: '1', A3: '2', D3: '3', B4: '3', C4: '2' },
      fill: { B1: '2', C1: '3', A2: '3', D2: '2', B3: '1', C3: '4', A4: '4', D4: '1' },
      marks: [
        { id: 'q', cell: 'B1', tex: '?' },
        { id: 'two', cell: 'B1', tex: '2\\text{ or }3' },
      ],
      shades: [
        { id: 'row1', cells: row(1) },
        { id: 'colB', cells: col('B'), tone: 'adj' },
        { id: 'row1b', cells: row(1) },
        { id: 'box1', cells: ['A1', 'B1', 'A2', 'B2'] },
        { id: 'row2', cells: row(2) },
        { id: 'colB2', cells: col('B') },
        { id: 'row3', cells: row(3) },
        { id: 'colA', cells: col('A') },
        { id: 'row4', cells: row(4) },
      ],
    }),
  ]);

/** The bare puzzle, with its top-left box shaded. */
const puzzle = (id: string) =>
  figure(id, [cells({ n: 4, box: 2, labels: true, given: { A1: '1', D1: '4', B2: '4', C2: '1', A3: '2', D3: '3', B4: '3', C4: '2' }, shades: [{ id: 'box', cells: ['A1', 'B1', 'A2', 'B2'], tone: 'brand' }] })]);

const video: Explainer = {
  id: 'm302-8-1-c',
  lessonId: 'm302-8-1',
  title: 'Puzzles and Games, Part 3: Sudoku',
  thumbnailTitle: 'Solving a Sudoku',
  thumbnail: 'g0',
  summary: 'The rules of a 4 by 4 Sudoku, and solving one a certain cell at a time: B1 is 2 or 3 from its row, and not 3 from its column, so B1 = 2; each digit filled in then settles another cell. Why you should never guess between two possibilities.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Puzzles, Games and the Research Project · Part 3', title: 'Sudoku', subtitle: 'Fill in what is certain first' }],
      lines: [
        { say: 'Sudoku puzzles are printed in newspapers and played on phones all over the world. They need no arithmetic at all: only careful logic.', show: 'title' },
        { say: 'In this video, you will solve a four by four Sudoku, one certain cell at a time.' },
      ],
    },
    {
      chapter: 'The rules',
      layout: 'split',
      leftWidth: 480,
      left: [puzzle('g0')],
      right: [
        {
          kind: 'bullets',
          id: 'b',
          items: ['Each **row** contains 1, 2, 3 and 4 exactly once.', 'Each **column** contains 1, 2, 3 and 4 exactly once.', 'Each **2 by 2 box** contains 1, 2, 3 and 4 exactly once.'],
        },
      ],
      lines: [
        { say: 'In a four by four Sudoku, each row, each column and each two by two box contains the digits one to four exactly once.', show: ['b.0', 'b.1', 'b.2'] },
        { say: 'Here is the puzzle. The columns are lettered A to D, and the rows are numbered one to four, so each cell has a name: B one is column B, row one.', show: ['g0.grid', 'g0.letters', 'g0.numbers', 'g0.given'] },
        { say: 'The thick lines mark the four boxes. The top-left box, for example, is A one, B one, A two and B two.', show: 'g0.box', focus: 'g0.box' },
      ],
    },
    {
      chapter: 'Cell B1',
      layout: 'split',
      leftWidth: 480,
      left: [grid('g')],
      right: [{ kind: 'math', id: 'm', size: 'md', align: 'left', lines: ['\\text{Row 1 has } 1, 4', '\\Rightarrow\\ \\text{B1 is 2 or 3}', '\\text{Column B has } 4, 3', '\\Rightarrow\\ \\text{B1} = 2'] }],
      lines: [
        { say: 'Which digit goes in B one?', show: ['g.grid', 'g.letters', 'g.numbers', 'g.given', 'g.q'], focus: 'g.q' },
        { say: 'Row one already has a one and a four, so B one must be two or three.', hide: 'g.q', show: ['g.row1', 'g.two', 'm.0', 'm.1'], focus: ['m.0', 'm.1'] },
        { say: 'Column B already has a four and a three, so B one cannot be three.', hide: 'g.row1', show: ['g.colB', 'm.2'], focus: 'm.2' },
        { say: 'So B one is two.', hide: 'g.two', show: ['g.v-B1', 'm.3'], focus: ['g.v-B1', 'm.3'] },
      ],
    },
    {
      chapter: 'One cell at a time',
      layout: 'split',
      leftWidth: 480,
      left: [grid('g')],
      right: [
        {
          kind: 'math',
          id: 'm',
          size: 'md',
          align: 'left',
          lines: ['\\text{C1} = 3\\ \\ (\\text{row 1})', '\\text{A2} = 3\\ \\ (\\text{box})', '\\text{D2} = 2\\ \\ (\\text{row 2})', '\\text{B3} = 1\\ \\ (\\text{column B})', '\\text{C3} = 4\\ \\ (\\text{row 3})', '\\text{A4} = 4\\ \\ (\\text{column A})', '\\text{D4} = 1\\ \\ (\\text{row 4})'],
        },
      ],
      lines: [
        { say: 'Every digit you fill in gives you more information. Row one now has one, two and four, so C one must be three.', show: ['g.grid', 'g.letters', 'g.numbers', 'g.given', 'g.v-B1', 'g.row1b', 'g.v-C1', 'm.0'], focus: ['g.v-C1', 'm.0'] },
        { say: 'The top-left box now has one, two and four, so A two is three.', hide: 'g.row1b', show: ['g.box1', 'g.v-A2', 'm.1'], focus: ['g.v-A2', 'm.1'] },
        { say: 'Row two now has three, four and one, so D two is two.', hide: 'g.box1', show: ['g.row2', 'g.v-D2', 'm.2'], focus: ['g.v-D2', 'm.2'] },
        { say: 'Column B has two, four and three, so B three is one.', hide: 'g.row2', show: ['g.colB2', 'g.v-B3', 'm.3'], focus: ['g.v-B3', 'm.3'] },
        { say: 'Row three has two, one and three, so C three is four.', hide: 'g.colB2', show: ['g.row3', 'g.v-C3', 'm.4'], focus: ['g.v-C3', 'm.4'] },
        { say: 'Column A has one, three and two, so A four is four.', hide: 'g.row3', show: ['g.colA', 'g.v-A4', 'm.5'], focus: ['g.v-A4', 'm.5'] },
        { say: 'And row four has four, three and two, so D four is one.', hide: 'g.colA', show: ['g.row4', 'g.v-D4', 'm.6'], focus: ['g.v-D4', 'm.6'] },
        { say: 'Check the finished grid: every row, every column and every box has one, two, three and four, exactly once. The puzzle is solved.', hide: 'g.row4', focus: 'g' },
      ],
    },
    {
      chapter: 'Watch out',
      layout: 'center',
      main: [{ kind: 'callout', id: 'oops', tone: 'mistake', title: 'Guessing too early', md: 'If a cell still has two possible digits, do not guess. Fill in cells that have only one possibility first; each one you fill gives you more information.' }],
      lines: [
        { say: 'A common mistake is to guess too early. Looking only at row one, B one could be two or three. A guess of three would look fine at first, until column B had two threes, and much of your work would have to be undone.', show: 'oops' },
        { say: 'So if a cell still has two possible digits, leave it for now, and fill in a cell that has only one possibility. Each digit you fill in gives you more information, and the uncertain cells usually settle themselves.' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q',
          prompt: 'In a 4 by 4 Sudoku, row 2 contains $3$ and $1$, and its two empty cells are A2 and D2. Column D already contains a $2$. What digit goes in D2?',
          choices: ['$2$', '$1$', '$4$', '$3$'],
          answer: 2,
          working: 'Row 2 is missing $2$ and $4$. Column D already has a $2$, so D2 cannot be $2$: D2 $= 4$ (and then A2 $= 2$).',
        },
      ],
      lines: [
        { say: 'Your turn. In a four by four Sudoku, row two contains three and one, and its two empty cells are A two and D two. Column D already contains a two. What digit goes in D two? Pause the video and try it.', show: 'q', wait: 6 },
        { say: 'The answer is C, four. Row two is missing two and four. Column D already has a two, so D two cannot be two: it must be four. Choice A would put two twos in column D.', show: 'q.answer' },
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
            'Each row, column and box contains each digit exactly once.',
            'For an empty cell, rule out the digits already in its row, its column and its box.',
            'Fill in what is certain first; never guess between two possibilities.',
          ],
        },
      ],
      lines: [
        { say: 'Let’s sum up. In a Sudoku, each row, column and box contains each digit exactly once.', show: 'sum.0' },
        { say: 'For an empty cell, rule out the digits already in its row, its column and its box.', show: 'sum.1' },
        { say: 'And fill in what is certain first: never guess between two possibilities. In the next part, you will solve a logic puzzle with a grid of ticks and crosses. See you there!', show: 'sum.2' },
      ],
    },
  ],
};

export default video;
