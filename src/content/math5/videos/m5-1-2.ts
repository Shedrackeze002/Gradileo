import type { Explainer } from '@/video/script.ts';
import { figure } from '@/video/solids.ts';
import { hundredGrid, placeChart } from './lib/m5-1-figures.ts';

// 0.70 and 0.65 lined up by place: the tenths decide.
const decimals = figure('ch', [
  placeChart({
    places: ['Ones', '.', 'Tenths', 'Hundredths'],
    rows: [
      ['0', '.', '7', '0'],
      ['0', '.', '6', '5'],
    ],
    tones: { 'r0-3': 'theta', 'r0-2': 'good', 'r1-2': 'bad' },
  }),
]);

// 3 526 104 and 3 562 014: the ten thousands decide.
const whole = figure('wh', [
  placeChart({
    places: ['Millions', 'Hundred thousands', 'Ten thousands', 'Thousands', 'Hundreds', 'Tens', 'Ones'],
    rows: [
      ['3', '5', '2', '6', '1', '0', '4'],
      ['3', '5', '6', '2', '0', '1', '4'],
    ],
    tones: { 'r0-2': 'bad', 'r1-2': 'good' },
  }),
]);

// Seven tenths, and six tenths and five hundredths.
const grids = figure('gr', [
  hundredGrid({ name: 'a', size: 5, tenths: 7, label: '0.7' }),
  hundredGrid({ name: 'b', size: 5, tenths: 6, hundredths: 5, at: [7.5, 0], label: '0.65' }),
]);

