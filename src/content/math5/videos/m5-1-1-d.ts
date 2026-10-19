import type { Explainer } from '@/video/script.ts';
import { numberLine } from '@/video/numbers.ts';
import { figure } from '@/video/solids.ts';
import { hundredGrid, placeChart } from './lib/m5-1-figures.ts';

// Four tenths and forty hundredths: the same four strips shaded, the second grid cut into small squares.
const grids = figure('gr', [
  hundredGrid({ name: 'a', size: 5, tenths: 4, label: '\\text{4 tenths} = 0.4' }),
  hundredGrid({ name: 'b', size: 5, tenths: 4, at: [7.5, 0], label: '\\text{40 hundredths} = 0.40' }),
]);

const video: Explainer = {
  id: 'm5-1-1-d',
  lessonId: 'm5-1-1',
  title: 'Place Value to Millions and Thousandths, Part 4: Zeros at the Right End',
  thumbnailTitle: 'Zeros at the Right End',
  thumbnail: 'gr',
  summary: 'Why 3.4 = 3.40 = 3.400 (four tenths and forty hundredths shade the same part of a whole), why a zero in the middle does change a number (3.04 is not 3.4), and which number has the same value as 2.050.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Place Value · Part 4', title: 'Zeros at the Right End', subtitle: 'When does a zero change a number?' }],
      lines: [
        { say: 'Is 3.4 the same as 3.40? The second one has more digits, so it might look bigger. Let’s find out!', show: 'title' },
        { say: 'In this video, you will learn when a zero changes the value of a decimal, and when it does not.' },
      ],
    },
    {
      chapter: 'Tenths and hundredths',
      layout: 'center',
      main: [{ kind: 'math', id: 'm', size: 'lg', lines: ['3.4 \\;\\;\\text{and}\\;\\; 3.40'] }, grids],
      lines: [
        { say: '3.4 means three and four tenths. 3.40 means three and forty hundredths. Both have three whole ones, so let’s compare the parts after the point.', show: 'm.0' },
        { say: 'On this grid, four strips out of ten are shaded. That is four tenths, or 0.4.', show: ['gr.a-frame', 'gr.a-cols', 'gr.a-tenths', 'gr.a-label'], focus: 'gr.a-tenths' },
        { say: 'On the second grid, the same four strips are shaded, but now we can see the small squares. Each strip has ten small squares, so four strips have forty. That is forty hundredths, or 0.40.', show: ['gr.b-frame', 'gr.b-cols', 'gr.b-rows', 'gr.b-tenths', 'gr.b-label'], focus: 'gr.b-tenths' },
        { say: 'The shaded parts are exactly the same size! So four tenths is the same amount as forty hundredths, and 3.4 is equal to 3.40.', focus: ['gr.a-tenths', 'gr.b-tenths'] },
      ],
    },
    {
      chapter: 'On a number line',
      layout: 'center',
      main: [
        figure('nl', [numberLine({ min: 3, max: 4, step: 0.1, length: 14, points: [{ id: 'p', value: 3.4, tex: '3.4 = 3.40', tone: 'theta' }] })], 200),
        { kind: 'callout', id: 'key', tone: 'key', title: 'A zero at the right end', md: 'A zero at the **right end** of a decimal does not change its value: $3.4 = 3.40 = 3.400$.' },
      ],
      lines: [
        { say: 'You can see it on a number line as well. 3.4 and 3.40 are at exactly the same point, four tenths of the way from three to four.', show: ['nl.axis', 'nl.p'], focus: 'nl.p' },
        { say: 'So a zero at the right end of a decimal does not change its value. 3.4, 3.40 and 3.400 are all the same number.', show: 'key' },
      ],
    },
    {
      chapter: 'A zero in the middle',
      layout: 'center',
      main: [
        figure('ch', [
          placeChart({
            places: ['Ones', '.', 'Tenths', 'Hundredths'],
            rows: [
              ['3', '.', '4', ''],
              ['3', '.', '0', '4'],
            ],
            tones: { 'r1-2': 'theta', 'r1-3': 'opp', 'r0-2': 'adj' },
          }),
        ]),
        { kind: 'math', id: 'm', size: 'lg', lines: ['3.04 \\ne 3.4'] },
      ],
      lines: [
        { say: 'But a zero in the middle does change the value. Compare 3.4 and 3.04.', show: ['ch.frame', 'ch.head', 'ch.row0'] },
        { say: 'In 3.04, the zero is in the tenths place. It pushes the four over, into the hundredths place.', show: 'ch.row1', focus: 'ch.col2' },
        { say: 'So 3.04 is three and four hundredths. That is much less than three and four tenths. 3.04 is not equal to 3.4.', show: 'm.0', focus: 'm.0' },
      ],
    },
    {
      chapter: 'Same value?',
      layout: 'split',
      leftWidth: 620,
      left: [
        figure('sv', [
          placeChart({
            places: ['Ones', '.', 'Tenths', 'Hundredths', 'Thousandths'],
            headSize: '\\footnotesize',
            digitSize: '\\Large',
            rows: [
              ['2', '.', '0', '5', '0'],
              ['2', '.', '0', '5', ''],
              ['2', '.', '5', '', ''],
              ['2', '.', '0', '0', '5'],
            ],
            tones: { 'r0-4': 'theta', 'r1-3': 'good', 'r0-3': 'good', 'r2-2': 'bad', 'r3-4': 'bad' },
          }),
        ]),
      ],
      right: [
        { kind: 'text', id: 'q', size: 'md', md: 'Which number has the same value as $2.050$: $2.5$, $2.05$ or $2.005$?' },
        { kind: 'math', id: 'm', size: 'md', align: 'left', lines: ['2.05\\thc{0} = 2.05', '\\text{Answer: } 2.05'] },
      ],
      lines: [
        { say: 'Which number has the same value as 2.050: 2.5, 2.05 or 2.005?', show: ['q', 'sv.frame', 'sv.head', 'sv.row0'] },
        { say: 'The last zero in 2.050 is at the right end, so we can drop it. 2.050 is the same as 2.05.', show: ['sv.row1', 'm.0'], focus: ['sv.col4', 'm.0'] },
        { say: 'The zero just after the decimal point is in the middle, between the point and the five. It keeps the five in the hundredths place, so it must stay.', focus: 'sv.col2' },
        { say: 'Now look at 2.5 and 2.005. Their fives are in the tenths place and the thousandths place, not the hundredths place. So they are different numbers.', show: ['sv.row2', 'sv.row3'], focus: ['sv.row2', 'sv.row3'] },
        { say: 'So the answer is 2.05.', show: 'm.1', focus: 'm.1' },
      ],
    },
    {
      chapter: 'Prices',
      layout: 'center',
      main: [{ kind: 'callout', id: 'tip', tone: 'tip', title: 'Money', md: '\\$3.40 and \\$3.4 are the same amount. We write money with two decimal places, so the zero at the end stays: \\$3.40.' }],
      lines: [
        { say: 'You see zeros at the right end all the time in prices. Three dollars and forty cents is written 3.40, with a zero at the end.', show: 'tip' },
        { say: 'The zero does not change the amount. But we always write money with two decimal places, one for each digit of the cents, so the zero stays.' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q',
          prompt: 'Which number has the same value as $6.300$?',
          choices: ['$6.03$', '$6.003$', '$6.3$', '$63$'],
          answer: 2,
          working: 'The two zeros are at the right end, so we can drop them: $6.300 = 6.30 = 6.3$.',
        },
      ],
      lines: [
        { say: 'Your turn. Which number has the same value as 6.300? Pause the video and try it.', show: 'q', wait: 6 },
        { say: 'The answer is C. Both zeros in 6.300 are at the right end, so we can drop them, and 6.300 equals 6.3. Choice A, 6.03, has a zero in the middle, which moves the three into the hundredths place.', show: 'q.answer' },
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
          items: ['A zero at the right end of a decimal does not change its value: $3.4 = 3.40 = 3.400$.', 'A zero in the middle does: $3.04$ is not $3.4$.', 'Four tenths and forty hundredths are the same amount.'],
        },
      ],
      lines: [
        { say: 'Let’s sum up. A zero at the right end of a decimal does not change its value.', show: 'sum.0' },
        { say: 'But a zero in the middle does, because it moves the other digits to different places.', show: 'sum.1' },
        { say: 'And four tenths is the same amount as forty hundredths. Practise these ideas in your lesson. See you next time!', show: 'sum.2' },
      ],
    },
  ],
};

export default video;
