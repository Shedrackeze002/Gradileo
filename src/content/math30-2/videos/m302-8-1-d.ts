import type { Explainer } from '@/video/script.ts';
import { figure } from '@/video/solids.ts';
import { logicGrid } from './lib/m302-8-figures.ts';

/** Ava plays soccer, Bao hockey and Connor curling: m<row><column>, rows Ava, Bao, Connor. */
const grid = (id: string) =>
  figure(id, [
    logicGrid({
      rows: ['Ava', 'Bao', 'Connor'],
      cols: ['Hockey', 'Soccer', 'Curling'],
      marks: [
        { r: 0, c: 0, yes: false },
        { r: 0, c: 1, yes: true },
        { r: 0, c: 2, yes: false },
        { r: 1, c: 0, yes: true },
        { r: 1, c: 1, yes: false },
        { r: 1, c: 2, yes: false },
        { r: 2, c: 0, yes: false },
        { r: 2, c: 1, yes: false },
        { r: 2, c: 2, yes: true },
      ],
    }),
  ]);

const video: Explainer = {
  id: 'm302-8-1-d',
  lessonId: 'm302-8-1',
  title: 'Puzzles and Games, Part 4: Logic Puzzles',
  thumbnailTitle: 'Logic Puzzles',
  thumbnail: 'g',
  summary: 'Solving a logic puzzle with a grid of ticks and crosses: Ava, Bao and Connor each play a different sport, Ava does not play hockey, and the curling player is neither Ava nor Bao. Crossing out what each clue rules out, then ticking any row or column with one blank left, gives Ava soccer, Bao hockey and Connor curling.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Puzzles, Games and the Research Project · Part 4', title: 'Logic Puzzles', subtitle: 'A grid of ticks and crosses' }],
      lines: [
        { say: 'In a logic puzzle, a few clues are enough to match each person with exactly one choice, but only if you keep careful track of what you know.', show: 'title' },
        { say: 'In this video, you will use a grid of ticks and crosses to solve a logic puzzle, one clue at a time.' },
      ],
    },
    {
      chapter: 'The puzzle',
      layout: 'center',
      main: [
        { kind: 'text', id: 'p', size: 'lg', md: 'Ava, Bao and Connor each play a different sport: hockey, soccer or curling. Who plays each sport?' },
        { kind: 'bullets', id: 'b', items: ['Clue 1: Ava does not play hockey.', 'Clue 2: The person who plays curling is neither Ava nor Bao.'] },
      ],
      lines: [
        { say: 'Ava, Bao and Connor each play a different sport: hockey, soccer or curling. Who plays each sport?', show: 'p' },
        { say: 'Clue one: Ava does not play hockey.', show: 'b.0' },
        { say: 'Clue two: the person who plays curling is neither Ava nor Bao.', show: 'b.1' },
        { say: 'Neither clue tells us anyone’s sport directly. We have to combine them.' },
      ],
    },
    {
      chapter: 'Set up a grid',
      layout: 'split',
      leftWidth: 640,
      left: [grid('g')],
      right: [{ kind: 'text', id: 't', size: 'md', md: 'A $\\good{\\checkmark}$ means yes and a $\\bad{\\times}$ means no. In the end, each row and each column has exactly one $\\good{\\checkmark}$.' }],
      lines: [
        { say: 'Draw a grid, with a row for each person and a column for each sport. A tick in a cell means yes, and a cross means no.', show: ['g.grid', 'g.rows', 'g.cols', 't'] },
        { say: 'Each person plays exactly one sport, and each sport has exactly one player. So when the puzzle is solved, every row and every column will have exactly one tick.' },
      ],
    },
    {
      chapter: 'Clue by clue',
      layout: 'split',
      leftWidth: 640,
      left: [grid('g')],
      right: [
        {
          kind: 'bullets',
          id: 'b',
          items: ['Clue 1: Ava, hockey $\\bad{\\times}$', 'Clue 2: Ava, curling $\\bad{\\times}$; Bao, curling $\\bad{\\times}$', 'Curling: only Connor is left $\\good{\\checkmark}$', 'Ava: only soccer is left $\\good{\\checkmark}$', 'Bao: only hockey is left $\\good{\\checkmark}$'],
        },
      ],
      lines: [
        { say: 'Clue one: Ava does not play hockey. Put a cross where Ava’s row meets the hockey column.', show: ['g.grid', 'g.rows', 'g.cols', 'g.m00', 'b.0'], focus: 'g.m00' },
        { say: 'Clue two: the curling player is neither Ava nor Bao. Put a cross for Ava and curling, and another for Bao and curling.', show: ['g.m02', 'g.m12', 'b.1'], focus: ['g.m02', 'g.m12'] },
        { say: 'Now look down the curling column. Ava and Bao are crossed out, so the curling player must be Connor. Tick it.', show: ['g.m22', 'b.2'], focus: 'g.m22' },
        { say: 'Connor plays only one sport, so cross out hockey and soccer in Connor’s row.', show: ['g.m20', 'g.m21'], focus: ['g.m20', 'g.m21'] },
        { say: 'Now Ava’s row has crosses for hockey and curling, so Ava plays soccer. Tick it.', show: ['g.m01', 'b.3'], focus: 'g.m01' },
        { say: 'Soccer now has its player, so cross out Bao in the soccer column. That leaves only hockey for Bao.', show: ['g.m11', 'g.m10', 'b.4'], focus: ['g.m11', 'g.m10'] },
      ],
    },
    {
      chapter: 'Check every clue',
      layout: 'center',
      main: [
        { kind: 'text', id: 'a', size: 'lg', md: 'Ava plays **soccer**, Bao plays **hockey** and Connor plays **curling**.' },
        { kind: 'callout', id: 'key', tone: 'key', title: 'The method', md: 'Cross out what each clue rules out. When a row or column has only one blank left, tick it, and cross out the rest of its row and column. Then check every clue.' },
      ],
      lines: [
        { say: 'So Ava plays soccer, Bao plays hockey, and Connor plays curling.', show: 'a' },
        { say: 'Check every clue. Ava does not play hockey: true. The curling player, Connor, is neither Ava nor Bao: true. And all three play different sports.' },
        { say: 'Here is the method. Cross out what each clue rules out. When a row or column has only one blank left, tick it, and cross out the rest of its row and column. Then check every clue.', show: 'key' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q',
          prompt: 'Dev, Emma and Farah each own a different pet: a cat, a dog or a fish. Emma does not own the dog or the fish. Farah does not own the dog. Who owns the fish?',
          choices: ['Dev', 'Emma', 'There is not enough information', 'Farah'],
          answer: 3,
          working: 'Emma owns neither the dog nor the fish, so Emma owns the cat. The dog is not Emma’s or Farah’s, so Dev owns the dog. That leaves the fish for Farah.',
        },
      ],
      lines: [
        { say: 'Your turn. Dev, Emma and Farah each own a different pet: a cat, a dog or a fish. Emma does not own the dog or the fish. Farah does not own the dog. Who owns the fish? Pause the video and try it.', show: 'q', wait: 6 },
        { say: 'The answer is D, Farah. Emma owns neither the dog nor the fish, so Emma owns the cat. The dog is not Emma’s or Farah’s, so it is Dev’s. That leaves the fish for Farah. Choice A forgets that Dev must own the dog.', show: 'q.answer' },
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
            'Draw a grid: a row for each person and a column for each choice.',
            'Cross out what each clue rules out; tick any row or column with one blank left.',
            'Use each new fact to rule out others, and check every clue at the end.',
          ],
        },
      ],
      lines: [
        { say: 'Let’s sum up. For a logic puzzle, draw a grid, with a row for each person and a column for each choice.', show: 'sum.0' },
        { say: 'Cross out what each clue rules out, and tick any row or column that has only one blank left.', show: 'sum.1' },
        { say: 'Use each new fact to rule out others, and check every clue at the end. In the next part, you will find a winning strategy for a game, by working backward from the end. See you there!', show: 'sum.2' },
      ],
    },
  ],
};

export default video;
