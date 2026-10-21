import type { Explainer } from '@/video/script.ts';
import type { Part } from '@/video/solids.ts';
import { figure } from '@/video/solids.ts';
import { columns } from '@/content/math5/videos/lib/m5-2-figures.ts';
import { placeChart } from '@/content/math5/videos/lib/m5-1-figures.ts';
import { stack } from './lib/m7-2-figures.ts';

const caption = (id: string, at: [number, number], tex: string): Part => ({ points: { [`${id}-at`]: at }, items: [{ kind: 'label', id, at: `${id}-at`, tex, place: 'below' }] });

// 12.6 + 4.75 lined up on the last digits (wrong), and on the decimal points (right, 17.35).
const lineUp = figure('lu', [
  columns({ name: 'w', top: '12.6', bottom: '4.75', op: '+', align: 'right', tones: { ad1: 'bad', bd2: 'bad' } }),
  caption('w-cap', [-1.6, -0.6], '\\bad{\\text{last digits lined up}}'),
  columns({ name: 'r', top: '12.60', bottom: '4.75', answer: '17.35', op: '+', at: [8, 0], tones: { ad1: 'theta', bd1: 'theta' } }),
  caption('r-cap', [8.7, -0.6], '\\good{\\text{decimal points lined up}}'),
], 380);

// 12.60 and 4.75 in a place value chart: each digit in its own place.
const chart = figure('pc', [
  placeChart({
    places: ['Tens', 'Ones', '.', 'Tenths', 'Hundredths'],
    rows: [
      ['1', '2', '.', '6', '0'],
      ['', '4', '.', '7', '5'],
    ],
  }),
], 340);

// 2.350 + 1.800 + 0.475 = 4.625.
const camping = figure('st', [
  stack({
    rows: ['2.350', '1.800', '0.475'],
    answer: '4.625',
    carries: { [-1]: '1', 0: '1' },
    tones: { 'r0-d3': 'theta', 'r1-d2': 'theta', 'r1-d3': 'theta' },
  }),
], 470);

