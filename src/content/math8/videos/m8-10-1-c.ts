import type { Explainer } from '@/video/script.ts';
import { figure } from '@/video/solids.ts';
import { barGraph } from '@/video/charts.ts';
import { lineGraph, lineIds } from './lib/m8-10-figures.ts';

// Ms. Lee's survey of 20 students, who could choose more than one activity: 12 + 7 + 6 = 25 answers.
const ACTS = ['Sports', 'Music', 'Art'];
const acts = (id: string) => figure(id, [barGraph({ categories: ACTS, values: [12, 7, 6], max: 14, step: 2, height: 4.5, titles: { y: 'Students' } })], 480);

// A line graph of favourite sports: the line from hockey to soccer to basketball means nothing.
const SPORTS = ['', 'Hockey', 'Soccer', 'Basketball', ''];
const sports = (id: string) =>
  figure(
    id,
    [
      lineGraph({
        x: [0, 4],
        y: [0, 12],
        xStep: 1,
        yStep: 2,
        points: [
          [1, 8],
          [2, 11],
          [3, 6],
        ],
        width: 11,
        height: 6,
        tone: 'bad',
        xTex: (x) => `\\text{${SPORTS[Math.round(x)] ?? ''}}`,
        // The sport names are the only labels along the bottom: a blank title keeps the plane from
        // naming the axis x.
        titles: { x: '\\,', y: '\\text{Students}' },
      }),
    ],
    460,
  );

const video: Explainer = {
  id: 'm8-10-1-c',
  lessonId: 'm8-10-1',
  title: 'Critiquing Graphs, Part 3: Giving Reasons',
  thumbnailTitle: 'Giving Reasons',
  thumbnail: 'sp',
  summary:
    'A good choice of graph comes with a reason that fits the data. Ms. Lee asked 20 students which after-school activities they do, and they could choose more than one: sports 12 (60%), music 7 (35%) and art 6 (30%) add to 125%, more than one whole, so a circle graph will not work; a bar graph will. A line graph of favourite sports joins hockey to soccer to basketball, but nothing lies between two sports, so the line has no meaning.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Data Analysis and Probability · Part 3', title: 'Giving Reasons', subtitle: 'When a graph will not work' }],
      lines: [
        { say: 'A good choice of graph comes with a reason that fits the data. And sometimes, a kind of graph cannot be used at all.', show: 'title' },
        { say: 'In this video, you will see when a circle graph will not work, and when a line graph has no meaning.' },
      ],
    },
    {
      chapter: 'A survey',
      layout: 'center',
      main: [
        { kind: 'text', id: 'q', size: 'md', md: 'Ms. Lee asked $20$ students which after-school activities they do. Students could choose **more than one**. Can she use a circle graph?' },
        { kind: 'table', id: 't', head: ['Activity', 'Students'], rows: [['Sports', '$12$'], ['Music', '$7$'], ['Art', '$6$']] },
      ],
      lines: [
        { say: 'Ms. Lee asked twenty students which after-school activities they do. Students could choose more than one activity.', show: 'q' },
        { say: 'Twelve students do sports, seven do music, and six do art.', show: 't' },
        { say: 'Can Ms. Lee show this data in a circle graph? Let’s find out.' },
      ],
    },
    {
      chapter: 'Finding the percents',
      layout: 'center',
      main: [
        { kind: 'math', id: 'm', size: 'lg', lines: ['\\text{Sports: } 12 \\div 20 = 60\\%', '\\text{Music: } 7 \\div 20 = 35\\%', '\\text{Art: } 6 \\div 20 = 30\\%', '\\text{Total: } 60\\% + 35\\% + 30\\% = \\bad{125\\%}'] },
      ],
      lines: [
        { say: 'A circle graph shows the percents of one whole, so find each percent. Sports: twelve out of twenty is sixty percent.', show: 'm.0', focus: 'm.0' },
        { say: 'Music: seven out of twenty is thirty-five percent. Art: six out of twenty is thirty percent.', show: ['m.1', 'm.2'], focus: ['m.1', 'm.2'] },
        { say: 'Now add them: sixty plus thirty-five plus thirty is one hundred twenty-five percent!', show: 'm.3', focus: 'm.3' },
      ],
    },
    {
      chapter: 'Why not a circle graph?',
      layout: 'split',
      leftWidth: 560,
      left: [acts('ac')],
      right: [
        {
          kind: 'callout',
          id: 'key',
          tone: 'key',
          title: 'More than one whole',
          md: 'The percents add to **more than** $100\\%$, because students could choose more than one activity. A circle graph needs parts of **one whole**. A **bar graph** works instead.',
        },
      ],
      lines: [
        { say: 'One hundred twenty-five percent is more than the whole circle. It happened because some students chose more than one activity, so they were counted more than once.', show: 'key' },
        { say: 'A circle graph needs the parts of one whole, adding up to exactly one hundred percent. This data does not, so a circle graph will not work.' },
        { say: 'A bar graph works instead. Each activity is a separate category, and the bars compare the counts: twelve, seven and six.', show: ['ac.scale', 'ac.b0', 'ac.b1', 'ac.b2'], focus: ['ac.b0', 'ac.b1', 'ac.b2'] },
      ],
    },
    {
      chapter: 'Watch out',
      layout: 'split',
      leftWidth: 640,
      left: [sports('sp')],
      right: [
        { kind: 'callout', id: 'oops', tone: 'mistake', title: 'A line between categories', md: 'There is nothing **between** two sports, so the line has no meaning. Use a line graph only when the data **changes over time**.' },
      ],
      lines: [
        { say: 'Watch out for a line between categories. This line graph shows the favourite sports of a class. The line joins hockey to soccer to basketball.', show: lineIds('sp') },
        { say: 'But what would a point halfway between hockey and soccer mean? Nothing! There is no sport between them, so the line has no meaning.', show: 'oops', focus: 'sp.line-0' },
        { say: 'Use a line graph only when the data changes over time, because then there really is a time between two points. For favourite sports, a bar graph is the right choice.' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q',
          prompt: 'A class records each student’s favourite colour. Why is a **line graph** a poor choice for this data?',
          choices: ['There are too many colours.', 'Colours are numbers.', 'A line graph cannot show counts.', 'There is nothing between two colours, so the line has no meaning.'],
          answer: 3,
          working: 'The colours are separate categories, not times. A line joining them has no meaning, so a bar graph is a better choice.',
        },
      ],
      lines: [
        { say: 'Your turn. A class records each student’s favourite colour. Why is a line graph a poor choice for this data? Pause the video and try it.', show: 'q', wait: 6 },
        { say: 'The answer is D. There is nothing between two colours, so a line joining them has no meaning. Choice C is wrong: a line graph can show counts, as long as they change over time.', show: 'q.answer' },
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
          items: ['Give a reason that fits the data for every choice of graph.', 'A circle graph works only when the parts add to exactly $100\\%$.', 'A line graph is only for change over time, never for separate categories.'],
        },
      ],
      lines: [
        { say: 'Let’s sum up. Every choice of graph needs a reason that fits the data.', show: 'sum.0' },
        { say: 'A circle graph works only when the parts add up to exactly one hundred percent.', show: 'sum.1' },
        { say: 'And a line graph is only for change over time, never for separate categories. In the next part, you will see how a graph with all the right numbers can still mislead you. See you there!', show: 'sum.2' },
      ],
    },
  ],
};

export default video;
