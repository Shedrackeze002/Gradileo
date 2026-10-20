import type { Explainer } from '@/video/script.ts';
import { figure } from '@/video/solids.ts';
import { counters, ids, vertical } from './lib/m6-1-figures.ts';

// 7 + (−5): five zero pairs, and two positive counters left over.
const sevenFive = figure(
  'sf',
  [
    counters({
      sets: [
        { id: 'p', sign: '+', count: 7 },
        { id: 'n', sign: '-', count: 5, row: 1 },
      ],
      pairs: [0, 1, 2, 3, 4].map((c) => ({ id: `z${c}`, col: c })),
    }),
  ],
  300,
);

// 4 + (−11): four zero pairs, and seven negative counters left over.
const fourEleven = figure(
  'fe',
  [
    counters({
      sets: [
        { id: 'p', sign: '+', count: 4 },
        { id: 'n', sign: '-', count: 11, row: 1 },
      ],
      pairs: [0, 1, 2, 3].map((c) => ({ id: `z${c}`, col: c })),
    }),
  ],
  280,
);

// −6 °C rising 9 degrees: 6 degrees up to zero, then 3 more, to 3 °C.
const thermo = figure(
  'th',
  [
    vertical({
      tube: true,
      min: -10,
      max: 10,
      every: 2,
      unit: 0.3,
      fills: [
        { id: 'cold', value: -6, tone: 'adj' },
        { id: 'warm', value: 3, tone: 'bad' },
      ],
      points: [
        { id: 'start', value: -6, tex: '{-6}^\\circ\\text{C}', tone: 'adj' },
        { id: 'end', value: 3, tex: '3^\\circ\\text{C}', tone: 'bad' },
      ],
      moves: [
        { id: 'up6', from: -6, to: 0, label: '+6', tone: 'theta', x: 2.9 },
        { id: 'up3', from: 0, to: 3, label: '+3', tone: 'good', x: 2.9 },
      ],
      room: 4.2,
    }),
  ],
  560,
);

