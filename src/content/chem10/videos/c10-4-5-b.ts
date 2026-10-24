import type { Explainer } from '@/video/script.ts';
import { dots, plane, polyline } from '@/video/graph.ts';
import { figure } from '@/video/solids.ts';
import { gasGraph } from './lib/c10-4-figures.ts';

// The lesson's curve for marble powder: steep at first, levelling off at 80 cm³.
const curve = figure('g', [gasGraph()], 480);

// The table's data: total volume of carbon dioxide every 20 s, with the two intervals coloured.
const t = plane({ x: [0, 80], y: [0, 80], xStep: 20, yStep: 20, width: 7, height: 6, titles: { x: '\\text{Time (s)}', y: '\\text{Volume (cm}^3\\text{)}' } });
const data = figure(
  'd',
  [
    t,
    polyline(t, { id: 'first', points: [[0, 0], [20, 34]], tone: 'good' }),
    polyline(t, { id: 'mid', points: [[20, 34], [40, 56]], tone: 'brand' }),
    polyline(t, { id: 'late', points: [[40, 56], [60, 69], [80, 76]], tone: 'opp' }),
    dots(t, [
      { id: 'p0', x: 0, y: 0, tone: 'ink' },
      { id: 'p20', x: 20, y: 34, tone: 'ink' },
      { id: 'p40', x: 40, y: 56, tone: 'ink' },
      { id: 'p60', x: 60, y: 69, tone: 'ink' },
      { id: 'p80', x: 80, y: 76, tone: 'ink' },
    ]),
  ],
  480,
);
const allDots = ['d.p0', 'd.p20', 'd.p40', 'd.p60', 'd.p80'];

