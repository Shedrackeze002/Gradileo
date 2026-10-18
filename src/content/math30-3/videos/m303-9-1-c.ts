import type { Explainer } from '@/video/script.ts';
import { figure } from '@/video/solids.ts';
import { kenken } from './lib/m303-9-figures.ts';

/** The lesson's 3 by 3 KenKen and its solution: 1 2 3 / 3 1 2 / 2 3 1. */
const SOLUTION = [
  [1, 2, 3],
  [3, 1, 2],
  [2, 3, 1],
];
const puzzle = (id: string) =>
  figure(
    id,
    [
      kenken({
        n: 3,
        cages: [
          { cells: [[0, 0], [0, 1]], target: '2\\times' },
          { cells: [[0, 2], [1, 2]], target: '6\\times' },
          { cells: [[1, 0], [2, 0]], target: '1-' },
          { cells: [[1, 1]], target: '1' },
          { cells: [[2, 1], [2, 2]], target: '4+' },
        ],
        fill: SOLUTION.flatMap((r, ri) => r.map((v, ci) => ({ r: ri, c: ci, tex: String(v), tone: ri === 1 && ci === 1 ? ('ink' as const) : ('good' as const) }))),
        marks: [
          { id: 'q', r: 2, c: 0, tex: '?', tone: 'theta' },
          { id: 'p13', r: 2, c: 1, tex: '1, 3', tone: 'muted', low: true },
          { id: 'p31', r: 2, c: 2, tex: '1, 3', tone: 'muted', low: true },
        ],
      }),
    ],
    470,
  );

const start = (id: string) => [`${id}.grid`, `${id}.cages`, `${id}.targets`];

