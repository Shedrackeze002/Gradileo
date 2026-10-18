import type { Explainer } from '@/video/script.ts';
import { figure } from '@/video/solids.ts';
import { closeUp } from './lib/m303-1-figures.ts';

// A bar read as 4.7 cm on a ruler marked in millimetres: its true end is between 4.65 and 4.75 cm.
const metric = () =>
  figure(
    'cm',
    [
      closeUp({
        from: 4.5,
        to: 4.9,
        sub: 10,
        numbers: [
          [4.5, '4.5'],
          [4.6, '4.6'],
          [4.7, '4.7'],
          [4.8, '4.8'],
          [4.9, '4.9'],
        ],
        end: 4.7,
        reading: '4.7\\text{ cm}',
        band: { from: 4.65, to: 4.75, lo: '4.65', hi: '4.75' },
        unit: '\\text{cm}',
      }),
    ],
    380,
  );

// A board read as 20 3/8 in on a tape marked in eighths: between 20 5/16 and 20 7/16 in.
const imperial = () =>
  figure(
    'tape',
    [
      closeUp({
        from: 20,
        to: 20.75,
        sub: 8,
        numbers: [[20, '20']],
        end: 20 + 3 / 8,
        reading: '20\\tfrac{3}{8}\\text{ in}',
        band: { from: 20 + 5 / 16, to: 20 + 7 / 16, lo: '20\\tfrac{5}{16}', hi: '20\\tfrac{7}{16}' },
        unit: '\\text{in}',
      }),
    ],
    380,
  );

