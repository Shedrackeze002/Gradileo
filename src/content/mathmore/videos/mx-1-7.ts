import type { Explainer } from '@/video/script.ts';
import { figure } from '@/video/solids.ts';
import { dotPlot, stacks } from './lib/mx-figures.ts';

const BOOKS = [1, 1, 1, 1, 2, 2, 2, 2, 2, 3, 3, 3, 4, 4, 5, 7, 9];

const video: Explainer = {
  id: 'mx-1-7',
  lessonId: 'mx-1-7',
  title: 'The Shape of a Distribution',
  thumbnail: 'd',
  summary: 'A distribution shows which values occur and how often. A histogram draws it with bars over equal intervals: bars of 3, 7, 5 and 1 hold 16 values. A distribution can be symmetric, skewed to the right or left (named for its tail), or uniform, with one mode or two. A tail pulls the mean towards it, so skewed right means the mean is greater than the median.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Statistics and Data Displays', title: 'The Shape of a Distribution', subtitle: 'Histograms, skew and modes' }],
      lines: [
        { say: 'The mean and the median each squeeze a data set into one number. The shape of the data tells us more. It shows where the values pile up, and whether they trail off to one side.', show: 'title' },
        { say: 'In this video, you will learn to read a histogram, describe the shape of a distribution, and see how the shape affects the mean and the median.' },
      ],
    },
    {
      chapter: 'Distributions and histograms',
      layout: 'center',
      main: [
        { kind: 'callout', id: 'def', tone: 'definition', title: 'Distribution', md: 'The way the values of a data set are spread out: which values occur, and how often each one occurs.' },
        { kind: 'callout', id: 'def2', tone: 'definition', title: 'Histogram', md: 'A graph that groups numerical data into equal **intervals** and draws a bar over each one. The height of a bar is the **frequency**: how many values fall in that interval.' },
      ],
      lines: [
        { say: 'The distribution of a data set is the way its values are spread out. It tells us which values occur, and how often each one occurs.', show: 'def' },
        { say: 'A histogram shows a distribution. It groups the data into equal intervals along the horizontal axis, and draws a bar over each interval. The height of a bar is the frequency, the number of values in that interval.', show: 'def2' },
      ],
    },
    {
      chapter: 'Reading a histogram',
      layout: 'center',
      main: [
        { kind: 'table', id: 'tb', head: ['Mass (kg)', '$0$ to $2$', '$2$ to $4$', '$4$ to $6$', '$6$ to $8$'], rows: [['Frequency', '$3$', '$7$', '$5$', '$1$']] },
        { kind: 'math', id: 'm', size: 'lg', lines: ['3 + 7 + 5 + 1 = 16', '3 + 7 = 10'] },
        { kind: 'callout', id: 'tip', tone: 'tip', title: 'Values on a boundary', md: 'Each bar includes its left end but not its right end. A parcel of exactly $4$ kg is counted in the bar from $4$ to $6$.' },
      ],
      lines: [
        { say: 'A histogram of the masses of some parcels has four bars. Their heights are three, seven, five and one.', show: 'tb' },
        { say: 'To find the number of parcels, add the heights of all the bars. There are sixteen parcels.', show: 'm.0', focus: 'm.0' },
        { say: 'How many parcels have a mass of less than four kilograms? That means the first two bars. Three plus seven is ten.', show: 'm.1', focus: 'm.1' },
        { say: 'A value exactly on the edge of two bars goes in the bar on its right. So a parcel of exactly four kilograms is counted from four to six.', show: 'tip' },
      ],
    },
    {
      chapter: 'Symmetric and skewed',
      layout: 'split',
      leftWidth: 760,
      left: [figure('d', [dotPlot({ values: BOOKS, min: 0, max: 10, label: 'Books read in a month' })], 430)],
      right: [
        { kind: 'bullets', id: 'b', items: ['**Symmetric**: the two halves mirror each other.', '**Skewed**: one long **tail**. Named for the side the tail is on.', '**Uniform**: no peak.'] },
      ],
      lines: [
        { say: 'A distribution is symmetric when its left half and its right half are close to mirror images.', show: 'b.0' },
        { say: 'It is skewed when one side has a long tail of values that stretch far from the peak. And it is uniform when every value occurs about equally often, so there is no peak.', show: ['b.1', 'b.2'] },
        { say: 'Here is a dot plot of the number of books some students read in a month. Most of the values are one, two or three.', show: ['d.axis', ...stacks('d', BOOKS)], focus: ['d.s1', 'd.s2', 'd.s3'] },
        { say: 'A few larger values form a tail on the right. So this distribution is skewed to the right.', focus: ['d.s5', 'd.s7', 'd.s9'] },
        { say: 'A skewed distribution is named for the side its tail is on, not the side its peak is on.', focus: 'b.1' },
      ],
    },
    {
      chapter: 'Modes',
      layout: 'center',
      main: [
        { kind: 'callout', id: 'def', tone: 'definition', title: 'Mode of a distribution', md: 'A peak: a value or interval that is more common than its neighbours. One peak is **unimodal**. Two separate peaks is **bimodal**.' },
      ],
      lines: [
        { say: 'A mode of a distribution is a peak. It is a value or an interval that is more common than its neighbours.', show: 'def' },
        { say: 'A distribution with one peak is called unimodal, and one with two separate peaks is called bimodal. Two peaks often mean that two different groups have been mixed together, such as the heights of children and adults.' },
      ],
    },
    {
      chapter: 'Shape, mean and median',
      layout: 'center',
      main: [
        { kind: 'math', id: 'm', size: 'lg', lines: ['2,\\ 3,\\ 3,\\ 4,\\ 4,\\ 4,\\ 5,\\ 20', '\\text{Median} = 4', '\\text{Mean} = \\frac{45}{8} \\approx 5.6'] },
        { kind: 'callout', id: 'key', tone: 'key', title: 'The tail pulls the mean', md: 'Skewed right: mean $>$ median. Skewed left: mean $<$ median. Symmetric: about equal.' },
      ],
      lines: [
        { say: 'These eight values have a long tail to the right, because of the twenty.', show: 'm.0', focus: 'm.0' },
        { say: 'The middle two values are both four, so the median is four.', show: 'm.1', focus: 'm.1' },
        { say: 'The values add to forty-five. Forty-five divided by eight is about five point six. The mean is greater than the median.', show: 'm.2', focus: 'm.2' },
        { say: 'The tail pulls the mean towards it, because the mean uses the size of every value. The median only counts positions, so it stays near the peak. This is why the median is the better measure of a typical value when data are skewed.', show: 'key' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q',
          prompt: 'A histogram has its tallest bars on the right and a long tail of low bars on the left. Which statement is true?',
          choices: ['It is skewed to the right, and the mean is greater than the median.', 'It is skewed to the left, and the mean is less than the median.', 'It is skewed to the left, and the mean is greater than the median.', 'It is symmetric, and the mean equals the median.'],
          answer: 1,
          working: 'The tail is on the left, so it is skewed to the left. The tail pulls the mean down, below the median.',
        },
      ],
      lines: [
        { say: 'Your turn. A histogram has its tallest bars on the right, and a long tail of low bars on the left. Which statement is true? Pause the video and try it.', show: 'q', wait: 6 },
        { say: 'The answer is B. The tail is on the left, so the distribution is skewed to the left. The tail pulls the mean down, so the mean is less than the median.', show: 'q.answer' },
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
          items: ['A histogram shows a distribution with bars over equal intervals.', 'Add bar heights to count the values in several intervals.', 'A skew is named for the side its tail is on.', 'The tail pulls the mean: skewed right means mean $>$ median.'],
        },
      ],
      lines: [
        { say: 'Let’s sum up. A histogram shows a distribution with bars over equal intervals.', show: 'sum.0' },
        { say: 'Add the heights of the bars to count the values in several intervals.', show: 'sum.1' },
        { say: 'A skewed distribution is named for the side its tail is on.', show: 'sum.2' },
        { say: 'And the tail pulls the mean towards it, so in a distribution skewed to the right, the mean is greater than the median. See you in the next lesson!', show: 'sum.3' },
      ],
    },
  ],
};

export default video;
