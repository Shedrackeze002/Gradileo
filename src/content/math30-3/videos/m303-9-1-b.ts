import type { Explainer } from '@/video/script.ts';
import { figure } from '@/video/solids.ts';
import { cells } from '../../math30-2/videos/lib/m302-8-figures.ts';
import { gridNumbers } from './lib/m303-9-figures.ts';

/** Cells by column letter (A to D, columns 1 to 4) and row number, A1 at the top left. */
const row = (r: number) => ['A', 'B', 'C', 'D'].map((c) => `${c}${r}`);
const col = (c: string) => [1, 2, 3, 4].map((r) => `${c}${r}`);

/** The lesson's 4 by 4 Sudoku, with every number that is filled in, and shadings to pick out rows, columns and boxes. */
const sudoku = (id: string) =>
  figure(
    id,
    [
      cells({
        n: 4,
        box: 2,
        given: { A1: '1', C1: '3', B2: '4', D2: '2', A3: '2', B3: '1', B4: '3', D4: '1' },
        fill: { C3: '4', C4: '2', A4: '4', C2: '1', A2: '3', B1: '2', D1: '4', D3: '3' },
        marks: [{ id: 'q', cell: 'C3', tex: '?' }],
        shades: [
          { id: 'row1', cells: row(1), tone: 'adj' },
          { id: 'col1', cells: col('A'), tone: 'opp' },
          { id: 'boxTL', cells: ['A1', 'B1', 'A2', 'B2'], tone: 'good' },
          { id: 'row3', cells: row(3), tone: 'adj' },
          { id: 'col3', cells: col('C'), tone: 'opp' },
          { id: 'boxBR', cells: ['C3', 'D3', 'C4', 'D4'], tone: 'good' },
          { id: 'row4', cells: row(4), tone: 'adj' },
          { id: 'colA', cells: col('A'), tone: 'opp' },
        ],
      }),
      gridNumbers({ n: 4 }),
    ],
    460,
  );

const start = ['grid', 'given', 'rownums', 'colnums'];
const at = (id: string, parts: string[]) => parts.map((p) => `${id}.${p}`);

