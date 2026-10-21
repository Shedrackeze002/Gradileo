import type { Explainer } from '@/video/script.ts';
import { figure } from '@/video/solids.ts';
import { valueTable } from '@/content/math5/videos/lib/m5-11-figures.ts';

// y = 2x + 4 for x = 0 to 4.
const xy = (id: string, dy = false) =>
  figure(
    id,
    [
      valueTable({
        x: { title: 'x', values: [0, 1, 2, 3, 4] },
        y: { title: 'y', values: [4, 6, 8, 10, 12] },
        ...(dy ? { dx: ['+1', '+1', '+1', '+1'], dy: ['+2', '+2', '+2', '+2'] } : {}),
        titleW: 1.4,
        cellW: 1.5,
      }),
    ],
    dy ? 300 : 250,
  );

// The concert tickets: C = 5n + 10 for 1 to 4 tickets.
const tickets = (id: string, dy = false) =>
  figure(
    id,
    [
      valueTable({
        x: { title: '\\text{Tickets, } n', values: [1, 2, 3, 4] },
        y: { title: '\\text{Cost, } C\\ (\\$)', values: [15, 20, 25, 30] },
        ...(dy ? { dy: ['+5', '+5', '+5'] } : {}),
        titleW: 3.6,
        cellW: 1.5,
      }),
    ],
    dy ? 300 : 250,
  );

