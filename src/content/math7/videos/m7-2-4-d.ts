import type { Explainer } from '@/video/script.ts';
import { figure } from '@/video/solids.ts';
import { strip } from '@/video/numbers.ts';
import { dotGroups } from '@/content/math6/videos/lib/m6-4-figures.ts';
import { tag } from './lib/m7-2-figures.ts';

// 36 counters in 4 equal groups of 9: one group is 25%.
const quarters = figure('dg', [dotGroups({ groups: 4, size: 9, cols: 3, tones: ['good', 'muted', 'muted', 'muted'], labels: ['9', '9', '9', '9'] })], 300);

// 64 as a bar cut into ten parts of 6.4: one part is 10%, half a part is 5%.
const tenths = figure('st', [
  strip({ name: 'a', parts: 10, shaded: 1, width: 14, height: 1.2, pieces: '6.4', tone: 'adj' }),
  strip({ name: 'b', parts: 20, shaded: 1, from: 2, width: 14, height: 1.2, tone: 'opp' }),
  tag('whole', [7, 1.75], '64', { place: 'above' }),
  tag('ten', [0.7, -0.35], '10\\%', { place: 'below', tone: 'adj' }),
  tag('five', [1.75, -0.35], '5\\%', { place: 'below', tone: 'opp' }),
], 260);

