import type { Explainer } from '@/video/script.ts';
import { figure } from '@/video/solids.ts';
import { barGraph, circleGraph } from '@/video/charts.ts';
import { lineGraph, pictoIds, pictograph } from './lib/m8-10-figures.ts';

// A bar graph: the favourite fruit of a class.
const FRUIT = ['Apple', 'Grape', 'Pear', 'Mango'];
const fruit = (id: string) => figure(id, [barGraph({ categories: FRUIT, values: [8, 12, 6, 9], max: 14, step: 2, height: 4.5, titles: { y: 'Students' } })], 500);
const fruitIds = (id: string) => [`${id}.scale`, ...FRUIT.map((_, i) => `${id}.b${i}`)];

// A line graph: the temperature every two hours on a spring day, peaking at 17 °C at 14:00.
const TEMPS: [number, number][] = [
  [6, 4],
  [8, 6],
  [10, 10],
  [12, 14],
  [14, 17],
  [16, 16],
  [18, 12],
];
const temps = (id: string) =>
  figure(id, [lineGraph({ x: [6, 18], y: [0, 20], xStep: 2, yStep: 5, points: TEMPS, width: 10, height: 6.5, titles: { x: '\\text{Hour of the day}', y: '\\text{Temperature (°C)}' } })], 500);

// A circle graph: how the students of a school get there (45 + 30 + 20 + 5 = 100%).
const travel = (id: string) =>
  figure(id, [circleGraph({ slices: [{ label: 'Bus', value: 45 }, { label: 'Car', value: 30 }, { label: 'Walk', value: 20 }, { label: 'Bike', value: 5 }], percent: true, r: 2.6 })], 460);

// A pictograph: cans collected by three teams, each star standing for 10 cans.
const TEAMS = ['red', 'blue', 'green'];
const cans = (id: string) =>
  figure(
    id,
    [
      pictograph({
        rows: [
          { id: 'red', label: 'Red team', count: 4, tone: 'bad' },
          { id: 'blue', label: 'Blue team', count: 6, tone: 'adj' },
          { id: 'green', label: 'Green team', count: 3, tone: 'good' },
        ],
        key: '= 10 cans',
        keyTone: 'theta',
      }),
    ],
    420,
  );