const video: Explainer = {
  id: 'm303-9-1-c',
  lessonId: 'm303-9-1',
  title: 'Logic Puzzles and Games, Part 3: KenKen',
  thumbnailTitle: 'KenKen',
  thumbnail: 'k1',
  summary: 'In KenKen, each row and column holds each number once, and each cage (outlined in thick lines) must give the number in its corner with the operation shown. Start with cages that can only be made one way: in a 4 × 4 grid a two-cell 7+ cage must be 3 and 4, and a 3− cage must be 4 and 1. In a 3 × 3 puzzle, a 4+ cage in row 3 must hold 1 and 3, so the last cell of the row is 2, and the rest of the puzzle follows.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Logic Puzzles and Games · Part 3', title: 'KenKen', subtitle: 'A grid puzzle with arithmetic' }],
      lines: [
        { say: 'KenKen is a grid puzzle like Sudoku, with arithmetic added. Every cage of cells hides a small calculation.', show: 'title' },
        { say: 'In this video, you will learn the rules of KenKen, and solve a small puzzle by starting with the cages that can only be made one way.' },
      ],
    },
    {
      chapter: 'The rules',
      layout: 'split',
      leftWidth: 540,
      left: [puzzle('k1')],
      right: [
        {
          kind: 'bullets',
          id: 'b',
          items: ['Each **row** and each **column** holds each number once (here $1$, $2$ and $3$).', 'Each **cage**, outlined in thick lines, must give the number in its corner with the operation shown.', 'A one-cell cage holds its number.'],
        },
      ],
      lines: [
        { say: 'Here is a three by three KenKen. It uses the numbers one, two and three. As in Sudoku, each row and each column holds each number once.', show: [...start('k1'), 'b.0'] },
        { say: 'The thick lines split the grid into cages. Each cage must give the number in its corner, using the operation shown.', show: 'b.1', focus: 'k1.cages' },
        { say: 'For example, the two cells of the top left cage must multiply to give two. The two cells of the cage in the bottom right must add to give four.', focus: ['k1.cage0', 'k1.cage4'], show: ['k1.cage0', 'k1.cage4'] },
        { say: 'For a minus cage, subtract the smaller number from the larger one. And a cage with only one cell simply holds its number: the middle cell is a one.', show: ['b.2', 'k1.cage2', 'k1.cage3', 'k1.v1-1'], hide: ['k1.cage0', 'k1.cage4'], focus: ['k1.cage2', 'k1.cage3'] },
      ],
    },
    {
      chapter: 'Cages made one way',
      layout: 'center',
      main: [
        { kind: 'callout', id: 'key', tone: 'key', title: 'Start with cages that can only be made one way', md: 'In a $4 \\times 4$ grid, using $1$ to $4$:' },
        { kind: 'math', id: 'm', size: 'md', lines: ['\\text{7+: } 3 + 4 \\text{ only}', '\\text{3−: } 4 - 1 \\text{ only}', '\\text{5+: } 1 + 4 \\text{ or } 2 + 3 \\text{ (two ways)}'] },
      ],
      lines: [
        { say: 'In KenKen, start with the cages that can only be made one way. In a four by four grid, using one to four, a two-cell cage marked seven plus must hold three and four. No other pair of numbers adds to seven.', show: ['key', 'm.0'], focus: 'm.0' },
        { say: 'A two-cell cage marked three minus must hold four and one, because four minus one is the only difference of three.', show: 'm.1', focus: 'm.1' },
        { say: 'But a five plus cage could be one and four, or two and three. Leave cages like that until other clues help.', show: 'm.2', focus: 'm.2' },
      ],
    },
    {
      chapter: 'A small KenKen',
      layout: 'split',
      leftWidth: 540,
      left: [puzzle('k2')],
      right: [{ kind: 'math', id: 'm', size: 'md', align: 'left', lines: ['\\text{row 3 holds } 1,\\ 2,\\ 3', '\\text{4+: } 1 + 3 \\text{ only}', '? = 2'] }],
      lines: [
        { say: 'Now solve the puzzle. Start with the cell marked with a question mark, in row three, column one.', show: [...start('k2'), 'k2.v1-1', 'k2.q'] },
        { say: 'Row three must hold one, two and three.', show: 'm.0', focus: 'm.0' },
        { say: 'The four plus cage in row three has two cells. Which two different numbers from one to three add to four? Only one and three. Two plus two would repeat a number in the row.', show: ['m.1', 'k2.cage4', 'k2.p13', 'k2.p31'], focus: ['m.1', 'k2.cage4'] },
        { say: 'So the one and the three in row three are both in that cage. The only number left for the question mark is two.', show: ['m.2', 'k2.v2-0'], hide: ['k2.q', 'k2.cage4'], focus: ['m.2', 'k2.v2-0'] },
      ],
    },
    {
      chapter: 'Check with a cage',
      layout: 'split',
      leftWidth: 540,
      left: [puzzle('k3')],
      right: [{ kind: 'math', id: 'm', size: 'md', align: 'left', lines: ['\\text{row 2 has its } 1 \\text{ already}', '\\text{above the 2: } 3', '3 - 2 = 1 \\ \\checkmark'] }],
      lines: [
        { say: 'Check with the one minus cage, in column one. The cell above the two is in row two.', show: [...start('k3'), 'k3.v1-1', 'k3.v2-0', 'k3.p13', 'k3.p31', 'k3.cage2'] },
        { say: 'Row two already has its one, in the one-cell cage. So the cell above the two must be one of the numbers that differ from two by one, but not one itself. It is three.', show: ['m.0', 'm.1', 'k3.v1-0'], focus: ['m.1', 'k3.v1-0'] },
        { say: 'Three minus two is one, which matches the cage. The answer checks.', show: 'm.2', focus: 'm.2' },
      ],
    },
    {
      chapter: 'Finishing the puzzle',
      layout: 'split',
      leftWidth: 540,
      left: [puzzle('k4')],
      right: [
        {
          kind: 'bullets',
          id: 'b',
          items: ['Row 2: $3$, $1$, so the last cell is $2$.', '$6\\times$: $2 \\times 3$, so the top right is $3$.', 'Column 1 has $3$ and $2$, so the top left is $1$; then $2$.', 'Column 2 needs a $3$; the last cell is $1$.'],
        },
      ],
      lines: [
        { say: 'Keep going. Row two has a three and a one, so its last cell is a two.', show: [...start('k4'), 'k4.v1-1', 'k4.v2-0', 'k4.v1-0', 'k4.v1-2', 'b.0'], focus: 'k4.v1-2' },
        { say: 'The six times cage needs two numbers that multiply to six. One of them is two, so the top right cell is three.', show: ['k4.v0-2', 'b.1'], focus: 'k4.v0-2' },
        { say: 'Column one has a three and a two, so its top cell is a one. The two times cage then needs a two beside it: one times two is two.', show: ['k4.v0-0', 'k4.v0-1', 'b.2'], focus: ['k4.v0-0', 'k4.v0-1'] },
        { say: 'Column two has a two and a one, so its bottom cell is a three, and the last cell is a one. Check the four plus cage: three plus one is four. Solved.', show: ['k4.v2-1', 'k4.v2-2', 'b.3'], focus: ['k4.v2-1', 'k4.v2-2'] },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q',
          prompt: 'In a 4 × 4 KenKen, using the numbers $1$ to $4$, which two-cell cage can be made **only one way**?',
          choices: ['$5+$', '$1-$', '$7+$', '$2\\div$'],
          answer: 2,
          working: '$7+$ can only be $3 + 4$. But $5+$ can be $1 + 4$ or $2 + 3$; $1-$ can be $2 - 1$, $3 - 2$ or $4 - 3$; and $2\\div$ can be $2 \\div 1$ or $4 \\div 2$.',
        },
      ],
      lines: [
        { say: 'Your turn. In a four by four KenKen, using the numbers one to four, which two-cell cage can be made only one way? Pause the video and try it.', show: 'q', wait: 6 },
        { say: 'The answer is C, seven plus, which can only be three and four. Choice A, five plus, can be made two ways: one and four, or two and three.', show: 'q.answer' },
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
          items: ['Each row and column holds each number once.', 'Each cage gives its corner number with its operation.', 'Start with cages that can only be made one way, then check every cage.'],
        },
      ],
      lines: [
        { say: 'Let’s sum up. In KenKen, each row and each column holds each number once.', show: 'sum.0' },
        { say: 'Each cage must give the number in its corner, with the operation shown.', show: 'sum.1' },
        { say: 'Start with the cages that can only be made one way, and check every cage at the end. In part four, we solve logic puzzles with a grid of ticks and crosses. See you there!', show: 'sum.2' },
      ],
    },
  ],
};

export default video;
