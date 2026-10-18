import type { Explainer } from '@/video/script.ts';
import { figure } from '@/video/solids.ts';
import { orderedList } from './lib/m303-6-figures.ts';

// Joints welded each day for 16 days, in order.
const JOINTS = [12, 15, 15, 18, 20, 21, 21, 22, 24, 25, 25, 27, 28, 30, 31, 34];
const crew = (id: string) =>
  figure(
    id,
    [
      orderedList({
        values: JOINTS,
        positions: true,
        shades: [
          { id: 'q25', cells: [3, 4], tone: 'good' },
          { id: 'p90', cells: [14], tone: 'opp' },
          { id: 'near', cells: [13], tone: 'bad' },
        ],
        pins: [
          { id: 'at25', at: 3.5, tex: '19', tone: 'good' },
          { id: 'at90', at: 14, tex: '31', tone: 'opp' },
        ],
      }),
    ],
    250,
  );

const video: Explainer = {
  id: 'm303-6-3-c',
  lessonId: 'm303-6-3',
  title: 'Percentiles, Part 3: The Value at a Percentile',
  thumbnailTitle: 'The Value at a Percentile',
  thumbnail: 'c3',
  summary: 'Finding the value at the Pth percentile of n ordered values: work out R = (P/100) × n; if R is a whole number, take the mean of the values in positions R and R + 1, otherwise round R up. For 16 days of a pipeline crew’s welds, the 25th percentile is 19 joints and the 90th percentile is 31 joints; and why R is rounded up, not to the nearest whole number.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Statistics · Part 3', title: 'The Value at a Percentile', subtitle: 'From a percentile to a data value' }],
      lines: [
        { say: 'A percentile rank tells you where a value stands. Sometimes you need the reverse: which value marks the bottom quarter of the data, or the top ten percent?', show: 'title' },
        { say: 'In this video, you will find the value at a given percentile, using its position in the ordered data.' },
      ],
    },
    {
      chapter: 'The method',
      layout: 'center',
      main: [
        { kind: 'callout', id: 'key', tone: 'key', title: 'Finding the value at a percentile', md: 'For $n$ values in order from least to greatest:' },
        { kind: 'bullets', id: 'b', items: ['Work out $R = \\dfrac{P}{100} \\times n$.', 'If $R$ is a whole number, the percentile is the **mean** of the values in positions $R$ and $R + 1$.', 'If $R$ is not a whole number, **round $R$ up**, and use the value in that position.'] },
      ],
      lines: [
        { say: 'To find the value at a percentile, call the percentile P, and the number of values n. First, put the values in order, from least to greatest.', show: 'key' },
        { say: 'Then work out R: P over 100, times n. R is a position in the ordered list.', show: 'b.0' },
        { say: 'If R is a whole number, the percentile is the mean of the values in positions R and R plus one.', show: 'b.1' },
        { say: 'If R is not a whole number, round R up, and use the value in that position.', show: 'b.2' },
      ],
    },
    {
      chapter: 'A pipeline crew',
      layout: 'center',
      main: [
        { kind: 'text', id: 'q', size: 'md', md: 'A pipeline crew recorded the number of joints welded each day for $16$ days. Find the $25$th percentile and the $90$th percentile.' },
        crew('c'),
      ],
      lines: [
        { say: 'A pipeline crew recorded the number of joints welded each day for sixteen days. Here they are, in order, with their positions numbered below. Find the 25th percentile and the 90th percentile.', show: ['q', 'c.boxes', 'c.vals', 'c.pos'] },
        { say: 'The values are already sorted, from twelve joints on the slowest day to 34 on the busiest. So n is sixteen.', focus: 'c.pos' },
      ],
    },
    {
      chapter: 'The 25th percentile',
      layout: 'center',
      main: [crew('c2'), { kind: 'math', id: 'm', size: 'md', lines: ['R = 0.25 \\times 16 = 4 \\quad \\text{(whole number)}', '(18 + 20) \\div 2 = 19 \\text{ joints}'] }],
      lines: [
        { say: 'For the 25th percentile, R is 0.25 times sixteen, which is four.', show: ['c2.boxes', 'c2.vals', 'c2.pos', 'm.0'], focus: 'm.0' },
        { say: 'Four is a whole number. Exactly four values, a quarter of the data, sit in positions one to four. So the 25th percentile is halfway between the fourth and fifth values.', show: 'c2.q25', focus: 'c2.q25' },
        { say: 'The fourth value is 18, and the fifth is 20. Their mean is 19. The 25th percentile is 19 joints.', show: ['m.1', 'c2.at25'], focus: ['m.1', 'c2.at25'] },
      ],
    },
    {
      chapter: 'The 90th percentile',
      layout: 'center',
      main: [crew('c3'), { kind: 'math', id: 'm', size: 'md', lines: ['R = 0.90 \\times 16 = 14.4 \\quad \\text{(not whole: round up to } 15)', '\\text{the 15th value} = 31 \\text{ joints}'] }],
      lines: [
        { say: 'For the 90th percentile, R is 0.90 times sixteen, which is 14.4.', show: ['c3.boxes', 'c3.vals', 'c3.pos', 'm.0'], focus: 'm.0' },
        { say: 'That is not a whole number, so round it up to fifteen. Why up? Fourteen values are only 87.5 percent of the data, not quite 90 percent. Fifteen values are enough to cover 90 percent.', focus: 'c3.pos' },
        { say: 'The fifteenth value is 31. So the 90th percentile is 31 joints.', show: ['m.1', 'c3.p90', 'c3.at90'], focus: ['m.1', 'c3.p90'] },
      ],
    },
    {
      chapter: 'Watch out',
      layout: 'center',
      main: [
        crew('c4'),
        { kind: 'callout', id: 'oops', tone: 'mistake', title: 'Rounding to the nearest', md: '$R = 14.4$ rounds **up** to $15$ in this method, not down to $14$. The $14$th value, $30$, is too low for the $90$th percentile.' },
      ],
      lines: [
        { say: 'A common mistake is to round R to the nearest whole number. 14.4 would round down to fourteen, giving the fourteenth value, 30.', show: ['c4.boxes', 'c4.vals', 'c4.pos', 'c4.near', 'oops'], focus: 'c4.near' },
        { say: 'But in this method, when R is not a whole number, you always round up. The 90th percentile is the fifteenth value, 31.', show: ['c4.p90', 'c4.at90'], focus: 'c4.p90' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q',
          prompt: 'Twelve values in order: $3, 5, 6, 8, 9, 11, 12, 14, 15, 17, 18, 20$. Find the $75$th percentile.',
          choices: ['$15$', '$17$', '$16$', '$14.5$'],
          answer: 2,
          working: '$R = 0.75 \\times 12 = 9$, a whole number, so use the mean of the $9$th and $10$th values: $(15 + 17) \\div 2 = 16$.',
        },
      ],
      lines: [
        { say: 'Your turn. Here are twelve values in order: three, five, six, eight, nine, eleven, twelve, fourteen, 15, 17, 18 and 20. Find the 75th percentile. Pause the video and try it.', show: 'q', wait: 6 },
        { say: 'The answer is C. R is 0.75 times twelve, which is nine, a whole number. So the 75th percentile is halfway between the ninth and tenth values, 15 and 17: sixteen. Choice A uses only the ninth value. With a whole-number R, take the mean of positions R and R plus one.', show: 'q.answer' },
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
          items: ['Put the values in order, then work out $R = \\dfrac{P}{100} \\times n$.', 'Whole number: the mean of the values in positions $R$ and $R + 1$.', 'Not a whole number: round $R$ **up** and use that position.'],
        },
      ],
      lines: [
        { say: 'Let’s sum up. To find the value at a percentile, put the values in order, then work out R, which is P over 100, times n.', show: 'sum.0' },
        { say: 'If R is a whole number, take the mean of the values in positions R and R plus one.', show: 'sum.1' },
        { say: 'If it is not, round R up, and use that position. In the next part, we use percentile ranks to compare people in different groups. See you there!', show: 'sum.2' },
      ],
    },
  ],
};

export default video;