const video: Explainer = {
  id: 'm7-2-1-b',
  lessonId: 'm7-2-1',
  title: 'Adding and Subtracting Decimals, Part 2: Lining Up the Decimal Points',
  thumbnailTitle: 'Lining Up the Decimal Points',
  thumbnail: 'st',
  summary:
    'Lining up the last digits of 12.6 and 4.75 adds 1.26 + 4.75 by mistake and gives 6.01, far from the estimate of 18; lining up the decimal points puts tenths under tenths and gives 17.35. A tent (2.35 kg), a sleeping bag (1.8 kg) and a stove (0.475 kg) have a total mass of 2.350 + 1.800 + 0.475 = 4.625 kg, close to the estimate of 4.5 kg.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Decimals and Percents · Part 2', title: 'Lining Up the Decimal Points', subtitle: 'A common slip, and three numbers' }],
      lines: [
        { say: 'Lining up the decimal points sounds like a small thing. But get it wrong, and your answer can be way off.', show: 'title' },
        { say: 'In this part, you will see what goes wrong when the last digits are lined up instead. Then you will add three masses for a camping trip.' },
      ],
    },
    {
      chapter: 'Watch out',
      layout: 'center',
      main: [
        lineUp,
        { kind: 'callout', id: 'oops', tone: 'mistake', title: 'Lining up the last digits', md: 'Lining up the last digits of $12.6$ and $4.75$ adds $1.26 + 4.75$ by mistake, and gives $6.01$. The estimate of $18$ shows that is far too small. Always line up the **decimal points**.' },
      ],
      lines: [
        { say: 'Watch out for this mistake. Here, twelve point six and four point seven five are written with their last digits lined up, the way you might line up whole numbers.', show: ['lu.w-top', 'lu.w-bottom', 'lu.w-bar', 'lu.w-cap'] },
        { say: 'Look at the columns. The six tenths sits over the five hundredths. The digits are not in their proper places! This really adds one point two six and four point seven five, which gives six point zero one.', focus: ['lu.w-ad1', 'lu.w-bd2'], show: 'oops' },
        { say: 'Our estimate was eighteen, so six point zero one is far too small. The estimate catches the slip.' },
        { say: 'With the decimal points lined up, every digit is in its proper column, and the sum is seventeen point three five.', show: ['lu.r-top', 'lu.r-bottom', 'lu.r-bar', 'lu.r-sum', 'lu.r-cap'] },
      ],
    },
    {
      chapter: 'Same place, same column',
      layout: 'center',
      main: [
        chart,
        { kind: 'callout', id: 'key', tone: 'key', title: 'Add digits with the same place value', md: 'Tenths add to tenths and hundredths add to hundredths, just as dollars add to dollars and cents add to cents.' },
      ],
      lines: [
        { say: 'Why do the decimal points matter? Put both numbers in a place value chart. Each digit goes under its own place.', show: ['pc.frame', 'pc.head', 'pc.row0', 'pc.row1'] },
        { say: 'When the decimal points line up, every column holds one place value. Tenths are with tenths, and hundredths are with hundredths.', show: ['pc.col3', 'pc.col4'] },
        { say: 'It is like money. You add dollars to dollars and cents to cents. You would never add six dimes to five pennies and call it eleven dimes!', show: 'key' },
      ],
    },
    {
      chapter: 'Packing for a camping trip',
      layout: 'split',
      leftWidth: 480,
      left: [camping],
      right: [
        { kind: 'text', id: 'q', size: 'md', md: 'A tent has a mass of $2.35$ kg, a sleeping bag $1.8$ kg and a stove $0.475$ kg. What is the total mass?' },
        { kind: 'math', id: 'm', size: 'md', align: 'left', lines: ['\\text{Estimate: } 2 + 2 + 0.5 = 4.5', '\\text{Thousandths: } 0 + 0 + 5 = 5', '\\text{Hundredths: } 5 + 0 + 7 = 12', '\\text{Tenths: } 3 + 8 + 4 + \\opp{1} = 16', '\\text{Ones: } 2 + 1 + 0 + \\opp{1} = 4'] },
      ],
      lines: [
        { say: 'Now three numbers. A tent has a mass of two point three five kilograms, a sleeping bag one point eight kilograms, and a stove zero point four seven five kilograms. What is the total mass?', show: 'q' },
        { say: 'Estimate first. Two point three five rounds to two, and one point eight rounds to two. The stove is less than one, so round to the nearest tenth: zero point five. The estimate is four point five.', show: 'm.0', focus: 'm.0' },
        { say: 'The stove has three decimal places. Give the others three places as well: two point three five zero, and one point eight zero zero. Line up the points.', show: ['st.row0', 'st.row1', 'st.row2', 'st.bar'] },
        { say: 'Thousandths: zero plus zero plus five is five.', show: ['st.cd3', 'st.sd3', 'm.1'], focus: 'm.1' },
        { say: 'Hundredths: five plus zero plus seven is twelve. Write two, and carry one into the tenths.', hide: 'st.cd3', show: ['st.cd2', 'st.sd2', 'st.kd1', 'm.2'], focus: ['m.2', 'st.kd1'] },
        { say: 'Tenths: three plus eight plus four, plus the one we carried, is sixteen. Write six, and carry one into the ones.', hide: 'st.cd2', show: ['st.cd1', 'st.sd1', 'st.kp0', 'm.3'], focus: ['m.3', 'st.kp0'] },
        { say: 'Ones: two plus one plus zero, plus one, is four. Put the decimal point under the others. The total mass is four point six two five kilograms, close to our estimate of four point five.', hide: 'st.cd1', show: ['st.sp0', 'st.ps', 'm.4'], focus: ['m.4', 'st.sum'] },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q',
          prompt: 'Calculate $3.5 + 0.82 + 1.164$.',
          choices: ['$4.484$', '$1.281$', '$5.484$', '$6.484$'],
          answer: 2,
          working: 'Give each number three decimal places and line up the points: $3.500 + 0.820 + 1.164 = 5.484$. The estimate $4 + 0.8 + 1 = 5.8$ shows it is reasonable.',
        },
      ],
      lines: [
        { say: 'Your turn. Calculate three point five plus zero point eight two plus one point one six four. Pause the video and try it.', show: 'q', wait: 6 },
        { say: 'The answer is C, five point four eight four. Give each number three decimal places, line up the points and add. Choice B lines up the last digits, and it is far smaller than the estimate of about six.', show: 'q.answer' },
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
            'Line up the **decimal points**, not the last digits.',
            'Write zeros so every number has the same number of decimal places.',
            'A slip with the decimal point shows up when you compare with the estimate.',
          ],
        },
      ],
      lines: [
        { say: 'Let’s sum up. Always line up the decimal points, not the last digits. Then every digit is in the right column.', show: 'sum.0' },
        { say: 'Write zeros so every number has the same number of decimal places, even when you add three numbers.', show: 'sum.1' },
        { say: 'And if a decimal point slips, your estimate will show it. In the next part, you will subtract decimals. See you there!', show: 'sum.2' },
      ],
    },
  ],
};

export default video;
