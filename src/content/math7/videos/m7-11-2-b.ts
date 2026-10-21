import type { Explainer } from '@/video/script.ts';
import { figure } from '@/video/solids.ts';
import { outcomeGrid } from './lib/m7-11-figures.ts';

const t = (s: string) => `\\text{${s}}`;

// A coin (down the side) and a die (across the top): 2 × 6 = 12 outcomes. The tails row is marked.
const DIE = ['1', '2', '3', '4', '5', '6'];
const coinDie = (id: string) =>
  figure(
    id,
    [
      outcomeGrid({
        rows: [t('H'), t('T')],
        cols: DIE,
        cells: ['H', 'T'].map((c) => DIE.map((d) => t(`${c}${d}`))),
        corner: t('Coin'),
        marks: [{ id: 'tails', cells: DIE.map((_, k) => [1, k] as [number, number]) }],
      }),
    ],
    280,
  );

// A coin and a spinner with 4 colours: 2 × 4 = 8 outcomes.
const COLOURS = ['R', 'B', 'G', 'Y'];
const coinSpinner = (id: string) =>
  figure(id, [outcomeGrid({ rows: [t('H'), t('T')], cols: COLOURS.map(t), cells: ['H', 'T'].map((c) => COLOURS.map((s) => t(`${c}${s}`))), corner: t('Coin') })], 240);

const video: Explainer = {
  id: 'm7-11-2-b',
  lessonId: 'm7-11-2',
  title: 'Sample Spaces for Two Events, Part 2: Using a Table',
  thumbnailTitle: 'Using a Table',
  thumbnail: 'tb',
  summary:
    'A table shows the sample space of two events: the outcomes of the first event down the side, the second across the top, and one outcome in each cell. A coin and a six-sided die give a table of 2 rows and 6 columns, so 2 × 6 = 12 outcomes, 6 of them with tails. Multiply to count: a coin and a spinner with 4 sections give 2 × 4 = 8 outcomes, not 2 + 4 = 6.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Probability · Part 2', title: 'Using a Table', subtitle: 'Every outcome of two events' }],
      lines: [
        { say: 'When you do two things at once, the outcomes can be hard to keep track of. It is easy to miss one, or to count one twice.', show: 'title' },
        { say: 'In this video, you will use a table to list every outcome of two events, and count them.' },
      ],
    },
    {
      chapter: 'Building a table',
      layout: 'center',
      main: [
        { kind: 'text', id: 'q', size: 'md', md: 'Ella flips a coin and rolls a six-sided die. Show the sample space in a table.' },
        coinDie('tb'),
      ],
      lines: [
        { say: 'Ella flips a coin and rolls a six-sided die. Let’s show the sample space in a table.', show: 'q' },
        { say: 'Put the outcomes of the first event down the side: H and T for the coin. Put the outcomes of the second event across the top: one to six for the die.', show: 'tb.frame' },
        { say: 'Each cell is one outcome. Fill in the heads row: H one, H two, H three, all the way to H six.', show: 'tb.row0', focus: 'tb.row0' },
        { say: 'Then fill in the tails row: T one to T six. Every outcome has its own cell, so none is missed, and none is counted twice.', show: 'tb.row1', focus: 'tb.row1' },
      ],
    },
    {
      chapter: 'Counting the outcomes',
      layout: 'center',
      main: [
        coinDie('ct'),
        { kind: 'math', id: 'm', size: 'md', lines: ['2 \\text{ rows} \\times 6 \\text{ columns} = 12 \\text{ outcomes}', '\\text{tails: T1, T2, T3, T4, T5, T6} \\to 6 \\text{ outcomes}'] },
      ],
      lines: [
        { say: 'How many outcomes are in the sample space? The table has two rows and six columns.', show: ['ct.frame', 'ct.row0', 'ct.row1'] },
        { say: 'Two times six is twelve, so there are twelve outcomes.', show: 'm.0', focus: 'm.0' },
        { say: 'Which outcomes have tails? They are all in the tails row: T one, T two, T three, T four, T five and T six. Six of the twelve outcomes have tails.', show: ['ct.tails', 'm.1'], focus: ['ct.tails', 'm.1'] },
      ],
    },
    {
      chapter: 'Multiply to count',
      layout: 'center',
      main: [{ kind: 'callout', id: 'tip', tone: 'key', title: 'Multiply to count', md: 'Number of outcomes $=$ (outcomes of the first event) $\\times$ (outcomes of the second event). A coin and a die: $2 \\times 6 = 12$.' }],
      lines: [
        { say: 'Here is a shortcut. Each outcome of the first event goes with every outcome of the second event. That is why the table is a rectangle.', show: 'tip' },
        { say: 'So the number of outcomes is the number for the first event, times the number for the second event. A coin and a die give two times six, which is twelve.' },
      ],
    },
    {
      chapter: 'Watch out',
      layout: 'center',
      main: [
        { kind: 'callout', id: 'oops', tone: 'mistake', title: 'Add or multiply?', md: 'A coin has $2$ outcomes and a spinner has $4$. The sample space has $2 \\times 4 = 8$ outcomes, **not** $2 + 4 = 6$. Each coin result goes with **every** spinner result.' },
        coinSpinner('cs'),
      ],
      lines: [
        { say: 'Watch out. A coin has two outcomes, and a spinner with red, blue, green and yellow sections has four. It is tempting to add them and say six outcomes.', show: 'oops' },
        { say: 'But each coin result goes with every spinner result. Heads goes with red, blue, green and yellow, and so does tails.', show: ['cs.frame', 'cs.row0', 'cs.row1'] },
        { say: 'That makes two rows of four, or two times four, which is eight outcomes. So multiply, do not add.' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q',
          prompt: 'You spin a spinner with $3$ equal sections and roll a six-sided die. How many outcomes are in the sample space?',
          choices: ['$9$', '$6$', '$18$', '$36$'],
          answer: 2,
          working: 'Multiply: $3 \\times 6 = 18$ outcomes.',
        },
      ],
      lines: [
        { say: 'Your turn. You spin a spinner with three equal sections and roll a six-sided die. How many outcomes are in the sample space? Pause the video and try it.', show: 'q', wait: 6 },
        { say: 'The answer is C: eighteen. The table would have three rows and six columns, and three times six is eighteen. Choice A adds three and six instead of multiplying.', show: 'q.answer' },
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
          items: ['A table shows the sample space of two events: one event down the side, one across the top.', 'Each cell is one outcome.', 'Number of outcomes $=$ first $\\times$ second.'],
        },
      ],
      lines: [
        { say: 'Let’s sum up. A table shows the sample space of two events, with one event down the side, and the other across the top.', show: 'sum.0' },
        { say: 'Each cell is one outcome.', show: 'sum.1' },
        { say: 'And to count the outcomes, multiply: the number for the first event times the number for the second. In the next part, you will use a tree diagram. See you there!', show: 'sum.2' },
      ],
    },
  ],
};

export default video;
