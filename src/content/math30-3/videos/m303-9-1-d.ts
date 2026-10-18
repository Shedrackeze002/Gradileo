import type { Explainer } from '@/video/script.ts';
import { figure } from '@/video/solids.ts';
import { logicGrid } from '../../math30-2/videos/lib/m302-8-figures.ts';

/** Nadia is the welder, Owen the electrician and Tariq the plumber: m<row><column>. */
const grid = (id: string) =>
  figure(
    id,
    [
      logicGrid({
        rows: ['Nadia', 'Owen', 'Tariq'],
        cols: ['Electrician', 'Plumber', 'Welder'],
        w: 3.3,
        marks: [
          { r: 0, c: 0, yes: false },
          { r: 0, c: 1, yes: false },
          { r: 0, c: 2, yes: true },
          { r: 1, c: 0, yes: true },
          { r: 1, c: 1, yes: false },
          { r: 1, c: 2, yes: false },
          { r: 2, c: 0, yes: false },
          { r: 2, c: 1, yes: true },
          { r: 2, c: 2, yes: false },
        ],
      }),
    ],
    360,
  );

const video: Explainer = {
  id: 'm303-9-1-d',
  lessonId: 'm303-9-1',
  title: 'Logic Puzzles and Games, Part 4: Logic Grids',
  thumbnailTitle: 'Logic Grids',
  thumbnail: 'g',
  summary: 'A logic grid matches people with things: put a cross where a clue rules a match out and a tick where a match is certain, and each row and column ends with exactly one tick. Nadia, Owen and Tariq are an electrician, a plumber and a welder; Owen is not the welder, and the plumber is neither Nadia nor Owen, so Tariq is the plumber, Owen the electrician and Nadia the welder. Never tick a cell until the clues force it.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Logic Puzzles and Games · Part 4', title: 'Logic Grids', subtitle: 'Ticks, crosses and careful clues' }],
      lines: [
        { say: 'In a logic puzzle, a few clues are enough to match each person with exactly one thing, but only if you keep careful track of what you know.', show: 'title' },
        { say: 'In this video, you will use a logic grid of ticks and crosses to solve a puzzle, one clue at a time.' },
      ],
    },
    {
      chapter: 'The puzzle',
      layout: 'center',
      main: [
        { kind: 'text', id: 'p', size: 'lg', md: 'Nadia, Owen and Tariq each have a different trade: electrician, plumber or welder. Who is the welder?' },
        { kind: 'bullets', id: 'b', items: ['Clue 1: Owen is not the welder.', 'Clue 2: The plumber is neither Nadia nor Owen.'] },
      ],
      lines: [
        { say: 'Nadia, Owen and Tariq each have a different trade: electrician, plumber or welder. Who is the welder?', show: 'p' },
        { say: 'Clue one: Owen is not the welder.', show: 'b.0' },
        { say: 'Clue two: the plumber is neither Nadia nor Owen.', show: 'b.1' },
        { say: 'Neither clue tells us the welder directly. We have to combine them.' },
      ],
    },
    {
      chapter: 'Set up a grid',
      layout: 'split',
      leftWidth: 660,
      left: [grid('g')],
      right: [{ kind: 'text', id: 't', size: 'md', md: 'A $\\bad{\\times}$ means a clue rules the match out. A $\\good{\\checkmark}$ means the match is certain. In the end, each row and each column has exactly one $\\good{\\checkmark}$.' }],
      lines: [
        { say: 'Draw a grid with a row for each person and a column for each trade.', show: ['g.grid', 'g.rows', 'g.cols'] },
        { say: 'Put a cross where a clue rules a match out, and a tick where a match is certain.', show: 't' },
        { say: 'Each person has exactly one trade, and each trade belongs to exactly one person. So when the puzzle is solved, every row and every column has exactly one tick.' },
      ],
    },
    {
      chapter: 'Clue by clue',
      layout: 'split',
      leftWidth: 660,
      left: [grid('g')],
      right: [
        {
          kind: 'bullets',
          id: 'b',
          items: ['Clue 2: Nadia, plumber $\\bad{\\times}$; Owen, plumber $\\bad{\\times}$', 'Plumber: only Tariq is left $\\good{\\checkmark}$', 'Clue 1: Owen, welder $\\bad{\\times}$', 'Owen: only electrician is left $\\good{\\checkmark}$', 'Nadia: only welder is left $\\good{\\checkmark}$'],
        },
      ],
      lines: [
        { say: 'Start with clue two: the plumber is neither Nadia nor Owen. Put a cross for Nadia and plumber, and another for Owen and plumber.', show: ['g.grid', 'g.rows', 'g.cols', 'g.m01', 'g.m11', 'b.0'], focus: ['g.m01', 'g.m11'] },
        { say: 'Look down the plumber column. Only Tariq is left, so Tariq is the plumber. Tick it. Tariq has only one trade, so cross out electrician and welder in Tariq’s row.', show: ['g.m21', 'g.m20', 'g.m22', 'b.1'], focus: ['g.m21', 'g.m20', 'g.m22'] },
        { say: 'Now clue one: Owen is not the welder. Put a cross for Owen and welder.', show: ['g.m12', 'b.2'], focus: 'g.m12' },
        { say: 'Owen’s row now has crosses for plumber and welder, so Owen is the electrician. Tick it, and cross out Nadia in the electrician column.', show: ['g.m10', 'g.m00', 'b.3'], focus: ['g.m10', 'g.m00'] },
        { say: 'That leaves only welder for Nadia. Tick it.', show: ['g.m02', 'b.4'], focus: 'g.m02' },
      ],
    },
    {
      chapter: 'Check every clue',
      layout: 'center',
      main: [
        { kind: 'text', id: 'a', size: 'lg', md: 'Nadia is the **welder**, Owen is the **electrician** and Tariq is the **plumber**.' },
        { kind: 'bullets', id: 'b', items: ['Clue 1: Owen is not the welder. ✓', 'Clue 2: The plumber, Tariq, is neither Nadia nor Owen. ✓', 'Each person has a different trade. ✓'] },
      ],
      lines: [
        { say: 'So Nadia is the welder, Owen is the electrician, and Tariq is the plumber.', show: 'a' },
        { say: 'Check every clue. Owen is not the welder: true.', show: 'b.0' },
        { say: 'The plumber, Tariq, is neither Nadia nor Owen: true.', show: 'b.1' },
        { say: 'And all three have different trades. Every clue checks.', show: 'b.2' },
      ],
    },
    {
      chapter: 'Watch out',
      layout: 'center',
      main: [{ kind: 'callout', id: 'oops', tone: 'mistake', title: 'Guessing too early', md: 'Do not put a $\\checkmark$ until the clues force it. A guess that looks right can break a clue you have not used yet. Use every clue, then check the final answer against all of them.' }],
      lines: [
        { say: 'A common mistake is to guess too early. For example, after reading clue one, you might guess that Nadia is the welder, and tick it.', show: 'oops' },
        { say: 'Here the guess happens to be right, but in a bigger puzzle, a guess that looks right can break a clue you have not used yet. Then every step after it is wrong too.' },
        { say: 'Only put a tick where the clues force it. Use every clue, and check the final answer against all of them.' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q',
          prompt: 'Jin, Kate and Omar each drive a different vehicle: a truck, a van or a car. Kate does not drive the van or the car. Omar does not drive the van. Who drives the car?',
          choices: ['Omar', 'Jin', 'Kate', 'There is not enough information'],
          answer: 0,
          working: 'Kate drives neither the van nor the car, so Kate drives the truck. The van is not Kate’s or Omar’s, so Jin drives the van. That leaves the car for Omar.',
        },
      ],
      lines: [
        { say: 'Your turn. Jin, Kate and Omar each drive a different vehicle: a truck, a van or a car. Kate does not drive the van or the car. Omar does not drive the van. Who drives the car? Pause the video and try it.', show: 'q', wait: 6 },
        { say: 'The answer is A, Omar. Kate drives neither the van nor the car, so Kate drives the truck. The van is not Kate’s or Omar’s, so Jin drives the van. That leaves the car for Omar. Choice B forgets that Jin must drive the van.', show: 'q.answer' },
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
          items: ['Draw a grid: a row for each person and a column for each choice.', 'Cross out what each clue rules out; tick a row or column with one blank left.', 'Never guess, and check every clue at the end.'],
        },
      ],
      lines: [
        { say: 'Let’s sum up. For a logic puzzle, draw a grid with a row for each person and a column for each choice.', show: 'sum.0' },
        { say: 'Cross out what each clue rules out. When a row or column has only one blank left, tick it, and cross out the rest of its row and column.', show: 'sum.1' },
        { say: 'Never guess, and check every clue at the end. In part five, we find a light bolt with as few weighings as possible. See you there!', show: 'sum.2' },
      ],
    },
  ],
};

export default video;
