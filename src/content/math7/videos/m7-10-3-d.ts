import type { Explainer } from '@/video/script.ts';
import { figure } from '@/video/solids.ts';
import { pieAngles } from './lib/m7-10-figures.ts';

// 24 students' favourite winter activities: skating 9, skiing 6, tobogganing 5, snowboarding 4.
// The sectors are drawn from the counts (135°, 90°, 75°, 60°); the labels give the rounded percents.
const SLICES = [
  { label: 'Skating 37.5\\%', value: 9 },
  { label: 'Skiing 25\\%', value: 6 },
  { label: 'Tobogganing 20.8\\%', value: 5 },
  { label: 'Snowboarding 16.7\\%', value: 4 },
];
const graph = (id: string) => figure(id, [pieAngles({ slices: SLICES, namesOnly: true, angles: ['135^\\circ', '90^\\circ', '75^\\circ', '60^\\circ'], arc: 34, dist: 95, pad: 2.9 })], 540);
const sectors = (id: string) => SLICES.map((_, i) => `${id}.s${i}`);

const video: Explainer = {
  id: 'm7-10-3-d',
  lessonId: 'm7-10-3',
  title: 'Circle Graphs, Part 4: Making a Circle Graph',
  thumbnailTitle: 'Making a Circle Graph',
  thumbnail: 'dr',
  summary:
    'To make a circle graph: find the total, find each category’s percent of the total, find each central angle (percent × 360°, to the nearest degree), draw the angles with a protractor, then label the sectors and add a title. For 24 students choosing skating 9, skiing 6, tobogganing 5 and snowboarding 4, the percents are 37.5%, 25%, about 20.8% and about 16.7%, and the angles are 135°, 90°, 75° and 60°. Find each angle from the fraction, not from a rounded percent.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Data Analysis · Part 4', title: 'Making a Circle Graph', subtitle: 'From a survey to a graph' }],
      lines: [
        { say: 'You have asked your class a question, and counted the answers. How do you turn those counts into a circle graph?', show: 'title' },
        { say: 'In this video, you will make a circle graph step by step, from a survey.' },
      ],
    },
    {
      chapter: 'Five steps',
      layout: 'center',
      main: [
        {
          kind: 'bullets',
          id: 'steps',
          items: [
            'Find the total.',
            'Find each category’s percent of the total.',
            'Find each central angle: percent $\\times 360^\\circ$, to the nearest degree.',
            'Draw a circle and a radius. Use a protractor to draw each angle, one after another.',
            'Label each sector or make a legend, and give the graph a title.',
          ],
        },
      ],
      lines: [
        { say: 'Here are the five steps. First, find the total. Second, find each category’s percent of the total.', show: ['steps.0', 'steps.1'] },
        { say: 'Third, find each central angle: the percent times three hundred sixty degrees, rounded to the nearest degree.', show: 'steps.2' },
        { say: 'Fourth, draw a circle and one radius, a line from the centre to the edge. Use a protractor to draw each angle, one after another.', show: 'steps.3' },
        { say: 'And fifth, label each sector, or make a legend, and give the graph a title.', show: 'steps.4' },
      ],
    },
    {
      chapter: 'The percents',
      layout: 'center',
      main: [
        { kind: 'text', id: 'q', size: 'md', md: 'Arjun asked $24$ students for their favourite winter activity: skating $9$, skiing $6$, tobogganing $5$ and snowboarding $4$.' },
        {
          kind: 'table',
          id: 't',
          head: ['Activity', 'Students', 'Percent'],
          rows: [
            ['Skating', '$9$', '$9 \\div 24 = 0.375 = 37.5\\%$'],
            ['Skiing', '$6$', '$6 \\div 24 = 0.25 = 25\\%$'],
            ['Tobogganing', '$5$', '$5 \\div 24 \\approx 20.8\\%$'],
            ['Snowboarding', '$4$', '$4 \\div 24 \\approx 16.7\\%$'],
          ],
        },
      ],
      lines: [
        { say: 'Arjun asked twenty-four students for their favourite winter activity. Nine chose skating, six chose skiing, five chose tobogganing, and four chose snowboarding.', show: 'q' },
        { say: 'Step one: the total. Nine plus six plus five plus four is twenty-four students.' },
        { say: 'Step two: the percents. Skating is nine out of twenty-four. Nine divided by twenty-four is zero point three seven five, or thirty-seven point five percent.', show: 't.0', focus: 't.0' },
        { say: 'Skiing is six divided by twenty-four, which is twenty-five percent.', show: 't.1', focus: 't.1' },
        { say: 'Tobogganing is five divided by twenty-four, about twenty point eight percent. And snowboarding is four divided by twenty-four, about sixteen point seven percent.', show: ['t.2', 't.3'], focus: ['t.2', 't.3'] },
      ],
    },
    {
      chapter: 'The central angles',
      layout: 'center',
      main: [
        {
          kind: 'math',
          id: 'm',
          size: 'md',
          lines: ['\\text{Skating: } 0.375 \\times 360^\\circ = 135^\\circ', '\\text{Skiing: } 0.25 \\times 360^\\circ = 90^\\circ', '\\text{Tobogganing: } 5 \\div 24 \\times 360^\\circ = 75^\\circ', '\\text{Snowboarding: } 4 \\div 24 \\times 360^\\circ = 60^\\circ', '135^\\circ + 90^\\circ + 75^\\circ + 60^\\circ = 360^\\circ \\ \\checkmark'],
        },
      ],
      lines: [
        { say: 'Step three: the central angles. Skating: zero point three seven five times three hundred sixty degrees is one hundred thirty-five degrees.', show: 'm.0', focus: 'm.0' },
        { say: 'Skiing: zero point two five times three hundred sixty degrees is ninety degrees.', show: 'm.1', focus: 'm.1' },
        { say: 'For tobogganing, use the fraction, not the rounded percent. Five divided by twenty-four, times three hundred sixty degrees, is exactly seventy-five degrees. Snowboarding is four divided by twenty-four, times three hundred sixty degrees, which is sixty degrees.', show: ['m.2', 'm.3'], focus: ['m.2', 'm.3'] },
        { say: 'Check: one hundred thirty-five plus ninety plus seventy-five plus sixty is three hundred sixty degrees.', show: 'm.4', focus: 'm.4' },
      ],
    },
    {
      chapter: 'Drawing the graph',
      layout: 'center',
      main: [{ kind: 'text', id: 't', size: 'md', md: '**Favourite winter activities**' }, graph('dr')],
      lines: [
        { say: 'Step four: draw a circle and a radius. Put the centre of the protractor on the centre of the circle, and line it up with the radius. Draw an angle of one hundred thirty-five degrees for skating.', show: ['dr.s0', 'dr.a0'], focus: 'dr.a0' },
        { say: 'Then start from the new line, and draw ninety degrees for skiing.', show: ['dr.s1', 'dr.a1'], focus: 'dr.a1' },
        { say: 'Next, seventy-five degrees for tobogganing. The sixty degrees left over is snowboarding, which is a good check.', show: ['dr.s2', 'dr.a2', 'dr.s3', 'dr.a3'], focus: ['dr.a2', 'dr.a3'] },
        { say: 'Step five: label each sector with its activity and percent, and give the graph a title: favourite winter activities.', show: 't', focus: sectors('dr') },
      ],
    },
    {
      chapter: 'Watch out',
      layout: 'center',
      main: [
        { kind: 'callout', id: 'oops', tone: 'mistake', title: 'Rounding too early', md: 'Find each angle from the **fraction** (like $5 \\div 24$), not from a rounded percent. Then check that the percents add to about $100\\%$ and the angles add to $360^\\circ$.' },
        { kind: 'math', id: 'm', size: 'md', lines: ['\\bad{21\\% \\times 360^\\circ = 75.6^\\circ \\approx 76^\\circ}', '\\good{5 \\div 24 \\times 360^\\circ = 75^\\circ}'] },
      ],
      lines: [
        { say: 'Watch out. If you round the percent first, your angles can drift. Rounding twenty point eight percent to twenty-one percent gives seventy-five point six degrees, which rounds to seventy-six degrees.', show: ['oops', 'm.0'], focus: 'm.0' },
        { say: 'Working from the fraction, five divided by twenty-four, gives exactly seventy-five degrees. So find each angle from the fraction.', show: 'm.1', focus: 'm.1' },
        { say: 'Then check your work. The percents should add to about one hundred percent, and the angles should add to three hundred sixty degrees.' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q',
          prompt: 'In a survey of $40$ students, $14$ chose reading as their favourite hobby. What central angle should the reading sector have?',
          choices: ['$126^\\circ$', '$14^\\circ$', '$35^\\circ$', '$140^\\circ$'],
          answer: 0,
          working: '$14 \\div 40 = 0.35 = 35\\%$, and $0.35 \\times 360^\\circ = 126^\\circ$.',
        },
      ],
      lines: [
        { say: 'Your turn. In a survey of forty students, fourteen chose reading as their favourite hobby. What central angle should the reading sector have? Pause the video and try it.', show: 'q', wait: 8 },
        { say: 'The answer is A: one hundred twenty-six degrees. Fourteen divided by forty is zero point three five, or thirty-five percent, and zero point three five times three hundred sixty degrees is one hundred twenty-six degrees. Choice C is the percent, not the angle.', show: 'q.answer' },
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
          items: ['Find the total, then each percent, then each angle: percent $\\times 360^\\circ$.', 'Draw the angles with a protractor, then label the sectors and add a title.', 'Use the fractions, not rounded percents, and check that the angles add to $360^\\circ$.'],
        },
      ],
      lines: [
        { say: 'Let’s sum up. To make a circle graph, find the total, then each percent, then each central angle.', show: 'sum.0' },
        { say: 'Draw the angles with a protractor, label the sectors, and add a title.', show: 'sum.1' },
        { say: 'Find each angle from the fraction, and check that the angles add to three hundred sixty degrees. In the next lesson, you will start working with probability. See you there!', show: 'sum.2' },
      ],
    },
  ],
};

export default video;