const video: Explainer = {
  id: 'm7-2-4-d',
  lessonId: 'm7-2-4',
  title: 'Percents, Fractions and Decimals, Part 4: Percent of a Number',
  thumbnailTitle: 'Percent of a Number',
  thumbnail: 'st',
  summary:
    'Three ways to find a percent of a number: use a benchmark fraction (25% of 36 is 36 ÷ 4 = 9), build it from 10% and 5% (15% of 64 is 6.4 + 3.2 = 9.6), or change the percent to a decimal and multiply (35% of 240 is 0.35 × 240 = 84, a little more than a third of 240).',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Decimals and Percents · Part 4', title: 'Percent of a Number', subtitle: 'Three ways to find it' }],
      lines: [
        { say: 'Twenty-five percent of the class. Fifteen percent of a bill. Thirty-five percent of the students. How do you find a percent of a number?', show: 'title' },
        { say: 'In this part, you will learn three ways, and when each one is handy.' },
      ],
    },
    {
      chapter: 'Three ways',
      layout: 'center',
      main: [
        {
          kind: 'bullets',
          id: 'b',
          items: ['Use a **benchmark fraction**: $25\\% = \\dfrac{1}{4}$, $50\\% = \\dfrac{1}{2}$.', 'Build it from $10\\%$ (divide by $10$) and $5\\%$ (half of $10\\%$).', 'Change the percent to a **decimal** and multiply.'],
        },
      ],
      lines: [
        { say: 'Here are three ways to find a percent of a number.', show: 'b' },
        { say: 'One: use a benchmark fraction, like twenty-five percent is one quarter, and fifty percent is one half.', focus: 'b.0' },
        { say: 'Two: build it from ten percent and five percent. These are easy to find in your head.', focus: 'b.1' },
        { say: 'Three: change the percent to a decimal, and multiply. This one works for any percent, and a calculator helps.', focus: 'b.2' },
      ],
    },
    {
      chapter: 'A benchmark',
      layout: 'split',
      leftWidth: 620,
      left: [quarters],
      right: [
        { kind: 'text', id: 'q', size: 'md', md: 'What is $25\\%$ of $36$?' },
        { kind: 'math', id: 'm', size: 'lg', align: 'left', lines: ['25\\% = \\dfrac{1}{4}', '36 \\div 4 = 9'] },
      ],
      lines: [
        { say: 'What is twenty-five percent of thirty-six?', show: 'q' },
        { say: 'Twenty-five percent is twenty-five hundredths, which is one quarter. So to find one quarter of thirty-six, divide it by four.', show: 'm.0', focus: 'm.0' },
        { say: 'Share thirty-six counters into four equal groups. Each group has nine. One of the four groups is twenty-five percent.', show: ['dg.g0', 'dg.g1', 'dg.g2', 'dg.g3', 'dg.labels', 'm.1'], focus: ['dg.g0', 'm.1'] },
        { say: 'So twenty-five percent of thirty-six is nine.' },
      ],
    },
    {
      chapter: 'Using 10% and 5%',
      layout: 'center',
      main: [
        { kind: 'text', id: 'q', size: 'md', align: 'center', md: 'Find $15\\%$ of $64$ with mental math.' },
        tenths,
        { kind: 'math', id: 'm', size: 'lg', lines: ['10\\% \\text{ of } 64 = 64 \\div 10 = 6.4', '5\\% = \\text{half of } 6.4 = 3.2', '15\\% = 6.4 + 3.2 = 9.6'] },
      ],
      lines: [
        { say: 'Find fifteen percent of sixty-four in your head. Fifteen percent is ten percent plus five percent.', show: 'q' },
        { say: 'Picture sixty-four as a bar, cut into ten equal parts. Each part is one tenth, or ten percent. Sixty-four divided by ten is six point four.', show: ['st.a-frame', 'st.a-pieces', 'st.whole'] },
        { say: 'So ten percent of sixty-four is six point four.', show: ['st.a-shade', 'st.ten', 'm.0'], focus: ['st.a-shade', 'm.0'] },
        { say: 'Five percent is half of ten percent. Half of six point four is three point two.', show: ['st.b-shade', 'st.five', 'm.1'], focus: ['st.b-shade', 'm.1'] },
        { say: 'Add them: six point four plus three point two is nine point six. So fifteen percent of sixty-four is nine point six.', show: 'm.2', focus: 'm.2' },
      ],
    },
    {
      chapter: 'With a calculator',
      layout: 'center',
      main: [
        { kind: 'text', id: 'q', size: 'md', align: 'center', md: '$35\\%$ of the $240$ students at a school take the bus. How many students take the bus?' },
        { kind: 'math', id: 'm', size: 'lg', lines: ['\\text{Estimate: } \\tfrac13 \\text{ of } 240 = 80', '35\\% = 0.35', '0.35 \\times 240 = 84'] },
        { kind: 'text', id: 'a', size: 'md', align: 'center', md: '$84$ students take the bus.' },
      ],
      lines: [
        { say: 'Thirty-five percent of the two hundred forty students at a school take the bus. How many students take the bus?', show: 'q' },
        { say: 'Estimate first. Thirty-five percent is a little more than one third, which is about thirty-three percent. One third of two hundred forty is eighty, so expect a little more than eighty.', show: 'm.0', focus: 'm.0' },
        { say: 'Now change the percent to a decimal. Thirty-five percent is zero point three five.', show: 'm.1', focus: 'm.1' },
        { say: 'Multiply: zero point three five times two hundred forty is eighty-four. So eighty-four students take the bus, a little more than eighty, just as we expected.', show: ['m.2', 'a'], focus: 'm.2' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q',
          prompt: 'Find $15\\%$ of $80$.',
          choices: ['$15$', '$1.2$', '$8$', '$12$'],
          answer: 3,
          working: '$10\\%$ of $80$ is $8$, and $5\\%$ is half of that, $4$. So $15\\%$ of $80$ is $8 + 4 = 12$. Check: $0.15 \\times 80 = 12$.',
        },
      ],
      lines: [
        { say: 'Your turn. Find fifteen percent of eighty. Pause the video and try it.', show: 'q', wait: 6 },
        { say: 'The answer is D, twelve. Ten percent of eighty is eight, and five percent is half of that, which is four. Eight plus four is twelve. Choice C is only ten percent.', show: 'q.answer' },
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
          items: ['Benchmark: $25\\%$ of $36$ is $36 \\div 4 = 9$.', 'From $10\\%$ and $5\\%$: $15\\%$ of $64$ is $6.4 + 3.2 = 9.6$.', 'As a decimal: $35\\%$ of $240$ is $0.35 \\times 240 = 84$.'],
        },
      ],
      lines: [
        { say: 'Let’s sum up. To find a percent of a number, you can use a benchmark fraction, like one quarter for twenty-five percent.', show: 'sum.0' },
        { say: 'You can build it from ten percent and five percent, in your head.', show: 'sum.1' },
        { say: 'Or you can change the percent to a decimal and multiply. In the next lesson, you will use percents to solve problems with discounts, taxes and tips. See you there!', show: 'sum.2' },
      ],
    },
  ],
};

export default video;
