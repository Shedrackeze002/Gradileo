import type { Explainer } from '@/video/script.ts';
import { figure } from '@/video/solids.ts';
import { cells } from './lib/m302-8-figures.ts';

/** The magic square from the lesson: 2 7 6 / 9 5 1 / 4 3 8, with only the top row and centre given. */
/** The bare puzzle: the top row, the centre and x. */
const puzzle = (id: string) => figure(id, [cells({ n: 3, given: { A1: '2', B1: '7', C1: '6', B2: '5' }, marks: [{ id: 'x', cell: 'A3', tex: 'x' }] })]);

const square = (id: string) =>
  figure(id, [
    cells({
      n: 3,
      given: { A1: '2', B1: '7', C1: '6', B2: '5' },
      marks: [{ id: 'x', cell: 'A3', tex: 'x' }],
      fill: { A3: '4', B3: '3', A2: '9', C3: '8', C2: '1' },
      shades: [
        { id: 'top', cells: ['A1', 'B1', 'C1'] },
        { id: 'diag', cells: ['C1', 'B2', 'A3'] },
        { id: 'colA', cells: ['A1', 'A2', 'A3'], tone: 'bad' },
        { id: 'colB', cells: ['B1', 'B2', 'B3'] },
        { id: 'colA2', cells: ['A1', 'A2', 'A3'] },
        { id: 'diag2', cells: ['A1', 'B2', 'C3'] },
        { id: 'row2', cells: ['A2', 'B2', 'C2'] },
        { id: 'row3', cells: ['A3', 'B3', 'C3'], tone: 'good' },
        { id: 'colC', cells: ['C1', 'C2', 'C3'], tone: 'good' },
      ],
    }),
  ]);

