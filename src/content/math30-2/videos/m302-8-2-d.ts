import type { Explainer } from '@/video/script.ts';
import { dots, plane, polyline } from '@/video/graph.ts';
import { numberLine } from '@/video/numbers.ts';
import { figure } from '@/video/solids.ts';
import { edgeNumbers, note, steps } from './lib/m302-7-graphs.ts';
import { pin } from './lib/m302-8-figures.ts';

/** A made-up sample: daily screen time and sleep, in hours, for twelve students. */
const SAMPLE: [number, number][] = [[1, 9.1], [1.5, 8.6], [2, 8.8], [2.5, 8.2], [3, 8.4], [3.5, 7.9], [4, 7.6], [4.5, 7.9], [5, 7.2], [5.5, 7], [6, 7.3], [7, 6.5]];
const g = plane({ x: [0, 8], y: [5, 10], xStep: 1, yStep: 1, every: 0, width: 6, height: 3.6, titles: { y: '\\text{sleep (h)}' } });
const scatter = figure('s', [
  { ...g, items: g.items.filter((it) => it.id !== 'x-name') },
  edgeNumbers(g, { xs: steps(0, 8, 1), ys: steps(5, 10, 1), xTex: String }),
  note(g, { id: 'xt', x: 4, y: 4.25, tex: '\\text{screen time (h)}', place: 'below' }),
  polyline(g, { id: 'trend', points: [[0.5, 9.19], [7.5, 6.25]], tone: 'opp', dashed: true }),
  dots(g, SAMPLE.map(([x, y], i) => ({ id: `p${i}`, x, y, tone: 'theta' as const, group: 'pts' }))),
]);

const SALARIES = [51, 54, 57, 59, 60, 62, 301];
const line = figure(
  'n',
  [
    numberLine({
      min: 0,
      max: 320,
      step: 20,
      every: 2,
      length: 14,
      points: [
        ...SALARIES.map((v, i) => ({ id: `d${i}`, value: v, tex: '', tone: 'theta' as const })),
        { id: 'mean-dot', value: 92, tex: '', tone: 'bad' as const },
      ],
    }),
    pin({ id: 'median', at: [(59 * 14) / 320, 0.3], tex: '\\text{median } 59', tone: 'good', side: 'left' }),
    pin({ id: 'mean', at: [(92 * 14) / 320, 0.3], tex: '\\text{mean } 92', tone: 'bad', side: 'right' }),
  ],
  240,
);

