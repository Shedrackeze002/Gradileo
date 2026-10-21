import type { Explainer } from '@/video/script.ts';
import { figure } from '@/video/solids.ts';
import { barGraph, circleGraph } from '@/video/charts.ts';
import { lineGraph, lineIds } from './lib/m8-10-figures.ts';

// (a) How Kai spends the 24 hours of a school day: 9 + 7 + 3 + 5 = 24 hours.
const day = (id: string) =>
  figure(
    id,
    [
      circleGraph({
        slices: [
          { label: 'Sleep 9 h', value: 9 },
          { label: 'School 7 h', value: 7 },
          { label: 'Play 3 h', value: 3 },
          { label: 'Other 5 h', value: 5 },
        ],
        namesOnly: true,
        r: 2.6,
      }),
    ],
    460,
  );

// (b) Goals scored by each player on a hockey team.
const PLAYERS = ['Ava', 'Ben', 'Cara', 'Dev'];
const goals = (id: string) => figure(id, [barGraph({ categories: PLAYERS, values: [5, 3, 7, 2], max: 8, step: 2, height: 4.5, titles: { y: 'Goals' } })], 480);

// (c) A puppy's mass each week for 12 weeks.
const MASS: [number, number][] = [2, 2.5, 3.1, 3.6, 4.2, 4.7, 5.1, 5.6, 6, 6.3, 6.6, 6.9].map((m, i) => [i + 1, m]);
const puppy = (id: string) =>
  figure(id, [lineGraph({ x: [0, 12], y: [0, 8], xStep: 2, yStep: 2, points: MASS, width: 10, height: 6.5, titles: { x: '\\text{Week}', y: '\\text{Mass (kg)}' } })], 480);

