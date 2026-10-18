import type { Explainer } from '@/video/script.ts';
import { figure } from '@/video/solids.ts';
import { pyramid } from './lib/m303-9-figures.ts';

/** A warm-up pyramid: 3, 5 and ? along the bottom, ? and 12 in the middle, ? on top. */
const warm = figure(
  'w',
  [
    pyramid({
      base: 3,
      labels: [
        { id: 'b0', at: [0, 0], tex: '3' },
        { id: 'b1', at: [0, 1], tex: '5' },
        { id: 'b2q', at: [0, 2], tex: '?', tone: 'theta' },
        { id: 'b2', at: [0, 2], tex: '7', tone: 'good' },
        { id: 'm0q', at: [1, 0], tex: '?', tone: 'theta' },
        { id: 'm0', at: [1, 0], tex: '8', tone: 'good' },
        { id: 'm1', at: [1, 1], tex: '12' },
        { id: 'tq', at: [2, 0], tex: '?', tone: 'theta' },
        { id: 't', at: [2, 0], tex: '20', tone: 'good' },
      ],
      shades: [
        { id: 'tri1', bricks: [[0, 0], [0, 1], [1, 0]] },
        { id: 'tri2', bricks: [[0, 1], [0, 2], [1, 1]] },
        { id: 'tri3', bricks: [[1, 0], [1, 1], [2, 0]] },
      ],
    }),
  ],
  330,
);

/** The pyramid that needs algebra: 6, ? and 9 along the bottom, 37 on top. */
const algebra = (id: string) =>
  figure(
    id,
    [
      pyramid({
        base: 3,
        labels: [
          { id: 'a0', at: [0, 0], tex: '6' },
          { id: 'a1q', at: [0, 1], tex: '?', tone: 'theta' },
          { id: 'a1x', at: [0, 1], tex: 'x', tone: 'theta' },
          { id: 'a1', at: [0, 1], tex: '11', tone: 'good' },
          { id: 'a2', at: [0, 2], tex: '9' },
          { id: 'm0x', at: [1, 0], tex: '6 + x', tone: 'adj' },
          { id: 'm1x', at: [1, 1], tex: 'x + 9', tone: 'adj' },
          { id: 'm0', at: [1, 0], tex: '17', tone: 'good' },
          { id: 'm1', at: [1, 1], tex: '20', tone: 'good' },
          { id: 'top', at: [2, 0], tex: '37' },
        ],
      }),
    ],
    330,
  );

