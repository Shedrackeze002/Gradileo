import type { Explainer } from '@/video/script.ts';
import { dots, plane } from '@/video/graph.ts';
import { figure } from '@/video/solids.ts';
import { guide, tag } from '@/content/math5/videos/lib/m5-11-figures.ts';

// The cost of concert tickets, C = 5n + 10, for 1 to 6 tickets.
const POINTS: [number, number][] = [[1, 15], [2, 20], [3, 25], [4, 30], [5, 35], [6, 40]];

// The ticket graph, with guides for reading it both ways and for finding the price and the fee.
const graph = (id: string) => {
  const g = plane({ x: [0, 7], y: [0, 45], yStep: 5, width: 7, height: 7, titles: { x: '\\text{Number of tickets}', y: '\\text{Cost (\\$)}' } });
  return figure(id, [
    g,
    // (a) Up from 4 tickets to the point, then across to $30.
    guide(g, 'a-up', [4, 0], [4, 30], 'adj', { arrow: true }),
    guide(g, 'a-across', [4, 30], [0, 30], 'opp', { arrow: true }),
    // (b) Across from $40 to the point, then down to 6 tickets.
    guide(g, 'b-across', [0, 40], [6, 40], 'opp', { arrow: true }),
    guide(g, 'b-down', [6, 40], [6, 0], 'adj', { arrow: true }),
    // The price: 1 across and $5 up, from (1, 15) to (2, 20).
    guide(g, 'run', [1, 15], [2, 15], 'adj', { dashed: false, weight: 3.5 }),
    guide(g, 'rise', [2, 15], [2, 20], 'good', { dashed: false, weight: 3.5 }),
    tag(g, 'rise-t', 2, 17.5, '+5', 'right', 'good'),
    // The fee: one step back from (1, 15) to (0, 10).
    guide(g, 'back', [1, 15], [0, 10], 'theta'),
    dots(g, [{ id: 'fee', x: 0, y: 10, tex: '\\text{fee}', tone: 'theta', place: 'below right', open: true }]),
    dots(
      g,
      POINTS.map(([x, y], i) => ({ id: `p${i}`, x, y, tone: 'hyp' as const })),
    ),
  ]);
};