const video: Explainer = {
  id: 'm8-10-1-b',
  lessonId: 'm8-10-1',
  title: 'Critiquing Graphs, Part 2: Choosing a Graph',
  thumbnailTitle: 'Choosing a Graph',
  thumbnail: 'pp',
  summary:
    'Three questions point to the best graph: is the data a change over time (a line graph), parts of one whole (a circle graph), or separate categories (a bar graph, or a pictograph when the counts are simple)? How Kai spends the 24 hours of a school day suits a circle graph, the goals each player scored a bar graph, and a puppy’s mass each week for 12 weeks a line graph.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Data Analysis and Probability · Part 2', title: 'Choosing a Graph', subtitle: 'Match the graph to the data' }],
      lines: [
        { say: 'You have met four kinds of graphs. But which one should you use? That depends on the data.', show: 'title' },
        { say: 'In this video, you will ask three questions that point you to the best graph.' },
      ],
    },
    {
      chapter: 'Three questions',
      layout: 'center',
      main: [
        { kind: 'callout', id: 'tip', tone: 'tip', title: 'Ask three questions', md: 'Look at the data, and ask what kind it is.' },
        {
          kind: 'bullets',
          id: 'b',
          items: [
            'Is it a **change over time**? Use a **line graph**.',
            'Is it **parts of one whole**? Use a **circle graph**.',
            'Is it **separate categories**? Use a **bar graph**, or a **pictograph** when the counts are simple and you want an eye-catching display.',
          ],
        },
      ],
      lines: [
        { say: 'Here are the three questions. Ask them about your data, one at a time.', show: 'tip' },
        { say: 'One: is the data a change over time? Then use a line graph.', show: 'b.0' },
        { say: 'Two: is it the parts of one whole? Then use a circle graph.', show: 'b.1' },
        { say: 'Three: is it separate categories? Then use a bar graph. A pictograph works for categories as well, when the counts are simple and you want an eye-catching display.', show: 'b.2' },
      ],
    },
    {
      chapter: 'Parts of a day',
      layout: 'split',
      leftWidth: 640,
      left: [day('dy')],
      right: [
        { kind: 'text', id: 'q', size: 'md', md: '(a) How Kai spends the $24$ hours of a school day.' },
        { kind: 'callout', id: 'a', tone: 'key', title: 'Circle graph', md: 'The hours are **parts of one whole** day.' },
      ],
      lines: [
        { say: 'Let’s try three sets of data. First: how Kai spends the twenty-four hours of a school day.', show: 'q' },
        { say: 'Is it a change over time? Not really. Is it the parts of one whole? Yes! Sleeping, school, play and everything else are parts of one whole day.', show: 'a' },
        { say: 'So a circle graph is best. Each part of the day gets a slice, and together the slices make the whole twenty-four hours.', show: ['dy.s0', 'dy.s1', 'dy.s2', 'dy.s3'], focus: 'dy' },
      ],
    },
    {
      chapter: 'Goals scored',
      layout: 'split',
      leftWidth: 620,
      left: [goals('gl')],
      right: [
        { kind: 'text', id: 'q', size: 'md', md: '(b) The number of goals each player on a hockey team scored.' },
        { kind: 'callout', id: 'a', tone: 'key', title: 'Bar graph', md: 'The players are **separate categories**.' },
      ],
      lines: [
        { say: 'Second: the number of goals each player on a hockey team scored.', show: 'q' },
        { say: 'This is not a change over time, and the goals are not parts of one whole that we care about. Each player is a separate category.', show: 'a' },
        { say: 'So a bar graph is best. One bar for each player makes it easy to compare them. Cara scored the most goals.', show: ['gl.scale', 'gl.b0', 'gl.b1', 'gl.b2', 'gl.b3'], focus: 'gl.b2' },
      ],
    },
    {
      chapter: 'A growing puppy',
      layout: 'split',
      leftWidth: 640,
      left: [puppy('pp')],
      right: [
        { kind: 'text', id: 'q', size: 'md', md: '(c) A puppy’s mass each week for $12$ weeks.' },
        { kind: 'callout', id: 'a', tone: 'key', title: 'Line graph', md: 'The mass **changes over time**.' },
      ],
      lines: [
        { say: 'Third: a puppy’s mass, measured each week for twelve weeks.', show: 'q' },
        { say: 'Is it a change over time? Yes! The puppy’s mass changes from week to week.', show: 'a' },
        { say: 'So a line graph is best. The line rises as the puppy grows, and you can see at a glance that it grows a little more slowly near the end.', show: lineIds('pp'), focus: 'pp.line' },
      ],
    },
    {
      chapter: 'The answers',
      layout: 'center',
      main: [
        {
          kind: 'table',
          id: 't',
          head: ['Data', 'Kind of data', 'Best graph'],
          rows: [
            ['(a) Kai’s $24$ hours', 'parts of one whole', 'circle graph'],
            ['(b) goals by player', 'separate categories', 'bar graph'],
            ['(c) puppy’s mass', 'change over time', 'line graph'],
          ],
        },
      ],
      lines: [
        { say: 'Here are the three answers together. Kai’s day is parts of one whole, so it suits a circle graph.', show: 't', focus: 't.0' },
        { say: 'The goals by player are separate categories, so they suit a bar graph.', focus: 't.1' },
        { say: 'And the puppy’s mass changes over time, so it suits a line graph.', focus: 't.2' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q',
          prompt: 'Which graph best shows the height of a sunflower, measured every week for ten weeks?',
          choices: ['a circle graph', 'a line graph', 'a pictograph', 'a bar graph'],
          answer: 1,
          working: 'The height **changes over time**, so a line graph is best.',
        },
      ],
      lines: [
        { say: 'Your turn. Which graph best shows the height of a sunflower, measured every week for ten weeks? Pause the video and try it.', show: 'q', wait: 6 },
        { say: 'The answer is B: a line graph, because the height changes over time. Choice A, a circle graph, is for the parts of one whole, and these heights are not parts of anything.', show: 'q.answer' },
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
          items: ['Change over time: use a **line graph**.', 'Parts of one whole: use a **circle graph**.', 'Separate categories: use a **bar graph**, or a **pictograph** for simple counts.'],
        },
      ],
      lines: [
        { say: 'Let’s sum up. If the data changes over time, use a line graph.', show: 'sum.0' },
        { say: 'If it is the parts of one whole, use a circle graph.', show: 'sum.1' },
        { say: 'And if it is separate categories, use a bar graph, or a pictograph for simple counts. In the next part, you will give reasons for a choice, and see when a graph will not work at all. See you there!', show: 'sum.2' },
      ],
    },
  ],
};

export default video;
