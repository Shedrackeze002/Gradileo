import type { Explainer } from '@/video/script.ts';
import { figure } from '@/video/solids.ts';
import { barIds, bars, lineGraph, lineIds } from './lib/m8-10-figures.ts';

// A club's members in 2000, 2010, 2020, 2022 and 2024: 70, 80, 90, 104 and 120. The bars are evenly
// spaced, but the first gaps are 10 years and the last gaps only 2 years.
const YEARS = ['2000', '2010', '2020', '2022', '2024'];
const CLUB = [70, 80, 90, 104, 120];
const club = (id: string) => figure(id, [bars({ categories: YEARS, values: CLUB, max: 120, step: 20, titles: { y: 'Members' } })], 500);
// The same data with time drawn to scale: slow growth for 20 years, then a steep climb.
const toScale = (id: string) =>
  figure(
    id,
    [
      lineGraph({
        x: [2000, 2024],
        y: [0, 120],
        xStep: 4,
        yStep: 20,
        points: YEARS.map((y, i) => [Number(y), CLUB[i]]),
        width: 11,
        height: 6.5,
        titles: { x: '\\text{Year}', y: '\\text{Members}' },
      }),
    ],
    500,
  );

// Tickets sold in four weeks: 10, 20, 50 and 100. On an uneven scale (0, 10, 20, 50, 100, equally
// spaced) the bars rise by the same amount each week; on an even scale the jumps show.
const WEEKS = ['1', '2', '3', '4'];
const TICKETS = [10, 20, 50, 100];
const uneven = (id: string) => figure(id, [bars({ categories: WEEKS, values: TICKETS, max: 100, step: 10, numbers: [0, 10, 20, 50, 100], tone: 'opp', titles: { x: 'Week', y: 'Tickets sold' } })], 500);
const even = (id: string) => figure(id, [bars({ categories: WEEKS, values: TICKETS, max: 100, step: 20, tone: 'opp', titles: { x: 'Week', y: 'Tickets sold' } })], 500);

