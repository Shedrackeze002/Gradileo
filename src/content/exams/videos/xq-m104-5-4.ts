import { dots, plane, polyline } from '@/video/graph.ts';
import type { Explainer } from '@/video/script.ts';
import { figure } from '@/video/solids.ts';

// Exam question for Math 10-4 lesson 5.4 (graphs of relationships). The free OpenStax books have no
// short "read a pay graph" question at this level, so this one is written by Gradileo in the style
// of a Grade 10 workplace mathematics unit test, with the line's points stated in the question.
// The line through (0, 0) and (8, 120) is pay = 15 × hours, so 6 hours pays 15 × 6 = $90.
// Check: from (8, 120), 2 hours fewer is 2 × 15 = $30 less, and 120 − 30 = 90.

const g = plane({ x: [0, 10], y: [0, 150], xStep: 1, yStep: 15, every: 2, width: 9, height: 7, titles: { x: '\\text{hours worked}', y: '\\text{pay (\\$)}' } });
const graph = (height = 460) =>
  figure(
    'g',
    [
      g,
      polyline(g, { id: 'pay', points: [[0, 0], [10, 150]], tone: 'adj' }),
      polyline(g, { id: 'up', points: [[6, 0], [6, 90]], tone: 'theta', dashed: true }),
      polyline(g, { id: 'across', points: [[6, 90], [0, 90]], tone: 'theta', dashed: true }),
      dots(g, [
        { id: 'known', x: 8, y: 120, tex: '(8, 120)', tone: 'opp', place: 'above left' },
        { id: 'ans', x: 6, y: 90, tex: '(6, 90)', tone: 'good', place: 'below right' },
      ]),
    ],
    height,
  );

const QUESTION =
  'The graph shows how much Sam earns, in dollars, for the hours he works. The line goes through the points (0, 0) and (8, 120). How much does Sam earn for 6 hours of work?';