const video: Explainer = {
  id: 'm6-1-3-c',
  lessonId: 'm6-1-3',
  title: 'Sums of Positive and Negative Numbers, Part 3: A Positive Plus a Negative',
  thumbnailTitle: 'A Positive Plus a Negative',
  thumbnail: 'sf',
  summary: 'To add a positive and a negative number, split one number to make zero pairs: 7 + (−5) = 2 + 5 + (−5) = 2, and 4 + (−11) = 4 + (−4) + (−7) = −7. The answer takes the sign of the number with the greater magnitude. A temperature of −6 °C that rises 9 degrees reaches 3 °C.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Positive and Negative Numbers · Part 3', title: 'A Positive Plus a Negative', subtitle: 'Let the zero pairs do the work' }],
      lines: [
        { say: 'What is seven plus negative five? This time, one number is positive and the other is negative. Now the zero pairs do the work.', show: 'title' },
        { say: 'In this video, you will add a positive number and a negative number, by splitting a number to make zero pairs.' },
      ],
    },
    {
      chapter: 'Look for zero pairs',
      layout: 'center',
      main: [{ kind: 'callout', id: 'key', tone: 'key', title: 'A positive plus a negative', md: 'Look for **zero pairs**. Split one number so that part of it is the **opposite** of the other number. That part adds to $0$.' }],
      lines: [
        { say: 'When one number is positive and the other is negative, look for zero pairs.', show: 'key' },
        { say: 'Here is the trick. Split one of the numbers, so that part of it is the opposite of the other number. A number plus its opposite is zero, so that part disappears.' },
      ],
    },
    {
      chapter: 'Seven plus negative five',
      layout: 'center',
      main: [sevenFive, { kind: 'math', id: 'm', size: 'md', lines: ['7 + (-5) = 2 + 5 + (-5)', '= 2 + 0', '= 2'] }],
      lines: [
        { say: 'Find seven plus negative five. Show seven positive counters and five negative counters.', show: [...ids('sf', 'p', 7), ...ids('sf', 'n', 5)] },
        { say: 'Match up the zero pairs. Five of the positive counters pair up with the five negative counters.', show: ['sf.z0', 'sf.z1', 'sf.z2', 'sf.z3', 'sf.z4'] },
        { say: 'In numbers, we split seven into two plus five. Then five and negative five are opposites, so they make zero.', show: ['m.0', 'm.1'], focus: ['m.0', 'm.1'] },
        {
          say: 'Take away the zero pairs, because they are worth nothing. Two positive counters are left. So seven plus negative five is two.',
          hide: [...ids('sf', 'p', 5), ...ids('sf', 'n', 5), 'sf.z0', 'sf.z1', 'sf.z2', 'sf.z3', 'sf.z4'],
          show: 'm.2',
          focus: ['m.2', 'sf.p5', 'sf.p6'],
        },
      ],
    },
    {
      chapter: 'When the negative is bigger',
      layout: 'center',
      main: [fourEleven, { kind: 'math', id: 'm', size: 'md', lines: ['4 + (-11) = 4 + (-4) + (-7)', '= 0 + (-7)', '= -7'] }],
      lines: [
        { say: 'Now find four plus negative eleven. Show four positive counters and eleven negative counters.', show: [...ids('fe', 'p', 4), ...ids('fe', 'n', 11)] },
        { say: 'This time, negative eleven has the greater magnitude. So split negative eleven into negative four plus negative seven.', show: 'm.0', focus: 'm.0' },
        { say: 'Four and negative four make four zero pairs, worth zero.', show: ['fe.z0', 'fe.z1', 'fe.z2', 'fe.z3', 'm.1'], focus: 'm.1' },
        {
          say: 'Take them away. Seven negative counters are left. So four plus negative eleven is negative seven.',
          hide: [...ids('fe', 'p', 4), ...ids('fe', 'n', 4), 'fe.z0', 'fe.z1', 'fe.z2', 'fe.z3'],
          show: 'm.2',
          focus: 'm.2',
        },
      ],
    },
    {
      chapter: 'The sign of the answer',
      layout: 'center',
      main: [
        { kind: 'callout', id: 'key', tone: 'key', title: 'Which sign wins?', md: 'After the zero pairs are gone, the counters left over have the sign of the number with the **greater magnitude**.' },
        { kind: 'math', id: 'm', size: 'lg', lines: ['7 + (-5) = \\opp{2} \\qquad \\text{more positives}', '4 + (-11) = \\adj{-7} \\qquad \\text{more negatives}'] },
      ],
      lines: [
        { say: 'Notice which counters are left over. They always have the sign of the number with the greater magnitude.', show: 'key' },
        { say: 'In seven plus negative five, there were more positive counters, so the answer was positive two.', show: 'm.0', focus: 'm.0' },
        { say: 'In four plus negative eleven, there were more negative counters, so the answer was negative seven.', show: 'm.1', focus: 'm.1' },
      ],
    },
    {
      chapter: 'The temperature rises',
      layout: 'split',
      leftWidth: 480,
      left: [thermo],
      right: [
        { kind: 'text', id: 'q', size: 'md', md: 'It is ${-6}^\\circ\\text{C}$ in a mountain town. The temperature rises $9$ degrees. What is the new temperature?' },
        { kind: 'math', id: 'm', size: 'md', align: 'left', lines: ['-6 + 9 = -6 + 6 + 3', '= 0 + 3', '= 3'] },
      ],
      lines: [
        { say: 'In a mountain town, the temperature is negative six degrees. Then the temperature rises nine degrees. What is the new temperature?', show: ['q', 'th.axis', 'th.cold', 'th.start'] },
        { say: 'Rising means adding. So the new temperature is negative six plus nine. Split nine into six plus three.', show: 'm.0', focus: 'm.0' },
        { say: 'The first six degrees bring the temperature up to zero. Negative six plus six is zero.', show: ['th.up6', 'm.1'], focus: ['th.up6', 'm.1'] },
        { say: 'Then three more degrees take it to three. So the new temperature is three degrees Celsius.', hide: 'th.cold', show: ['th.warm', 'th.up3', 'th.end', 'm.2'], focus: ['th.end', 'm.2'] },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q',
          prompt: 'Find $3 + (-8)$.',
          choices: ['$5$', '$11$', '$-5$', '$-11$'],
          answer: 2,
          working: 'Split $-8$ into $(-3) + (-5)$. Then $3 + (-3) = 0$, so $3 + (-8) = 0 + (-5) = -5$.',
        },
      ],
      lines: [
        { say: 'Your turn. Find three plus negative eight. Pause the video and try it.', show: 'q', wait: 6 },
        { say: 'The answer is C, negative five. Split negative eight into negative three plus negative five. Three and negative three make zero, and negative five is left. Choice A has the right magnitude but the wrong sign: there are more negative counters than positive ones.', show: 'q.answer' },
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
          items: ['For a positive plus a negative, split one number to make zero pairs.', '$7 + (-5) = 2 + 5 + (-5) = 2 + 0 = 2$', 'The answer has the sign of the number with the greater magnitude.'],
        },
      ],
      lines: [
        { say: 'Let’s sum up. To add a positive number and a negative number, split one number to make zero pairs.', show: 'sum.0' },
        { say: 'Seven plus negative five is two plus five plus negative five, which is two plus zero, or two.', show: 'sum.1' },
        { say: 'The answer has the sign of the number with the greater magnitude. In the next part, we turn a subtraction into an addition. See you there!', show: 'sum.2' },
      ],
    },
  ],
};

export default video;