const video: Explainer = {
  id: 'm302-8-2-d',
  lessonId: 'm302-8-2',
  title: 'The Mathematics Research Project, Part 4: Choosing Graphs and Averages',
  thumbnailTitle: 'Choosing Graphs and Averages',
  thumbnail: 's',
  summary: 'Matching a display to its purpose (line graph, circle graph, bar graph, scatter plot or histogram), reading a scatter plot of screen time and sleep, and choosing between the mean and the median: for salaries of 51, 54, 57, 59, 60, 62 and 301 thousand dollars, the outlier pulls the mean up to 92, so the median, 59, is the better measure of a typical salary.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Puzzles, Games and the Research Project · Part 4', title: 'Choosing Graphs and Averages', subtitle: 'Analyzing and presenting data' }],
      lines: [
        { say: 'Once your data are collected, you need to show what they say: with a graph that fits, and with a number that sums them up fairly.', show: 'title' },
        { say: 'In this video, you will match each kind of graph to its purpose, and decide when the median describes data better than the mean.' },
      ],
    },
    {
      chapter: 'Choosing a display',
      layout: 'center',
      main: [
        {
          kind: 'table',
          id: 't',
          head: ['What you want to show', 'Best display'],
          rows: [
            ['Change over time', 'Line graph'],
            ['Parts of a whole', 'Circle graph'],
            ['Comparing categories', 'Bar graph'],
            ['The relationship between two variables', 'Scatter plot'],
            ['How one numerical variable is distributed', 'Histogram'],
          ],
        },
      ],
      lines: [
        { say: 'Choose the display that fits what you want to show. To show change over time, such as the temperature each day for a month, use a line graph.', show: 't.0', focus: 't.0' },
        { say: 'To show parts of a whole, such as the percent of students who walk, take a bus or are driven to school, use a circle graph.', show: 't.1', focus: 't.1' },
        { say: 'To compare categories, such as the number of students who chose each favourite sport, use a bar graph.', show: 't.2', focus: 't.2' },
        { say: 'To show the relationship between two variables, such as screen time and hours of sleep, use a scatter plot.', show: 't.3', focus: 't.3' },
        { say: 'And to show how one numerical variable is spread out, such as the hours of sleep of a hundred students, use a histogram.', show: 't.4', focus: 't.4' },
      ],
    },
    {
      chapter: 'A scatter plot',
      layout: 'split',
      leftWidth: 580,
      left: [scatter],
      right: [{ kind: 'text', id: 't', size: 'md', md: 'Each point is one student. Students with more screen time **tend** to sleep less. A scatter plot shows a relationship, not its cause.' }],
      lines: [
        { say: 'For the screen-time question, each student gives two numbers, so each student is one point on a scatter plot: screen time across, and hours of sleep up. These data are made up, to show the idea.', show: ['s.grid', 's.axes', 's.xt', 's.pts'], focus: 's.pts' },
        { say: 'The points drift downward from left to right. In this sample, students with more screen time tend to sleep less. A trend line through the middle of the points shows the pattern.', show: ['s.trend', 't'], focus: 's.trend' },
        { say: 'Notice the word tend: not every point follows the line. And a scatter plot shows a relationship, not its cause. A later part looks at why that matters.' },
      ],
    },
    {
      chapter: 'Mean or median?',
      layout: 'center',
      main: [
        { kind: 'text', id: 'p', size: 'md', md: 'The salaries (in thousands of dollars) of seven employees at a small business are 51, 54, 57, 59, 60, 62 and 301. Which value best represents a typical salary?' },
        { kind: 'math', id: 'm', size: 'md', lines: ['\\text{mean} = \\dfrac{644}{7} = 92', '51,\\ 54,\\ 57,\\ \\good{59},\\ 60,\\ 62,\\ \\bad{301}', '\\text{median} = 59'] },
      ],
      lines: [
        { say: 'The salaries, in thousands of dollars, of seven employees at a small business are 51, 54, 57, 59, 60, 62 and 301. Which value best represents a typical salary?', show: 'p' },
        { say: 'The mean is the total divided by the number of values. The seven salaries add to 644, and 644 divided by seven is 92.', show: 'm.0', focus: 'm.0' },
        { say: 'But six of the seven salaries are below 92. The one outlier, 301, pulls the mean far above what most of the employees earn.', show: 'm.1', focus: 'm.1' },
        { say: 'The median is the middle value of the ordered list. With seven values, the middle one is the fourth: 59.', show: 'm.2', focus: 'm.2' },
        { say: 'So the median, 59 thousand dollars, is the better measure of a typical salary.' },
      ],
    },
    {
      chapter: 'On a number line',
      layout: 'center',
      main: [line, { kind: 'callout', id: 'key', tone: 'key', title: 'Mean or median?', md: 'When an outlier distorts the mean, the **median** is the better measure of a typical value.' }],
      lines: [
        { say: 'A number line shows why. Six of the salaries are bunched together, between 51 and 62, and one is far away, at 301.', show: ['n.axis', 'n.d0', 'n.d1', 'n.d2', 'n.d3', 'n.d4', 'n.d5', 'n.d6'] },
        { say: 'The median, 59, sits right in the middle of the bunch.', show: 'n.median', focus: 'n.median' },
        { say: 'The mean, 92, is dragged to the right by the outlier, beyond all six of the typical salaries.', show: ['n.mean', 'n.mean-dot'], focus: ['n.mean', 'n.mean-dot'] },
        { say: 'So when an outlier distorts the mean, the median is the better measure of a typical value.', show: 'key' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q',
          prompt: 'The times, in minutes, that seven students take to get to school are $8$, $10$, $11$, $12$, $14$, $15$ and $75$. Which value best represents a typical time?',
          choices: ['The median, $12$ minutes', 'The mean, about $20.7$ minutes', 'The mean, $12$ minutes', 'The median, $14$ minutes'],
          answer: 0,
          working: 'The mean is $\\dfrac{145}{7} \\approx 20.7$, longer than six of the seven times, because the outlier $75$ pulls it up. The median, the 4th of the 7 ordered times, is $12$.',
        },
      ],
      lines: [
        { say: 'Your turn. The times, in minutes, that seven students take to get to school are 8, 10, 11, 12, 14, 15 and 75. Which value best represents a typical time? Pause the video and try it.', show: 'q', wait: 6 },
        { say: 'The answer is A. The median, the middle of the seven ordered times, is twelve minutes. The mean, about 20.7 minutes, is longer than six of the seven times, because the outlier, 75, pulls it up. So choice B describes almost nobody’s trip.', show: 'q.answer' },
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
            'Match the display to the purpose: line graph, circle graph, bar graph, scatter plot or histogram.',
            'A scatter plot shows the relationship between two variables.',
            'Use the **median** when outliers distort the mean.',
          ],
        },
      ],
      lines: [
        { say: 'Let’s sum up. Match the display to its purpose: a line graph, a circle graph, a bar graph, a scatter plot or a histogram.', show: 'sum.0' },
        { say: 'A scatter plot shows the relationship between two variables.', show: 'sum.1' },
        { say: 'And use the median when outliers distort the mean. In the next part, you will learn the questions to ask of any claim made from data. See you there!', show: 'sum.2' },
      ],
    },
  ],
};

export default video;
