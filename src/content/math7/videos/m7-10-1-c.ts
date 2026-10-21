import type { Explainer } from '@/video/script.ts';
import { figure } from '@/video/solids.ts';
import { numberLine } from '@/video/numbers.ts';
import { dotPlot } from '@/content/math5/videos/lib/m5-12-figures.ts';
import { chips } from '@/content/math6/videos/lib/m6-3-figures.ts';
import { join, note } from '@/content/math6/videos/lib/m6-9-figures.ts';

// Five daily highs: −12, −8, −15, −8 and −3 °C, as a dot plot from −15 to −3.
const TEMPS = [-12, -8, -15, -8, -3];
const counts = Array.from({ length: 13 }, (_, i) => TEMPS.filter((t) => t === i - 15).length);
const temps = (id: string) => figure(id, [dotPlot({ min: -15, max: -3, counts, title: 'Daily high (degrees Celsius)' })], 300);
const stacks = (id: string) => [-15, -12, -8, -3].map((v) => `${id}.s${v}`);

// The range: from the least value, −15, to the greatest, −3, is 12 degrees.
const spread = (id: string) =>
  figure(
    id,
    [
      numberLine({
        min: -16,
        max: -2,
        step: 1,
        points: [
          { id: 'lo', value: -15, tex: '\\text{least: } {-15}', tone: 'adj' },
          { id: 'hi', value: -3, tex: '\\text{greatest: } {-3}', tone: 'opp' },
        ],
        spans: [{ id: 'span', from: -15, to: -3, tone: 'good', label: '12' }],
      }),
    ],
    260,
  );

// No mode, and two modes.
const modes = (id: string) =>
  figure(
    id,
    [
      join(
        chips({ name: 'a', values: [2, 4, 6, 8], gap: 1.4, r: 0.55, tone: 'muted' }),
        note('a-note', [5.2, 0], '\\text{no mode}', 'right', 'ink'),
        chips({ name: 'b', values: [3, 3, 5, 7, 7], at: [0, -1.8], gap: 1.4, r: 0.55, tones: ['theta', 'theta', 'muted', 'hyp', 'hyp'] }),
        note('b-note', [6.6, -1.8], '\\text{modes: } 3 \\text{ and } 7', 'right', 'ink'),
      ),
    ],
    240,
  );