const video: Explainer = {
  id: 'm5-1-2',
  lessonId: 'm5-1-2',
  title: 'Comparing, Ordering and Rounding, Part 1: Comparing Numbers',
  thumbnailTitle: 'Comparing Numbers',
  thumbnail: 'gr',
  summary: 'The symbols <, > and =, and how to compare two numbers: line up the places, then compare from the left until the digits differ. 3 526 104 < 3 562 014 and 0.7 > 0.65, because more digits does not mean bigger.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Place Value · Part 1', title: 'Comparing Numbers', subtitle: 'Which is greater?' }],
      lines: [
        { say: 'At a track meet, two runners finish in 9.48 seconds and 9.5 seconds. Which time is greater? It is easy to get this wrong!', show: 'title' },
        { say: 'In this video, you will compare numbers, and use symbols to show which one is greater.' },
      ],
    },
    {
      chapter: 'Comparison symbols',
      layout: 'center',
      main: [
        { kind: 'math', id: 'm', size: 'xl', lines: ['4 < 9', '9 > 4', '0.5 = 0.50'] },
        { kind: 'callout', id: 'tip', tone: 'tip', title: 'Which way?', md: 'The open side of $<$ or $>$ always faces the **greater** number.' },
      ],
      lines: [
        { say: 'We use three symbols to compare two numbers. This symbol means is less than. Four is less than nine.', show: 'm.0', focus: 'm.0' },
        { say: 'This symbol means is greater than. Nine is greater than four.', show: 'm.1', focus: 'm.1' },
        { say: 'And the equals sign means is equal to. 0.5 is equal to 0.50, because a zero at the right end does not change the value.', show: 'm.2', focus: 'm.2' },
        { say: 'How do you remember which way the symbol goes? The open side always faces the greater number, like a hungry mouth that wants the bigger number.', show: 'tip' },
      ],
    },
    {
      chapter: 'Compare from the left',
      layout: 'center',
      main: [
        { kind: 'bullets', id: 'b', items: ['Line up the decimal points, or the ones digits.', 'Compare place by place, starting from the **left**.', 'The first place where the digits are different decides.'] },
        whole,
      ],
      lines: [
        { say: 'To compare two numbers, line them up by place value: decimal point under decimal point, or ones under ones.', show: 'b.0' },
        { say: 'Then compare the digits place by place, starting from the left. The first place where the digits are different decides.', show: ['b.1', 'b.2'] },
        { say: 'Let’s compare three million, five hundred twenty-six thousand, one hundred four, and three million, five hundred sixty-two thousand, fourteen.', show: ['wh.frame', 'wh.head', 'wh.row0', 'wh.row1'] },
        { say: 'The millions are the same. The hundred thousands are the same. In the ten thousands, two is less than six. That place decides, so the first number is less than the second.', show: 'wh.col2', focus: 'wh.col2' },
      ],
    },
    {
      chapter: 'Comparing decimals',
      layout: 'center',
      main: [decimals, { kind: 'math', id: 'm', size: 'lg', lines: ['0.7 > 0.65'] }],
      lines: [
        { say: 'Now compare 0.7 and 0.65. First, add a zero, so both numbers have two decimal places. 0.7 becomes 0.70, which has the same value.', show: ['ch.frame', 'ch.head', 'ch.row0', 'ch.row1'], focus: 'ch.col3' },
        { say: 'Now compare from the left. The ones digits are both zero. The tenths digits are seven and six.', show: 'ch.col2', focus: 'ch.col2' },
        { say: 'Seven is greater than six, so 0.70 is greater. We write 0.7 is greater than 0.65.', show: 'm.0', focus: 'm.0' },
      ],
    },
    {
      chapter: 'More digits, not bigger',
      layout: 'center',
      main: [
        { kind: 'callout', id: 'oops', tone: 'mistake', title: 'More digits does not mean bigger', md: '$0.65$ has more digits than $0.7$, but it is smaller. Compare the places, not the number of digits.' },
        grids,
      ],
      lines: [
        { say: 'Be careful! 0.65 has more digits than 0.7, but it is smaller.', show: 'oops' },
        { say: 'Look at the grids. Seven tenths fills seven strips out of ten.', show: ['gr.a-frame', 'gr.a-cols', 'gr.a-tenths', 'gr.a-label'], focus: 'gr.a-tenths' },
        { say: 'Six tenths and five hundredths fills six strips, and just five small squares of the next strip. That is less.', show: ['gr.b-frame', 'gr.b-cols', 'gr.b-rows', 'gr.b-tenths', 'gr.b-hundredths', 'gr.b-label'], focus: ['gr.b-tenths', 'gr.b-hundredths'] },
        { say: 'So always compare the places, not the number of digits. And back at the track meet, 9.5 seconds is greater than 9.48 seconds.' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q',
          prompt: 'Compare $0.8$ and $0.75$. Which is true?',
          choices: ['$0.8 > 0.75$', '$0.8 < 0.75$', '$0.8 = 0.75$', '$0.75 > 0.8$'],
          answer: 0,
          working: 'Write $0.8$ as $0.80$. The tenths digits are $8$ and $7$, and $8 > 7$, so $0.8 > 0.75$.',
        },
      ],
      lines: [
        { say: 'Your turn. Compare 0.8 and 0.75. Which is true? Pause the video and try it.', show: 'q', wait: 6 },
        { say: 'The answer is A. Write 0.8 as 0.80. The tenths digits are eight and seven, and eight is greater, so 0.8 is greater than 0.75. Choice B thinks that more digits means a bigger number.', show: 'q.answer' },
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
          items: ['$<$ is less than, $>$ is greater than, $=$ is equal to.', 'Line up the places, then compare from the left. The first different digit decides.', 'More digits does not mean bigger: $0.7 > 0.65$.'],
        },
      ],
      lines: [
        { say: 'Let’s sum up. The three symbols mean is less than, is greater than, and is equal to.', show: 'sum.0' },
        { say: 'To compare, line up the places, then compare from the left. The first place where the digits are different decides.', show: 'sum.1' },
        { say: 'And more digits does not mean bigger. In the next part, we put decimals on a number line. See you there!', show: 'sum.2' },
      ],
    },
  ],
};

export default video;