const video: Explainer = {
  id: 'm8-10-1-e',
  lessonId: 'm8-10-1',
  title: 'Critiquing Graphs, Part 5: Unequal Intervals and Uneven Scales',
  thumbnailTitle: 'Unequal Steps',
  thumbnail: 'cl',
  summary:
    'The steps on each axis of a graph must be equal. A bar graph of a club’s members in 2000, 2010, 2020, 2022 and 2024 spaces the bars evenly, though the first gaps are 10 years and the last only 2, so you cannot see how fast the club grew; with time to scale, it grew slowly for 20 years and then climbed steeply. A vertical axis numbered 0, 10, 20, 50, 100 is an uneven scale: tickets sold of 10, 20, 50 and 100 look like steady growth, though sales at least doubled every week.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Data Analysis and Probability · Part 5', title: 'Unequal Intervals and Uneven Scales', subtitle: 'Equal steps on every axis' }],
      lines: [
        { say: 'The numbers along each axis of a graph should go up in equal steps. When they do not, the shape of the graph can fool you.', show: 'title' },
        { say: 'In this video, you will spot two tricks: unequal intervals of time, and an uneven scale.' },
      ],
    },
    {
      chapter: 'Unequal intervals',
      layout: 'split',
      leftWidth: 620,
      left: [club('cl')],
      right: [{ kind: 'callout', id: 'oops', tone: 'mistake', title: 'Unequal intervals', md: 'The first gaps are $10$ years, and the last gaps are only $2$ years, but the bars are spaced **evenly**.' }],
      lines: [
        { say: 'This bar graph shows the members of a club. Read the years along the bottom: two thousand, twenty ten, twenty twenty, twenty twenty-two and twenty twenty-four.', show: barIds('cl', 5) },
        { say: 'An interval is the gap between two of those years. The first intervals are ten years long. The last intervals are only two years long. But all the bars are the same distance apart.', show: 'oops', focus: ['cl.b3', 'cl.b4'] },
        { say: 'So the graph makes two years look the same as ten years. In each of the first two intervals, the club grew by ten members in ten years. At the end, it grew by fourteen members, and then by sixteen, in just two years each.' },
        { say: 'You cannot see how fast the club really grew, because the time steps are not equal.' },
      ],
    },
    {
      chapter: 'Time drawn to scale',
      layout: 'split',
      leftWidth: 660,
      left: [toScale('ts')],
      right: [{ kind: 'text', id: 't', size: 'md', md: 'With **equal** time steps, the real story shows: slow growth for $20$ years, then a steep climb.' }],
      lines: [
        { say: 'Here is the same data as a line graph, with time drawn to scale. Every four years takes up the same distance along the bottom.', show: lineIds('ts') },
        { say: 'Now you can see the real story. For twenty years, the club grew slowly. Then, in the last four years, it shot up steeply.', show: 't', focus: ['ts.line-2', 'ts.line-3'] },
      ],
    },
    {
      chapter: 'An uneven scale',
      layout: 'split',
      leftWidth: 600,
      left: [uneven('un')],
      right: [{ kind: 'callout', id: 'oops', tone: 'mistake', title: 'An uneven scale', md: 'The numbers go up by $10$, $10$, $30$ and $50$, but the gaps **look** equal. The numbers on an axis must go up by **equal steps**.' }],
      lines: [
        { say: 'Now look at the vertical axis of this graph of tickets sold. The numbers go zero, ten, twenty, fifty, one hundred.', show: barIds('un', 4), focus: 'un.scale' },
        { say: 'The gaps between the numbers look the same, but the steps are ten, ten, thirty and fifty. That is an uneven scale.', show: 'oops' },
        { say: 'On this scale, the bars seem to grow by the same amount each week. But the sales really jumped: from twenty to fifty, and then all the way to one hundred.', focus: ['un.b1', 'un.b2', 'un.b3'] },
      ],
    },
    {
      chapter: 'An even scale',
      layout: 'split',
      leftWidth: 600,
      left: [even('ev')],
      right: [{ kind: 'text', id: 't', size: 'md', md: 'An even scale goes up by **equal steps**, such as $0, 20, 40, 60$. Now the real jumps show.' }],
      lines: [
        { say: 'Here is the same data on an even scale, going up by twenty each time. That is what equal steps look like.', show: [...barIds('ev', 4), 't'], focus: 'ev.scale' },
        { say: 'Now the real growth is easy to see. Every week, the sales at least doubled, and the last bar towers over the others.', focus: ['ev.b2', 'ev.b3'] },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q',
          prompt: 'The numbers on the vertical axis of a graph are $0$, $5$, $10$, $20$ and $40$, equally spaced. What is wrong with the graph?',
          choices: ['The axis starts at $0$.', 'It has too many numbers.', 'The steps are not equal, so the scale is uneven.', 'Nothing is wrong.'],
          answer: 2,
          working: 'The steps are $5$, $5$, $10$ and $20$, but they are drawn the same size. The numbers on an axis must go up by equal steps.',
        },
      ],
      lines: [
        { say: 'Your turn. The numbers on the vertical axis of a graph are zero, five, ten, twenty and forty, equally spaced. What is wrong with the graph? Pause the video and try it.', show: 'q', wait: 6 },
        { say: 'The answer is C. The steps are five, five, ten and twenty, so the scale is uneven. Choice A is wrong: starting at zero is exactly what a fair axis should do.', show: 'q.answer' },
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
          items: ['Intervals of time must be equal, or drawn to scale.', 'The numbers on an axis must go up by equal steps.', 'Unequal steps change the shape of a graph and hide the real story.'],
        },
      ],
      lines: [
        { say: 'Let’s sum up. The intervals of time along an axis must be equal, or drawn to scale.', show: 'sum.0' },
        { say: 'The numbers on an axis must go up by equal steps.', show: 'sum.1' },
        { say: 'Unequal steps change the shape of a graph, and hide the real story. In the next part, you will check pictographs and circle graphs. See you there!', show: 'sum.2' },
      ],
    },
  ],
};

export default video;
