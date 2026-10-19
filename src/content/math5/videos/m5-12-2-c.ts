import type { Explainer } from '@/video/script.ts';
import { barGraph } from '@/video/charts.ts';
import { figure } from '@/video/solids.ts';
import { dotPlot } from './lib/m5-12-figures.ts';

// Students' numbers of pets: 3 have 0, 5 have 1, 4 have 2, 1 has 3 and 1 has 4.
const plot = (id: string) => figure(id, [dotPlot({ min: 0, max: 4, counts: [3, 5, 4, 1, 1], title: 'Number of pets' })]);

const video: Explainer = {
  id: 'm5-12-2-c',
  lessonId: 'm5-12-2',
  title: 'Collecting and Displaying Data, Part 3: Bar Graphs and Dot Plots',
  thumbnailTitle: 'Bar Graphs and Dot Plots',
  thumbnail: 'dp',
  summary: 'A bar graph shows each frequency as the height of a bar: check the scale first (a bar halfway between 4 and 6 shows 5). A dot plot shows each data value as one dot above a number line, so the height of each stack is the frequency: 4 students have 2 pets, and the mode is 1 pet.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Frequency and Data · Part 3', title: 'Bar Graphs and Dot Plots', subtitle: 'Frequencies at a glance' }],
      lines: [
        { say: 'A table lists the numbers, but a graph lets everyone see them at a glance. Which category is the biggest? With a graph, you can tell in a second.', show: 'title' },
        { say: 'In this video, you will read a bar graph and a dot plot.' },
      ],
    },
    {
      chapter: 'Bar graphs',
      layout: 'split',
      leftWidth: 700,
      left: [figure('bg', [barGraph({ categories: ['Cat', 'Dog', 'Fish', 'Bird'], values: [8, 12, 5, 6], max: 14, step: 2, height: 4.5, titles: { x: 'Favourite pet', y: 'Students' } })])],
      right: [{ kind: 'callout', id: 'tip', tone: 'tip', title: 'Check the scale', md: 'A **bar graph** shows each frequency as the height of a bar. Read the numbers on the side **before** you read a bar.' }],
      lines: [
        { say: 'A bar graph shows each frequency as the height of a bar. This one shows the favourite pets of a class.', show: ['bg.scale', 'bg.b0', 'bg.b1', 'bg.b2', 'bg.b3', 'tip'] },
        { say: 'Before you read a bar, check the scale on the side. Here, each grid line goes up by two, not by one.', focus: 'bg.scale' },
        { say: 'The cat bar reaches the line for eight, so eight students chose cats. The dog bar reaches twelve.', show: ['bg.r0', 'bg.v0', 'bg.r1', 'bg.v1'], focus: ['bg.b0', 'bg.b1'] },
        { say: 'The fish bar stops halfway between four and six. Halfway between four and six is five, so five students chose fish.', show: ['bg.r2', 'bg.v2'], focus: 'bg.b2' },
        { say: 'And the bird bar reaches the line for six. If you counted the grid lines as ones, you would get the wrong answers. So always check the scale first.', show: ['bg.r3', 'bg.v3'], focus: 'bg.b3' },
      ],
    },
    {
      chapter: 'Dot plots',
      layout: 'split',
      leftWidth: 600,
      left: [plot('dp')],
      right: [{ kind: 'callout', id: 'def', tone: 'definition', title: 'Dot plot', md: 'A **dot plot** shows each data value as one dot above a number line. The dots stack up, so the height of each stack is the frequency.' }],
      lines: [
        { say: 'A dot plot is another way to show data. It has a number line, with the data values written underneath.', show: ['dp.axis', 'def'] },
        { say: 'Each answer gets one dot, above its value. These students said how many pets they have. Three students have no pets, so there are three dots above zero.', show: 'dp.s0', focus: 'dp.s0' },
        { say: 'Five students have one pet, so five dots stack up above one.', show: 'dp.s1', focus: 'dp.s1' },
        { say: 'The rest of the dots go above two, three and four. The dots stack up, so the height of each stack shows the frequency.', show: ['dp.s2', 'dp.s3', 'dp.s4'] },
      ],
    },
    {
      chapter: 'Reading a dot plot',
      layout: 'split',
      leftWidth: 600,
      left: [plot('rd')],
      right: [
        { kind: 'text', id: 'q', size: 'md', md: 'Each dot is one student. How many students have $2$ pets, and what is the mode?' },
        { kind: 'math', id: 'm', size: 'md', align: 'left', lines: ['\\text{above 2: } 4 \\text{ dots}', '\\text{tallest stack: above } 1', '\\text{mode: } 1 \\text{ pet}'] },
      ],
      lines: [
        { say: 'Each dot is one student. How many students have two pets, and what is the mode?', show: ['q', 'rd.axis', 'rd.s0', 'rd.s1', 'rd.s2', 'rd.s3', 'rd.s4'] },
        { say: 'Find two on the number line, and count the dots above it: one, two, three, four. So four students have two pets.', show: 'm.0', focus: ['rd.s2', 'm.0'] },
        { say: 'The mode is the value with the most dots. The tallest stack is above one, with five dots.', show: 'm.1', focus: ['rd.s1', 'm.1'] },
        { say: 'So the mode is one pet.', show: 'm.2', focus: 'm.2' },
      ],
    },
    {
      chapter: 'Watch out',
      layout: 'split',
      leftWidth: 600,
      left: [plot('w')],
      right: [{ kind: 'callout', id: 'oops', tone: 'mistake', title: 'Counting the number instead of the dots', md: 'The number **under** a stack is the data value. The number of **dots** in the stack is its frequency.' }],
      lines: [
        { say: 'Be careful not to mix up the two kinds of numbers on a dot plot.', show: ['w.axis', 'w.s0', 'w.s1', 'w.s2', 'w.s3', 'w.s4', 'oops'] },
        { say: 'The number under a stack is the data value: how many pets. The four under the last stack means four pets.', focus: ['w.num4', 'w.s4'] },
        { say: 'The number of dots in a stack is the frequency: how many students. There is only one dot above four, so just one student has four pets.', focus: 'w.s4' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q',
          prompt: 'On a dot plot of the number of brothers and sisters students have, the stack above $3$ has $6$ dots. What does this mean?',
          choices: ['$6$ students have $3$ brothers and sisters.', '$3$ students have $6$ brothers and sisters.', '$6$ students have $6$ brothers and sisters.', '$9$ students answered.'],
          answer: 0,
          working: 'The number under the stack, $3$, is the data value. The $6$ dots are the frequency: $6$ students.',
        },
      ],
      lines: [
        { say: 'Your turn. On a dot plot of the number of brothers and sisters students have, the stack above three has six dots. What does this mean? Pause the video and try it.', show: 'q', wait: 6 },
        { say: 'The answer is A. The number under the stack, three, is the data value, and the six dots are the frequency. So six students have three brothers and sisters. Choice B mixes up the data value and the frequency.', show: 'q.answer' },
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
          items: ['A bar graph shows each frequency as the height of a bar. Check the scale first.', 'A dot plot shows one dot for each value. The height of a stack is the frequency.', 'The number under a stack is the data value.'],
        },
      ],
      lines: [
        { say: 'Let’s sum up. A bar graph shows each frequency as the height of a bar, so check the scale first.', show: 'sum.0' },
        { say: 'A dot plot shows one dot for each data value, and the height of each stack is the frequency.', show: 'sum.1' },
        { say: 'And the number under a stack is the data value, not the frequency. In the next part, you will read a stem-and-leaf plot. See you there!', show: 'sum.2' },
      ],
    },
  ],
};

export default video;
