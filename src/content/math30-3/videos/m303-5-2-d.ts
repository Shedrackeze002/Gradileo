import type { Explainer } from '@/video/script.ts';
import { dots, plane } from '@/video/graph.ts';
import { figure } from '@/video/solids.ts';
import { band, guide, line, numbers, tag } from './lib/m303-5-graphs.ts';

// Two carpet-cleaner rentals: Shop A is $20 plus $12 an hour, Shop B is $35 plus $9 an hour.
const g = plane({ x: [0, 10], y: [0, 160], xStep: 1, yStep: 20, every: 0, width: 7, height: 6.5, titles: { x: '\\text{Hours}', y: '\\text{Cost (\\$)}' } });
const A = (h: number) => 12 * h + 20;
const B = (h: number) => 9 * h + 35;
const offers = (id: string) =>
  figure(id, [
    g,
    numbers(g, 1, 20),
    band(g, 'aLow', 0, 5, 'adj', 0.1),
    band(g, 'bLow', 5, 10, 'opp', 0.1),
    tag(g, 'aLow-t', 2.5, 148, '\\text{A cheaper}', 'center', 'adj'),
    tag(g, 'bLow-t', 7.5, 148, '\\text{B cheaper}', 'center', 'opp'),
    line(g, { id: 'A', m: 12, b: 20, from: 0, to: 10, tone: 'adj', label: '\\text{Shop A}', labelAt: [6.5, A(6.5)], place: 'above left' }),
    line(g, { id: 'B', m: 9, b: 35, from: 0, to: 10, tone: 'opp', label: '\\text{Shop B}', labelAt: [8.6, B(8.6)], place: 'below right' }),
    dots(g, [{ id: 'X', x: 5, y: 80, tex: '(5, 80)', tone: 'theta', place: 'below right' }]),
    guide(g, 'g8', [8, 0], [8, A(8)], 'muted', { group: 'at8' }),
    dots(g, [
      { id: 'A8', x: 8, y: A(8), tone: 'adj', group: 'at8' },
      { id: 'B8', x: 8, y: B(8), tone: 'opp', group: 'at8' },
    ]),
  ]);

