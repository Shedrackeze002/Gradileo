import type { Explainer } from '@/video/script.ts';
import { figure } from '@/video/solids.ts';
import { poly } from './lib/mx-figures.ts';

const video: Explainer = {
  id: 'mx-7-2',
  lessonId: 'mx-7-2',
  title: 'Upper and Lower Bounds in Calculations',
  thumbnailTitle: 'Bounds in Calculations',
  thumbnail: 'r',
  summary: 'To make a sum or product as big as possible, use both upper bounds; for a difference or quotient, use the upper bound of the first number and the lower bound of the second. A cyclist who rides 200 m (to the nearest 10 m) in 25.4 s (to 1 dp) has a speed of at most 205 ÷ 25.35 ≈ 8.09 m/s.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Accuracy and Recurring Decimals', title: 'Upper and Lower Bounds', subtitle: 'How big or small can an answer be?' }],
      lines: [
        { say: 'When we calculate with rounded measurements, the answer is uncertain too.', show: 'title' },
        { say: 'In this video, you will learn to find the largest and smallest values a calculation could have: its upper and lower bounds.' },
      ],
    },
    {
      chapter: 'Adding and multiplying',
      layout: 'split',
      leftWidth: 620,
      left: [figure('r', [poly('rect', [[0, 0], [8, 0], [8, 5], [0, 5]], 'adj', [{ at: 0, tex: '8\\text{ cm}', tone: 'adj' }, { at: 1, tex: '5\\text{ cm}', tone: 'opp' }])], 420)],
      right: [
        { kind: 'math', id: 'm', size: 'md', lines: ['7.5 \\le l < 8.5', '4.5 \\le w < 5.5', '\\text{Upper: } 8.5 \\times 5.5 = 46.75', '\\text{Lower: } 7.5 \\times 4.5 = 33.75'] },
      ],
      lines: [
        { say: 'A rectangle is eight centimetres by five centimetres, each to the nearest centimetre. Find the upper and lower bounds of its area.', show: 'r' },
        { say: 'First, write the bounds of each measurement. The length is from seven point five up to eight point five, and the width from four point five up to five point five.', show: ['m.0', 'm.1'], focus: ['m.0', 'm.1'] },
        { say: 'To make the area as big as possible, multiply the two biggest values: eight point five times five point five is forty six point seven five square centimetres.', show: 'm.2', focus: 'm.2' },
        { say: 'To make it as small as possible, multiply the two smallest: seven point five times four point five is thirty three point seven five. Adding works the same way: both upper bounds give the upper bound of a sum.', show: 'm.3', focus: 'm.3' },
      ],
    },
    {
      chapter: 'Subtracting and dividing',
      layout: 'center',
      main: [
        { kind: 'table', id: 't', head: ['To find the…', 'of $a - b$', 'of $a \\div b$'], rows: [['upper bound', 'upper of $a$ $-$ lower of $b$', 'upper of $a$ $\\div$ lower of $b$'], ['lower bound', 'lower of $a$ $-$ upper of $b$', 'lower of $a$ $\\div$ upper of $b$']] },
        { kind: 'text', id: 'why', md: 'Taking away a **smaller** number, or dividing by a **smaller** number, gives a **bigger** answer.' },
      ],
      lines: [
        { say: 'Subtracting and dividing work the other way round for the second number.', show: 't' },
        { say: 'Taking away a smaller number leaves more. And dividing by a smaller number gives a bigger answer: twelve divided by two is more than twelve divided by four.', show: 'why' },
        { say: 'So for the upper bound of a minus b, or a divided by b, use the upper bound of a and the lower bound of b.', show: 't.0', focus: 't.0' },
        { say: 'And for the lower bound, use the lower bound of a and the upper bound of b.', show: 't.1', focus: 't.1' },
      ],
    },
    {
      chapter: 'A speed',
      layout: 'center',
      main: [
        { kind: 'math', id: 'm', size: 'md', lines: ['195 \\le d < 205 \\qquad 25.35 \\le t < 25.45', '\\text{speed} = \\frac{d}{t}', '\\text{Upper: } \\frac{205}{25.35} = 8.0867\\ldots \\approx 8.09\\text{ m/s}', '\\text{Lower: } \\frac{195}{25.45} = 7.6620\\ldots \\approx 7.66\\text{ m/s}'] },
        { kind: 'callout', id: 'oops', tone: 'mistake', title: 'Not both upper bounds', md: '$205 \\div 25.45$ is **smaller** than $205 \\div 25.35$, because dividing by a bigger number makes the answer smaller.' },
      ],
      lines: [
        { say: 'A cyclist rides two hundred metres, to the nearest ten metres, in twenty five point four seconds, to one decimal place. Find the bounds of the average speed.', show: 'm.0', focus: 'm.0' },
        { say: 'The distance is from one hundred ninety five up to two hundred five metres. The time is from twenty five point three five up to twenty five point four five seconds.' },
        { say: 'Speed is distance divided by time.', show: 'm.1', focus: 'm.1' },
        { say: 'The fastest speed is the longest distance in the shortest time: two hundred five divided by twenty five point three five, which is about eight point zero nine metres per second.', show: 'm.2', focus: 'm.2' },
        { say: 'The slowest is the shortest distance in the longest time: one hundred ninety five divided by twenty five point four five, about seven point six six.', show: 'm.3', focus: 'm.3' },
        { say: 'A common mistake is to use both upper bounds. Dividing by the bigger time gives a smaller answer, so that is not the upper bound.', show: 'oops' },
      ],
    },
    {
      chapter: 'A sensible answer',
      layout: 'center',
      main: [
        { kind: 'math', id: 'm', size: 'lg', lines: ['8.09 \\to 8 \\qquad 7.66 \\to 8', '\\text{speed} \\approx 8\\text{ m/s}'] },
      ],
      lines: [
        { say: 'How accurately can we give the speed? Round both bounds to the same accuracy and see where they agree. To one significant figure, eight point zero nine and seven point six six both round to eight.', show: 'm.0', focus: 'm.0' },
        { say: 'So we can say the speed is about eight metres per second. To two significant figures they disagree, so that would claim more accuracy than the measurements have.', show: 'm.1', focus: 'm.1' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q',
          prompt: '$a = 20$ and $b = 6$, each to the nearest whole number. What is the upper bound of $a - b$?',
          choices: ['$14$', '$13$', '$14.5$', '$15$'],
          answer: 3,
          working: 'Use the upper bound of $a$ and the lower bound of $b$: $20.5 - 5.5 = 15$.',
        },
      ],
      lines: [
        { say: 'Your turn. a is twenty and b is six, each to the nearest whole number. What is the upper bound of a minus b? Pause the video and try it.', show: 'q', wait: 6 },
        { say: 'The answer is D. Take the upper bound of a, twenty point five, and subtract the lower bound of b, five point five. That gives fifteen. Choice B uses the lower bound of a and the upper bound of b, which gives the lower bound.', show: 'q.answer' },
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
          items: ['Write the bounds of each measurement first.', 'For $a + b$ and $a \\times b$: both upper bounds, or both lower bounds.', 'For $a - b$ and $a \\div b$: the upper bound of $a$ with the **lower** bound of $b$, and the other way round.', 'Give the answer to the accuracy where both bounds agree.'],
        },
      ],
      lines: [
        { say: 'Let’s sum up. Write the bounds of each measurement first: half a unit either side.', show: 'sum.0' },
        { say: 'For adding and multiplying, use both upper bounds for the upper bound, and both lower bounds for the lower bound.', show: 'sum.1' },
        { say: 'For subtracting and dividing, pair the upper bound of the first number with the lower bound of the second, and the other way round.', show: 'sum.2' },
        { say: 'And give the answer to the accuracy where both bounds agree. In the next lesson, we turn recurring decimals into fractions. See you there!', show: 'sum.3' },
      ],
    },
  ],
};

export default video;