const video: Explainer = {
  id: 'm303-1-2',
  lessonId: 'm303-1-2',
  title: 'Uncertainty and Tolerance, Part 1: Uncertainty',
  thumbnailTitle: 'The Uncertainty of a Measurement',
  thumbnail: 'cm',
  summary: 'The uncertainty of a measurement as plus or minus half the smallest unit of the instrument: a bar read as 4.7 cm on a millimetre ruler is between 4.65 cm and 4.75 cm, and a board read as 20 3/8 in on a tape marked in eighths is between 20 5/16 in and 20 7/16 in.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Limits of Measurement · Part 1', title: 'Uncertainty', subtitle: 'Plus or minus half the smallest unit' }],
      lines: [
        { say: 'No measurement is perfect. When you read a ruler to the nearest millimetre, the true length could be a little more, or a little less, than the mark you chose.', show: 'title' },
        { say: 'In this video, you will find the uncertainty of a measurement, and the least and greatest values that its true size could have.' },
      ],
    },
    {
      chapter: 'Half the smallest unit',
      layout: 'center',
      main: [
        { kind: 'callout', id: 'def', tone: 'definition', title: 'Uncertainty', md: 'The **uncertainty** of a measurement is $\\pm$ half the smallest unit of the instrument. On a ruler marked in millimetres, the smallest unit is $0.1\\text{ cm}$, so a length read as $4.7\\text{ cm}$ is $4.7 \\pm 0.05\\text{ cm}$.' },
      ],
      lines: [
        { say: 'The uncertainty of a measurement says how far off the reading might be. It is plus or minus half the smallest unit of the instrument.', show: 'def' },
        { say: 'Why half? When you read to the nearest mark, you pick the mark that is closest to the end. If the true end were more than half a space away from that mark, a different mark would be closer, and you would have read that one instead.' },
      ],
    },
    {
      chapter: 'The range of a reading',
      layout: 'center',
      main: [
        metric(),
        { kind: 'math', id: 'm', size: 'md', lines: ['\\text{uncertainty} = \\pm\\tfrac{1}{2}(0.1) = \\pm 0.05\\text{ cm}', '4.7 - 0.05 = 4.65\\text{ cm} \\qquad 4.7 + 0.05 = 4.75\\text{ cm}'] },
      ],
      lines: [
        { say: 'Here is a close-up of a ruler marked in millimetres. A bar is read as 4.7 centimetres. Between what least and greatest values is its true length?', show: ['cm.scale', 'cm.bar', 'cm.end', 'cm.reading'] },
        { say: 'The smallest unit is one millimetre, which is 0.1 centimetres. Half of 0.1 is 0.05, so the uncertainty is plus or minus 0.05 centimetres.', show: 'm.0', focus: 'm.0' },
        { say: 'The least value is 4.7 minus 0.05, which is 4.65 centimetres: halfway back to the 4.6 mark.', show: ['m.1', 'cm.lo'], focus: 'cm.lo' },
        { say: 'The greatest value is 4.7 plus 0.05, which is 4.75 centimetres: halfway on to the 4.8 mark.', show: 'cm.hi', focus: ['cm.hi', 'm.1'] },
        { say: 'So the true length is somewhere between 4.65 and 4.75 centimetres. Any length in that green range would be read as 4.7 on this ruler. We write the measurement as 4.7, plus or minus 0.05 centimetres.', show: 'cm.band', focus: 'cm.band' },
      ],
    },
    {
      chapter: 'Imperial units',
      layout: 'center',
      main: [
        imperial(),
        { kind: 'math', id: 'm', size: 'md', lines: ['\\pm\\tfrac{1}{2} \\times \\tfrac{1}{8} = \\pm\\tfrac{1}{16}\\text{ in} \\qquad 20\\tfrac{3}{8} = 20\\tfrac{6}{16}', '20\\tfrac{6}{16} - \\tfrac{1}{16} = 20\\tfrac{5}{16} \\qquad 20\\tfrac{6}{16} + \\tfrac{1}{16} = 20\\tfrac{7}{16}'] },
      ],
      lines: [
        { say: 'The same idea works in imperial units. A tape measure is marked in eighths of an inch, and a board is read as twenty and three eighths inches.', show: ['tape.scale', 'tape.bar', 'tape.end', 'tape.reading'] },
        { say: 'Half of one eighth is one sixteenth, so the uncertainty is plus or minus one sixteenth of an inch.', show: 'm.0', focus: 'm.0' },
        { say: 'To subtract and add sixteenths, write three eighths as six sixteenths. So the reading is twenty and six sixteenths inches.', focus: 'm.0' },
        { say: 'Subtract one sixteenth: twenty and five sixteenths. Add one sixteenth: twenty and seven sixteenths.', show: ['m.1', 'tape.lo', 'tape.hi'], focus: 'm.1' },
        { say: 'So the board is really between twenty and five sixteenths and twenty and seven sixteenths inches long.', show: 'tape.band', focus: 'tape.band' },
      ],
    },
    {
      chapter: 'From precision to uncertainty',
      layout: 'center',
      main: [
        {
          kind: 'table',
          id: 't',
          head: ['Instrument', 'Smallest unit', 'Uncertainty'],
          rows: [
            ['Ruler marked in millimetres', '$1\\text{ mm}$', '$\\pm 0.5\\text{ mm}$'],
            ['Tape marked in eighths', '$\\tfrac{1}{8}\\text{ in}$', '$\\pm\\tfrac{1}{16}\\text{ in}$'],
            ['Digital caliper', '$0.01\\text{ mm}$', '$\\pm 0.005\\text{ mm}$'],
          ],
        },
        { kind: 'callout', id: 'key', tone: 'key', title: 'Smaller unit, smaller uncertainty', md: 'The more precise the instrument, the smaller its uncertainty, and the narrower the range the true value can be in.' },
      ],
      lines: [
        { say: 'Every instrument’s uncertainty comes from its smallest unit. A ruler marked in millimetres has an uncertainty of plus or minus 0.5 millimetres.', show: 't.0', focus: 't.0' },
        { say: 'A tape marked in eighths of an inch has an uncertainty of plus or minus one sixteenth of an inch.', show: 't.1', focus: 't.1' },
        { say: 'And a digital caliper that shows hundredths of a millimetre has an uncertainty of plus or minus 0.005 millimetres.', show: 't.2', focus: 't.2' },
        { say: 'So the more precise the instrument, the smaller its uncertainty, and the narrower the range that the true value can be in.', show: 'key' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q',
          prompt: 'A digital scale shows grams to one decimal place, and a bag of flour reads $452.3\\text{ g}$. Between what values is its true mass?',
          choices: ['$452.2\\text{ g}$ and $452.4\\text{ g}$', '$451.8\\text{ g}$ and $452.8\\text{ g}$', '$452.3\\text{ g}$ and $452.35\\text{ g}$', '$452.25\\text{ g}$ and $452.35\\text{ g}$'],
          answer: 3,
          working: 'The smallest unit is $0.1\\text{ g}$, so the uncertainty is $\\pm 0.05\\text{ g}$: $452.3 - 0.05 = 452.25$ and $452.3 + 0.05 = 452.35$.',
        },
      ],
      lines: [
        { say: 'Your turn. A digital scale shows grams to one decimal place, and a bag of flour reads 452.3 grams. Between what values is its true mass? Pause the video and try it.', show: 'q', wait: 6 },
        { say: 'The answer is D. The smallest unit is 0.1 grams, so the uncertainty is plus or minus 0.05 grams: from 452.25 to 452.35 grams. Choice A uses the whole smallest unit, 0.1, instead of half of it.', show: 'q.answer' },
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
            'The uncertainty of a measurement is $\\pm$ half the smallest unit of the instrument.',
            'Least value $=$ reading $-$ uncertainty; greatest value $=$ reading $+$ uncertainty.',
            'In imperial units, change to the same fraction (sixteenths) before you subtract and add.',
          ],
        },
      ],
      lines: [
        { say: 'Let’s sum up. The uncertainty of a measurement is plus or minus half the smallest unit of the instrument.', show: 'sum.0' },
        { say: 'Subtract it from the reading for the least value, and add it for the greatest.', show: 'sum.1' },
        { say: 'And in imperial units, change to the same fraction, such as sixteenths, before you subtract and add. In part two, we look at tolerance. See you there!', show: 'sum.2' },
      ],
    },
  ],
};

export default video;