const video: Explainer = {
  id: 'xq-m104-5-4',
  lessonId: '',
  exam: {
    lesson: 'm104-5-4',
    source: 'Exam-style question written by Gradileo, in the style of a Grade 10 workplace mathematics unit test',
    licence: 'Written by Gradileo',
    question: QUESTION,
  },
  title: 'Exam Question: Reading Pay from a Graph (Graphs of Relationships)',
  thumbnailTitle: 'Reading Pay from a Graph',
  thumbnail: 'g',
  summary:
    'An exam-style question, solved one small step at a time: a graph shows how much Sam earns for the hours he works, and its line goes through (0, 0) and (8, 120). How much does Sam earn for 6 hours? We read the graph by going up from 6 hours to the line and across to the pay axis: $90. Then we check with the pay for one hour, $15, and look at the traps.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Exam Question', title: 'Reading Pay from a Graph', subtitle: 'Graphs of relationships, step by step' }],
      lines: [
        { say: 'In this video, we solve a test-style question about reading a graph. We will take it one small step at a time, so that every step makes sense.', show: 'title' },
        { say: 'Gradileo wrote this question in the style of a Grade 10 workplace maths test. You will see that at the bottom of the screen the whole way through.' },
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
          prompt: 'The graph shows how much Sam earns, in dollars, for the hours he works. The line goes through the points $(0, 0)$ and $(8, 120)$. How much does Sam earn for $6$ hours of work?',
          answer: '\\$90',
          working: 'up from $6$ to the line, across to $90$',
        },
      ],
      lines: [
        { say: 'Here is the question.', show: 'q' },
        { say: 'The graph shows how much Sam earns, in dollars, for the hours he works. The line goes through the points 0, 0 and 8, 120. How much does Sam earn for 6 hours of work?' },
        { say: 'If you would like to try it first, pause the video now.', wait: 5 },
      ],
    },
    {
      chapter: 'What is it asking?',
      layout: 'center',
      main: [graph(), { kind: 'text', id: 't', size: 'md', md: 'Hours go **across**. Pay goes **up**.' }],
      lines: [
        { say: 'The hours Sam works go along the bottom, and his pay goes up the side.', show: ['g.grid', 'g.axes'] },
        { say: 'The line shows the pay for every number of hours. It goes through 8 hours and 120 dollars.', show: ['g.pay', 'g.known'] },
        { say: 'So we need the point on the line above 6 hours. Hours go across, and pay goes up.', show: 't' },
      ],
    },
    {
      chapter: 'What you need to know',
      layout: 'center',
      main: [
        { kind: 'math', id: 'f', size: 'lg', lines: ['(x, y) = (\\text{hours}, \\text{pay})'] },
        { kind: 'callout', id: 'c', tone: 'key', title: 'Up, then across', md: 'Find the hours on the **bottom** axis. Go **up** to the line. Then go **across** to the side axis and read the pay.' },
      ],
      lines: [
        { say: 'Here is what we need. Each point on the line is a pair: hours first, then pay.', show: 'f' },
        { say: 'To read the graph, find the hours on the bottom axis, go up to the line, then go across to the side and read the pay.', show: 'c' },
      ],
    },
    {
      chapter: 'The plan',
      layout: 'center',
      main: [{ kind: 'bullets', id: 'plan', items: ['Find **6 hours** on the bottom', 'Go **up** to the line', 'Go **across** and read the pay'] }],
      lines: [
        { say: 'Here is the plan. Find 6 hours on the bottom axis.', show: 'plan.0' },
        { say: 'Go up to the line.', show: 'plan.1' },
        { say: 'Then go across, and read the pay.', show: 'plan.2' },
      ],
    },
    {
      chapter: 'Step 1: Up from 6 hours',
      layout: 'center',
      main: [graph()],
      lines: [
        { say: 'Step one. Find 6 on the hours axis, and go straight up until you meet the line.', show: ['g.grid', 'g.axes', 'g.pay', 'g.known', 'g.up'] },
      ],
    },
    {
      chapter: 'Step 2: Across to the pay',
      layout: 'center',
      main: [graph(400), { kind: 'math', id: 'm', size: 'md', lines: ['6 \\text{ hours} \\to \\good{\\$90}'] }],
      lines: [
        { say: 'Step two. From that point, go straight across to the pay axis. It meets the side at 90.', show: ['g.grid', 'g.axes', 'g.pay', 'g.known', 'g.up', 'g.across', 'g.ans'] },
        { say: 'So Sam earns 90 dollars for 6 hours of work.', show: 'm', focus: 'm' },
      ],
    },
    {
      chapter: 'Check the answer',
      layout: 'center',
      main: [{ kind: 'math', id: 'm', size: 'lg', lines: ['\\$120 \\div 8 = \\$15 \\text{ per hour}', '\\$15 \\times 6 = \\$90 \\ \\checkmark'] }],
      lines: [
        { say: 'Let us check with arithmetic. 8 hours pays 120 dollars, so one hour pays 120 divided by 8, which is 15 dollars.', show: 'm.0' },
        { say: '6 hours pays 6 times 15, which is 90 dollars. It checks out.', show: 'm.1', focus: 'm.1' },
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
            ['\\$120', 'that is the pay for **8** hours, not 6'],
            ['\\$15', 'that is the pay for **one** hour'],
            ['\\$60', 'went up from **4**: read the hour numbers carefully'],
          ],
        },
      ],
      lines: [
        { say: 'Here are the traps.', show: 'traps' },
        { say: '120 dollars is the point we were given. It is the pay for 8 hours, not 6.' },
        { say: '15 dollars is the pay for one hour. The question asks about 6 hours.' },
        { say: 'And 60 dollars comes from going up at 4 hours. The axis is numbered every 2 hours, so count the lines carefully.' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q2',
          prompt: 'A graph shows the fuel a truck uses, in litres, for the distance it drives, in kilometres. Its line goes through $(0, 0)$ and $(100, 8)$. How much fuel does the truck use for $250$ km?',
          choices: ['$25$ L', '$2$ L', '$20$ L', '$16$ L'],
          answer: 2,
          working: '$8 \\div 100 = 0.08$ L per km, and $0.08 \\times 250 = 20$ L.',
        },
      ],
      lines: [
        { say: 'Your turn. A graph shows the fuel a truck uses, in litres, for the distance it drives, in kilometres. Its line goes through 0, 0 and 100, 8. How much fuel does the truck use for 250 kilometres? Pause the video and try it.', show: 'q2', wait: 8 },
        { say: '100 kilometres uses 8 litres, so 250 kilometres, two and a half times as far, uses two and a half times as much: 20 litres. Choice "C".', show: 'q2.answer' },
      ],
    },
    {
      chapter: 'Summary',
      layout: 'center',
      main: [{ kind: 'bullets', id: 'sum', check: true, items: ['Each point is **(across, up)**', 'Find the value on the **bottom** axis', 'Go **up** to the line, then **across**', 'Check with the **rate** per unit'] }],
      lines: [
        { say: 'Here is what to remember. Each point on a graph is a pair: across first, then up.', show: 'sum.0' },
        { say: 'Find the value you know on the bottom axis.', show: 'sum.1' },
        { say: 'Go up to the line, then across, and read the answer.', show: 'sum.2' },
        { say: 'And check with the rate for one unit. For more on graphs of relationships, watch this lesson\'s explainer video on Gradileo.', show: 'sum.3' },
      ],
    },
  ],
};

export default video;
