import type { Explainer } from '@/video/script.ts';
import { figure } from '@/video/solids.ts';
import { strip } from '@/video/numbers.ts';
import { shift } from '@/content/math6/videos/lib/m6-11-figures.ts';
import { bottles, tag } from './lib/m7-2-figures.ts';

// 11.4 L of lemonade in 1.5 L bottles: 7 full bottles and 0.6 of an eighth.
const lemonade = figure('bt', [bottles({ count: 8, fill: 7.6, h: 1.7, note: '\\text{not full}' })], 270);

// 5 wholes cut into halves: there are 10 halves in 5.
const halves = figure('hv', [
  strip({ name: 'w', parts: 5, shaded: 5, width: 10, height: 1, pieces: '1', tone: 'adj' }),
  shift(strip({ name: 'h', parts: 10, shaded: 10, width: 10, height: 1, pieces: '\\tfrac12', tone: 'opp' }), 0, -1.8),
  tag('h-count', [10.4, -1.3], '10 \\text{ halves}', { place: 'right' }),
  tag('w-count', [10.4, 0.5], '5 \\text{ wholes}', { place: 'right' }),
], 260);

const video: Explainer = {
  id: 'm7-2-2-d',
  lessonId: 'm7-2-2',
  title: 'Multiplying and Dividing Decimals, Part 4: Dividing with a Calculator',
  thumbnailTitle: 'Dividing with a Calculator',
  thumbnail: 'bt',
  summary:
    'For divisors with more than one digit, or with decimals, use a calculator and estimate first. A 2.4 kg bag of apples costing $6.48 costs 6.48 ÷ 2.4 = $2.70 per kilogram. 11.4 L of lemonade fills 11.4 ÷ 1.5 = 7.6 bottles of 1.5 L, so only 7 are full: round down. Dividing by a number less than 1 gives a bigger answer: 5 ÷ 0.5 = 10.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Decimals and Percents · Part 4', title: 'Dividing with a Calculator', subtitle: 'Estimate, divide, then think' }],
      lines: [
        { say: 'How much do apples cost per kilogram? How many bottles can you fill with lemonade? Questions like these need division by decimals, and a calculator makes it quick.', show: 'title' },
        { say: 'In this part, you will divide with a calculator, and think carefully about what the answer means.' },
      ],
    },
    {
      chapter: 'Price per kilogram',
      layout: 'center',
      main: [
        { kind: 'text', id: 'q', size: 'md', align: 'center', md: 'A $2.4$ kg bag of apples costs \\$6.48. What is the price per kilogram?' },
        { kind: 'math', id: 'm', size: 'lg', lines: ['\\text{Price per kilogram} = \\text{price} \\div \\text{mass}', '\\text{Estimate: } 6 \\div 2 = 3'] },
        { kind: 'calc', id: 'c', keys: '6.48 ÷ 2.4', result: '2.7' },
        { kind: 'text', id: 'a', size: 'md', align: 'center', md: 'The apples cost **\\$2.70** per kilogram.' },
      ],
      lines: [
        { say: 'A two point four kilogram bag of apples costs six dollars and forty-eight cents. What is the price per kilogram?', show: 'q' },
        { say: 'The price per kilogram is the price of one kilogram. To find it, divide the price by the mass.', show: 'm.0', focus: 'm.0' },
        { say: 'Estimate first. Six dollars and forty-eight cents is about six, and two point four is about two. Six divided by two is three.', show: 'm.1', focus: 'm.1' },
        { say: 'On the calculator, six point four eight divided by two point four is two point seven.', show: 'c' },
        { say: 'In money, write two decimal places: two dollars and seventy cents per kilogram. That is close to the estimate of three dollars.', show: 'a' },
      ],
    },
    {
      chapter: 'Full bottles',
      layout: 'center',
      main: [
        { kind: 'text', id: 'q', size: 'md', align: 'center', md: 'How many $1.5$ L bottles can be filled **completely** from $11.4$ L of lemonade?' },
        { kind: 'math', id: 'm', size: 'md', lines: ['\\text{Estimate: } 12 \\div 1.5 = 8', '\\text{Calculator: } 11.4 \\div 1.5 = 7.6', '\\text{Round down: } 7 \\text{ full bottles}'] },
        lemonade,
      ],
      lines: [
        { say: 'How many one point five litre bottles can be filled completely from eleven point four litres of lemonade?', show: 'q' },
        { say: 'Estimate: eleven point four is about twelve. Two bottles hold three litres, so twelve litres fill eight bottles. On the calculator, eleven point four divided by one point five is seven point six.', show: ['m.0', 'm.1'], focus: ['m.0', 'm.1'] },
        { say: 'Seven point six bottles? Picture pouring the lemonade. Seven bottles fill right up.', show: ['bt.b0', 'bt.b1', 'bt.b2', 'bt.b3', 'bt.b4', 'bt.b5', 'bt.b6'] },
        { say: 'The eighth bottle only gets zero point six of the way full. It is not a full bottle.', show: ['bt.b7', 'bt.note'], focus: ['bt.b7', 'bt.note'] },
        { say: 'The question asks for full bottles, so round down. They can fill seven bottles. Always think about what the answer means.', show: 'm.2', focus: 'm.2' },
      ],
    },
    {
      chapter: 'Dividing by less than one',
      layout: 'center',
      main: [
        { kind: 'math', id: 'm', size: 'lg', lines: ['5 \\div 0.5 = 10'] },
        halves,
        { kind: 'callout', id: 'tip', tone: 'tip', title: 'Dividing by a number less than 1', md: 'Dividing by a number less than $1$ gives an answer **bigger** than the number you started with. Use this to check your calculator answers.' },
      ],
      lines: [
        { say: 'Here is something surprising. Five divided by zero point five is ten. The answer is bigger than five!', show: 'm', focus: 'm' },
        { say: 'Division asks how many groups fit. How many halves fit into five wholes? Each whole holds two halves, so five wholes hold ten halves.', show: ['hv.w-frame', 'hv.w-shade', 'hv.w-pieces', 'hv.w-count', 'hv.h-frame', 'hv.h-shade', 'hv.h-pieces', 'hv.h-count'] },
        { say: 'So dividing by a number less than one gives an answer bigger than the number you started with. Dividing by a number more than one, like one point five, gives a smaller answer. Use this to check your calculator.', show: 'tip' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q',
          prompt: 'Each glass holds $0.3$ L. How many glasses can be filled **completely** from $2$ L of juice?',
          choices: ['$6$', '$7$', '$0.6$', '$60$'],
          answer: 0,
          working: '$2 \\div 0.3 = 6.666\\ldots$ The $0.666\\ldots$ is not a full glass, so round down: $6$ glasses. Dividing by a number less than $1$ gives an answer bigger than $2$, as expected.',
        },
      ],
      lines: [
        { say: 'Your turn. Each glass holds zero point three litres. How many glasses can be filled completely from two litres of juice? Pause the video and try it.', show: 'q', wait: 6 },
        { say: 'The answer is A, six glasses. Two divided by zero point three is six point six six, and so on. The part after the point is not a full glass, so round down. Choice B rounds up, but the seventh glass would not be full.', show: 'q.answer' },
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
            'Use a calculator for divisors with more than one digit, or with decimals. Estimate first.',
            'Write money with two decimal places: \\$2.70.',
            'Think about what a remainder means: round down for full bottles.',
            'Dividing by a number less than $1$ gives a bigger answer: $5 \\div 0.5 = 10$.',
          ],
        },
      ],
      lines: [
        { say: 'Let’s sum up. Use a calculator to divide by numbers with more than one digit, or with decimals. Estimate first.', show: 'sum.0' },
        { say: 'Write money with two decimal places.', show: 'sum.1' },
        { say: 'Think about what the answer means. Only whole bottles count, so round down.', show: 'sum.2' },
        { say: 'And dividing by a number less than one gives a bigger answer. In the next lesson, you will learn the order for doing several operations. See you there!', show: 'sum.3' },
      ],
    },
  ],
};

export default video;