const video: Explainer = {
  id: 'm7-10-1-c',
  lessonId: 'm7-10-1',
  title: 'Mean, Median, Mode and Range, Part 3: Mode and Range',
  thumbnailTitle: 'Mode and Range',
  thumbnail: 'tp',
  summary:
    'The mode is the value that appears most often: for daily highs of −12, −8, −15, −8 and −3 °C it is −8 °C. If no value repeats there is no mode, and two values can tie as modes. The range is the greatest value minus the least, −3 − (−15) = 12 °C; it shows how spread out the data are and is not a measure of central tendency. A mean of 16 for 5 scores means they add to 80, so a missing fifth score is 80 − 61 = 19.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Data Analysis · Part 3', title: 'Mode and Range', subtitle: 'The most common value, and the spread' }],
      lines: [
        { say: 'Which shoe size sells the most? How much do the temperatures change in a week? Two more numbers answer questions like these.', show: 'title' },
        { say: 'In this video, you will find the mode and the range of a data set, and work out a missing value from the mean.' },
      ],
    },
    {
      chapter: 'The mode',
      layout: 'center',
      main: [
        { kind: 'callout', id: 'def', tone: 'definition', title: 'Mode', md: 'The **mode** is the value that appears **most often**.' },
        temps('tp'),
        { kind: 'math', id: 'm', size: 'md', lines: ['{-8} \\text{ appears twice, so the mode is } {-8}^\\circ\\text{C}'] },
      ],
      lines: [
        { say: 'In a cold town, the daily highs for five days were negative twelve, negative eight, negative fifteen, negative eight and negative three degrees Celsius.', show: ['tp.axis', ...stacks('tp')] },
        { say: 'The mode is the value that appears most often. It is the third measure of central tendency.', show: 'def' },
        { say: 'On the dot plot, look for the tallest stack. Negative eight appears twice, and no other value repeats.', focus: 'tp.s-8' },
        { say: 'So the mode is negative eight degrees Celsius.', show: 'm', focus: 'm' },
      ],
    },
    {
      chapter: 'No mode, or two modes',
      layout: 'center',
      main: [
        modes('md'),
        { kind: 'callout', id: 'tip', tone: 'tip', title: 'No mode, or two modes', md: 'If **no value repeats**, there is no mode. If two values tie for most often, **both** are modes.' },
      ],
      lines: [
        { say: 'A data set does not always have exactly one mode. In two, four, six and eight, no value repeats, so there is no mode.', show: ['md.a-c0', 'md.a-c1', 'md.a-c2', 'md.a-c3', 'md.a-note'] },
        { say: 'In three, three, five, seven and seven, both three and seven appear twice. They tie for most often, so both three and seven are modes.', show: ['md.b-c0', 'md.b-c1', 'md.b-c2', 'md.b-c3', 'md.b-c4', 'md.b-note'] },
        { say: 'So a data set can have no mode, one mode, or more than one mode.', show: 'tip' },
      ],
    },
    {
      chapter: 'The range',
      layout: 'center',
      main: [
        { kind: 'callout', id: 'def', tone: 'definition', title: 'Range', md: 'The **range** is the greatest value minus the least value. It tells how **spread out** the data are. It is **not** a measure of central tendency.' },
        spread('rg'),
        { kind: 'math', id: 'm', size: 'md', lines: ['{-3} - ({-15}) = {-3} + 15 = 12', '\\text{range} = 12^\\circ\\text{C}'] },
      ],
      lines: [
        { say: 'The range is the greatest value minus the least value. It does not tell you a typical value. Instead, it tells you how spread out the data are.', show: 'def' },
        { say: 'For the temperatures, the least value is negative fifteen, and the greatest is negative three.', show: ['rg.axis', 'rg.lo', 'rg.hi'], focus: ['rg.lo', 'rg.hi'] },
        { say: 'The range is negative three minus negative fifteen. Subtracting a negative is the same as adding, so that is negative three plus fifteen, which is twelve.', show: 'm.0', focus: 'm.0' },
        { say: 'You can check on the number line: from negative fifteen up to negative three is twelve steps. The range is twelve degrees Celsius.', show: ['rg.span', 'm.1'], focus: ['rg.span', 'm.1'] },
      ],
    },
    {
      chapter: 'A missing value',
      layout: 'center',
      main: [
        { kind: 'text', id: 'q', size: 'md', md: 'The mean of Harpreet’s five quiz scores is $16$. Four of the scores are $14$, $18$, $15$ and $14$. What is the fifth score?' },
        { kind: 'math', id: 'm', size: 'md', lines: ['\\text{sum} = 16 \\times 5 = 80', '14 + 18 + 15 + 14 = 61', '\\text{fifth score} = 80 - 61 = 19'] },
      ],
      lines: [
        { say: 'The mean can help you find a missing value. The mean of Harpreet’s five quiz scores is sixteen. Four of the scores are fourteen, eighteen, fifteen and fourteen. What is the fifth score?', show: 'q' },
        { say: 'Think of the levelled towers. A mean of sixteen for five scores means five towers, each sixteen tall. So the scores must add to sixteen times five, which is eighty.', show: 'm.0', focus: 'm.0' },
        { say: 'The four scores you know add to sixty-one.', show: 'm.1', focus: 'm.1' },
        { say: 'So the fifth score is eighty minus sixty-one, which is nineteen. Check: the five scores add to eighty, and eighty divided by five is sixteen.', show: 'm.2', focus: 'm.2' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q',
          prompt: 'Find the range: $-4,\\ 7,\\ 2,\\ {-1},\\ 5$',
          choices: ['$11$', '$3$', '$6$', '$-11$'],
          answer: 0,
          working: 'Greatest $7$, least $-4$: $7 - (-4) = 7 + 4 = 11$.',
        },
      ],
      lines: [
        { say: 'Your turn. Find the range of negative four, seven, two, negative one and five. Pause the video and try it.', show: 'q', wait: 7 },
        { say: 'The answer is A: eleven. The greatest value is seven and the least is negative four. Seven minus negative four is seven plus four, which is eleven. Choice B subtracts four instead of negative four.', show: 'q.answer' },
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
          items: ['The mode is the value that appears most often. There can be no mode, or more than one.', 'The range is the greatest value minus the least. It shows the spread.', 'The sum of the values is the mean times the number of values.'],
        },
      ],
      lines: [
        { say: 'Let’s sum up. The mode is the value that appears most often. A data set can have no mode, or more than one.', show: 'sum.0' },
        { say: 'The range is the greatest value minus the least value. It shows how spread out the data are.', show: 'sum.1' },
        { say: 'And the sum of the values is the mean times the number of values. In the next part, you will choose the best measure for a data set. See you there!', show: 'sum.2' },
      ],
    },
  ],
};

export default video;
