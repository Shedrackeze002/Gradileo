import type { Explainer } from '@/video/script.ts';
import { figure } from '@/video/solids.ts';
import { people, stackBar } from './lib/m6-12-figures.ts';

// The lesson's class of 24: Walk 9, Bus 6, Car 5, Bike 4.
const TABLE = { kind: 'table' as const, head: ['How they get to school', 'Frequency'], rows: [['Walk', '9'], ['Bus', '6'], ['Car', '5'], ['Bike', '4'], ['**Total**', '**24**']] };

const video: Explainer = {
  id: 'm6-12-1',
  lessonId: 'm6-12-1',
  title: 'Relative Frequency, Part 1: From Frequency to Relative Frequency',
  thumbnailTitle: 'Relative Frequency',
  thumbnail: 'pp',
  summary: 'The frequency of a category is how many times it appears in the data; its relative frequency is the frequency divided by the total. In a class of 24 where 9 students walk to school, the relative frequency of Walk is 9/24 = 3/8: 3 out of every 8 students walk. The relative frequencies of all the categories add up to 1 whole.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Relative Frequency and Probability · Part 1', title: 'Relative Frequency', subtitle: 'A part of the whole' }],
      lines: [
        { say: 'In one class, twelve students walk to school. In another class, twenty-five students walk. Does the second class have more walkers for its size?', show: 'title' },
        { say: 'You cannot tell until you know how big each class is! In this video, you will learn about relative frequency, which makes comparisons like this fair.' },
      ],
    },
    {
      chapter: 'Frequency',
      layout: 'split',
      leftWidth: 500,
      left: [{ ...TABLE, id: 't' }],
      right: [{ kind: 'callout', id: 'def', tone: 'definition', title: 'Frequency', md: 'The **frequency** of a category is how many times it appears in the data.' }],
      lines: [
        { say: 'A class of twenty-four students said how they get to school. Here are the results.', show: ['t.0', 't.1', 't.2', 't.3'] },
        { say: 'The frequency of a category is how many times it appears in the data. Nine students walk, so the frequency of walk is nine.', show: 'def', focus: 't.0' },
        { say: 'Six students take the bus, five come by car, and four ride a bike.', focus: ['t.1', 't.2', 't.3'] },
        { say: 'The frequencies add up to the total: nine plus six plus five plus four is twenty-four students.', show: 't.4', focus: 't.4' },
      ],
    },
    {
      chapter: 'Relative frequency',
      layout: 'center',
      main: [
        { kind: 'callout', id: 'def', tone: 'definition', title: 'Relative frequency', md: 'The **relative frequency** of a category is its frequency as a part of the **total**.' },
        { kind: 'math', id: 'm', size: 'lg', lines: ['\\text{relative frequency} = \\dfrac{\\text{frequency of the category}}{\\text{total number of data values}}'] },
      ],
      lines: [
        { say: 'The relative frequency of a category is its frequency as a part of the total.', show: 'def' },
        { say: 'To find it, divide the frequency of the category by the total number of data values. You can write it as a fraction: the frequency on top, and the total on the bottom.', show: 'm', focus: 'm' },
        { say: 'A frequency tells you how many. A relative frequency tells you what part of the whole group.' },
      ],
    },
    {
      chapter: 'Three out of every eight',
      layout: 'split',
      leftWidth: 620,
      left: [figure('pp', [people({ rows: 3, boxes: true, groups: [{ id: 'walk', count: 9, tone: 'adj' }, { id: 'rest', count: 15, tone: 'muted' }] })], 360)],
      right: [{ kind: 'math', id: 'm', size: 'md', align: 'left', lines: ['\\text{Walk: } \\dfrac{9}{24}', '\\dfrac{9 \\div 3}{24 \\div 3} = \\dfrac{3}{8}', '\\text{3 out of every 8 walk}'] }],
      lines: [
        { say: 'What is the relative frequency of walk? Here are the twenty-four students. The nine who walk are blue.', show: ['pp.walk', 'pp.rest'] },
        { say: 'The frequency of walk is nine, and the total is twenty-four. So the relative frequency is nine out of twenty-four.', show: 'm.0', focus: 'm.0' },
        { say: 'Write it in lowest terms. Divide the top and the bottom by three. Nine divided by three is three, and twenty-four divided by three is eight. So it is three eighths.', show: 'm.1', focus: 'm.1' },
        { say: 'Look at the picture. The students make eight groups of three, and three of the eight groups walk. So three out of every eight students in the class walk.', show: ['pp.boxes', 'm.2'], focus: ['pp.walk', 'm.2'] },
      ],
    },
    {
      chapter: 'The parts make a whole',
      layout: 'center',
      main: [
        figure(
          'sb',
          [
            stackBar({
              width: 16,
              parts: [
                { id: 'walk', value: 9, tone: 'adj', label: '\\text{Walk}', below: '\\tfrac{9}{24}' },
                { id: 'bus', value: 6, tone: 'opp', label: '\\text{Bus}', below: '\\tfrac{6}{24}' },
                { id: 'car', value: 5, tone: 'good', label: '\\text{Car}', below: '\\tfrac{5}{24}' },
                { id: 'bike', value: 4, tone: 'theta', label: '\\text{Bike}', below: '\\tfrac{4}{24}' },
              ],
            }),
          ],
          260,
        ),
        { kind: 'math', id: 'm', size: 'lg', lines: ['\\dfrac{9}{24} + \\dfrac{6}{24} + \\dfrac{5}{24} + \\dfrac{4}{24} = \\dfrac{24}{24} = 1'] },
      ],
      lines: [
        { say: 'Here is the whole class as one bar, cut into parts for walk, bus, car and bike.', show: ['sb.walk', 'sb.bus', 'sb.car', 'sb.bike'] },
        { say: 'The relative frequencies are nine out of twenty-four, six out of twenty-four, five out of twenty-four, and four out of twenty-four.', focus: ['sb.walk', 'sb.bus', 'sb.car', 'sb.bike'] },
        { say: 'Add them up: twenty-four out of twenty-four, which is one whole. The relative frequencies of all the categories always add up to one whole.', show: 'm', focus: 'm' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q',
          prompt: 'In the same class of $24$ students, $6$ take the bus. What is the relative frequency of Bus, in lowest terms?',
          choices: ['$6$', '$\\dfrac{1}{6}$', '$\\dfrac{1}{4}$', '$\\dfrac{6}{18}$'],
          answer: 2,
          working: '$\\dfrac{6}{24}$: divide the top and bottom by $6$ to get $\\dfrac{1}{4}$.',
        },
      ],
      lines: [
        { say: 'Your turn. In the same class of twenty-four students, six take the bus. What is the relative frequency of bus, in lowest terms? Pause the video and try it.', show: 'q', wait: 6 },
        { say: 'The answer is C, one quarter. Six out of twenty-four, divided top and bottom by six, is one out of four. Choice A is the frequency, not the relative frequency.', show: 'q.answer' },
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
          items: ['Frequency: how many times a category appears.', 'Relative frequency $=$ frequency $\\div$ total, a part of the whole.', 'The relative frequencies of all the categories add up to $1$.'],
        },
      ],
      lines: [
        { say: 'Let’s sum up. The frequency of a category is how many times it appears in the data.', show: 'sum.0' },
        { say: 'Its relative frequency is the frequency divided by the total. It tells you what part of the whole is in that category.', show: 'sum.1' },
        { say: 'And the relative frequencies of all the categories add up to one whole. In the next part, you will write relative frequencies as decimals and percentages. See you there!', show: 'sum.2' },
      ],
    },
  ],
};

export default video;
