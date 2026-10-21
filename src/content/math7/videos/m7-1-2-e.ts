import type { Explainer } from '@/video/script.ts';
import { figure } from '@/video/solids.ts';
import { placeChart } from '@/content/math5/videos/lib/m5-1-figures.ts';
import { hundredGrid } from '@/content/math5/videos/lib/m5-6-figures.ts';

// 0.6, 0.45 and 0.125 in a place value chart: the last digit's place gives the denominator.
const chart = figure('pc', [
  placeChart({
    places: ['Ones', '.', 'Tenths', 'Hundredths', 'Thousandths'],
    rows: [
      ['0', '.', '6', '', ''],
      ['0', '.', '4', '5', ''],
      ['0', '.', '1', '2', '5'],
    ],
    tones: { 'r0-2': 'opp', 'r1-3': 'opp', 'r2-4': 'opp' },
  }),
], 430);

// A hundred grid in 20 blocks of 5, with 9 blocks (45 squares) shaded: 45/100 = 9/20.
const grid = figure('g', [hundredGrid({ block: [5, 1], shaded: 9, tone: 'theta', size: 0.6 })], 420);

const video: Explainer = {
  id: 'm7-1-2-e',
  lessonId: 'm7-1-2',
  title: 'Fractions and Decimals, Part 5: Terminating Decimals to Fractions',
  thumbnailTitle: 'Terminating Decimals to Fractions',
  thumbnail: 'pc',
  summary:
    'For a terminating decimal, the place value of the last digit gives the denominator; then simplify by dividing the numerator and denominator by a common factor. 0.6 = 6/10 = 3/5, 0.45 = 45/100 = 9/20, and 0.125 = 125/1000 = 1/8.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Number Relationships · Part 5', title: 'Terminating Decimals to Fractions', subtitle: 'Use place value, then simplify' }],
      lines: [
        { say: 'You can change a fraction into a decimal. Can you go back the other way? Yes, and place value does most of the work.', show: 'title' },
        { say: 'In this part, you will change decimals that stop into fractions in lowest terms.' },
      ],
    },
    {
      chapter: 'The last digit gives the denominator',
      layout: 'center',
      main: [
        chart,
        { kind: 'math', id: 'm', size: 'lg', lines: ['0.6 = \\dfrac{6}{10} \\qquad 0.45 = \\dfrac{45}{100} \\qquad 0.125 = \\dfrac{125}{1000}'] },
      ],
      lines: [
        { say: 'Look at the place of the last digit. It tells you the denominator.', show: ['pc.frame', 'pc.head'] },
        { say: 'In zero point six, the last digit is in the tenths place. So zero point six is six tenths.', show: 'pc.row0', focus: 'pc.r0-2' },
        { say: 'In zero point four five, the last digit is in the hundredths place. So it is forty-five hundredths.', show: 'pc.row1', focus: 'pc.r1-3' },
        { say: 'And in zero point one two five, the last digit is in the thousandths place. So it is one hundred twenty-five thousandths.', show: ['pc.row2', 'm'], focus: 'pc.r2-4' },
      ],
    },
    {
      chapter: 'Simplify',
      layout: 'center',
      main: [
        { kind: 'callout', id: 'key', tone: 'key', title: 'Lowest terms', md: 'To simplify, divide the numerator and the denominator by the same **common factor**. A fraction is in **lowest terms** when the only common factor left is $1$.' },
        { kind: 'math', id: 'm', size: 'lg', lines: ['\\dfrac{6}{10} = \\dfrac{6 \\div 2}{10 \\div 2} = \\dfrac{3}{5}'] },
      ],
      lines: [
        { say: 'Next, simplify. Divide the numerator and the denominator by the same common factor. A common factor is a number that divides both of them.', show: 'key' },
        { say: 'Six and ten are both even, so two is a common factor. Six divided by two is three, and ten divided by two is five. So zero point six is three fifths.', show: 'm', focus: 'm' },
        { say: 'Three and five have no common factor except one, so three fifths is in lowest terms.' },
      ],
    },
    {
      chapter: 'Writing 0.45',
      layout: 'split',
      leftWidth: 520,
      left: [grid],
      right: [{ kind: 'math', id: 'm', size: 'lg', align: 'left', lines: ['0.45 = \\dfrac{45}{100}', '= \\dfrac{45 \\div 5}{100 \\div 5}', '= \\dfrac{9}{20}'] }],
      lines: [
        { say: 'Now zero point four five. It is forty-five hundredths: forty-five out of one hundred squares.', show: ['g.grid', 'g.outline', 'g.shade', 'm.0'], focus: 'm.0' },
        { say: 'Forty-five and one hundred both end in five or zero, so five is a common factor. Divide both by five.', show: 'm.1', focus: 'm.1' },
        { say: 'Look at the grid in blocks of five squares. There are twenty blocks, and nine of them are shaded.', show: 'g.blocks' },
        { say: 'So forty-five hundredths is the same as nine twentieths. Nine and twenty have no common factor except one, so we are done.', show: 'm.2', focus: 'm.2' },
      ],
    },
    {
      chapter: 'Writing 0.125',
      layout: 'center',
      main: [
        { kind: 'math', id: 'm', size: 'lg', lines: ['0.125 = \\dfrac{125}{1000}', '\\dfrac{125}{1000} = \\dfrac{25}{200} = \\dfrac{5}{40} = \\dfrac{1}{8}', '\\dfrac{125}{1000} = \\dfrac{125 \\div 125}{1000 \\div 125} = \\dfrac{1}{8}'] },
      ],
      lines: [
        { say: 'Now zero point one two five. It is one hundred twenty-five thousandths.', show: 'm.0', focus: 'm.0' },
        { say: 'Both numbers end in five or zero, so divide both by five: twenty-five over two hundred. Again by five: five over forty. And again by five: one eighth.', show: 'm.1', focus: 'm.1' },
        { say: 'That took three steps. You can do it in one step, because one hundred twenty-five is a factor of one thousand. Divide both by one hundred twenty-five, and you get one eighth straight away.', show: 'm.2', focus: 'm.2' },
        { say: 'Either way, zero point one two five is one eighth. That matches what we found earlier in this lesson: three eighths was zero point three seven five.' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q',
          prompt: 'Write $0.24$ as a fraction in lowest terms.',
          choices: ['$\\dfrac{6}{25}$', '$\\dfrac{24}{10}$', '$\\dfrac{12}{25}$', '$\\dfrac{24}{1000}$'],
          answer: 0,
          working: 'The last digit is in the hundredths place, so $0.24 = \\dfrac{24}{100}$. Divide both by $4$: $\\dfrac{6}{25}$.',
        },
      ],
      lines: [
        { say: 'Your turn. Write zero point two four as a fraction in lowest terms. Pause the video and try it.', show: 'q', wait: 6 },
        { say: 'The answer is A, six twenty-fifths. Zero point two four is twenty-four hundredths. Divide both by four to get six twenty-fifths. Choice D uses thousandths, but the last digit is in the hundredths place.', show: 'q.answer' },
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
            'The place value of the last digit gives the denominator: $0.45 = \\dfrac{45}{100}$.',
            'Simplify by dividing both numbers by a common factor: $\\dfrac{45}{100} = \\dfrac{9}{20}$.',
            '$0.125 = \\dfrac{125}{1000} = \\dfrac{1}{8}$',
          ],
        },
      ],
      lines: [
        { say: 'Let’s sum up. To write a terminating decimal as a fraction, use the place value of the last digit as the denominator.', show: 'sum.0' },
        { say: 'Then simplify, by dividing the numerator and the denominator by a common factor, until the fraction is in lowest terms.', show: 'sum.1' },
        { say: 'Zero point one two five is one eighth. In the next part, you will change repeating decimals into fractions. See you there!', show: 'sum.2' },
      ],
    },
  ],
};

export default video;
