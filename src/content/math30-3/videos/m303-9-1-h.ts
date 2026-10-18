import type { Explainer } from '@/video/script.ts';
import { figure } from '@/video/solids.ts';
import { ticTacToe } from './lib/m303-9-figures.ts';

/** Two boards with X to play: one where X can win, and one where X must block. */
const winBlock = figure(
  'wb',
  [
    ticTacToe({
      name: 'w',
      at: [0, 0],
      label: '\\text{X can win}',
      marks: [
        { id: 'x1', cell: [0, 0], who: 'X' },
        { id: 'x2', cell: [0, 1], who: 'X' },
        { id: 'o1', cell: [1, 0], who: 'O' },
        { id: 'o2', cell: [2, 2], who: 'O' },
        { id: 'x3', cell: [0, 2], who: 'X', tone: 'good' },
      ],
      lines: [{ id: 'row', from: [0, 0], to: [0, 2] }],
    }),
    ticTacToe({
      name: 'k',
      at: [4.6, 0],
      label: '\\text{X must block}',
      marks: [
        { id: 'x1', cell: [0, 1], who: 'X' },
        { id: 'x2', cell: [2, 0], who: 'X' },
        { id: 'o1', cell: [0, 0], who: 'O' },
        { id: 'o2', cell: [1, 1], who: 'O' },
        { id: 'x3', cell: [2, 2], who: 'X', tone: 'good' },
      ],
      lines: [{ id: 'diag', from: [0, 0], to: [2, 2], tone: 'bad' }],
    }),
  ],
  330,
);

/** The lesson's board: X in the top left and top middle, O in the top right and middle left. */
const forkBoard = (id: string) =>
  figure(
    id,
    [
      ticTacToe({
        marks: [
          { id: 'x1', cell: [0, 0], who: 'X' },
          { id: 'x2', cell: [0, 1], who: 'X' },
          { id: 'o1', cell: [0, 2], who: 'O' },
          { id: 'o2', cell: [1, 0], who: 'O' },
          { id: 'x3', cell: [1, 1], who: 'X', tone: 'theta' },
          { id: 'o3', cell: [2, 1], who: 'O' },
          { id: 'x4', cell: [2, 2], who: 'X', tone: 'good' },
        ],
        lines: [
          { id: 'col', from: [0, 1], to: [2, 1], tone: 'theta' },
          { id: 'diag', from: [0, 0], to: [2, 2], tone: 'theta' },
        ],
      }),
    ],
    360,
  );
const board = (id: string) => [`${id}.grid`, `${id}.x1`, `${id}.x2`, `${id}.o1`, `${id}.o2`];