const video: Explainer = {
  id: 'm302-8-1-b',
  lessonId: 'm302-8-1',
  title: 'Puzzles and Games, Part 2: Magic Squares',
  thumbnailTitle: 'Magic Squares',
  thumbnail: 'sq0',
  summary: 'In a magic square every row, column and diagonal adds to the same magic sum. Worked example: the top row 2 + 7 + 6 gives a magic sum of 15, the diagonal 6 + 5 + x = 15 gives x = 4, and filling one line with a single blank at a time completes the square, checked with the lines not yet used.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Puzzles, Games and the Research Project · Part 2', title: 'Magic Squares', subtitle: 'Every line adds to the same number' }],
      lines: [
        { say: 'A magic square is one of the oldest puzzles in mathematics: a grid of numbers in which every line adds up to the same total.', show: 'title' },
        { say: 'In this video, you will find that total, use it to find a missing number, and then complete a whole magic square, one line at a time.' },
      ],
    },
    {
      chapter: 'What is a magic square?',
      layout: 'split',
      leftWidth: 460,
      left: [puzzle('sq0')],
      right: [{ kind: 'callout', id: 'def', tone: 'definition', title: 'Magic square', md: 'Every row, every column and both diagonals add to the same number: the **magic sum**.' }],
      lines: [
        { say: 'In a magic square, every row, every column and both diagonals add to the same number, called the magic sum.', show: 'def' },
        { say: 'Here is a three by three magic square with some numbers missing. The top row is two, seven and six, the centre is five, and the bottom-left corner is x. What number is x?', show: ['sq0.grid', 'sq0.given', 'sq0.x'], focus: 'sq0.x' },
      ],
    },
    {
      chapter: 'The magic sum',
      layout: 'split',
      leftWidth: 460,
      left: [square('sq')],
      right: [{ kind: 'math', id: 'm', size: 'md', align: 'left', lines: ['2 + 7 + 6 = 15', '\\text{magic sum} = 15'] }],
      lines: [
        { say: 'Start with a line that is complete. The top row has all three of its numbers: two plus seven plus six is fifteen.', show: ['sq.grid', 'sq.given', 'sq.x', 'sq.top', 'm.0'], focus: 'm.0' },
        { say: 'So the magic sum is fifteen. Every row, every column and both diagonals of this square must add to fifteen.', show: 'm.1', focus: 'm.1' },
      ],
    },
    {
      chapter: 'Finding x',
      layout: 'split',
      leftWidth: 460,
      left: [square('sq')],
      right: [{ kind: 'math', id: 'm', size: 'md', align: 'left', lines: ['6 + 5 + x = 15', '11 + x = 15', 'x = 4'] }],
      lines: [
        { say: 'Now find a line that contains x and no other blank. The left column will not do: it has two, a blank and x, which is two unknowns.', show: ['sq.grid', 'sq.given', 'sq.x', 'sq.colA'], focus: 'sq.colA' },
        { say: 'But x is also on the diagonal from the top-right corner, through the centre, to the bottom-left corner. That diagonal is six, five and x.', hide: 'sq.colA', show: 'sq.diag', focus: 'sq.diag' },
        { say: 'So six plus five plus x equals fifteen.', show: 'm.0', focus: 'm.0' },
        { say: 'Six plus five is eleven, and eleven plus x is fifteen, so x equals four.', show: ['m.1', 'm.2'], focus: 'm.2' },
        { say: 'Four goes in the bottom-left corner.', hide: 'sq.x', show: 'sq.v-A3', focus: 'sq.v-A3' },
      ],
    },
    {
      chapter: 'Completing the square',
      layout: 'split',
      leftWidth: 460,
      left: [square('sq')],
      right: [
        {
          kind: 'math',
          id: 'm',
          size: 'md',
          align: 'left',
          lines: ['7 + 5 + \\good{3} = 15', '2 + \\good{9} + 4 = 15', '2 + 5 + \\good{8} = 15', '9 + 5 + \\good{1} = 15', '4 + 3 + 8 = 15\\ \\checkmark', '6 + 1 + 8 = 15\\ \\checkmark'],
        },
      ],
      lines: [
        { say: 'To fill in the rest, keep looking for a line with only one blank.', show: ['sq.grid', 'sq.given', 'sq.v-A3'] },
        { say: 'The middle column has seven and five. Fifteen minus twelve leaves three for the bottom.', show: ['sq.colB', 'm.0', 'sq.v-B3'], focus: ['m.0', 'sq.v-B3'] },
        { say: 'Now the left column has two and four. Fifteen minus six leaves nine for the middle.', hide: 'sq.colB', show: ['sq.colA2', 'm.1', 'sq.v-A2'], focus: ['m.1', 'sq.v-A2'] },
        { say: 'The diagonal from the top-left corner has two and five. Fifteen minus seven leaves eight for the bottom-right corner.', hide: 'sq.colA2', show: ['sq.diag2', 'm.2', 'sq.v-C3'], focus: ['m.2', 'sq.v-C3'] },
        { say: 'And the middle row has nine and five. Fifteen minus fourteen leaves one.', hide: 'sq.diag2', show: ['sq.row2', 'm.3', 'sq.v-C2'], focus: ['m.3', 'sq.v-C2'] },
        { say: 'Finally, check the lines you have not used. The bottom row is four plus three plus eight, which is fifteen, and the right column is six plus one plus eight, which is also fifteen. The square is complete.', hide: 'sq.row2', show: ['sq.row3', 'sq.colC', 'm.4', 'm.5'], focus: ['m.4', 'm.5'] },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q',
          prompt: 'In a 3 by 3 magic square, the top row is $4$, $9$ and $8$, and the centre is $7$. What number goes in the bottom-right corner?',
          choices: ['$6$', '$9$', '$12$', '$10$'],
          answer: 3,
          working: 'The magic sum is $4 + 9 + 8 = 21$. The bottom-right corner is on the diagonal through the top-left corner and the centre: $4 + 7 + x = 21$, so $x = 10$.',
        },
      ],
      lines: [
        { say: 'Your turn. In a three by three magic square, the top row is four, nine and eight, and the centre is seven. What number goes in the bottom-right corner? Pause the video and try it.', show: 'q', wait: 6 },
        { say: 'The answer is D, ten. The magic sum is four plus nine plus eight, which is 21. The bottom-right corner is on the diagonal through the top-left corner, four, and the centre, seven, so it is 21 minus eleven: ten. Choice A uses the other diagonal, which gives the bottom-left corner.', show: 'q.answer' },
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
            'In a **magic square**, every row, column and diagonal adds to the **magic sum**.',
            'Find the magic sum from a complete line.',
            'Then fill any line with only one blank, and check the lines you did not use.',
          ],
        },
      ],
      lines: [
        { say: 'Let’s sum up. In a magic square, every row, every column and both diagonals add to the same magic sum.', show: 'sum.0' },
        { say: 'Find the magic sum from a line that is complete.', show: 'sum.1' },
        { say: 'Then fill in any line with only one blank, and finish by checking the lines you did not use. In the next part, you will solve a Sudoku, by filling in what is certain first. See you there!', show: 'sum.2' },
      ],
    },
  ],
};

export default video;