const video: Explainer = {
  id: 'c10-4-5-b',
  lessonId: 'c10-4-5',
  title: 'Rates of Reaction, Part 2: Reading Rates from Data',
  thumbnailTitle: 'Reading Rates from Data',
  thumbnail: 'g',
  summary:
    'A reaction is fastest at the start and slows down as the reactants are used up, so a graph of the volume of gas against time is steepest at first and then levels off. From a table of total volumes, the mean rate between two times is the volume made (the later total minus the earlier one) divided by the time between them.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Chemical Reactions · Part 2', title: 'Reading Rates from Data', subtitle: 'Fast at first, then slower' }],
      lines: [
        { say: 'Watch a gas syringe as marble reacts with acid. The plunger shoots out at first, then creeps, then stops.', show: 'title' },
        { say: 'In this part, you will see how the rate changes as a reaction goes on, and find mean rates from a table of measurements.' },
      ],
    },
    {
      chapter: 'Fastest at the start',
      layout: 'split',
      leftWidth: 600,
      left: [curve],
      right: [
        {
          kind: 'bullets',
          id: 'b',
          items: ['**Fastest at the start**, when the reactants are most concentrated: the curve is steepest.', '**Slows down** as the reactants are used up.', '**Stops** when one reactant runs out: the curve levels off.'],
        },
      ],
      lines: [
        { say: 'Marble powder reacts with acid, and the total volume of carbon dioxide is plotted against time.', show: ['g.grid', 'g.axes', 'g.powder'] },
        { say: 'A reaction is fastest at the start, when the reactants are most concentrated. That is where the curve is steepest.', show: 'b.0' },
        { say: 'As the reactants are used up, the reaction slows down, and the curve gets less steep.', show: 'b.1' },
        { say: 'It stops when one reactant runs out. Here the marble is used up, and the curve levels off at 80 cubic centimetres.', show: ['b.2', 'g.top'], focus: 'g.top' },
      ],
    },
    {
      chapter: 'Reading a table',
      layout: 'split',
      leftWidth: 480,
      left: [data],
      right: [
        { kind: 'table', id: 'tb', head: ['Time (s)', '0', '20', '40', '60', '80'], rows: [['Volume ($\\text{cm}^3$)', '0', '34', '56', '69', '76']] },
        { kind: 'math', id: 'm', size: 'md', align: 'left', lines: ['\\good{34 \\div 20 = 1.70\\ \\text{cm}^3\\text{/s}}', '\\opp{76 - 56 = 20\\ \\text{cm}^3}', '\\opp{\\text{in } 80 - 40 = 40\\ \\text{s}}', '\\opp{20 \\div 40 = 0.50\\ \\text{cm}^3\\text{/s}}'] },
      ],
      lines: [
        { say: 'Marble chips react with dilute hydrochloric acid, and the carbon dioxide is collected in a gas syringe. The table shows the total volume collected every 20 seconds.', show: ['tb', 'd.grid', 'd.axes', 'd.first', 'd.mid', 'd.late', ...allDots] },
        { say: 'In the first 20 seconds, 34 cubic centimetres is made. The mean rate is 34 divided by 20, which is 1.70 cubic centimetres per second.', show: 'm.0', focus: ['m.0', 'd.first'] },
        { say: 'Now from 40 to 80 seconds. The table gives totals, so the volume made is 76 minus 56, or 20 cubic centimetres, in 80 minus 40, or 40 seconds.', show: ['m.1', 'm.2'], focus: ['m.1', 'm.2', 'd.late'] },
        { say: 'The mean rate is 20 divided by 40, which is 0.50 cubic centimetres per second.', show: 'm.3', focus: ['m.3', 'd.late'] },
        { say: 'The rate falls from 1.70 to 0.50 as the acid and the marble are used up. On the graph, the line gets less steep.', focus: ['d.first', 'd.late'] },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q',
          prompt: 'Zinc reacts with dilute acid, and hydrogen is collected. The total volume is $72\\ \\text{cm}^3$ at $60\\ \\text{s}$ and $93\\ \\text{cm}^3$ at $120\\ \\text{s}$. What is the mean rate between $60\\ \\text{s}$ and $120\\ \\text{s}$?',
          choices: ['$0.35\\ \\text{cm}^3\\text{/s}$', '$0.78\\ \\text{cm}^3\\text{/s}$', '$1.55\\ \\text{cm}^3\\text{/s}$', '$1.2\\ \\text{cm}^3\\text{/s}$'],
          answer: 0,
          working: 'Volume made: $93 - 72 = 21\\ \\text{cm}^3$ in $120 - 60 = 60\\ \\text{s}$. Mean rate $= 21 \\div 60 = 0.35\\ \\text{cm}^3\\text{/s}$.',
        },
      ],
      lines: [
        { say: 'Your turn. Zinc reacts with dilute acid, and hydrogen is collected. The total volume is 72 cubic centimetres at 60 seconds, and 93 cubic centimetres at 120 seconds. What is the mean rate between 60 and 120 seconds? Pause the video and try it.', show: 'q', wait: 6 },
        { say: 'The answer is A. The volume made is 93 minus 72, or 21 cubic centimetres, in 60 seconds, and 21 divided by 60 is 0.35 cubic centimetres per second. Choice B divides the total, 93, by 120: that is the mean rate since the start.', show: 'q.answer' },
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
            'A reaction is **fastest at the start** and slows as the reactants are used up.',
            'A graph of gas volume against time is steepest at first, then **levels off**.',
            'From a table of totals: mean rate $=$ (later total $-$ earlier total) $\\div$ time between.',
          ],
        },
      ],
      lines: [
        { say: 'Let’s sum up. A reaction is fastest at the start, and slows down as the reactants are used up.', show: 'sum.0' },
        { say: 'So a graph of gas volume against time is steepest at first, then levels off when a reactant runs out.', show: 'sum.1' },
        { say: 'From a table of totals, subtract to find the amount made, then divide by the time between. In part three, you will see why rates change, with collision theory. See you there!', show: 'sum.2' },
      ],
    },
  ],
};

export default video;
