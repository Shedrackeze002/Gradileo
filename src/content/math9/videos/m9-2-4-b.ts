import type { Explainer } from '@/video/script.ts';
import { figure } from '@/video/solids.ts';
import { pattern } from '@/video/numbers.ts';
import { tag } from './lib/m9-1-figures.ts';

// 50 cells doubling every 20 minutes, for 2 hours: six doublings.
const cells = figure(
  'pt',
  [
    pattern({
      top: ['0', '20', '40', '60', '80', '100', '120'],
      values: ['50', '100', '200', '400', '800', '1{,}600', '3{,}200'],
      step: '\\times 2',
      gap: 1.8,
    }),
    tag('t-name', [-0.9, 1.3], '\\text{minutes}', { place: 'left', tone: 'brand' }),
    tag('v-name', [-0.9, 0], '\\text{cells}', { place: 'left', tone: 'ink' }),
    { points: { room: [-3.4, 0] }, items: [] },
  ],
  300,
);

const video: Explainer = {
  id: 'm9-2-4-b',
  lessonId: 'm9-2-4',
  title: 'Using Exponents to Solve Problems, Part 2: Doubling',
  thumbnailTitle: 'Doubling',
  thumbnail: 'pt',
  summary:
    'When an amount doubles again and again, each doubling multiplies it by 2, so after n doublings it has been multiplied by 2ⁿ. A sample of 50 bacteria cells that doubles every 20 minutes doubles 120 ÷ 20 = 6 times in 2 hours, so it grows to 50 × 2⁶ = 50 × 64 = 3200 cells. The exponent is the number of doublings, not the number of minutes or hours.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Powers and Exponent Laws · Part 2', title: 'Doubling', subtitle: 'Each doubling multiplies by two' }],
      lines: [
        { say: 'In a warm kitchen, some bacteria can double in number every twenty minutes. A few cells can become thousands in an afternoon.', show: 'title' },
        { say: 'In this part, you will use powers of two to work out how fast a doubling amount grows.' },
      ],
    },
    {
      chapter: 'Doubling again and again',
      layout: 'center',
      main: [
        {
          kind: 'table',
          id: 't',
          head: ['Time (min)', 'Doublings', 'Cells'],
          rows: [
            ['$0$', '$0$', '$50$'],
            ['$20$', '$1$', '$50 \\times 2 = 100$'],
            ['$40$', '$2$', '$50 \\times 2^2 = 200$'],
            ['$60$', '$3$', '$50 \\times 2^3 = 400$'],
          ],
        },
      ],
      lines: [
        { say: 'A sample starts with fifty bacteria cells, and the number doubles every twenty minutes. At the start, there are fifty cells, with no doublings yet.', show: 't.0', focus: 't.0' },
        { say: 'After twenty minutes, the number has doubled once: fifty times two, or one hundred cells.', show: 't.1', focus: 't.1' },
        { say: 'After forty minutes, it has doubled twice: fifty times two times two. That is fifty times two squared, or two hundred cells.', show: 't.2', focus: 't.2' },
        { say: 'After an hour, it has doubled three times: fifty times two cubed, or four hundred cells. The exponent is the number of doublings.', show: 't.3', focus: 't.3' },
      ],
    },
    {
      chapter: 'After two hours',
      layout: 'center',
      main: [
        { kind: 'text', id: 'q', size: 'md', align: 'center', md: 'A sample starts with $50$ bacteria cells. The number doubles every $20$ minutes. How many cells are there after $2$ hours?' },
        cells,
        { kind: 'math', id: 'm', size: 'lg', lines: ['2\\text{ h} = 120\\text{ min}, \\quad 120 \\div 20 = 6 \\text{ doublings}', '50 \\times 2^6 = 50 \\times 64 = 3200'] },
      ],
      lines: [
        { say: 'How many cells are there after two hours? First, count the doublings. Two hours is one hundred twenty minutes, and one hundred twenty divided by twenty is six. So there are six doublings.', show: ['q', 'm.0'], focus: 'm.0' },
        { say: 'Here they are, one every twenty minutes: fifty, one hundred, two hundred, four hundred, eight hundred, one thousand six hundred, and three thousand two hundred.', show: ['pt.t-name', 'pt.v-name', 'pt.c0', 'pt.c1', 'pt.c2', 'pt.c3', 'pt.c4', 'pt.c5', 'pt.c6'] },
        { say: 'With a power, it is quicker. Six doublings multiply by two to the power of six, which is sixty-four. Fifty times sixty-four is three thousand two hundred.', show: 'm.1', focus: 'm.1' },
        { say: 'There are three thousand two hundred cells after two hours.' },
      ],
    },
    {
      chapter: 'The rule',
      layout: 'center',
      main: [
        { kind: 'callout', id: 'key', tone: 'key', title: 'Doubling', md: 'After $n$ doublings, an amount has been multiplied by $2^n$: $\\text{amount} = \\text{start} \\times 2^n$.' },
        { kind: 'callout', id: 'tip', tone: 'tip', title: 'Count the doublings first', md: 'The exponent is the number of **doublings**, not the number of minutes or hours. Divide the total time by the doubling time.' },
      ],
      lines: [
        { say: 'Here is the rule. Each doubling multiplies the amount by two. So after n doublings, the amount has been multiplied by two to the power of n.', show: 'key' },
        { say: 'The new amount is the starting amount times two to the power of n.' },
        { say: 'Be careful with the exponent. It is the number of doublings, not the number of minutes or hours. Divide the total time by the doubling time first.', show: 'tip' },
      ],
    },
    {
      chapter: 'Minutes are not doublings',
      layout: 'center',
      main: [
        { kind: 'callout', id: 'oops', tone: 'mistake', title: 'Using the time as the exponent', md: 'After $2$ hours, the cells are **not** $50 \\times 2^2$ or $50 \\times 2^{120}$. The time is $2$ hours, or $120$ minutes, but the number of doublings is $6$.' },
        { kind: 'math', id: 'm', size: 'lg', lines: ['\\bad{50 \\times 2^2 = 200}', '\\good{50 \\times 2^6 = 3200}'] },
      ],
      lines: [
        { say: 'Here is a common mistake. The question says two hours, so it is tempting to use two as the exponent.', show: 'oops' },
        { say: 'But fifty times two squared is only two hundred, which is the number after just forty minutes.', show: 'm.0', focus: 'm.0' },
        { say: 'The cells double every twenty minutes, so in two hours they double six times. The exponent is six.', show: 'm.1', focus: 'm.1' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q',
          prompt: 'A sample starts with $30$ cells. The number doubles every $15$ minutes. How many cells are there after $1$ hour?',
          choices: ['$120$', '$1800$', '$480$', '$960$'],
          answer: 2,
          working: '$1$ hour is $60$ minutes, and $60 \\div 15 = 4$ doublings. $30 \\times 2^4 = 30 \\times 16 = 480$.',
        },
      ],
      lines: [
        { say: 'Your turn. A sample starts with thirty cells. The number doubles every fifteen minutes. How many cells are there after one hour? Pause the video and try it.', show: 'q', wait: 8 },
        { say: 'The answer is C, four hundred eighty. One hour is sixty minutes, which is four doublings. Thirty times two to the power of four is thirty times sixteen. Choice A, one hundred twenty, multiplies by four, the number of doublings, instead of by two to the power of four.', show: 'q.answer' },
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
            'Each doubling multiplies an amount by $2$; after $n$ doublings, by $2^n$.',
            'Find $n$ by dividing the total time by the doubling time: $120 \\div 20 = 6$.',
            '$50$ cells doubling $6$ times: $50 \\times 2^6 = 3200$.',
          ],
        },
      ],
      lines: [
        { say: 'Let’s sum up. Each doubling multiplies an amount by two, so after n doublings, it has been multiplied by two to the power of n.', show: 'sum.0' },
        { say: 'Find the number of doublings by dividing the total time by the doubling time.', show: 'sum.1' },
        { say: 'Fifty cells doubling six times make three thousand two hundred. In the next part, you will see how a story spreads when it is shared in rounds. See you there!', show: 'sum.2' },
      ],
    },
  ],
};

export default video;