const video: Explainer = {
  id: 'm303-9-1-b',
  lessonId: 'm303-9-1',
  title: 'Logic Puzzles and Games, Part 2: Sudoku',
  thumbnailTitle: 'Sudoku',
  thumbnail: 's1',
  summary: 'In a 4 × 4 Sudoku, each row, column and 2 × 2 box holds 1, 2, 3 and 4 once. Two moves solve most puzzles: only one number fits this cell (its row, column and box hold the other three), and only one cell fits this number (a missing number can go in only one empty cell of a row, column or box). Worked example: the cell in row 3, column 3 must be 4, the 2 in row 4 goes in column 3, and the rest of the puzzle follows.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Logic Puzzles and Games · Part 2', title: 'Sudoku', subtitle: 'Only one number fits, or only one cell fits' }],
      lines: [
        { say: 'Sudoku puzzles appear in newspapers and apps all over the world. A small one uses only the numbers one to four, but it needs the same careful thinking as a big one.', show: 'title' },
        { say: 'In this video, you will learn the rules of a four by four Sudoku, and two moves that solve most puzzles. Then you will solve one completely.' },
      ],
    },
    {
      chapter: 'The rules',
      layout: 'split',
      leftWidth: 520,
      left: [sudoku('s1')],
      right: [{ kind: 'text', id: 't', size: 'md', align: 'left', md: 'Each **row**, each **column** and each $2 \\times 2$ **box** holds $1$, $2$, $3$ and $4$ once.' }],
      lines: [
        { say: 'Here is a four by four Sudoku. Some numbers are given, and you fill in the rest. The rows are numbered one to four from the top, and the columns one to four from the left.', show: at('s1', start) },
        { say: 'The rule is that each row holds the numbers one, two, three and four, once each.', show: ['t', 's1.row1'] },
        { say: 'Each column holds one, two, three and four once each, too.', show: 's1.col1', hide: 's1.row1' },
        { say: 'And each of the four boxes, two cells by two, outlined in thick lines, holds one, two, three and four once each.', show: 's1.boxTL', hide: 's1.col1' },
      ],
    },
    {
      chapter: 'Two moves',
      layout: 'center',
      main: [
        { kind: 'callout', id: 'm1', tone: 'key', title: 'Only one number fits this cell', md: 'The cell’s row, column and box already hold the other three numbers.' },
        { kind: 'callout', id: 'm2', tone: 'key', title: 'Only one cell fits this number', md: 'In a row, column or box, a missing number can go in only one of the empty cells.' },
      ],
      lines: [
        { say: 'Two moves solve most puzzles. The first: only one number fits this cell. Look at everything the cell’s row, column and box already hold. If they hold three different numbers, the fourth is the only one left.', show: 'm1' },
        { say: 'The second: only one cell fits this number. Pick a row, column or box, and a number it is missing. If that number is ruled out of every empty cell but one, it goes in that one.', show: 'm2' },
        { say: 'Both moves are certain, never guesses. And each number you place gives you more to work with.' },
      ],
    },
    {
      chapter: 'Only one number fits',
      layout: 'split',
      leftWidth: 520,
      left: [sudoku('s2')],
      right: [{ kind: 'math', id: 'm', size: 'md', align: 'left', lines: ['\\text{row 3: } 2,\\ 1', '\\text{column 3: } 3', '\\text{left: } 4'] }],
      lines: [
        { say: 'Find the number in the cell marked with a question mark, in row three, column three.', show: [...at('s2', start), 's2.q'] },
        { say: 'Row three already has a two and a one.', show: ['s2.row3', 'm.0'], focus: 'm.0' },
        { say: 'Column three already has a three.', show: ['s2.col3', 'm.1'], hide: 's2.row3', focus: 'm.1' },
        { say: 'So two, one and three are all ruled out. The only number left is four.', show: ['m.2', 's2.v-C3'], hide: ['s2.col3', 's2.q'], focus: ['m.2', 's2.v-C3'] },
      ],
    },
    {
      chapter: 'Only one cell fits',
      layout: 'split',
      leftWidth: 520,
      left: [sudoku('s3')],
      right: [{ kind: 'math', id: 'm', size: 'md', align: 'left', lines: ['\\text{row 4 needs } 2 \\text{ and } 4', '\\text{column 1 has a } 2', '2 \\to \\text{column 3, \\ } 4 \\to \\text{column 1}'] }],
      lines: [
        { say: 'Now look at row four. Where does the two go?', show: [...at('s3', start), 's3.v-C3', 's3.row4'] },
        { say: 'Row four has a three and a one, so it is missing a two and a four. The empty cells are in columns one and three.', show: 'm.0', focus: 'm.0' },
        { say: 'Column one already has a two, in row three. So the two in row four cannot go in column one.', show: ['m.1', 's3.colA'], hide: 's3.row4', focus: 'm.1' },
        { say: 'Only one cell fits the two: column three. And that leaves column one for the four.', show: ['m.2', 's3.v-C4', 's3.v-A4'], hide: 's3.colA', focus: ['m.2', 's3.v-C4', 's3.v-A4'] },
      ],
    },
    {
      chapter: 'Finishing the puzzle',
      layout: 'split',
      leftWidth: 520,
      left: [sudoku('s4')],
      right: [
        {
          kind: 'bullets',
          id: 'b',
          items: ['Column 3 needs a $1$: row 2.', 'Row 2 needs a $3$: column 1.', 'Row 1 needs $2$ and $4$; column 2 has a $4$, so $2$ goes in column 2.', 'Row 3 needs a $3$: column 4.'],
        },
      ],
      lines: [
        { say: 'Keep going, one certain step at a time. Column three now has three, four and two, so the empty cell in row two is a one.', show: [...at('s4', start), 's4.v-C3', 's4.v-C4', 's4.v-A4', 's4.v-C2', 'b.0'], focus: 's4.v-C2' },
        { say: 'Row two now has four, one and two, so its last cell, in column one, is a three.', show: ['s4.v-A2', 'b.1'], focus: 's4.v-A2' },
        { say: 'Row one is missing a two and a four. Column two already has a four, so the two goes in column two, and the four in column four.', show: ['s4.v-B1', 's4.v-D1', 'b.2'], focus: ['s4.v-B1', 's4.v-D1'] },
        { say: 'Row three is missing only a three, in column four. Check every row, column and box: each holds one, two, three and four once. Solved.', show: ['s4.v-D3', 'b.3'], focus: 's4.v-D3' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q',
          prompt: 'In a 4 × 4 Sudoku, one row holds $2$, $4$ and two empty cells. The column of the first empty cell already has a $1$. Which number goes in the first empty cell?',
          choices: ['$1$', '$3$', '$2$', '$4$'],
          answer: 1,
          working: 'The row is missing $1$ and $3$. The first empty cell’s column already has a $1$, so the first empty cell holds $3$ (and the second holds $1$).',
        },
      ],
      lines: [
        { say: 'Your turn. In a four by four Sudoku, one row holds a two, a four and two empty cells. The column of the first empty cell already has a one. Which number goes in the first empty cell? Pause the video and try it.', show: 'q', wait: 6 },
        { say: 'The answer is B, three. The row is missing a one and a three. The first empty cell’s column already has a one, so that cell must hold the three. Choice A is ruled out by the one already in that column.', show: 'q.answer' },
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
          items: ['Each row, column and box holds each number once.', 'Only one number fits a cell when its row, column and box hold the other three.', 'Only one cell fits a number when it is ruled out of every other empty cell.'],
        },
      ],
      lines: [
        { say: 'Let’s sum up. In Sudoku, each row, column and box holds each number once.', show: 'sum.0' },
        { say: 'Only one number fits a cell when its row, column and box already hold all the others.', show: 'sum.1' },
        { say: 'And only one cell fits a number when that number is ruled out of every other empty cell. In part three, we add arithmetic to the grid, with KenKen. See you there!', show: 'sum.2' },
      ],
    },
  ],
};

export default video;
