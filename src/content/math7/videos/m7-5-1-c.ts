import type { Explainer } from '@/video/script.ts';
import { figure } from '@/video/solids.ts';
import { valueTable } from '@/content/math5/videos/lib/m5-11-figures.ts';
import { chairs } from './lib/m7-5-figures.ts';

// 1, 2 and 3 square tables in a row, with a chair at each open side: 4, 6 and 8 chairs.
const rows = (id: string) =>
  figure(
    id,
    [
      chairs({ name: 'a', tables: 1, at: [0, 0], label: '1\\text{ table}' }),
      chairs({ name: 'b', tables: 2, at: [3.2, 0], label: '2\\text{ tables}' }),
      chairs({ name: 'c', tables: 3, at: [7.3, 0], label: '3\\text{ tables}' }),
    ],
    270,
  );

const table = (id: string) =>
  figure(
    id,
    [
      valueTable({
        x: { title: '\\text{Tables, } n', values: [1, 2, 3, 4] },
        y: { title: '\\text{Chairs}', values: [4, 6, 8, 10] },
        dy: ['+2', '+2', '+2'],
        titleW: 3.4,
      }),
    ],
    270,
  );

// Doubling: 1, 2, 4, 8, 16 goes up by more each time.
const doubling = (id: string) =>
  figure(
    id,
    [
      valueTable({
        x: { title: 'n', values: [1, 2, 3, 4, 5] },
        y: { title: '\\text{Term}', values: [1, 2, 4, 8, 16] },
        dy: ['+1', '+2', '+4', '+8'],
        dyTones: ['bad', 'bad', 'bad', 'bad'],
        titleW: 2.6,
      }),
    ],
    270,
  );