const video: Explainer = {
  id: 'm303-9-1',
  lessonId: 'm303-9-1',
  title: 'Logic Puzzles and Games, Part 1: Number Puzzles',
  thumbnailTitle: 'Number Puzzles',
  thumbnail: 'w',
  summary: 'A strategy is a plan that works every time: start with the step that has only one possibility, work backward from the goal, and use a variable when nothing else works. In a number pyramid each brick is the sum of the two below it: add when the bottom two are known, subtract when the top one is. With 6, ? and 9 along the bottom and 37 on top, (6 + x) + (x + 9) = 37 gives x = 11.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Logic Puzzles and Games · Part 1', title: 'Number Puzzles', subtitle: 'Start from what you know for sure' }],
      lines: [
        { say: 'Puzzles and games are good practice for the kind of thinking every trade needs: start from what you know for sure, rule things out, and plan a few moves ahead.', show: 'title' },
        { say: 'Each puzzle in this lesson has exactly one answer. In this video, you will learn what a strategy is, and use one to solve number pyramids, with a little algebra when nothing else works.' },
      ],
    },
    {
      chapter: 'What is a strategy?',
      layout: 'center',
      main: [
        { kind: 'callout', id: 'def', tone: 'definition', title: 'Strategy', md: 'A **strategy** is a plan that works every time, not just a lucky guess.' },
        { kind: 'bullets', id: 'b', items: ['Start with the step that has **only one possibility**.', '**Work backward** from the goal.', '**Use a variable** when nothing else works.'] },
      ],
      lines: [
        { say: 'A strategy is a plan that works every time, not just a lucky guess.', show: 'def' },
        { say: 'Here are three good puzzle strategies. First, start with the step that has only one possibility. Each certain step unlocks another.', show: 'b.0' },
        { say: 'Second, work backward from the goal, when you know how the puzzle must end.', show: 'b.1' },
        { say: 'And third, when nothing can be found directly, use a variable, and let algebra do the work.', show: 'b.2' },
      ],
    },
    {
      chapter: 'Number pyramids',
      layout: 'split',
      leftWidth: 560,
      left: [warm],
      right: [
        { kind: 'text', id: 'rule', size: 'md', align: 'left', md: 'Each brick is the **sum** of the two bricks directly below it.' },
        { kind: 'math', id: 'm', size: 'md', align: 'left', lines: ['3 + 5 = 8', '12 - 5 = 7', '8 + 12 = 20'] },
      ],
      lines: [
        { say: 'In a number pyramid, each brick is the sum of the two bricks directly below it.', show: ['rule', 'w.bricks', 'w.b0', 'w.b1', 'w.b2q', 'w.m0q', 'w.m1', 'w.tq'] },
        { say: 'Look for three bricks in a triangle where you already know two of them. Here, the bottom left triangle has three and five along the bottom. Add them: the brick above is eight.', show: ['w.tri1', 'm.0', 'w.m0'], hide: 'w.m0q', focus: 'm.0' },
        { say: 'Next, the triangle on the right has five along the bottom, and twelve on top. When you know the top brick, subtract: twelve minus five is seven.', show: ['w.tri2', 'm.1', 'w.b2'], hide: ['w.tri1', 'w.b2q'], focus: 'm.1' },
        { say: 'Now the top triangle has eight and twelve along its bottom, so the top brick is eight plus twelve, which is twenty.', show: ['w.tri3', 'm.2', 'w.t'], hide: ['w.tri2', 'w.tq'], focus: 'm.2' },
        { say: 'So: add when you know the bottom two bricks of a triangle, and subtract when you know the top one.', hide: 'w.tri3', focus: 'm' },
      ],
    },
    {
      chapter: 'A pyramid that needs algebra',
      layout: 'split',
      leftWidth: 560,
      left: [algebra('a')],
      right: [
        { kind: 'text', id: 'p', size: 'md', align: 'left', md: 'Find the missing number in the bottom row.' },
        { kind: 'math', id: 'm', size: 'md', align: 'left', lines: ['\\text{let the missing number be } x', '(6 + x) + (x + 9) = 37', '2x + 15 = 37', '2x = 22, \\quad x = 11'] },
      ],
      lines: [
        { say: 'Here is a harder one. The bottom row is six, a missing number, and nine, and the top brick is 37. Find the missing number.', show: ['p', 'a.bricks', 'a.a0', 'a.a1q', 'a.a2', 'a.top'] },
        { say: 'Look for a triangle with two known bricks. There is none: each triangle has two unknown bricks. So use a variable. Let the missing number be x.', show: ['a.a1x', 'm.0'], hide: 'a.a1q', focus: 'm.0' },
        { say: 'Now fill in the middle row. The left brick is six plus x, and the right brick is x plus nine.', show: ['a.m0x', 'a.m1x'], focus: ['a.m0x', 'a.m1x'] },
        { say: 'The top brick is the sum of those two: six plus x, plus x plus nine. And the top brick is 37.', show: 'm.1', focus: 'm.1' },
        { say: 'Collect like terms: two x plus fifteen equals 37.', show: 'm.2', focus: 'm.2' },
        { say: 'Subtract fifteen from both sides: two x equals 22. Divide by two: x equals eleven.', show: 'm.3', focus: 'm.3' },
      ],
    },
    {
      chapter: 'Check',
      layout: 'split',
      leftWidth: 560,
      left: [algebra('a2')],
      right: [{ kind: 'math', id: 'm', size: 'md', align: 'left', lines: ['6 + 11 = 17', '11 + 9 = 20', '17 + 20 = 37 \\ \\checkmark'] }],
      lines: [
        { say: 'Always check the answer in the puzzle. Put eleven in the bottom row.', show: ['a2.bricks', 'a2.a0', 'a2.a1', 'a2.a2', 'a2.top'] },
        { say: 'Six plus eleven is seventeen, and eleven plus nine is twenty.', show: ['m.0', 'm.1', 'a2.m0', 'a2.m1'], focus: ['m.0', 'm.1'] },
        { say: 'Seventeen plus twenty is 37, the number on top. The missing number is eleven.', show: 'm.2', focus: 'm.2' },
      ],
    },
    {
      chapter: 'Watch out',
      layout: 'center',
      main: [
        { kind: 'callout', id: 'oops', tone: 'mistake', title: 'The middle brick counts twice', md: 'Adding the bottom row straight to the top gives $6 + x + 9 = 37$, so $x = 22$, which is wrong. The middle brick is under **both** middle-row bricks, so it counts twice: $6 + 2x + 9 = 37$.' },
      ],
      lines: [
        { say: 'A common mistake is to think the top brick is just the sum of the bottom row: six plus x plus nine equals 37. That gives x equals 22, which does not check.', show: 'oops' },
        { say: 'The middle bottom brick sits under both bricks of the middle row, so it is added twice on the way up. That is why the equation has two x, not one x.' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q',
          prompt: 'In a number pyramid, each brick is the sum of the two below it. The bottom row is $4$, $?$, $7$, and the top brick is $31$. What is the missing number?',
          choices: ['$20$', '$8$', '$12$', '$10$'],
          answer: 3,
          working: '$(4 + x) + (x + 7) = 31$, so $2x + 11 = 31$, $2x = 20$ and $x = 10$. Check: $14 + 17 = 31$.',
        },
      ],
      lines: [
        { say: 'Your turn. In a number pyramid, each brick is the sum of the two below it. The bottom row is four, a missing number, and seven, and the top brick is 31. What is the missing number? Pause the video and try it.', show: 'q', wait: 6 },
        { say: 'The answer is D, ten. The middle row is four plus x, and x plus seven, so two x plus eleven equals 31, and x is ten. Check: fourteen plus seventeen is 31. Choice A, twenty, forgets that the middle brick counts twice.', show: 'q.answer' },
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
          items: ['A strategy is a plan that works every time.', 'Start with the step that has only one possibility; each one unlocks another.', 'When nothing can be found directly, use a variable, then check.'],
        },
      ],
      lines: [
        { say: 'Let’s sum up. A strategy is a plan that works every time, not a lucky guess.', show: 'sum.0' },
        { say: 'Start with the step that has only one possibility. In a pyramid, that is a triangle with two known bricks.', show: 'sum.1' },
        { say: 'When nothing can be found directly, use a variable, solve, and check the answer in the puzzle. In part two, we solve Sudoku puzzles. See you there!', show: 'sum.2' },
      ],
    },
  ],
};

export default video;
