import type { Explainer } from '@/video/script.ts';
import { figure } from '@/video/solids.ts';
import { dotLine } from './lib/m7-10-figures.ts';

// Owen's reading times, in minutes, for six days, and then with a seventh day of only 2 minutes.
const SIX = [25, 28, 30, 30, 32, 35];
const without = (id: string) =>
  figure(id, [dotLine({ min: 0, max: 40, step: 5, values: SIX, marks: [{ id: 'all', value: 30, tex: '\\text{mean, median and mode: } 30', tone: 'good', height: 1.6 }] })], 300);
const withShort = (id: string) =>
  figure(
    id,
    [
      dotLine({
        min: 0,
        max: 40,
        step: 5,
        values: [2, ...SIX],
        odd: [0],
        marks: [
          { id: 'mean', value: 26, tex: '\\text{mean: } 26', tone: 'theta', height: 1.3, place: 'above left' },
          { id: 'median', value: 30, tex: '\\text{median and mode: } 30', tone: 'good', height: 2.3, place: 'above right' },
        ],
      }),
    ],
    330,
  );

const video: Explainer = {
  id: 'm7-10-2-b',
  lessonId: 'm7-10-2',
  title: 'The Effect of Outliers, Part 2: The Median and the Mode',
  thumbnailTitle: 'The Median and the Mode',
  thumbnail: 'ws',
  summary:
    'Reading times of 25, 28, 30, 30, 32 and 35 minutes have a mean, median and mode of 30. Adding an outlier of 2 minutes drops the mean to 182 ÷ 7 = 26, but the median (the 4th of 2, 25, 28, 30, 30, 32, 35) stays 30 and so does the mode. An outlier changes the mean the most, the median a little or not at all, and the mode usually not at all.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Data Analysis · Part 2', title: 'The Median and the Mode', subtitle: 'Which measures does an outlier move?' }],
      lines: [
        { say: 'An outlier can pull the mean a long way. But what does it do to the median and the mode?', show: 'title' },
        { say: 'In this video, you will compare all three measures, with and without an outlier.' },
      ],
    },
    {
      chapter: 'Six ordinary days',
      layout: 'center',
      main: [
        { kind: 'text', id: 'q', size: 'md', md: 'Owen’s reading times, in minutes: $25,\\ 28,\\ 30,\\ 30,\\ 32,\\ 35$' },
        without('wo'),
        { kind: 'math', id: 'm', size: 'md', lines: ['\\text{mean} = 180 \\div 6 = 30', '\\text{median} = (30 + 30) \\div 2 = 30', '\\text{mode} = 30'] },
      ],
      lines: [
        { say: 'Owen recorded his reading time for six days: twenty-five, twenty-eight, thirty, thirty, thirty-two and thirty-five minutes.', show: ['q', 'wo.axis', 'wo.dots'] },
        { say: 'The times add to one hundred eighty, and one hundred eighty divided by six is thirty. So the mean is thirty minutes.', show: 'm.0', focus: 'm.0' },
        { say: 'The values are already in order. With six values, the two middle ones are thirty and thirty, so the median is thirty as well.', show: 'm.1', focus: 'm.1' },
        { say: 'And thirty appears twice, more than any other value, so the mode is thirty. All three measures agree.', show: ['m.2', 'wo.all'], focus: ['m.2', 'wo.all'] },
      ],
    },
    {
      chapter: 'Adding a short day',
      layout: 'center',
      main: [
        { kind: 'text', id: 'q', size: 'md', md: 'On the seventh day, Owen read for only $2$ minutes: $\\bad{2},\\ 25,\\ 28,\\ 30,\\ 30,\\ 32,\\ 35$' },
        withShort('ws'),
        { kind: 'math', id: 'm', size: 'md', lines: ['\\text{mean} = 182 \\div 7 = 26', '\\text{median} = 30 \\ (\\text{the 4th value})', '\\text{mode} = 30'] },
      ],
      lines: [
        { say: 'On the seventh day, Owen read for only two minutes. Two is far below the other values, so it is an outlier.', show: ['q', 'ws.axis', 'ws.dots', 'ws.odd'], focus: 'ws.odd' },
        { say: 'The mean: the total is now one hundred eighty-two, and there are seven values. One hundred eighty-two divided by seven is twenty-six.', show: ['m.0', 'ws.mean'], focus: ['m.0', 'ws.mean'] },
        { say: 'The median: in order, the values are two, twenty-five, twenty-eight, thirty, thirty, thirty-two and thirty-five. With seven values, the middle one is the fourth: thirty.', show: 'm.1', focus: 'm.1' },
        { say: 'The mode: thirty still appears most often, so the mode is still thirty.', show: ['m.2', 'ws.median'], focus: ['m.2', 'ws.median'] },
      ],
    },
    {
      chapter: 'Comparing the measures',
      layout: 'center',
      main: [
        {
          kind: 'table',
          id: 't',
          head: ['Measure', 'Without the 2', 'With the 2', 'Effect of an outlier'],
          rows: [
            ['mean', '$30$', '$26$', 'changes the most, pulled toward the outlier'],
            ['median', '$30$', '$30$', 'changes a little, or not at all'],
            ['mode', '$30$', '$30$', 'usually does not change'],
          ],
        },
      ],
      lines: [
        { say: 'Put the results side by side. The mean dropped by four minutes, from thirty to twenty-six. It was pulled down toward the outlier.', show: 't.0', focus: 't.0' },
        { say: 'The median did not change at all. In general, an outlier changes the median only a little, or not at all.', show: 't.1', focus: 't.1' },
        { say: 'The mode did not change either. An outlier usually does not change the mode, unless the outlier happens to repeat a value.', show: 't.2', focus: 't.2' },
      ],
    },
    {
      chapter: 'Why the median hardly moves',
      layout: 'center',
      main: [
        { kind: 'callout', id: 'key', tone: 'key', title: 'Position, not size', md: 'The median depends on **position**: which value is in the middle. Adding one value at the end moves the middle by **half a place** at most, however far away that value is.' },
      ],
      lines: [
        { say: 'Why does the median hardly move? The median only cares about position: which value is in the middle of the ordered list.', show: 'key' },
        { say: 'An outlier is added at one end of the list. That moves the middle by half a place at most, so the median changes only a little, or not at all.' },
        { say: 'It does not matter how far away the outlier is. Two minutes or zero minutes, the median would still be thirty. The mean is different: the further away the outlier, the more the mean moves.' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q',
          prompt: 'A data set is $5,\\ 6,\\ 6,\\ 7,\\ 8$. The value $40$ is added. Which measure changes the most?',
          choices: ['the mean', 'the median', 'the mode', 'none of them'],
          answer: 0,
          working: 'The mean goes from $32 \\div 5 = 6.4$ to $72 \\div 6 = 12$. The median goes from $6$ to $6.5$, and the mode stays $6$.',
        },
      ],
      lines: [
        { say: 'Your turn. A data set is five, six, six, seven and eight. The value forty is added. Which measure changes the most? Pause the video and try it.', show: 'q', wait: 7 },
        { say: 'The answer is A: the mean. It jumps from six point four to twelve. Choice B, the median, only moves from six to six point five, and the mode stays at six.', show: 'q.answer' },
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
          items: ['An outlier pulls the mean toward it. The mean changes the most.', 'The median changes a little or not at all.', 'The mode usually does not change.'],
        },
      ],
      lines: [
        { say: 'Let’s sum up. An outlier pulls the mean toward it, so the mean changes the most.', show: 'sum.0' },
        { say: 'The median changes a little, or not at all.', show: 'sum.1' },
        { say: 'And the mode usually does not change. In the next part, you will decide whether to keep an outlier, and see how one result changes a mean. See you there!', show: 'sum.2' },
      ],
    },
  ],
};

export default video;
