import type { Explainer } from '@/video/script.ts';
import { figure } from '@/video/solids.ts';
import { vertical } from '@/content/math6/videos/lib/m6-1-figures.ts';
import { ratLine } from './lib/m9-3-figures.ts';

// From −1 to 0 in twelfths: −3/4 is −9/12 and −2/3 is −8/12.
const twelfths = (id: string) =>
  figure(
    id,
    [
      ratLine({
        min: -1,
        max: 0,
        step: 1 / 12,
        numbers: [
          { value: -1, tex: '-1' },
          { value: 0, tex: '0' },
        ],
        points: [
          { id: 'a', value: -9 / 12, tex: '-\\tfrac{3}{4}', tone: 'opp' },
          { id: 'b', value: -8 / 12, tex: '-\\tfrac{2}{3}', tone: 'adj' },
          { id: 'a12', value: -9 / 12, tex: '-\\tfrac{9}{12}', tone: 'opp', below: true },
          { id: 'b12', value: -8 / 12, tex: '-\\tfrac{8}{12}', tone: 'adj', below: true },
        ],
      }),
    ],
    300,
  );

// From −1 to 0 in twentieths: −0.75 and −0.7.
const decimals = (id: string) =>
  figure(
    id,
    [
      ratLine({
        min: -1,
        max: 0,
        step: 0.05,
        numbers: [
          { value: -1, tex: '-1' },
          { value: -0.5, tex: '-0.5' },
          { value: 0, tex: '0' },
        ],
        points: [
          { id: 'a', value: -0.75, tex: '-0.75', tone: 'opp', below: true },
          { id: 'b', value: -0.7, tex: '-0.7', tone: 'adj' },
        ],
      }),
    ],
    260,
  );

// A thermometer with −20 °C and −5 °C marked.
const thermo = (id: string) =>
  figure(
    id,
    [
      vertical({
        min: -25,
        max: 5,
        step: 5,
        unit: 0.3,
        tube: true,
        points: [
          { id: 'cold', value: -20, tex: '-20^\\circ\\text{C}', tone: 'adj' },
          { id: 'cool', value: -5, tex: '-5^\\circ\\text{C}', tone: 'opp' },
        ],
      }),
    ],
    520,
  );

