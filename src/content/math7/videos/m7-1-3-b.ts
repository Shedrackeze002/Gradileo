import type { Explainer } from '@/video/script.ts';
import { figure } from '@/video/solids.ts';
import { numberLine } from '@/video/numbers.ts';
import { placeChart } from '@/content/math5/videos/lib/m5-1-figures.ts';

// 0.470 and 0.407 in a place value chart: the hundredths decide.
const chart = figure('pc', [
  placeChart({
    places: ['Ones', '.', 'Tenths', 'Hundredths', 'Thousandths'],
    rows: [
      ['0', '.', '4', '7', '0'],
      ['0', '.', '4', '0', '7'],
    ],
    tones: { 'r0-4': 'muted', 'r0-3': 'good', 'r1-3': 'bad' },
  }),
], 340);

// 0.407 and 0.47 on a number line from 0.4 to 0.5.
const line = figure('nl', [
  numberLine({
    min: 0.4,
    max: 0.5,
    step: 0.01,
    every: 5,
    length: 13,
    points: [
      { id: 'a', value: 0.407, tex: '0.407', tone: 'opp' },
      { id: 'b', value: 0.47, tex: '0.47', tone: 'adj' },
    ],
  }),
], 220);

// 2.60 and 2.58 in a place value chart: the tenths decide.
const chart2 = figure('pd', [
  placeChart({
    places: ['Ones', '.', 'Tenths', 'Hundredths'],
    rows: [
      ['2', '.', '6', '0'],
      ['2', '.', '5', '8'],
    ],
    tones: { 'r0-3': 'muted', 'r0-2': 'good', 'r1-2': 'bad' },
  }),
], 340);

