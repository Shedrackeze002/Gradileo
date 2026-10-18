import type { Explainer } from '@/video/script.ts';
import { ruler } from '@/video/measure.ts';
import { figure } from '@/video/solids.ts';
import { readout } from './lib/m303-1-figures.ts';

/** The ids of a ruler's marks from mark `a` to mark `b` (counted in its smallest spaces). */
const marks = (el: string, a: number, b: number) => Array.from({ length: b - a + 1 }, (_, i) => `${el}.t${a + i}`);

const video: Explainer = {
  id: 'm303-1-1',
  lessonId: 'm303-1-1',
  title: 'Precision and Accuracy, Part 1: The Precision of an Instrument',
  thumbnailTitle: 'The Precision of an Instrument',
  thumbnail: 'cm',
  summary: 'The precision of a measuring instrument as the smallest unit it can measure: a metric ruler (1 mm), a carpenter’s tape measure (1/16 in) and a digital caliper (0.01 mm), and reading an imperial ruler to its precision, 3 7/16 in. Part 2 finds the precision of a recorded measurement.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Limits of Measurement · Part 1', title: 'The Precision of an Instrument', subtitle: 'The smallest unit a tool can measure' }],
      lines: [
        { say: 'Every measuring tool has limits. A tape measure cannot show a hundredth of a millimetre, and a kitchen scale that has been dropped may read a few grams heavy.', show: 'title' },
        { say: 'In the trades, knowing how precise and how accurate a measurement is decides whether a part fits, a recipe works, or a job passes inspection. In this video, you will find the precision of a measuring tool, and read a ruler to that precision.' },
      ],
    },
    {
      chapter: 'Precision',
      layout: 'center',
      main: [
        { kind: 'callout', id: 'def', tone: 'definition', title: 'Precision', md: 'The **precision** of an instrument is the smallest unit it can measure: the space between its smallest marks, or the last digit on its display. An instrument with a smaller unit is **more precise**.' },
      ],
      lines: [
        { say: 'The precision of an instrument is the smallest unit it can measure. On a ruler or a tape, that is the space between its smallest marks. On a digital display, it is the place value of the last digit.', show: 'def' },
        { say: 'An instrument with a smaller unit is more precise. A ruler marked in millimetres is more precise than one marked only in centimetres, because it can tell apart two lengths that are less than a centimetre apart.' },
      ],
    },
    {
      chapter: 'A metric ruler',
      layout: 'center',
      main: [
        figure('cm', [ruler({ system: 'metric', length: 10, start: 0, end: 4.7, reading: '4.7\\text{ cm}' })]),
        { kind: 'math', id: 'm', size: 'md', lines: ['10 \\text{ spaces} = 1\\text{ cm}, \\text{ so } 1 \\text{ space} = 1\\text{ mm} = 0.1\\text{ cm}'] },
      ],
      lines: [
        { say: 'Look closely at a metric ruler. The numbered marks are centimetres.', show: 'cm.scale', focus: ['cm.t0', 'cm.t10', 'cm.t20', 'cm.t30', 'cm.t40', 'cm.t50'] },
        { say: 'Between each pair of numbered marks there are ten small spaces. So each space is one millimetre, which is 0.1 centimetres.', show: 'm.0', focus: [...marks('cm', 40, 50), 'm.0'] },
        { say: 'That means this ruler measures to the nearest millimetre. Its precision is one millimetre, or 0.1 centimetres.', focus: ['cm.t46', 'cm.t47', 'm.0'] },
        { say: 'This bar ends seven small spaces past the four. So it is 4.7 centimetres long. The ruler cannot tell you anything finer than that, such as hundredths of a centimetre.', show: ['cm.bar', 'cm.start', 'cm.end', 'cm.reading'], focus: [...marks('cm', 40, 47)] },
      ],
    },
    {
      chapter: 'Tapes and calipers',
      layout: 'split',
      leftWidth: 460,
      left: [figure('cal', [readout({ value: '12.38\\text{ mm}', title: '\\text{Digital caliper}' })], 320)],
      right: [
        {
          kind: 'table',
          id: 't',
          head: ['Tool', 'Precision'],
          rows: [
            ['Metric ruler', '$1\\text{ mm}$'],
            ['Tape measure', '$\\tfrac{1}{16}\\text{ in}$'],
            ['Digital caliper', '$0.01\\text{ mm}$'],
          ],
        },
      ],
      lines: [
        { say: 'Other tools work the same way. The metric ruler has a precision of one millimetre.', show: 't.0', focus: 't.0' },
        { say: 'A carpenter’s tape measure is usually marked in sixteenths of an inch. Its smallest space is one sixteenth of an inch, so that is its precision.', show: 't.1', focus: 't.1' },
        { say: 'A digital caliper is a tool that grips an object between two jaws and shows its size on a screen, to two decimal places of a millimetre, like 12.38 millimetres.', show: 'cal' },
        { say: 'The last digit is in the hundredths place, so the precision of the caliper is 0.01 millimetres. Of these three tools, it is the most precise, because its unit is the smallest.', show: 't.2', focus: ['t.2', 'cal.value'] },
      ],
    },
    {
      chapter: 'An imperial ruler',
      layout: 'center',
      main: [
        figure('in', [ruler({ system: 'imperial', length: 6, start: 0, end: 3 + 7 / 16, reading: '3\\tfrac{7}{16}\\text{ in}', division: 16 })]),
        { kind: 'math', id: 'm', size: 'md', lines: ['16 \\text{ spaces} = 1\\text{ in}, \\text{ so } 1 \\text{ space} = \\tfrac{1}{16}\\text{ in}', '3 + \\tfrac{7}{16} = 3\\tfrac{7}{16}\\text{ in}'] },
      ],
      lines: [
        { say: 'Now an imperial ruler. What is its precision, and what length does it show for this bar?', show: ['in.scale', 'in.bar', 'in.start', 'in.end'] },
        { say: 'Count the spaces between the zero and one-inch marks. There are sixteen. So each space is one sixteenth of an inch, and that is the ruler’s precision.', show: 'm.0', focus: [...marks('in', 0, 16), 'm.0'] },
        { say: 'Now read the bar. It ends seven small spaces past the three-inch mark.', focus: marks('in', 48, 55) },
        { say: 'So the bar is three and seven sixteenths inches long. The precision is one sixteenth of an inch, and the bar is three and seven sixteenths inches long.', show: ['in.reading', 'm.1'], focus: 'm.1' },
      ],
    },
    {
      chapter: 'A smaller unit, more digits',
      layout: 'center',
      main: [
        { kind: 'table', id: 't', head: ['Same bar', 'Smallest unit', 'Reading'], rows: [['Metric ruler', '$1\\text{ mm}$', '$47\\text{ mm}$'], ['Digital caliper', '$0.01\\text{ mm}$', '$47.13\\text{ mm}$']] },
        { kind: 'callout', id: 'key', tone: 'key', title: 'Precision comes from the tool', md: 'A more precise instrument gives a reading with a smaller last unit. The bar has not changed; the tool can just tell you more about it.' },
      ],
      lines: [
        { say: 'The ruler read the metric bar as 4.7 centimetres, which is 47 millimetres, to the nearest millimetre.', show: 't.0', focus: 't.0' },
        { say: 'Measured with a digital caliper, the same bar might read 47.13 millimetres. The caliper’s smaller unit gives two more digits.', show: 't.1', focus: 't.1' },
        { say: 'The bar is the same length either way. A more precise tool just tells you more about it. In the next part, you will read the precision of a measurement from its digits.', show: 'key' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q',
          prompt: 'A tape measure has $8$ equal spaces between each pair of inch marks. What is its precision?',
          choices: ['$\\tfrac{1}{16}$ in', '$\\tfrac{1}{8}$ in', '$8$ in', '$\\tfrac{1}{9}$ in'],
          answer: 1,
          working: 'Eight equal spaces fill one inch, so each space, the smallest unit, is $\\tfrac{1}{8}$ in.',
        },
      ],
      lines: [
        { say: 'Your turn. A tape measure has eight equal spaces between each pair of inch marks. What is its precision? Pause the video and try it.', show: 'q', wait: 6 },
        { say: 'The answer is B, one eighth of an inch. Eight equal spaces fill one inch, so each space is one eighth of an inch. Choice D counts the nine marks, including the inch marks at both ends, instead of the eight spaces.', show: 'q.answer' },
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
            'The **precision** of an instrument is the smallest unit it can measure.',
            'On a scale, it is the space between the smallest marks; on a display, the place of the last digit.',
            'A smaller unit is more precise: $0.01\\text{ mm}$ is more precise than $1\\text{ mm}$.',
          ],
        },
      ],
      lines: [
        { say: 'Let’s sum up. The precision of an instrument is the smallest unit it can measure.', show: 'sum.0' },
        { say: 'On a ruler or tape, it is the space between the smallest marks. On a digital display, it is the place value of the last digit.', show: 'sum.1' },
        { say: 'And a smaller unit means a more precise tool. In part two, we find the precision of a measurement someone has written down. See you there!', show: 'sum.2' },
      ],
    },
  ],
};

export default video;