const video: Explainer = {
  id: 'm9-3-1-b',
  lessonId: 'm9-3-1',
  title: 'Comparing and Ordering Rational Numbers, Part 2: Comparing Rational Numbers',
  thumbnailTitle: 'Comparing Rational Numbers',
  thumbnail: 'tw',
  summary:
    'Numbers increase from left to right on a number line. To compare two rational numbers, write them in the same form: as decimals (−3/4 = −0.75, which is less than −0.7) or as fractions with a common denominator (−2/3 = −10/15 is less than −3/5 = −9/15). For negative numbers, the one farther from zero is less, even when its digits are bigger: −20 °C is colder than −5 °C, and −12.5 < −12 1/4.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Rational Numbers · Part 2', title: 'Comparing Rational Numbers', subtitle: 'Which is greater?' }],
      lines: [
        { say: 'Which is greater: negative three quarters, or negative two thirds? Negative numbers can be tricky to compare, especially when they are fractions.', show: 'title' },
        { say: 'In this part, you will compare rational numbers on a number line, as decimals, and with a common denominator.' },
      ],
    },
    {
      chapter: 'Left is less',
      layout: 'center',
      main: [twelfths('tw'), { kind: 'math', id: 'm', size: 'lg', lines: ['-\\dfrac{3}{4} < -\\dfrac{2}{3}'] }],
      lines: [
        { say: 'Numbers increase from left to right on a number line. A number to the left of another is always less.' },
        { say: 'Here is the part of the line from negative one to zero, cut into twelve equal steps. Each step is one twelfth.', show: 'tw.axis' },
        { say: 'Three quarters is the same as nine twelfths. So negative three quarters is nine steps to the left of zero.', show: ['tw.a', 'tw.a12'], focus: ['tw.a', 'tw.a12'] },
        { say: 'Two thirds is eight twelfths. So negative two thirds is eight steps to the left of zero.', show: ['tw.b', 'tw.b12'], focus: ['tw.b', 'tw.b12'] },
        { say: 'Negative three quarters is farther left, so it is less. Negative three quarters is less than negative two thirds.', show: 'm.0', focus: 'm.0' },
      ],
    },
    {
      chapter: 'Compare as decimals',
      layout: 'center',
      main: [
        { kind: 'text', id: 'q', size: 'md', md: 'Which is greater, $-\\dfrac{3}{4}$ or $-0.7$?' },
        decimals('dl'),
        { kind: 'math', id: 'm', size: 'lg', lines: ['-\\dfrac{3}{4} = -0.75', '-0.7 > -\\dfrac{3}{4}'] },
      ],
      lines: [
        { say: 'To compare two numbers, write them in the same form. Which is greater, negative three quarters or negative zero point seven?', show: 'q' },
        { say: 'Write negative three quarters as a decimal. Three divided by four is zero point seven five, so negative three quarters is negative zero point seven five.', show: 'm.0', focus: 'm.0' },
        { say: 'On the number line, negative zero point seven five is farther left than negative zero point seven, because it is farther from zero.', show: ['dl.axis', 'dl.a', 'dl.b'] },
        { say: 'So negative zero point seven is greater than negative three quarters.', show: 'm.1', focus: 'm.1' },
      ],
    },
    {
      chapter: 'Bigger digits, smaller number',
      layout: 'split',
      leftWidth: 420,
      left: [thermo('th')],
      right: [
        { kind: 'callout', id: 'oops', tone: 'mistake', title: 'Bigger digits, smaller number', md: 'For negative numbers, a greater size means a **smaller** number: $-0.75 < -0.7$, even though $75$ is bigger than $70$.' },
        { kind: 'math', id: 'm', size: 'md', align: 'left', lines: ['-20 < -5'] },
      ],
      lines: [
        { say: 'Watch out for this mistake. Seventy-five is bigger than seventy, so it is tempting to think that negative zero point seven five is the greater number. It is not.', show: 'oops' },
        { say: 'For negative numbers, a bigger size means a smaller number. Think of temperatures. Negative twenty degrees is much colder than negative five degrees.', show: ['th.axis', 'th.cold', 'th.cool'] },
        { say: 'Twenty is bigger than five, but negative twenty is less than negative five. On the negative side, the number farther from zero is the smaller one.', show: 'm.0', focus: 'm.0' },
      ],
    },
    {
      chapter: 'A common denominator',
      layout: 'center',
      main: [
        { kind: 'text', id: 'q', size: 'md', md: 'Compare $-\\dfrac{2}{3}$ and $-\\dfrac{3}{5}$.' },
        { kind: 'math', id: 'm', size: 'lg', lines: ['-\\dfrac{2}{3} = -\\dfrac{10}{15}', '-\\dfrac{3}{5} = -\\dfrac{9}{15}', '-\\dfrac{10}{15} < -\\dfrac{9}{15}, \\quad \\text{so} \\quad {-\\dfrac{2}{3}} < -\\dfrac{3}{5}'] },
      ],
      lines: [
        { say: 'You can also compare fractions with a common denominator: the same number on the bottom of both. Compare negative two thirds and negative three fifths.', show: 'q' },
        { say: 'Fifteen is a multiple of both three and five, so use fifteen. Two thirds is ten fifteenths, so negative two thirds is negative ten fifteenths.', show: 'm.0', focus: 'm.0' },
        { say: 'Three fifths is nine fifteenths, so negative three fifths is negative nine fifteenths.', show: 'm.1', focus: 'm.1' },
        { say: 'Negative ten fifteenths is farther from zero, so it is less. Negative two thirds is less than negative three fifths.', show: 'm.2', focus: 'm.2' },
      ],
    },
    {
      chapter: 'Which town was colder?',
      layout: 'center',
      main: [
        { kind: 'text', id: 'q', size: 'md', md: 'First town: $-12.5^\\circ\\text{C}$. Second town: $-12\\tfrac{1}{4}\\,^\\circ\\text{C}$. Which town was colder?' },
        { kind: 'math', id: 'm', size: 'lg', lines: ['-12\\tfrac{1}{4} = -12.25', '-12.5 < -12.25'] },
      ],
      lines: [
        { say: 'Back to the winter morning. It was negative twelve point five degrees in the first town, and negative twelve and one quarter degrees in the second town.', show: 'q' },
        { say: 'Write the mixed number as a decimal. One quarter is zero point two five, so negative twelve and one quarter is negative twelve point two five.', show: 'm.0', focus: 'm.0' },
        { say: 'Negative twelve point five is farther from zero than negative twelve point two five, so it is less. The first town was colder.', show: 'm.1', focus: 'm.1' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q',
          prompt: 'Which of these numbers is the greatest?',
          choices: ['$-\\dfrac{5}{6}$', '$-0.9$', '$-\\dfrac{7}{8}$', '$-0.8$'],
          answer: 3,
          working: 'As decimals: $-\\tfrac{5}{6} = -0.833\\ldots$, $-0.9$, $-\\tfrac{7}{8} = -0.875$ and $-0.8$. The greatest is the one closest to $0$: $-0.8$.',
        },
      ],
      lines: [
        { say: 'Your turn. Which of these numbers is the greatest? Pause the video and try it.', show: 'q', wait: 6 },
        { say: 'The answer is D, negative zero point eight. As decimals, the others are about negative zero point eight three, negative zero point nine, and negative zero point eight seven five. Negative zero point eight is the closest to zero. Choice B has the biggest digits, but it is the farthest from zero, so it is the least.', show: 'q.answer' },
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
            'Numbers increase from left to right on a number line.',
            'To compare, write the numbers in the same form: both as decimals, or as fractions with a common denominator.',
            'For negative numbers, the one farther from $0$ is less: $-0.75 < -0.7$.',
          ],
        },
      ],
      lines: [
        { say: 'Let’s sum up. Numbers increase from left to right on a number line.', show: 'sum.0' },
        { say: 'To compare two numbers, write them in the same form: both as decimals, or as fractions with a common denominator.', show: 'sum.1' },
        { say: 'And for negative numbers, the one farther from zero is less, even when its digits are bigger. In the next part, you will put several rational numbers in order. See you there!', show: 'sum.2' },
      ],
    },
  ],
};

export default video;