const video: Explainer = {
  id: 'm7-1-3-b',
  lessonId: 'm7-1-3',
  title: 'Comparing and Ordering Numbers, Part 2: Comparing Decimals',
  thumbnailTitle: 'Comparing Decimals',
  thumbnail: 'pc',
  summary:
    'To compare decimals, add zeros at the end so they have the same number of decimal places, then compare the digits from left to right: the first place where they differ decides. 0.47 = 0.470 is greater than 0.407 (7 hundredths beat 0 hundredths), and 2.6 > 2.58. More digits does not mean bigger.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Number Relationships · Part 2', title: 'Comparing Decimals', subtitle: 'Line up the place values' }],
      lines: [
        { say: 'Which is greater, zero point four seven, or zero point four zero seven? The second one has more digits. But does that make it bigger?', show: 'title' },
        { say: 'In this part, you will compare decimals using place value, and see why more digits does not always mean a bigger number.' },
      ],
    },
    {
      chapter: 'Adding zeros at the end',
      layout: 'center',
      main: [
        { kind: 'math', id: 'm', size: 'lg', lines: ['0.47 = \\dfrac{47}{100} = \\dfrac{470}{1000} = 0.470'] },
        { kind: 'callout', id: 'key', tone: 'key', title: 'Same number of decimal places', md: 'Zeros at the **end** of a decimal do not change its value. Add them so both decimals have the same number of places.' },
      ],
      lines: [
        { say: 'First, give both decimals the same number of decimal places. Zero point four zero seven has three places, and zero point four seven has two.' },
        { say: 'Zero point four seven is forty-seven hundredths. Forty-seven hundredths is the same as four hundred seventy thousandths, so we can write it as zero point four seven zero.', show: 'm', focus: 'm' },
        { say: 'A zero at the end of a decimal does not change its value. It just fills an empty place, so both numbers line up.', show: 'key' },
      ],
    },
    {
      chapter: 'Compare from left to right',
      layout: 'center',
      main: [
        chart,
        { kind: 'callout', id: 'key', tone: 'key', title: 'The first difference decides', md: 'Compare the digits from **left to right**. The first place where they differ decides which number is greater.' },
      ],
      lines: [
        { say: 'Now put both numbers in a place value chart: zero point four seven zero, and zero point four zero seven.', show: ['pc.frame', 'pc.head', 'pc.row0', 'pc.row1'] },
        { say: 'Compare from left to right. The ones are both zero. The same.', show: 'pc.col0', focus: 'pc.col0' },
        { say: 'The tenths are both four. Still the same.', hide: 'pc.col0', show: 'pc.col2', focus: 'pc.col2' },
        { say: 'In the hundredths place, one has seven and the other has zero. Seven is greater than zero. This is the first place where they differ, so it decides.', hide: 'pc.col2', show: 'pc.col3', focus: ['pc.r0-3', 'pc.r1-3'] },
        { say: 'Zero point four seven is greater than zero point four zero seven. The seven thousandths at the end do not matter, because the hundredths already decided.', show: 'key' },
      ],
    },
    {
      chapter: 'On a number line',
      layout: 'center',
      main: [
        line,
        { kind: 'math', id: 'm', size: 'lg', lines: ['0.47 > 0.407'] },
      ],
      lines: [
        { say: 'A number line shows the same thing. This one runs from zero point four to zero point five, and each small step is one hundredth.', show: 'nl.axis' },
        { say: 'Zero point four zero seven is just past zero point four. It is less than one hundredth along.', show: 'nl.a', focus: 'nl.a' },
        { say: 'Zero point four seven is seven hundredths along, much closer to zero point five. It is farther to the right, so it is greater.', show: ['nl.b', 'm'], focus: ['nl.b', 'm'] },
      ],
    },
    {
      chapter: 'Watch out',
      layout: 'center',
      main: [
        { kind: 'callout', id: 'oops', tone: 'mistake', title: 'More digits does not mean bigger', md: '$0.407$ has more digits than $0.47$, but it is smaller. Line up the place values before you compare.' },
        { kind: 'math', id: 'm', size: 'lg', lines: ['407 > 47 \\quad \\text{(whole numbers)}', '0.407 < 0.47 \\quad \\text{(decimals)}'] },
      ],
      lines: [
        { say: 'Watch out for this mistake. With whole numbers, more digits means a bigger number: four hundred seven is more than forty-seven.', show: ['oops', 'm.0'], focus: 'm.0' },
        { say: 'But with decimals, that is not true. Zero point four zero seven has more digits than zero point four seven, and it is smaller.', show: 'm.1', focus: 'm.1' },
        { say: 'Digits after the decimal point are tenths, hundredths and thousandths, smaller and smaller pieces. So always line up the place values before you compare.' },
      ],
    },
    {
      chapter: 'One more example',
      layout: 'center',
      main: [
        { kind: 'text', id: 'q', size: 'md', align: 'center', md: 'Compare $2.6$ and $2.58$.' },
        chart2,
        { kind: 'math', id: 'm', size: 'lg', lines: ['2.6 > 2.58'] },
      ],
      lines: [
        { say: 'One more. Compare two point six and two point five eight.', show: 'q' },
        { say: 'Write two point six as two point six zero, so both have two decimal places.', show: ['pd.frame', 'pd.head', 'pd.row0', 'pd.row1'] },
        { say: 'The ones are both two. In the tenths place, six is greater than five. That decides it.', show: 'pd.col2', focus: ['pd.r0-2', 'pd.r1-2'] },
        { say: 'So two point six is greater than two point five eight, even though eight hundredths looks bigger than zero hundredths.', show: 'm', focus: 'm' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q',
          prompt: 'Which number is the **greatest**?',
          choices: ['$0.6$', '$0.59$', '$0.587$', '$0.5999$'],
          answer: 0,
          working: 'Write each with four decimal places: $0.6000$, $0.5900$, $0.5870$, $0.5999$. Only $0.6$ has $6$ tenths; the others have $5$ tenths.',
        },
      ],
      lines: [
        { say: 'Your turn. Which of these numbers is the greatest? Pause the video and try it.', show: 'q', wait: 6 },
        { say: 'The answer is A, zero point six. It is the only number with six tenths, and the tenths decide. Choice D has the most digits, but it has only five tenths, so it is less.', show: 'q.answer' },
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
            'Add zeros at the end so the decimals have the same number of places.',
            'Compare from left to right. The first place where the digits differ decides.',
            'More digits does **not** mean bigger: $0.47 > 0.407$.',
          ],
        },
      ],
      lines: [
        { say: 'Let’s sum up. To compare decimals, add zeros at the end so they have the same number of decimal places.', show: 'sum.0' },
        { say: 'Then compare the digits from left to right. The first place where they differ decides.', show: 'sum.1' },
        { say: 'And remember, more digits does not mean bigger. In the next part, you will compare fractions with decimals. See you there!', show: 'sum.2' },
      ],
    },
  ],
};

export default video;