const video: Explainer = {
  id: 'm303-9-1-h',
  lessonId: 'm303-9-1',
  title: 'Logic Puzzles and Games, Part 8: Tic-Tac-Toe',
  thumbnailTitle: 'Tic-Tac-Toe',
  thumbnail: 'fk',
  summary: 'Choose a tic-tac-toe move in this order: win if you can, block if your opponent can win next turn, and otherwise make a fork, two threats at once, so your opponent can block only one. With X in the top left and top middle and O in the top right and middle left, X plays the centre: it threatens the middle column and a diagonal, and wins on the next turn.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Logic Puzzles and Games · Part 8', title: 'Tic-Tac-Toe', subtitle: 'Win, block, then fork' }],
      lines: [
        { say: 'Tic-tac-toe looks like a game for passing the time. But a simple order of moves means you never lose, and sometimes lets you force a win.', show: 'title' },
        { say: 'In this video, you will learn to choose your move in three steps: win, block, then fork.' },
      ],
    },
    {
      chapter: 'Win, block, fork',
      layout: 'center',
      main: [
        {
          kind: 'bullets',
          id: 'b',
          items: ['**1. Win** if you can: complete three in a row.', '**2. Block** if your opponent can win on the next turn.', '**3. Fork**: make two threats at once, so your opponent can block only one.'],
        },
      ],
      lines: [
        { say: 'On every turn, check these in order. First, can you win? If you have two in a row and the third square is empty, take it.', show: 'b.0' },
        { say: 'Second, can your opponent win on their next turn? If they have two in a row with the third square empty, block it.', show: 'b.1' },
        { say: 'Third, if neither, try to make a fork: a move that makes two threats at once. Your opponent can block only one of them, so you win with the other.', show: 'b.2' },
      ],
    },
    {
      chapter: 'Win or block',
      layout: 'center',
      main: [winBlock],
      lines: [
        { say: 'Here are two boards, and it is X’s turn on each.', show: ['grid', 'x1', 'x2', 'o1', 'o2'].flatMap((p) => [`wb.w-${p}`, `wb.k-${p}`]) },
        { say: 'On the left, X has two in the top row, and the third square is empty. X wins by taking it. Always check for a win first.', show: ['wb.w-x3', 'wb.w-row'], focus: ['wb.w-x3', 'wb.w-row'] },
        { say: 'On the right, X cannot win. But O has two on a diagonal, and the bottom right square is empty. If X does not take it, O wins next turn. So X must block.', show: ['wb.k-diag', 'wb.k-x3'], focus: ['wb.k-diag', 'wb.k-x3'] },
      ],
    },
    {
      chapter: 'Making a fork',
      layout: 'split',
      leftWidth: 460,
      left: [forkBoard('fk')],
      right: [
        {
          kind: 'bullets',
          id: 'b',
          items: ['X cannot win, and O has no threat to block.', 'X plays the centre: two threats.', 'O can block only one.', 'X wins with the other.'],
        },
      ],
      lines: [
        { say: 'Now this board, with X to play. Where should X go?', show: board('fk') },
        { say: 'Step one: can X win? The top row is blocked by the O on the right, so no. Step two: does O have two in a row to block? No.', show: 'b.0' },
        { say: 'Step three: look for a fork. If X plays the centre, X has two threats at once: the middle column, from top to bottom, and the diagonal, from the top left to the bottom right.', show: ['fk.x3', 'fk.col', 'fk.diag', 'b.1'], focus: ['fk.x3', 'fk.col', 'fk.diag'] },
        { say: 'O can block only one of them. Say O blocks the middle column, at the bottom.', show: ['fk.o3', 'b.2'], hide: 'fk.col', focus: 'fk.o3' },
        { say: 'Then X completes the diagonal, and wins. The fork forced the win.', show: ['fk.x4', 'b.3'], focus: ['fk.x4', 'fk.diag'] },
      ],
    },
    {
      chapter: 'Watch out',
      layout: 'center',
      main: [
        { kind: 'callout', id: 'oops', tone: 'mistake', title: 'Forking before blocking', md: 'A fork is useless if your opponent can win on their next move. Check the steps **in order**: win, then block, then fork.' },
      ],
      lines: [
        { say: 'A common mistake is to get excited about a fork and forget to look for your opponent’s threats.', show: 'oops' },
        { say: 'If your opponent already has two in a row, they win on their next move, before your fork can pay off. So always check the steps in order: win, then block, and only then fork.' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q',
          prompt: 'In tic-tac-toe, it is your turn. You cannot win on this move, but your opponent has two in a row with the third square empty. What should you do?',
          choices: ['Block the third square', 'Make a fork', 'Take a corner', 'Take the centre'],
          answer: 0,
          working: 'Win first, then block, then fork. You cannot win, so block: otherwise your opponent completes the row on the next turn.',
        },
      ],
      lines: [
        { say: 'Your turn. In tic-tac-toe, it is your turn. You cannot win on this move, but your opponent has two in a row, with the third square empty. What should you do? Pause the video and try it.', show: 'q', wait: 6 },
        { say: 'The answer is A: block the third square. You cannot win, so blocking comes next. Choice B, a fork, comes third: if you do not block, your opponent wins on the next turn.', show: 'q.answer' },
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
          items: ['Win if you can.', 'Block if your opponent can win next turn.', 'Otherwise, make a fork: two threats at once.'],
        },
      ],
      lines: [
        { say: 'Let’s sum up. In tic-tac-toe, first win if you can.', show: 'sum.0' },
        { say: 'Next, block if your opponent can win on the next turn.', show: 'sum.1' },
        { say: 'Otherwise, make a fork, two threats at once, so your opponent can block only one. Practise these puzzles and games in your lesson. See you next time!', show: 'sum.2' },
      ],
    },
  ],
};

export default video;
