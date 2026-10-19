import type { Explainer } from '@/video/script.ts';
import { figure } from '@/video/solids.ts';
import { valueTable } from './lib/m5-11-figures.ts';

// Positions 1 to 5 and the terms 5, 9, 13, ?, 21; then the missing 17, and two more terms past the table.
const table = (id: string, o: { found?: boolean; extra?: boolean; compact?: boolean } = {}) =>
  figure(
    id,
    [
      valueTable({
        x: { title: '\\text{Position}', values: [1, 2, 3, 4, 5, ...(o.extra ? [6, 7] : [])] },
        y: { title: '\\text{Term}', values: [5, 9, 13, o.found ? 17 : '?', 21, ...(o.extra ? [25, 29] : [])] },
        dy: ['+4', '+4', '+4', '+4', ...(o.extra ? ['+4', '+4'] : [])],
        extra: o.extra ? 2 : 0,
        ...(o.compact ? { titleW: 2.8, cellW: 1.5 } : {}),
      }),
    ],
    300,
  );

const video: Explainer = {
  id: 'm5-11-1-b',
  lessonId: 'm5-11-1',
  title: 'Arithmetic Sequences in Tables and Graphs, Part 2: Tables of Values',
  thumbnailTitle: 'Tables of Values',
  thumbnail: 'ch',
  summary: 'A table of values lists each position with its term. In the table 5, 9, 13, ?, 21 each term is 4 more than the one before, so the missing term at position 4 is 13 + 4 = 17, checked by 17 + 4 = 21; the pattern continues 25, 29.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Arithmetic Sequences · Part 2', title: 'Tables of Values', subtitle: 'Each position matches one term' }],
      lines: [
        { say: 'A list of numbers is useful, but a table can show even more. It puts each term right next to its position, so you never lose count.', show: 'title' },
        { say: 'In this video, you will read a table of values, and find a missing term.' },
      ],
    },
    {
      chapter: 'A table of values',
      layout: 'center',
      main: [
        table('t'),
        { kind: 'callout', id: 'def', tone: 'definition', title: 'Table of values', md: 'A **table of values** for a sequence lists the positions in one row and the terms in the other row. Each position matches exactly one term.' },
      ],
      lines: [
        { say: 'A table of values for a sequence has two rows. The top row lists the positions, and the bottom row lists the terms.', show: ['def', 't.frame', 't.xs'], focus: 't.xs' },
        { say: 'Each position matches exactly one term. Position one has the term five, position two has nine, and position three has thirteen.', show: 't.ys', focus: ['t.y0', 't.y1', 't.y2'] },
        { say: 'Some tables go across the page, like this one. Others go down the page, in two columns. They work in the same way.' },
        { say: 'But this table has a term missing, at position four. Let’s find it.', show: 't.hl3', focus: 't.y3' },
      ],
    },
    {
      chapter: 'Finding the change',
      layout: 'split',
      leftWidth: 680,
      left: [table('ch', { found: true, compact: true })],
      right: [{ kind: 'math', id: 'm', size: 'md', align: 'left', lines: ['9 - 5 = 4', '13 - 9 = 4', '13 + 4 = \\good{17}', '17 + 4 = 21 \\;\\checkmark'] }],
      lines: [
        { say: 'First, find the change between two terms next to each other. From five to nine, the change is nine minus five, which is four.', show: ['ch.frame', 'ch.xs', 'ch.y0', 'ch.y1', 'ch.y2', 'ch.y4', 'ch.dy0', 'm.0'], focus: ['ch.dy0', 'm.0'] },
        { say: 'Check another pair. Thirteen minus nine is also four. So each term is four more than the term before it.', show: ['ch.dy1', 'm.1'], focus: ['ch.dy1', 'm.1'] },
        { say: 'The term at position four is thirteen plus four, which is seventeen.', show: ['ch.dy2', 'ch.y3', 'ch.hl3', 'm.2'], focus: ['ch.y3', 'm.2'] },
        { say: 'Always check with the next term. Seventeen plus four is twenty-one, and that matches the table at position five!', show: ['ch.dy3', 'm.3'], focus: ['ch.dy3', 'ch.y4', 'm.3'] },
        { say: 'So the missing term is seventeen.' },
      ],
    },
    {
      chapter: 'Going further',
      layout: 'center',
      main: [
        table('gf', { found: true, extra: true }),
        { kind: 'callout', id: 'tip', tone: 'tip', title: 'Keep adding', md: 'Once you know what is added each time, you can keep the table going for as long as you like.' },
      ],
      lines: [
        { say: 'Once you know the change, you can keep the table going. What is the term at position six?', show: ['gf.frame', 'gf.xs', 'gf.ys', 'gf.dys'] },
        { say: 'Add four to the term at position five. Twenty-one plus four is twenty-five.', show: ['gf.more'], focus: 'gf.more' },
        { say: 'And position seven is twenty-five plus four, which is twenty-nine. You can keep going for as long as you like.', show: 'tip' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q',
          prompt: 'A table of values has the positions $1,\\ 2,\\ 3,\\ 4,\\ 5$ and the terms $7,\\ 12,\\ ?,\\ 22,\\ 27$. What is the missing term?',
          choices: ['$16$', '$17$', '$19$', '$13$'],
          answer: 1,
          working: 'Each term is $12 - 7 = 5$ more than the one before, so the missing term is $12 + 5 = 17$. Check: $17 + 5 = 22$ ✓',
        },
      ],
      lines: [
        { say: 'Your turn. A table of values has the positions one to five, and the terms seven, twelve, a missing term, twenty-two and twenty-seven. What is the missing term? Pause the video and try it.', show: 'q', wait: 6 },
        { say: 'The answer is B, seventeen. Twelve minus seven is five, so each term is five more than the one before. Twelve plus five is seventeen, and seventeen plus five is twenty-two, which checks. Choice D adds one, not five.', show: 'q.answer' },
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
          items: ['A table of values lists positions in one row and terms in the other.', 'Find the change between neighbouring terms.', 'Add the change to find the next term, and check with the term after it.'],
        },
      ],
      lines: [
        { say: 'Let’s sum up. A table of values lists the positions in one row, and the terms in the other.', show: 'sum.0' },
        { say: 'To find a missing term, first find the change between two terms next to each other.', show: 'sum.1' },
        { say: 'Then add the change to find the next term, and check it with the term after. In the next part, you will plot a sequence on a grid. See you there!', show: 'sum.2' },
      ],
    },
  ],
};

export default video;