const video: Explainer = {
  id: 'm303-5-2-d',
  lessonId: 'm303-5-2',
  title: 'Writing Linear Equations, Part 4: Comparing Two Offers',
  thumbnailTitle: 'Comparing Two Offers',
  thumbnail: 'of',
  summary: 'Comparing two linear offers by setting their equations equal: carpet-cleaner rentals of C = 12h + 20 and C = 9h + 35 cost the same, $80, for 5 hours; on a graph their lines cross there, the lower fee is cheaper for shorter rentals, and for 8 hours the lower hourly rate is cheaper ($107 compared with $116).',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Linear Relations · Part 4', title: 'Comparing Two Offers', subtitle: 'When do they cost the same?' }],
      lines: [
        { say: 'One shop has a low fee but a high hourly rate. Another has a higher fee but a lower rate. Which is the better deal?', show: 'title' },
        { say: 'The answer depends on how long you need it. In this video, you will use two equations to find when two offers cost the same, and which one is cheaper for a given job.' },
      ],
    },
    {
      chapter: 'Two rental shops',
      layout: 'center',
      main: [
        { kind: 'text', id: 'q', size: 'md', md: 'Shop A rents a carpet cleaner for \\$20 plus \\$12 per hour. Shop B charges \\$35 plus \\$9 per hour. When do they cost the same? Which is cheaper for $8$ hours?' },
        { kind: 'math', id: 'm', size: 'lg', lines: ['\\text{Shop A: } C = 12h + 20', '\\text{Shop B: } C = 9h + 35'] },
      ],
      lines: [
        { say: 'Shop A rents a carpet cleaner for 20 dollars, plus twelve dollars per hour. Shop B charges 35 dollars, plus nine dollars per hour. When do they cost the same? And which is cheaper for eight hours?', show: 'q' },
        { say: 'First, write an equation for each shop. For Shop A, the cost C is twelve h, plus 20.', show: 'm.0', focus: 'm.0' },
        { say: 'For Shop B, the cost is nine h, plus 35.', show: 'm.1', focus: 'm.1' },
      ],
    },
    {
      chapter: 'When they cost the same',
      layout: 'center',
      main: [
        { kind: 'math', id: 'm', size: 'lg', lines: ['12h + 20 = 9h + 35', '3h + 20 = 35', '3h = 15', 'h = 5'] },
        { kind: 'text', id: 'a', size: 'md', md: 'Both cost $12(5) + 20 = 80$ dollars for $5$ hours.' },
      ],
      lines: [
        { say: 'The two shops cost the same when their two costs are equal. So set the two expressions equal to each other.', show: 'm.0', focus: 'm.0' },
        { say: 'Subtract nine h from both sides. Twelve h minus nine h is three h, so three h, plus 20, equals 35.', show: 'm.1', focus: 'm.1' },
        { say: 'Subtract 20 from both sides: three h equals fifteen.', show: 'm.2', focus: 'm.2' },
        { say: 'Divide by three: h equals five. So the two shops cost the same for a five-hour rental.', show: 'm.3', focus: 'm.3' },
        { say: 'Check with both equations. Shop A: twelve times five is 60, plus 20 is 80 dollars. Shop B: nine times five is 45, plus 35 is also 80 dollars.', show: 'a' },
      ],
    },
    {
      chapter: 'On a graph',
      layout: 'split',
      leftWidth: 580,
      left: [offers('of')],
      right: [
        { kind: 'text', id: 't', size: 'md', md: 'The lines cross where the costs are equal: $5$ hours, \\$80.' },
        { kind: 'bullets', id: 'b', items: ['Under $5$ hours: Shop A is cheaper.', 'Over $5$ hours: Shop B is cheaper.'] },
      ],
      lines: [
        { say: 'Here are both equations on one graph. Shop A starts lower, at 20 dollars, but climbs faster, twelve dollars an hour.', show: ['of.grid', 'of.axes', 'of.A', 'of.A-label'], focus: 'of.A' },
        { say: 'Shop B starts higher, at 35 dollars, but climbs more slowly, nine dollars an hour.', show: ['of.B', 'of.B-label'], focus: 'of.B' },
        { say: 'The lines cross at the point at five, 80. That is where the costs are equal: five hours, for 80 dollars.', show: ['of.X', 't'], focus: 'of.X' },
        { say: 'To the left of the crossing, Shop A’s line is lower, so Shop A is cheaper for rentals under five hours.', show: ['of.aLow', 'of.aLow-t', 'b.0'], focus: 'of.aLow' },
        { say: 'To the right, Shop B’s line is lower, so Shop B is cheaper for rentals over five hours.', show: ['of.bLow', 'of.bLow-t', 'b.1'], focus: 'of.bLow' },
      ],
    },
    {
      chapter: 'Eight hours',
      layout: 'split',
      leftWidth: 580,
      left: [offers('of2')],
      right: [
        { kind: 'math', id: 'm', size: 'md', align: 'left', lines: ['\\text{A: } 12(8) + 20 = 116', '\\text{B: } 9(8) + 35 = 107'] },
        { kind: 'text', id: 'a', size: 'md', md: 'For $8$ hours, Shop B is cheaper: \\$107 compared with \\$116.' },
      ],
      lines: [
        { say: 'Now the second question: which shop is cheaper for eight hours?', show: ['of2.grid', 'of2.axes', 'of2.A', 'of2.B', 'of2.A-label', 'of2.B-label', 'of2.X', 'of2.at8'], focus: 'of2.at8' },
        { say: 'Shop A costs twelve times eight, which is 96, plus 20: 116 dollars.', show: 'm.0', focus: ['m.0', 'of2.A8'] },
        { say: 'Shop B costs nine times eight, which is 72, plus 35: 107 dollars.', show: 'm.1', focus: ['m.1', 'of2.B8'] },
        { say: 'So for eight hours, Shop B is cheaper, by nine dollars. That fits the graph: eight hours is to the right of the crossing.', show: 'a' },
      ],
    },
    {
      chapter: 'Short or long jobs',
      layout: 'center',
      main: [
        { kind: 'callout', id: 'tip', tone: 'tip', title: 'Fee or rate?', md: 'For a **short** job, the lower fee wins. For a **long** job, the lower hourly rate wins. Where they cost the same is the point where the better deal switches.' },
        { kind: 'math', id: 'm', size: 'md', lines: ['2 \\text{ hours: A } 12(2) + 20 = 44, \\quad \\text{B } 9(2) + 35 = 53'] },
      ],
      lines: [
        { say: 'This pattern is common. For a short job, the lower fee wins. For a long job, the lower hourly rate wins.', show: 'tip' },
        { say: 'For example, for two hours, Shop A costs 44 dollars and Shop B costs 53 dollars. Shop A is cheaper, as the graph showed.', show: 'm', focus: 'm' },
        { say: 'The number of hours where they cost the same is where the better deal switches from one shop to the other.' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q',
          prompt: 'Plan A costs \\$20 a month plus \\$6 per GB of data. Plan B costs \\$44 a month plus \\$2 per GB. For how many GB do the plans cost the same?',
          choices: ['$6$ GB', '$4$ GB', '$24$ GB', '$16$ GB'],
          answer: 0,
          working: '$6g + 20 = 2g + 44$, so $4g = 24$ and $g = 6$. Both plans cost $6(6) + 20 = 56$ dollars.',
        },
      ],
      lines: [
        { say: 'Your turn. Plan A costs 20 dollars a month, plus six dollars per gigabyte of data. Plan B costs 44 dollars a month, plus two dollars per gigabyte. For how many gigabytes do the plans cost the same? Pause the video and try it.', show: 'q', wait: 6 },
        { say: 'The answer is A. Set six g, plus 20, equal to two g, plus 44. Subtract two g and 20 from both sides: four g equals 24, so g is six. Both plans then cost 56 dollars. Choice C stops at 24, without dividing by four.', show: 'q.answer' },
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
          items: ['Write an equation for each offer.', 'Set the equations equal and solve to find where they cost the same.', 'On a graph, that is where the lines cross; the lower line is cheaper.'],
        },
      ],
      lines: [
        { say: 'Let’s sum up. To compare two offers, write an equation for each one.', show: 'sum.0' },
        { say: 'Set the two equations equal, and solve, to find where they cost the same.', show: 'sum.1' },
        { say: 'On a graph, that is where the lines cross, and on each side, the lower line is the cheaper offer. In the next lesson, we use graphs and equations to estimate values we never measured. See you there!', show: 'sum.2' },
      ],
    },
  ],
};

export default video;