const video: Explainer = {
  id: 'm8-10-1',
  lessonId: 'm8-10-1',
  title: 'Critiquing Graphs, Part 1: Four Kinds of Graphs',
  thumbnailTitle: 'Four Kinds of Graphs',
  thumbnail: 'pi',
  summary:
    'A bar graph uses bars to compare amounts in separate categories. A line graph joins points to show how one quantity changes over time, like the temperature rising to 17 °C at 14:00 and falling again. A circle graph shows how one whole is split into parts that add up to 100%. A pictograph uses symbols to compare counts, with a key that tells how many items each symbol stands for.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Data Analysis and Probability · Part 1', title: 'Four Kinds of Graphs', subtitle: 'Bar, line, circle and pictograph' }],
      lines: [
        { say: 'Graphs are everywhere: in ads, in news stories and in school reports. A good graph makes data easy to understand at a glance.', show: 'title' },
        { say: 'But a badly chosen or badly drawn graph can hide the truth, or even mislead you. In this lesson, you will learn to choose a graph, and to spot one that misleads. First, let’s meet four kinds of graphs.' },
      ],
    },
    {
      chapter: 'Bar graph',
      layout: 'split',
      leftWidth: 620,
      left: [fruit('br')],
      right: [{ kind: 'callout', id: 'def', tone: 'definition', title: 'Bar graph', md: 'A **bar graph** uses bars to compare amounts in separate **categories**.' }],
      lines: [
        { say: 'A bar graph uses bars to compare amounts in separate categories. A category is a group, like one kind of fruit.', show: [...fruitIds('br'), 'def'] },
        { say: 'Here, each bar shows how many students in a class chose one fruit as their favourite. The taller the bar, the more students chose it.', focus: ['br.b0', 'br.b1', 'br.b2', 'br.b3'] },
        { say: 'Read the height of a bar against the numbers up the side. Grape is the favourite, with twelve students.', show: ['br.r1', 'br.v1'], focus: ['br.b1', 'br.r1', 'br.v1'] },
      ],
    },
    {
      chapter: 'Line graph',
      layout: 'split',
      leftWidth: 660,
      left: [temps('ln')],
      right: [{ kind: 'callout', id: 'def', tone: 'definition', title: 'Line graph', md: 'A **line graph** joins points with line segments to show how one quantity **changes over time**.' }],
      lines: [
        { say: 'A line graph joins points with straight line segments. It shows how one quantity changes over time.', show: ['ln.grid', 'ln.axes', 'def'] },
        { say: 'This one shows the temperature every two hours on a spring day. The times are along the bottom, on a twenty-four hour clock, and the temperatures are up the side.', show: 'ln.pts', focus: 'ln.pts' },
        { say: 'Join the points, and the line shows the story. The temperature rises through the morning, reaches its peak of seventeen degrees at two in the afternoon, and then falls again.', show: 'ln.line', focus: ['ln.line', 'ln.p4'] },
      ],
    },
    {
      chapter: 'Circle graph',
      layout: 'split',
      leftWidth: 620,
      left: [travel('cg')],
      right: [{ kind: 'callout', id: 'def', tone: 'definition', title: 'Circle graph', md: 'A **circle graph** shows how one whole is split into parts. The parts add up to $100\\%$.' }],
      lines: [
        { say: 'A circle graph shows how one whole is split into parts. The whole circle stands for one hundred percent.', show: ['cg.s0', 'cg.s1', 'cg.s2', 'cg.s3', 'def'] },
        { say: 'This one shows how the students of a school get there. Forty-five percent take the bus, thirty percent come by car, twenty percent walk, and five percent ride a bike.', focus: ['cg.s0', 'cg.s1', 'cg.s2', 'cg.s3'] },
        { say: 'Add the parts: forty-five plus thirty plus twenty plus five is one hundred percent. The parts of a circle graph always add up to exactly one hundred percent.', focus: 'cg' },
      ],
    },
    {
      chapter: 'Pictograph',
      layout: 'split',
      leftWidth: 640,
      left: [cans('pi')],
      right: [{ kind: 'callout', id: 'def', tone: 'definition', title: 'Pictograph', md: 'A **pictograph** uses symbols to compare counts. A **key** tells how many items each symbol stands for.' }],
      lines: [
        { say: 'A pictograph uses symbols, or small pictures, to compare counts. A key tells you how many items each symbol stands for.', show: [...pictoIds('pi', TEAMS), 'def'] },
        { say: 'In this pictograph, the key says that each star stands for ten cans collected by a team.', focus: 'pi.key' },
        { say: 'The blue team has six stars, so it collected six times ten, which is sixty cans.', focus: 'pi.row-blue' },
        { say: 'The red team has four stars, for forty cans, and the green team has three stars, for thirty cans.', focus: ['pi.row-red', 'pi.row-green'] },
      ],
    },
    {
      chapter: 'Four graphs at a glance',
      layout: 'center',
      main: [
        {
          kind: 'table',
          id: 't',
          head: ['Graph', 'Best for'],
          rows: [
            ['bar graph', 'comparing amounts in separate categories'],
            ['line graph', 'showing how something changes over time'],
            ['circle graph', 'showing the parts of one whole ($100\\%$)'],
            ['pictograph', 'comparing counts with symbols and a key'],
          ],
        },
      ],
      lines: [
        { say: 'Here are all four at a glance. A bar graph compares amounts in separate categories.', show: 't', focus: 't.0' },
        { say: 'A line graph shows how something changes over time.', focus: 't.1' },
        { say: 'A circle graph shows the parts of one whole, adding up to one hundred percent.', focus: 't.2' },
        { say: 'And a pictograph compares counts with symbols and a key.', focus: 't.3' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q',
          prompt: 'Which kind of graph uses **symbols** and a **key** to compare counts?',
          choices: ['a bar graph', 'a line graph', 'a pictograph', 'a circle graph'],
          answer: 2,
          working: 'A pictograph uses symbols, and its key tells how many items each symbol stands for.',
        },
      ],
      lines: [
        { say: 'Your turn. Which kind of graph uses symbols and a key to compare counts? Pause the video and try it.', show: 'q', wait: 5 },
        { say: 'The answer is C: a pictograph. Its key tells how many items each symbol stands for. Choice D, a circle graph, shows the parts of one whole instead.', show: 'q.answer' },
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
          items: ['A **bar graph** compares amounts in separate categories.', 'A **line graph** shows change over time.', 'A **circle graph** shows the parts of one whole, adding to $100\\%$.', 'A **pictograph** compares counts with symbols and a key.'],
        },
      ],
      lines: [
        { say: 'Let’s sum up. A bar graph compares amounts in separate categories.', show: 'sum.0' },
        { say: 'Line graphs show change over time.', show: 'sum.1' },
        { say: 'A circle graph shows the parts of one whole, which add up to one hundred percent.', show: 'sum.2' },
        { say: 'And a pictograph compares counts with symbols and a key. In the next part, you will choose the best graph for a set of data. See you there!', show: 'sum.3' },
      ],
    },
  ],
};

export default video;