const video: Explainer = {
  id: 'm7-5-2-d',
  lessonId: 'm7-5-2',
  title: 'Tables of Values and Graphs, Part 4: Reading a Graph',
  thumbnailTitle: 'Reading a Graph',
  thumbnail: 'gr',
  summary:
    'The graph of the concert ticket cost, C = 5n + 10, answers questions both ways: up from 4 tickets and across gives $30, and across from $40 and down gives 6 tickets. From one point to the next the cost goes up $5, the price of a ticket, and one step back from (1, 15) gives $10, the booking fee, matching C = 5n + 10. Always start on the right axis: tickets are on the horizontal axis and dollars on the vertical one.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Patterns and Linear Relations · Part 4', title: 'Reading a Graph', subtitle: 'Up and across, or across and down' }],
      lines: [
        { say: 'How much do four tickets to the school concert cost? How many tickets can you get for forty dollars? A graph can answer both questions at a glance.', show: 'title' },
        { say: 'In this part, you will read a graph both ways, and find the price of a ticket and the booking fee from the graph.' },
      ],
    },
    {
      chapter: 'The ticket graph',
      layout: 'split',
      leftWidth: 600,
      left: [graph('gr')],
      right: [{ kind: 'text', id: 't', size: 'md', md: 'The graph shows the cost of concert tickets, $C = 5n + 10$: \\$5 for each ticket, plus a \\$10 booking fee.' }],
      lines: [
        { say: 'This graph shows the cost of concert tickets: C equals five n plus ten. That is five dollars for each ticket, plus a ten dollar booking fee.', show: ['t', 'gr.grid', 'gr.axes'] },
        { say: 'The number of tickets goes across, on the horizontal axis. The cost in dollars goes up, on the vertical axis, in steps of five.' },
        { say: 'Each point is a column of the table of values: one ticket for fifteen dollars, two for twenty, and so on, up to six tickets for forty dollars.', show: ['gr.p0', 'gr.p1', 'gr.p2', 'gr.p3', 'gr.p4', 'gr.p5'] },
        { say: 'The points are not joined, because you cannot buy part of a ticket.' },
      ],
    },
    {
      chapter: 'Reading up and across',
      layout: 'split',
      leftWidth: 600,
      left: [graph('gr')],
      right: [
        { kind: 'text', id: 'q', size: 'md', md: 'What do $4$ tickets cost?' },
        { kind: 'math', id: 'm', size: 'md', align: 'left', lines: ['\\text{up from } 4 \\text{, across to } 30', '4 \\text{ tickets cost } \\$30'] },
      ],
      lines: [
        { say: 'What do four tickets cost? Find four on the horizontal axis, where the tickets are.', show: ['q', 'gr.grid', 'gr.axes', 'gr.p0', 'gr.p1', 'gr.p2', 'gr.p3', 'gr.p4', 'gr.p5'] },
        { say: 'Go up from four until you reach the point.', show: 'gr.a-up', focus: ['gr.a-up', 'gr.p3'] },
        { say: 'Then go across to the vertical axis, and read the cost: thirty. So four tickets cost thirty dollars.', show: ['gr.a-across', 'm.0', 'm.1'], focus: ['gr.a-across', 'm.1'] },
      ],
    },
    {
      chapter: 'Reading across and down',
      layout: 'split',
      leftWidth: 600,
      left: [graph('gr')],
      right: [
        { kind: 'text', id: 'q', size: 'md', md: 'How many tickets cost \\$40?' },
        { kind: 'math', id: 'm', size: 'md', align: 'left', lines: ['\\text{across from } 40 \\text{, down to } 6', '6 \\text{ tickets cost } \\$40'] },
      ],
      lines: [
        { say: 'Now go the other way. How many tickets cost forty dollars? This time, start at forty on the vertical axis, where the dollars are.', show: ['q', 'gr.grid', 'gr.axes', 'gr.p0', 'gr.p1', 'gr.p2', 'gr.p3', 'gr.p4', 'gr.p5'] },
        { say: 'Go across from forty until you reach the point.', show: 'gr.b-across', focus: ['gr.b-across', 'gr.p5'] },
        { say: 'Then go down to the horizontal axis, and read the number of tickets: six. So six tickets cost forty dollars.', show: ['gr.b-down', 'm.0', 'm.1'], focus: ['gr.b-down', 'm.1'] },
      ],
    },
    {
      chapter: 'The price and the fee',
      layout: 'split',
      leftWidth: 600,
      left: [graph('gr')],
      right: [
        { kind: 'math', id: 'm', size: 'md', align: 'left', lines: ['\\text{Each step: up } 5', '\\text{Price: } \\$5 \\text{ a ticket}', '\\text{Back one step: } 15 - 5 = 10', '\\text{Fee: } \\$10', 'C = 5n + 10 \\;\\good{\\checkmark}'] },
      ],
      lines: [
        { say: 'You can also find the price of a ticket and the booking fee from the graph.', show: ['gr.grid', 'gr.axes', 'gr.p0', 'gr.p1', 'gr.p2', 'gr.p3', 'gr.p4', 'gr.p5'] },
        { say: 'From one point to the next, you go one ticket across, and the cost goes up five dollars. So each ticket costs five dollars.', show: ['gr.run', 'gr.rise', 'gr.rise-t', 'm.0', 'm.1'], focus: ['gr.rise', 'm.1'] },
        { say: 'The first point is one ticket for fifteen dollars. Go back one step, to zero tickets: fifteen minus five is ten. Even with no tickets, you would pay the ten dollar booking fee.', show: ['gr.back', 'gr.fee', 'm.2', 'm.3'], focus: ['gr.fee', 'm.3'] },
        { say: 'Five dollars a ticket, plus a ten dollar fee. That matches C equals five n plus ten.', show: 'm.4', focus: 'm.4' },
      ],
    },
    {
      chapter: 'Watch out',
      layout: 'center',
      main: [
        { kind: 'callout', id: 'oops', tone: 'mistake', title: 'Reading the wrong axis', md: 'To find the cost of $4$ tickets, start at $4$ on the **horizontal** axis (tickets), not at $4$ on the vertical axis (dollars).' },
      ],
      lines: [
        { say: 'Watch out for this mistake. To find the cost of four tickets, start at four on the horizontal axis, where the tickets are.', show: 'oops' },
        { say: 'Do not start at four on the vertical axis. That axis shows dollars, not tickets. Before you read a graph, always check what each axis shows.' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q',
          prompt: 'Concert tickets cost $C = 5n + 10$ dollars for $n$ tickets. Use the graph or the relation: what do $5$ tickets cost?',
          choices: ['\\$25', '\\$50', '\\$30', '\\$35'],
          answer: 3,
          working: 'Go up from $5$ on the horizontal axis to the point, then across: $35$. Check: $5(5) + 10 = 35$.',
        },
      ],
      lines: [
        { say: 'Your turn. Concert tickets cost C equals five n plus ten dollars for n tickets. Use the graph or the relation: what do five tickets cost? Pause the video and try it.', show: 'q', wait: 6 },
        { say: 'The answer is D, thirty-five dollars. Go up from five to the point, then across to thirty-five. Check: five times five is twenty-five, plus ten is thirty-five. Choice A forgets the ten dollar booking fee.', show: 'q.answer' },
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
            'To find an output, go **up** from the horizontal axis, then **across**.',
            'To find an input, go **across** from the vertical axis, then **down**.',
            'The rise from one point to the next is the change for each step: \\$5 a ticket.',
            'The value at $0$ is the start: the \\$10 booking fee.',
          ],
        },
      ],
      lines: [
        { say: 'Let’s sum up. To find an output, go up from the horizontal axis to the point, then across.', show: 'sum.0' },
        { say: 'To find an input, go across from the vertical axis to the point, then down.', show: 'sum.1' },
        { say: 'The rise from one point to the next is the change for each step, like five dollars a ticket.', show: 'sum.2' },
        { say: 'And the value at zero is the start, like the ten dollar booking fee. Great work with patterns and graphs! See you next time!', show: 'sum.3' },
      ],
    },
  ],
};

export default video;
