import type { Explainer } from '@/video/script.ts';
import { figure } from '@/video/solids.ts';
import { strip } from '@/video/numbers.ts';
import { hundred } from '@/content/math6/videos/lib/m6-12-figures.ts';

// 85% as 85 shaded squares out of 100.
const grid = (id: string) => figure(id, [hundred({ shaded: 85, tone: 'good' })], 420);

// 6 out of 15 and 2 out of 5: the same length of strip shaded.
const strips = (id: string) =>
  figure(
    id,
    [
      strip({ name: 'a', parts: 15, shaded: 6, width: 12, height: 1.2, tone: 'adj', label: '\\tfrac{6}{15}' }),
      strip({ name: 'b', parts: 5, shaded: 2, at: [0, -2], width: 12, height: 1.2, tone: 'adj', label: '\\tfrac{2}{5}' }),
    ],
    260,
  );

const video: Explainer = {
  id: 'm7-11-1-c',
  lessonId: 'm7-11-1',
  title: 'Expressing Probabilities, Part 3: Changing Forms',
  thumbnailTitle: 'Changing Forms',
  thumbnail: 'gr',
  summary:
    'A ratio a : b is the same as the fraction a/b, and a percent is a number out of 100. Write fractions in lowest terms by dividing the top and bottom by their greatest common factor. 85% = 85/100 = 17/20, or 17 : 20. A ratio of 6 : 15 is 6/15 = 2/5, and 2 ÷ 5 = 0.4 = 40%. Some fractions give decimals that never end: 1/3 = 0.333… ≈ 33%.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Probability · Part 3', title: 'Changing Forms', subtitle: 'Ratios, fractions and percents' }],
      lines: [
        { say: 'A probability might be given as a percent, but you need a fraction. Or it might be a ratio, and you want a percent.', show: 'title' },
        { say: 'In this video, you will change a probability from one form to another.' },
      ],
    },
    {
      chapter: 'How the forms connect',
      layout: 'center',
      main: [
        {
          kind: 'bullets',
          id: 'b',
          items: [
            'A ratio $a : b$ is the same as the fraction $\\dfrac{a}{b}$.',
            'A percent is a number out of $100$: $85\\% = \\dfrac{85}{100}$.',
            'Write a fraction in **lowest terms**: divide the top and the bottom by their **greatest common factor**.',
          ],
        },
      ],
      lines: [
        { say: 'The three forms are closely connected. A ratio, like two to five, is the same as the fraction two fifths.', show: 'b.0' },
        { say: 'A percent is a number out of one hundred. Eighty-five percent is eighty-five hundredths.', show: 'b.1' },
        { say: 'And always write a fraction in lowest terms. Divide the top and the bottom by their greatest common factor. That is the biggest number that divides into both of them.', show: 'b.2' },
      ],
    },
    {
      chapter: 'From a percent',
      layout: 'split',
      leftWidth: 480,
      left: [grid('gr')],
      right: [
        { kind: 'text', id: 'q', size: 'md', md: 'The probability that a sunflower seed sprouts is $85\\%$. Write it as a fraction in lowest terms, and as a ratio.' },
        { kind: 'math', id: 'm', size: 'md', align: 'left', lines: ['85\\% = \\dfrac{85}{100}', '\\dfrac{85 \\div 5}{100 \\div 5} = \\dfrac{17}{20}', '17 : 20'] },
      ],
      lines: [
        { say: 'The probability that a sunflower seed sprouts is eighty-five percent. Write it as a fraction in lowest terms, and as a ratio.', show: ['q', 'gr.grid', 'gr.shade'] },
        { say: 'Eighty-five percent means eighty-five out of one hundred, like eighty-five squares shaded on a grid of one hundred. As a fraction, that is eighty-five hundredths.', show: 'm.0', focus: 'm.0' },
        { say: 'The greatest common factor of eighty-five and one hundred is five. Eighty-five divided by five is seventeen, and one hundred divided by five is twenty. So the fraction is seventeen twentieths.', show: 'm.1', focus: 'm.1' },
        { say: 'As a ratio, that is seventeen to twenty: about seventeen seeds out of every twenty should sprout.', show: 'm.2', focus: 'm.2' },
      ],
    },
    {
      chapter: 'From a ratio',
      layout: 'center',
      main: [
        { kind: 'text', id: 'q', size: 'md', md: 'The probability that a randomly chosen student walks to school is $6 : 15$. Write it as a fraction in lowest terms, and as a percent.' },
        strips('st'),
        { kind: 'math', id: 'm', size: 'md', lines: ['\\dfrac{6}{15} = \\dfrac{6 \\div 3}{15 \\div 3} = \\dfrac{2}{5}', '2 \\div 5 = 0.4 \\to 0.4 \\times 100 = 40\\%'] },
      ],
      lines: [
        { say: 'The probability that a randomly chosen student walks to school is six to fifteen. Write it as a fraction in lowest terms, and as a percent.', show: 'q' },
        { say: 'As a fraction, six to fifteen is six fifteenths. The greatest common factor of six and fifteen is three. Six divided by three is two, and fifteen divided by three is five. So the fraction is two fifths.', show: ['st.a-frame', 'st.a-shade', 'st.a-label', 'm.0'], focus: 'm.0' },
        { say: 'The strips show why: six fifteenths and two fifths cover the same part of the whole.', show: ['st.b-frame', 'st.b-shade', 'st.b-label'], focus: ['st.a-shade', 'st.b-shade'] },
        { say: 'For the percent, two divided by five is zero point four, and zero point four times one hundred is forty percent.', show: 'm.1', focus: 'm.1' },
      ],
    },
    {
      chapter: 'Rounding a percent',
      layout: 'split',
      leftWidth: 520,
      left: [{ kind: 'calc', id: 'c', keys: '1 ÷ 3 =', result: '0.333333333' }],
      right: [
        { kind: 'callout', id: 'tip', tone: 'tip', title: 'Rounding a percent', md: 'Some fractions give a decimal that never ends, like $\\dfrac{1}{3} = 0.333\\ldots$ Use a calculator to divide, then round the percent: $\\dfrac{1}{3} \\approx 33\\%$.' },
      ],
      lines: [
        { say: 'Some fractions give a decimal that never ends. Try one third on a calculator: one divided by three.', show: 'c' },
        { say: 'The answer is zero point three three three, and the digit three repeats forever. Times one hundred, that is thirty-three point three, and so on, percent.', show: 'tip' },
        { say: 'So round the percent. One third is about thirty-three percent.' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q',
          prompt: 'The probability of rain tomorrow is $35\\%$. What is this probability as a fraction in lowest terms?',
          choices: ['$\\dfrac{7}{20}$', '$\\dfrac{35}{100}$', '$\\dfrac{7}{10}$', '$\\dfrac{3}{5}$'],
          answer: 0,
          working: '$35\\% = \\dfrac{35}{100}$. The greatest common factor of $35$ and $100$ is $5$: $\\dfrac{35 \\div 5}{100 \\div 5} = \\dfrac{7}{20}$.',
        },
      ],
      lines: [
        { say: 'Your turn. The probability of rain tomorrow is thirty-five percent. What is this probability as a fraction in lowest terms? Pause the video and try it.', show: 'q', wait: 7 },
        { say: 'The answer is A: seven twentieths. Thirty-five percent is thirty-five hundredths, and dividing the top and bottom by five gives seven twentieths. Choice B is the right amount, but it is not in lowest terms.', show: 'q.answer' },
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
          items: ['A ratio $a : b$ is the fraction $\\dfrac{a}{b}$. A percent is a number out of $100$.', 'Write fractions in lowest terms: divide by the greatest common factor.', 'To get a percent, divide, then multiply by $100$. Round a decimal that never ends.'],
        },
      ],
      lines: [
        { say: 'Let’s sum up. A ratio is the same as a fraction, and a percent is a number out of one hundred.', show: 'sum.0' },
        { say: 'Write fractions in lowest terms, by dividing the top and the bottom by their greatest common factor.', show: 'sum.1' },
        { say: 'To get a percent, divide, then multiply by one hundred, and round a decimal that never ends. In the next part, you will compare probabilities written in different forms. See you there!', show: 'sum.2' },
      ],
    },
  ],
};

export default video;