const video: Explainer = {
  id: 'm7-5-1-c',
  lessonId: 'm7-5-1',
  title: 'Patterns and Linear Relations, Part 3: Linear Relations',
  thumbnailTitle: 'Linear Relations',
  thumbnail: 'ch',
  summary:
    'A linear relation connects two quantities so that one goes up (or down) by the same amount each time the other goes up by 1, like the toothpick pattern t = 3n + 1. Square tables in a row with a chair at each open side need 4, 6, 8, … chairs: up 2 for each table (one chair above and one below), plus 2 at the ends, so 2n + 2. A doubling pattern such as 1, 2, 4, 8 is not linear.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Patterns and Linear Relations · Part 3', title: 'Linear Relations', subtitle: 'Up by the same amount every time' }],
      lines: [
        { say: 'Square tables are pushed together in a row for a party, with a chair at each open side. How many chairs are needed for any number of tables?', show: 'title' },
        { say: 'In this part, you will learn what a linear relation is, and write one for the tables and chairs.' },
      ],
    },
    {
      chapter: 'Linear relations',
      layout: 'center',
      main: [
        { kind: 'callout', id: 'def', tone: 'definition', title: 'Linear relation', md: 'A **linear relation** connects two quantities so that one goes up (or down) by the **same amount** each time the other goes up by $1$.' },
        { kind: 'math', id: 'm', size: 'lg', lines: ['t = 3n + 1', 't\\colon \\text{toothpicks} \\qquad n\\colon \\text{figure number}'] },
      ],
      lines: [
        { say: 'A linear relation connects two quantities, so that one goes up, or down, by the same amount each time the other goes up by one.', show: 'def' },
        { say: 'The toothpick pattern is a linear relation. Each time the figure number goes up by one, the number of toothpicks goes up by three.' },
        { say: 'We can write it as t equals three n plus one, where t is the number of toothpicks, and n is the figure number.', show: ['m.0', 'm.1'], focus: 'm.0' },
      ],
    },
    {
      chapter: 'Chairs around tables',
      layout: 'center',
      main: [rows('ch'), table('tb')],
      lines: [
        { say: 'Now the tables and chairs. One table has one chair on each of its four sides: four chairs.', show: ['ch.a-tbl', 'ch.a-tops', 'ch.a-bots', 'ch.a-ends', 'ch.a-label'] },
        { say: 'Two tables pushed together have six chairs. The sides where the tables touch have no chairs.', show: ['ch.b-tbl', 'ch.b-tops', 'ch.b-bots', 'ch.b-ends', 'ch.b-label'] },
        { say: 'Three tables have eight chairs.', show: ['ch.c-tbl', 'ch.c-tops', 'ch.c-bots', 'ch.c-ends', 'ch.c-label'] },
        { say: 'Put the counts in a table of values: four, six, eight, and then ten for four tables. The number of chairs goes up by two each time. So this is a linear relation as well.', show: ['tb.frame', 'tb.xs', 'tb.ys', 'tb.dys'], focus: 'tb.dys' },
      ],
    },
    {
      chapter: 'Finding the expression',
      layout: 'center',
      main: [
        { kind: 'math', id: 'm', size: 'lg', lines: ['\\text{Up by } 2 \\;\\to\\; 2n', 'n = 1\\colon\\ 2n = 2, \\text{ but there are } 4 \\text{ chairs} \\;\\to\\; 2n + 2', '\\text{Check } n = 3\\colon\\ 2(3) + 2 = 8 \\;\\good{\\checkmark}'] },
      ],
      lines: [
        { say: 'Use the three steps. The number of chairs goes up by two each time, so the expression starts with two n.', show: 'm.0', focus: 'm.0' },
        { say: 'When n is one, two n is two. But one table has four chairs. So add two. The expression is two n plus two.', show: 'm.1', focus: 'm.1' },
        { say: 'Check with three tables. Two times three is six, plus two is eight. That matches the picture.', show: 'm.2', focus: 'm.2' },
      ],
    },
    {
      chapter: 'Seeing it in the picture',
      layout: 'center',
      main: [rows('ch'), { kind: 'math', id: 'm', size: 'lg', lines: ['\\text{chairs} = 2n + 2'] }],
      lines: [
        { say: 'You can see the expression in the picture. Look at the three tables. Each table has one chair above it and one chair below it.', show: ['ch.a-tbl', 'ch.b-tbl', 'ch.c-tbl', 'ch.a-tops', 'ch.a-bots', 'ch.b-tops', 'ch.b-bots', 'ch.c-tops', 'ch.c-bots', 'ch.a-label', 'ch.b-label', 'ch.c-label'] },
        { say: 'That is two chairs for each table, so n tables have two n of these chairs.', show: 'm.0', focus: ['ch.c-tops', 'ch.c-bots'] },
        { say: 'Then there is one more chair at each end of the row, however long it is. That is the plus two.', show: ['ch.a-ends', 'ch.b-ends', 'ch.c-ends'], focus: ['ch.a-ends', 'ch.b-ends', 'ch.c-ends'] },
      ],
    },
    {
      chapter: 'Not every pattern is linear',
      layout: 'center',
      main: [
        doubling('db'),
        { kind: 'callout', id: 'key', tone: 'key', title: 'Linear or not?', md: 'In a linear relation, the terms change by the **same amount** each time. Doubling does not: the jumps get bigger.' },
      ],
      lines: [
        { say: 'Not every pattern is a linear relation. Look at this one: one, two, four, eight, sixteen. Each term is double the one before.', show: ['db.frame', 'db.xs', 'db.ys'] },
        { say: 'The jumps are one, then two, then four, then eight. They are not the same, so this pattern is not linear.', show: 'db.dys', focus: 'db.dys' },
        { say: 'In a linear relation, the terms always change by the same amount each time.', show: 'key' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q',
          prompt: 'Which pattern is a **linear relation**?',
          choices: ['$2, 5, 8, 11, \\ldots$', '$1, 2, 4, 8, \\ldots$', '$1, 4, 9, 16, \\ldots$', '$3, 4, 6, 9, \\ldots$'],
          answer: 0,
          working: '$2, 5, 8, 11$ goes up by $3$ every time. The others go up by different amounts.',
        },
      ],
      lines: [
        { say: 'Your turn. Which pattern is a linear relation? Pause the video and try it.', show: 'q', wait: 6 },
        { say: 'The answer is A. Two, five, eight, eleven goes up by three every time. Choice B doubles each time, so its jumps are one, two, then four: not the same.', show: 'q.answer' },
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
            'In a **linear relation**, one quantity changes by the same amount each time the other goes up by $1$.',
            'Toothpicks: $t = 3n + 1$.',
            'Chairs around $n$ tables: $2n + 2$.',
            'A pattern whose jumps change, like doubling, is not linear.',
          ],
        },
      ],
      lines: [
        { say: 'Let’s sum up. In a linear relation, one quantity changes by the same amount each time the other goes up by one.', show: 'sum.0' },
        { say: 'The toothpick pattern is t equals three n plus one.', show: 'sum.1' },
        { say: 'And n tables in a row need two n plus two chairs.', show: 'sum.2' },
        { say: 'A pattern whose jumps change, like doubling, is not linear. In the next part, you will use a relation to find any term. See you there!', show: 'sum.3' },
      ],
    },
  ],
};

export default video;
