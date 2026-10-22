import type { Explainer } from '@/video/script.ts';
import { figure } from '@/video/solids.ts';
import { valueTable } from '@/content/math5/videos/lib/m5-11-figures.ts';
import { join } from '@/content/math6/videos/lib/m6-9-figures.ts';
import { machine, shift } from '@/content/math6/videos/lib/m6-11-figures.ts';
import { note } from './lib/m7-4-figures.ts';

// C = 5n + 10 forwards (n = ?, C = 45), and undone backwards: 45 − 10 = 35, 35 ÷ 5 = 7.
const both = (id: string) =>
  figure(id, [
    join(
      machine({ name: 'f', steps: ['\\times 5', '+ 10'], titles: ['n', 'C'], sets: [{ in: '?', mids: ['?'], out: '45' }] }),
      shift(machine({ name: 'b', steps: ['- 10', '\\div 5'], titles: ['C', 'n'], sets: [{ in: '45', mids: ['35'], out: '7', tone: 'opp' }] }), 0, -3.8),
    ),
  ]);

// y = 2x + 4 with a missing input: the y value 18 is known, and its x (7, in green) is found.
// The 7 is written where the "?" is (column 3 of a table with title column 1.4 and cells 1.5 wide).
const missing = (id: string) =>
  figure(
    id,
    [
      valueTable({
        x: { title: 'x', values: [0, 1, 2, '?'] },
        y: { title: 'y', values: [4, 6, 8, 18] },
        titleW: 1.4,
        cellW: 1.5,
      }),
      note({ id: 'seven', at: [1.4 + 3.5 * 1.5, 1.5], tex: '7', tone: 'good' }),
    ],
    260,
  );