const video: Explainer = {
  id: 'm7-5-2',
  lessonId: 'm7-5-2',
  title: 'Tables of Values and Graphs, Part 1: Making a Table of Values',
  thumbnailTitle: 'Making a Table of Values',
  thumbnail: 'tk',
  summary:
    'A table of values shows matching values of the two variables in a relation; find each output by substituting an input. For y = 2x + 4 and x = 0 to 4, the y values are 4, 6, 8, 10 and 12. Concert tickets at $5 each plus a $10 booking fee cost C = 5n + 10 dollars: $15, $20, $25 and $30 for 1 to 4 tickets. In a linear relation, the outputs go up by the same amount each time: 2 for y = 2x + 4, and $5 for each ticket.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Patterns and Linear Relations · Part 1', title: 'Making a Table of Values', subtitle: 'Substitute, then fill in the table' }],
      lines: [
        { say: 'Tickets for a school concert cost five dollars each, plus a ten dollar booking fee for each order. How much do four tickets cost? How many tickets can you get for forty dollars?', show: 'title' },
        { say: 'A table of values and a graph answer questions like these at a glance. In this part, you will make tables of values.' },
      ],
    },
    {
      chapter: 'Table of values',
      layout: 'center',
      main: [
        { kind: 'callout', id: 'def', tone: 'definition', title: 'Table of values', md: 'A **table of values** shows matching values of the two variables in a relation. You find each output by **substituting** an input into the relation.' },
        { kind: 'math', id: 'm', size: 'lg', lines: ['y = 2x + 4', 'x\\colon \\text{input} \\qquad y\\colon \\text{output}'] },
      ],
      lines: [
        { say: 'A table of values shows matching values of the two variables in a relation.', show: 'def' },
        { say: 'Here is a relation: y equals two x plus four. The variable x is the input, the number you choose. The variable y is the output, the number you get.', show: ['m.0', 'm.1'], focus: 'm.0' },
        { say: 'To find an output, substitute: replace x with a number, and work out the value of y.' },
      ],
    },
    {
      chapter: 'A table from a relation',
      layout: 'center',
      main: [
        xy('xy'),
        {
          kind: 'math',
          id: 'm',
          size: 'md',
          lines: ['x = 0\\colon\\ y = 2(0) + 4 = 4 \\qquad x = 1\\colon\\ y = 2(1) + 4 = 6', 'x = 2\\colon\\ y = 2(2) + 4 = 8 \\qquad x = 3\\colon\\ y = 2(3) + 4 = 10', 'x = 4\\colon\\ y = 2(4) + 4 = 12'],
        },
      ],
      lines: [
        { say: 'Make a table of values for y equals two x plus four, for x from zero to four. Write the inputs in the top row.', show: ['xy.frame', 'xy.xs'] },
        { say: 'When x is zero, y is two times zero, plus four. Two times zero is zero, so y is four.', show: ['xy.y0', 'xy.hl0'], focus: 'xy.y0' },
        { say: 'When x is one, y is two times one, plus four, which is six.', show: ['xy.y1', 'xy.hl1', 'm.0'], hide: 'xy.hl0', focus: 'xy.y1' },
        { say: 'When x is two, y is two times two, plus four, which is eight. When x is three, y is ten.', show: ['xy.y2', 'xy.y3', 'm.1'], hide: 'xy.hl1', focus: ['xy.y2', 'xy.y3'] },
        { say: 'And when x is four, y is two times four, plus four, which is twelve. The y values are four, six, eight, ten and twelve.', show: ['xy.y4', 'm.2'], focus: 'xy.y4' },
      ],
    },
    {
      chapter: 'Concert tickets',
      layout: 'center',
      main: [
        { kind: 'text', id: 'q', size: 'md', md: 'The cost of an order of $n$ tickets is $C = 5n + 10$ dollars. Find the cost of $1$, $2$, $3$ and $4$ tickets.' },
        tickets('tk'),
        { kind: 'math', id: 'm', size: 'md', lines: ['n = 1\\colon\\ C = 5(1) + 10 = 15 \\qquad n = 2\\colon\\ C = 5(2) + 10 = 20', 'n = 3\\colon\\ C = 5(3) + 10 = 25 \\qquad n = 4\\colon\\ C = 5(4) + 10 = 30'] },
      ],
      lines: [
        { say: 'Back to the concert. The cost of an order of n tickets is C equals five n plus ten dollars. The five n is five dollars for each ticket, and the ten is the booking fee.', show: 'q' },
        { say: 'Find the cost of one, two, three and four tickets. Put the numbers of tickets in the top row.', show: ['tk.frame', 'tk.xs'] },
        { say: 'For one ticket, C is five times one, plus ten, which is fifteen dollars. For two tickets, five times two is ten, plus ten is twenty dollars.', show: ['tk.y0', 'tk.y1', 'm.0'], focus: ['tk.y0', 'tk.y1'] },
        { say: 'For three tickets, C is twenty-five dollars. For four tickets, five times four is twenty, plus ten is thirty dollars. So four tickets cost thirty dollars.', show: ['tk.y2', 'tk.y3', 'm.1'], focus: ['tk.y2', 'tk.y3'] },
      ],
    },
    {
      chapter: 'Patterns in the table',
      layout: 'center',
      main: [xy('xd', true)],
      lines: [
        { say: 'Look for patterns in the tables. For y equals two x plus four, each time x goes up by one, y goes up by two.', show: ['xd.frame', 'xd.xs', 'xd.ys', 'xd.dxs', 'xd.dys'], focus: 'xd.dys' },
        { say: 'The two comes from the two x. Each extra one in x adds two more to y.' },
      ],
    },
    {
      chapter: 'Patterns in the cost',
      layout: 'center',
      main: [tickets('td', true)],
      lines: [
        { say: 'For the tickets, each extra ticket adds five dollars to the cost. The five comes from the five n.', show: ['td.frame', 'td.xs', 'td.ys', 'td.dys'], focus: 'td.dys' },
        { say: 'Both relations are linear: the outputs go up by the same amount each time.' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q',
          prompt: 'For $y = 3x + 1$, what is $y$ when $x = 4$?',
          choices: ['$8$', '$13$', '$15$', '$12$'],
          answer: 1,
          working: 'Substitute: $y = 3(4) + 1 = 12 + 1 = 13$.',
        },
      ],
      lines: [
        { say: 'Your turn. For y equals three x plus one, what is y when x is four? Pause the video and try it.', show: 'q', wait: 6 },
        { say: 'The answer is B, thirteen. Replace x with four: three times four is twelve, plus one is thirteen. Choice C adds first and multiplies last, which is the wrong order: multiply first, then add.', show: 'q.answer' },
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
            'A **table of values** lists matching inputs and outputs.',
            'Substitute each input into the relation to find its output.',
            '$y = 2x + 4$: $4, 6, 8, 10, 12$ for $x = 0$ to $4$.',
            'In a linear relation, the outputs go up by the same amount each time.',
          ],
        },
      ],
      lines: [
        { say: 'Let’s sum up. A table of values lists matching inputs and outputs of a relation.', show: 'sum.0' },
        { say: 'To fill it in, substitute each input into the relation, and work out the output.', show: 'sum.1' },
        { say: 'For y equals two x plus four, the outputs are four, six, eight, ten and twelve.', show: 'sum.2' },
        { say: 'In a linear relation, the outputs go up by the same amount each time. In the next part, you will work backwards in a table. See you there!', show: 'sum.3' },
      ],
    },
  ],
};

export default video;
