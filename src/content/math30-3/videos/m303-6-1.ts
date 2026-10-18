import type { Explainer } from '@/video/script.ts';
import { barGraph } from '@/video/charts.ts';
import { figure } from '@/video/solids.ts';
import { drop, meanLevel } from './lib/m303-6-figures.ts';

// Furnace calls each day for 5 days: 8, 12, 9, 15, 11, with a mean of 11.
const CALLS = [8, 12, 9, 15, 11];
const calls = (id: string) =>
  figure(id, [
    barGraph({ categories: ['1', '2', '3', '4', '5'], values: CALLS, max: 16, step: 4, height: 6, titles: { x: 'Day', y: 'Calls' } }),
    meanLevel({ values: CALLS, mean: 11, max: 16, height: 6, label: '\\text{mean } 11' }),
  ]);

const video: Explainer = {
  id: 'm303-6-1',
  lessonId: 'm303-6-1',
  title: 'Mean, Median and Mode, Part 1: The Mean',
  thumbnailTitle: 'The Mean',
  thumbnail: 'bg',
  summary: 'Measures of central tendency, and the mean: the sum of the values divided by the number of values. A furnace repair shop’s calls of 8, 12, 9, 15 and 11 a day have a mean of 11, the level the bars would have if the total were shared out equally; the mean also estimates totals (55 bags a day for 15 days is 825 bags).',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Statistics · Part 1', title: 'The Mean', subtitle: 'Sharing the total out equally' }],
      lines: [
        { say: 'A dispatcher wants to know how many furnace calls to plan for. A tire shop wants to quote a typical wait. A rancher wants to know the mass of a typical calf.', show: 'title' },
        { say: 'Each one needs a single number that describes a whole set of data. In this video, you will learn the first of those numbers: the mean.' },
      ],
    },
    {
      chapter: 'Central tendency',
      layout: 'center',
      main: [{ kind: 'callout', id: 'def', tone: 'definition', title: 'Measure of central tendency', md: 'A single number that describes the centre of a set of data: a typical value. There are three: the **mean**, the **median** and the **mode**.' }],
      lines: [
        { say: 'A single number that describes the centre of a set of data, a typical value, is called a measure of central tendency.', show: 'def' },
        { say: 'There are three to choose from: the mean, the median and the mode. This part is about the mean. The next parts cover the median and the mode, and how to choose between them.' },
      ],
    },
    {
      chapter: 'The mean',
      layout: 'center',
      main: [
        { kind: 'callout', id: 'def', tone: 'definition', title: 'Mean', md: 'The total of the values divided by the number of values. It is what most people call the “average”.' },
        { kind: 'math', id: 'm', size: 'lg', lines: ['\\text{mean} = \\dfrac{\\text{sum of the values}}{\\text{number of values}}'] },
      ],
      lines: [
        { say: 'The mean is the total of the values, divided by the number of values.', show: 'def' },
        { say: 'So to find it, add up all the values, then divide by how many values there are.', show: 'm', focus: 'm' },
        { say: 'The mean is what most people call the average.', focus: 'def' },
      ],
    },
    {
      chapter: 'Furnace calls',
      layout: 'split',
      leftWidth: 600,
      left: [drop(calls('bg'), ['mean', 'ups', 'gaps', 'r0', 'r1', 'r2', 'r3', 'r4'])],
      right: [
        { kind: 'text', id: 'q', size: 'md', md: 'Service calls each day for $5$ days: $8, 12, 9, 15, 11$. What is the mean number of calls per day?' },
        { kind: 'math', id: 'm', size: 'md', align: 'left', lines: ['8 + 12 + 9 + 15 + 11 = 55', '55 \\div 5 = 11'] },
      ],
      lines: [
        { say: 'Liam is a dispatcher at a furnace repair shop. Liam recorded the number of service calls each day for five days: eight, twelve, nine, 15 and eleven. What is the mean number of calls per day?', show: ['q', 'bg.scale', 'bg.b0', 'bg.b1', 'bg.b2', 'bg.b3', 'bg.b4', 'bg.v0', 'bg.v1', 'bg.v2', 'bg.v3', 'bg.v4'] },
        { say: 'First, add the values. Eight plus twelve plus nine plus 15 plus eleven is 55 calls.', show: 'm.0', focus: 'm.0' },
        { say: 'Then divide by the number of values. There are five days, and 55 divided by five is eleven.', show: 'm.1', focus: 'm.1' },
        { say: 'So the mean is eleven calls a day. Next, let’s see what that number really means.' },
      ],
    },
    {
      chapter: 'Sharing out equally',
      layout: 'split',
      leftWidth: 600,
      left: [calls('bg2')],
      right: [
        { kind: 'math', id: 'm', size: 'md', align: 'left', lines: ['\\text{above: } 1 + 4 = 5', '\\text{below: } 3 + 2 = 5'] },
        { kind: 'callout', id: 'key', tone: 'key', title: 'What the mean means', md: 'The mean is the value every day would have if the total were shared out equally.' },
      ],
      lines: [
        { say: 'Here is what the mean means. Draw a line across the graph at eleven.', show: ['bg2.scale', 'bg2.b0', 'bg2.b1', 'bg2.b2', 'bg2.b3', 'bg2.b4', 'bg2.mean'], focus: 'bg2.mean' },
        { say: 'Day two is one call above the line, and day four is four above it. That is five extra calls.', show: ['bg2.ups', 'm.0'], focus: ['bg2.ups', 'm.0'] },
        { say: 'Day one is three calls below the line, and day three is two below it. That is a gap of five calls.', show: ['bg2.gaps', 'm.1'], focus: ['bg2.gaps', 'm.1'] },
        { say: 'Move the five extra calls into the five-call gap, and every day has exactly eleven. So the mean is the value every day would have if the total were shared out equally.', show: 'key' },
      ],
    },
    {
      chapter: 'Estimating totals',
      layout: 'center',
      main: [
        { kind: 'text', id: 'q', size: 'md', md: 'A crew uses a mean of $55$ bags of concrete a day. About how many bags will it need for a $15$-day job?' },
        { kind: 'math', id: 'm', size: 'lg', lines: ['55 \\times 15 = 825 \\text{ bags}'] },
        { kind: 'callout', id: 'tip', tone: 'tip', title: 'Mean × number of values = total', md: 'The mean uses every value, so it is useful for estimating totals.' },
      ],
      lines: [
        { say: 'The mean uses every value in the data, and shares the total out equally. That makes it useful for estimating totals.', show: 'tip' },
        { say: 'A building crew uses a mean of 55 bags of concrete a day. About how many bags will it need for a 15-day job?', show: 'q' },
        { say: 'Turn the formula around. If the mean is the total divided by the number of days, then the total is the mean times the number of days: 55 times 15, which is 825 bags.', show: 'm', focus: 'm' },
      ],
    },
    {
      chapter: 'Not always a data value',
      layout: 'center',
      main: [
        { kind: 'math', id: 'm', size: 'lg', lines: ['8 + 12 + 9 + 15 + 10 = 54', '54 \\div 5 = 10.8 \\text{ calls a day}'] },
        { kind: 'callout', id: 'tip', tone: 'tip', title: 'The mean can be a decimal', md: 'Nobody makes $0.8$ of a call, but a mean can still be $10.8$. It describes the data as a whole, not one day.' },
      ],
      lines: [
        { say: 'One more thing. The mean does not have to be one of the values, or even a whole number.', show: 'tip' },
        { say: 'Suppose the last day had ten calls instead of eleven. The total is 54, and 54 divided by five is 10.8 calls a day.', show: 'm', focus: 'm' },
        { say: 'Nobody makes eight tenths of a call, but the mean can still be 10.8. It describes the data as a whole, not any one day. To plan, round it to about eleven calls a day.' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q',
          prompt: 'A café sold $42, 38, 51, 45$ and $49$ muffins on five days. What is the mean number of muffins sold per day?',
          choices: ['$45$', '$56.25$', '$13$', '$225$'],
          answer: 0,
          working: 'Sum: $42 + 38 + 51 + 45 + 49 = 225$. Mean: $225 \\div 5 = 45$ muffins a day.',
        },
      ],
      lines: [
        { say: 'Your turn. A café sold 42, 38, 51, 45 and 49 muffins on five days. What is the mean number of muffins sold per day? Pause the video and try it.', show: 'q', wait: 6 },
        { say: 'The answer is A. The total is 225 muffins, and 225 divided by five days is 45 muffins a day. Choice B divides by four instead of five, so count the values carefully. And D is the total, before dividing.', show: 'q.answer' },
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
          items: ['Mean $=$ sum of the values $\\div$ number of values.', 'It shares the total out equally, using every value.', 'Total $=$ mean $\\times$ number of values.'],
        },
      ],
      lines: [
        { say: 'Let’s sum up. The mean is the sum of the values, divided by the number of values.', show: 'sum.0' },
        { say: 'It uses every value, and it is the value each one would have if the total were shared out equally.', show: 'sum.1' },
        { say: 'And the total is the mean times the number of values, which is handy for estimating. In the next part, we meet the median and the mode. See you there!', show: 'sum.2' },
      ],
    },
  ],
};

export default video;
