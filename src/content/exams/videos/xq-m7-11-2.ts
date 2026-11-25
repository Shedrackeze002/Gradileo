import type { Explainer } from '@/video/script.ts';
import { figure } from '@/video/solids.ts';
import { outcomeGrid } from '@/content/math7/videos/lib/m7-11-figures.ts';

// Exam question for Math 7 lesson 11.2 (sample spaces for two events). The question is a Your Turn
// from OpenStax Contemporary Mathematics, word for word (section 7.4, Tree Diagrams, Tables, and
// Outcomes, CC BY-NC-SA 4.0). The coin's outcomes go down the side and the die's across the top;
// each cell is one outcome, so there are 2 × 6 = 12.

const QUESTION = 'Use a table to identify the sample space of an experiment in which you flip a coin and roll a 6-sided die.';

const COIN = ['H', 'T'];
const DIE = ['1', '2', '3', '4', '5', '6'];

const grid = (id: string) =>
  figure(
    id,
    [
      outcomeGrid({
        rows: COIN.map((c) => `\\text{${c}}`),
        cols: DIE,
        cells: COIN.map((c) => DIE.map((d) => `(\\text{${c}}, ${d})`)),
        w: 2.5,
        h: 1.1,
      }),
    ],
    260,
  );

const video: Explainer = {
  id: 'xq-m7-11-2',
  lessonId: '',
  exam: {
    lesson: 'm7-11-2',
    source: 'OpenStax, Contemporary Mathematics, Your Turn in section 7.4, Tree Diagrams, Tables, and Outcomes',
    licence: 'CC BY-NC-SA 4.0, access for free at openstax.org',
    url: 'https://openstax.org/books/contemporary-mathematics/pages/7-4-tree-diagrams-tables-and-outcomes',
    question: QUESTION,
  },
  title: 'Exam Question: Flip a Coin and Roll a Die (Sample Spaces for Two Events)',
  thumbnailTitle: 'Flip a Coin, Roll a Die',
  thumbnail: 'tb',
  summary:
    'A real test question, solved one small step at a time: use a table to find the sample space when you flip a coin and roll a 6-sided die. The coin\'s outcomes, H and T, go down the side, and the die\'s, 1 to 6, go across the top. Each cell pairs one coin result with one die result, so the sample space is (H, 1) to (H, 6) and (T, 1) to (T, 6): 2 × 6 = 12 outcomes. Then we check and look at the traps.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Exam Question', title: 'Flip a Coin, Roll a Die', subtitle: 'Sample spaces for two events, step by step' }],
      lines: [
        { say: 'In this video, we solve a real test question about the sample space of two events. We will take it one small step at a time, so that every step makes sense.', show: 'title' },
        { say: 'The question comes from the free OpenStax Contemporary Mathematics textbook. You will see where it comes from at the bottom of the screen the whole way through.' },
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
          prompt: 'Use a table to identify the sample space of an experiment in which you flip a coin and roll a $6$-sided die.',
          answer: '$(H, 1)$ to $(H, 6)$ and $(T, 1)$ to $(T, 6)$: $12$ outcomes',
          working: 'coin down the side, die across the top',
        },
      ],
      lines: [
        { say: 'Here is the question, from the book.', show: 'q' },
        { say: 'Use a table to identify the sample space of an experiment in which you flip a coin, and roll a 6 sided die.' },
        { say: 'If you would like to try it first, pause the video now.', wait: 5 },
      ],
    },
    {
      chapter: 'What is it asking?',
      layout: 'center',
      main: [{ kind: 'callout', id: 'c', tone: 'definition', title: 'Sample space', md: 'The **sample space** is the list of **every** possible outcome. Here one outcome is a **pair**: what the coin shows **and** what the die shows, such as heads and $4$.' }],
      lines: [
        { say: 'The sample space is the list of every possible outcome of the experiment.', show: 'c' },
        { say: 'Here we do two things, so one outcome is a pair: what the coin shows, and what the die shows. For example, heads and 4.' },
      ],
    },
    {
      chapter: 'What you need to know',
      layout: 'center',
      main: [{ kind: 'bullets', id: 'know', items: ['One event\'s outcomes go **down the side**', 'The other\'s go **across the top**', 'Each **cell** is one outcome: a pair', 'Number of outcomes $=$ rows $\\times$ columns'] }],
      lines: [
        { say: 'Here is what we need. In an outcome table, one event\'s outcomes go down the side.', show: 'know.0' },
        { say: 'The other event\'s outcomes go across the top.', show: 'know.1' },
        { say: 'Each cell pairs the row with the column: one outcome.', show: 'know.2' },
        { say: 'So the number of outcomes is the number of rows times the number of columns.', show: 'know.3' },
      ],
    },
    {
      chapter: 'The plan',
      layout: 'center',
      main: [{ kind: 'bullets', id: 'plan', items: ['List the outcomes of **each** event', 'Put them on the **side** and the **top**', '**Fill in** every cell, then count'] }],
      lines: [
        { say: 'Here is the plan. List the outcomes of each event.', show: 'plan.0' },
        { say: 'Put one list down the side, and the other across the top.', show: 'plan.1' },
        { say: 'Then fill in every cell, and count.', show: 'plan.2' },
      ],
    },
    {
      chapter: 'Steps 1 to 3: Build the table',
      layout: 'center',
      main: [{ kind: 'math', id: 'm', size: 'md', lines: ['\\text{coin: } \\adj{\\{H, T\\}}, \\quad \\text{die: } \\opp{\\{1, 2, 3, 4, 5, 6\\}}'] }, grid('tb')],
      lines: [
        { say: 'Step one. A coin can land heads, "H", or tails, "T". A die can show 1, 2, 3, 4, 5 or 6.', show: 'm.0', focus: 'm.0' },
        { say: 'Step two. Put the coin\'s outcomes down the side, and the die\'s across the top.', show: 'tb.frame' },
        { say: 'Step three. Fill in each cell with its pair. The heads row: heads 1, heads 2, all the way to heads 6.', show: 'tb.row0', focus: 'tb.row0' },
        { say: 'The tails row: tails 1, to tails 6.', show: 'tb.row1', focus: 'tb.row1' },
      ],
    },
    {
      chapter: 'Step 4: The sample space',
      layout: 'center',
      main: [{ kind: 'math', id: 'm', size: 'md', lines: ['\\{(H, 1), (H, 2), (H, 3), (H, 4), (H, 5), (H, 6),', '(T, 1), (T, 2), (T, 3), (T, 4), (T, 5), (T, 6)\\}', '2 \\times 6 = \\good{12 \\text{ outcomes}}'] }],
      lines: [
        { say: 'Step four. The sample space is every cell of the table: heads with 1 to 6,', show: 'm.0', focus: 'm.0' },
        { say: 'and tails with 1 to 6.', show: 'm.1', focus: 'm.1' },
        { say: 'That is 2 rows times 6 columns, 12 outcomes.', show: 'm.2', focus: 'm.2' },
      ],
    },
    {
      chapter: 'Check the answer',
      layout: 'center',
      main: [{ kind: 'math', id: 'm', size: 'lg', lines: ['\\text{each coin result} \\times 6 \\text{ die results}', '6 + 6 = 12 \\ \\checkmark'] }],
      lines: [
        { say: 'Let us check another way. Whatever the coin shows, the die can still show any of its 6 numbers.', show: 'm.0' },
        { say: 'So heads gives 6 outcomes, and tails gives 6 more. 6 plus 6 is 12. It checks out.', show: 'm.1', focus: 'm.1' },
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
            ['$8$ outcomes', 'added $2 + 6$: each coin result pairs with **each** die result, $2 \\times 6$'],
            ['$\\{H, T, 1, 2, 3, 4, 5, 6\\}$', 'single results: each outcome is a **pair**'],
            ['$(H, 1)$ and $(1, H)$', 'the same outcome **twice**: keep one order, coin then die'],
          ],
        },
      ],
      lines: [
        { say: 'Here are the traps.', show: 'traps' },
        { say: '8 outcomes adds 2 and 6. But each coin result goes with each of the 6 die results, so multiply: 2 times 6 is 12.' },
        { say: 'Listing heads, tails, 1, 2, 3, 4, 5, 6 gives single results. Each outcome of this experiment is a pair.' },
        { say: 'And heads, 1 and 1, heads are the same outcome written twice. Keep one order: the coin, then the die.' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q2',
          prompt: 'You spin a spinner with $3$ colours, red, green and blue, and flip a coin. How many outcomes are in the sample space?',
          choices: ['$5$', '$3$', '$6$', '$9$'],
          answer: 2,
          working: '3 colours down the side, 2 coin results across the top: 3 × 2 = 6.',
        },
      ],
      lines: [
        { say: 'Your turn. You spin a spinner with 3 colours, red, green and blue, and flip a coin. How many outcomes are in the sample space? Pause the video and try it.', show: 'q2', wait: 8 },
        { say: 'Each of the 3 colours goes with heads or tails, so there are 3 times 2, 6 outcomes. Choice "C".', show: 'q2.answer' },
      ],
    },
    {
      chapter: 'Summary',
      layout: 'center',
      main: [{ kind: 'bullets', id: 'sum', check: true, items: ['The sample space lists **every** outcome', 'With two events, each outcome is a **pair**', 'One event on the side, one on the top', 'Count: rows $\\times$ columns'] }],
      lines: [
        { say: 'Here is what to remember. The sample space lists every possible outcome.', show: 'sum.0' },
        { say: 'With two events, each outcome is a pair.', show: 'sum.1' },
        { say: 'In a table, put one event down the side and the other across the top.', show: 'sum.2' },
        { say: 'And the number of outcomes is rows times columns. For more on sample spaces for two events, watch this lesson\'s explainer video on Gradileo.', show: 'sum.3' },
      ],
    },
  ],
};

export default video;