const video: Explainer = {
  id: 'm7-5-2-b',
  lessonId: 'm7-5-2',
  title: 'Tables of Values and Graphs, Part 2: Working Backwards in a Table',
  thumbnailTitle: 'Working Backwards in a Table',
  thumbnail: 'ms',
  summary:
    'When the output is known and the input is missing, work backwards: undo the steps in the reverse order. An order of concert tickets with C = 5n + 10 that costs $45 has (45 − 10) ÷ 5 = 7 tickets, and 5(7) + 10 = 45 checks it. Dividing first (45 ÷ 5 = 9, then 9 − 10) gives a number that makes no sense. For y = 2x + 4, the output 18 comes from x = (18 − 4) ÷ 2 = 7.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Patterns and Linear Relations · Part 2', title: 'Working Backwards in a Table', subtitle: 'From the output back to the input' }],
      lines: [
        { say: 'An order of concert tickets costs forty-five dollars. How many tickets are in the order? This time the output is known, and the input is missing.', show: 'title' },
        { say: 'In this part, you will work backwards to find a missing input, by undoing the steps in the reverse order.' },
      ],
    },
    {
      chapter: 'How many tickets?',
      layout: 'split',
      leftWidth: 640,
      left: [both('wb')],
      right: [
        { kind: 'text', id: 'q', size: 'md', md: 'An order costs \\$45. Use $C = 5n + 10$ to find the number of tickets.' },
        { kind: 'math', id: 'm', size: 'md', align: 'left', lines: ['45 - 10 = 35', '35 \\div 5 = 7', '5(7) + 10 = 45 \\;\\good{\\checkmark}'] },
      ],
      lines: [
        { say: 'An order costs forty-five dollars. Use the rule C equals five n plus ten to find the number of tickets.', show: 'q' },
        { say: 'Think of the relation as a machine. It multiplies the number of tickets by five, then adds ten. We know the output is forty-five.', show: ['wb.f-frame', 'wb.f-titles', 'wb.f-box0', 'wb.f-box1', 'wb.f-set0'] },
        { say: 'To work backwards, undo the steps in the reverse order. The last step was adding ten, so undo that first.', show: ['wb.b-frame', 'wb.b-titles', 'wb.b-box0', 'wb.b-box1', 'wb.b-set0-in'] },
        { say: 'Undo adding ten by subtracting ten. Forty-five minus ten is thirty-five.', show: ['wb.b-set0-mid0', 'm.0'], focus: ['wb.b-box0', 'm.0'] },
        { say: 'Undo multiplying by five by dividing by five. Thirty-five divided by five is seven.', show: ['wb.b-set0-out', 'm.1'], focus: ['wb.b-box1', 'm.1'] },
        { say: 'Check: five times seven is thirty-five, plus ten is forty-five. It works. The order has seven tickets.', show: 'm.2', focus: 'm.2' },
      ],
    },
    {
      chapter: 'Watch out',
      layout: 'center',
      main: [
        { kind: 'callout', id: 'oops', tone: 'mistake', title: 'Undoing in the wrong order', md: 'Do **not** divide first: $45 \\div 5 = 9$, and $9 - 10$ does not make sense here. The relation multiplies first, so you **subtract first** when you work backwards.' },
        { kind: 'math', id: 'm', size: 'lg', lines: ['45 \\div 5 = 9 \\qquad 9 - 10 = {-1} \\;\\bad{\\times}', '45 - 10 = 35 \\qquad 35 \\div 5 = 7 \\;\\good{\\checkmark}'] },
      ],
      lines: [
        { say: 'Watch out for this mistake. Some people divide first. Forty-five divided by five is nine. Then nine minus ten is negative one.', show: ['oops', 'm.0'], focus: 'm.0' },
        { say: 'You cannot buy negative one tickets! That answer makes no sense.' },
        { say: 'The relation multiplies first and adds last. So when you work backwards, subtract first and divide last.', show: 'm.1', focus: 'm.1' },
      ],
    },
    {
      chapter: 'A missing input',
      layout: 'center',
      main: [
        { kind: 'text', id: 'q', size: 'md', md: 'For $y = 2x + 4$, which value of $x$ gives $y = 18$?' },
        missing('ms'),
        { kind: 'math', id: 'm', size: 'lg', lines: ['18 - 4 = 14 \\qquad 14 \\div 2 = 7', '\\text{Check: } 2(7) + 4 = 18 \\;\\good{\\checkmark}'] },
      ],
      lines: [
        { say: 'Here is a table for y equals two x plus four. The last column has y equals eighteen, but its x is missing. Which value of x gives y equals eighteen?', show: ['q', 'ms.frame', 'ms.x0', 'ms.x1', 'ms.x2', 'ms.x3', 'ms.ys', 'ms.hl3'] },
        { say: 'The relation multiplies by two, then adds four. Undo in reverse order. Subtract four: eighteen minus four is fourteen. Divide by two: fourteen divided by two is seven.', show: 'm.0', focus: 'm.0' },
        { say: 'Check: two times seven is fourteen, plus four is eighteen. So the missing input is seven.', hide: 'ms.x3', show: ['m.1', 'ms.seven'], focus: ['m.1', 'ms.seven'] },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q',
          prompt: 'An order of concert tickets costs \\$60. Use $C = 5n + 10$ to find the number of tickets.',
          choices: ['$10$', '$2$', '$14$', '$12$'],
          answer: 0,
          working: 'Undo in reverse order: $60 - 10 = 50$, then $50 \\div 5 = 10$. Check: $5(10) + 10 = 60$.',
        },
      ],
      lines: [
        { say: 'Your turn. An order of concert tickets costs sixty dollars. Use the rule C equals five n plus ten to find the number of tickets. Pause the video and try it.', show: 'q', wait: 6 },
        { say: 'The answer is A, ten tickets. Subtract ten first: sixty minus ten is fifty. Then divide by five: fifty divided by five is ten. Choice B divides first and subtracts last, which is the wrong order.', show: 'q.answer' },
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
            'To find a missing input, work backwards.',
            'Undo the steps in the reverse order: undo the last step first.',
            'For $C = 5n + 10$: subtract $10$, then divide by $5$.',
            'Check your answer in the relation.',
          ],
        },
      ],
      lines: [
        { say: 'Let’s sum up. To find a missing input, work backwards from the output.', show: 'sum.0' },
        { say: 'Undo the steps in the reverse order. Undo the last step first.', show: 'sum.1' },
        { say: 'For C equals five n plus ten, subtract ten first, then divide by five.', show: 'sum.2' },
        { say: 'And always check your answer in the relation. In the next part, you will graph a table of values. See you there!', show: 'sum.3' },
      ],
    },
  ],
};

export default video;
