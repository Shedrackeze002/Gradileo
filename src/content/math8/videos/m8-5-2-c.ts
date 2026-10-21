import type { Explainer } from '@/video/script.ts';
import { figure } from '@/video/solids.ts';
import { intLine } from '@/content/math7/videos/lib/m7-4-figures.ts';
import { room } from './lib/m8-5-figures.ts';

// From 4 °C to −14 °C in six equal hops of −3.
const fall = (id: string) =>
  figure(
    id,
    [
      intLine({
        min: -16,
        max: 6,
        every: 2,
        moves: [{ id: 'mv', from: 4, to: -14, hop: 3, tone: 'adj', label: '6 \\text{ jumps of } {-3}' }],
        points: [
          { id: 'start', value: 4, tex: '\\text{start}', tone: 'theta' },
          { id: 'end', value: -14, tex: '\\text{end}', tone: 'good' },
        ],
      }),
      room('below', [0, -1.7]),
    ],
    270,
  );

// The five daily lows and their mean, −5.
const LOWS = [-8, -3, 2, -6, -10];
const lows = (id: string) =>
  figure(
    id,
    [
      intLine({
        min: -12,
        max: 4,
        every: 2,
        points: [...LOWS.map((v, i) => ({ id: `d${i}`, value: v, tex: '', tone: 'theta' as const })), { id: 'mean', value: -5, tex: '\\text{mean}', tone: 'good' }],
      }),
    ],
    200,
  );

const video: Explainer = {
  id: 'm8-5-2-c',
  lessonId: 'm8-5-2',
  title: 'Dividing Integers, Part 3: Average Change and the Mean',
  thumbnailTitle: 'Average Change and the Mean',
  thumbnail: 'fl',
  summary:
    'An average change is the total change divided by the number of time periods. A temperature that falls from 4 °C to −14 °C over 6 hours changes by −14 − 4 = −18 in all, so (−18) ÷ 6 = −3 °C per hour. The mean is the sum of the values divided by how many there are: lows of −8, −3, 2, −6 and −10 °C add to −25, and (−25) ÷ 5 = −5 °C.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Multiplying and Dividing Integers · Part 3', title: 'Average Change and the Mean', subtitle: 'Dividing integers in real life' }],
      lines: [
        { say: 'In the last part, you learned the sign rules for division. Now you will put them to work.', show: 'title' },
        { say: 'In this part, you will find an average change, like a change in temperature each hour, and the mean of a set of integers.' },
      ],
    },
    {
      chapter: 'Average change',
      layout: 'center',
      main: [{ kind: 'callout', id: 'def', tone: 'definition', title: 'Average change', md: 'To find an **average change**, divide the **total change** by the **number of time periods**, such as hours or days.' }],
      lines: [
        { say: 'When something changes by the same amount each hour, or each day, you can find that amount with division.', show: 'def' },
        { say: 'To find an average change, divide the total change by the number of time periods, such as hours or days.' },
      ],
    },
    {
      chapter: 'Change per hour',
      layout: 'center',
      main: [
        { kind: 'text', id: 'q', size: 'md', md: 'The temperature fell from $4^\\circ\\text{C}$ to $-14^\\circ\\text{C}$ over $6$ hours. What was the change per hour?' },
        fall('fl'),
        { kind: 'math', id: 'm', size: 'md', lines: ['\\text{Total change} = -14 - 4 = -18', '(-18) \\div 6 = -3', '\\text{Check: } 6 \\times (-3) = -18 \\;\\good{\\checkmark}'] },
      ],
      lines: [
        { say: 'The temperature fell from four degrees Celsius to negative fourteen degrees Celsius over six hours. It changed by the same amount each hour. What was the change per hour?', show: 'q' },
        { say: 'First, find the total change. It is the final temperature minus the starting temperature: negative fourteen minus four, which is negative eighteen.', show: ['fl.axis', 'fl.start', 'fl.end', 'm.0'], focus: 'm.0' },
        { say: 'On the number line, the temperature moved eighteen degrees to the left, in six equal jumps: one jump for each hour.', show: 'fl.mv', focus: 'fl.mv' },
        { say: 'Divide the total change by the number of hours. Negative eighteen divided by six is negative three, because the signs are different.', show: 'm.1', focus: 'm.1' },
        { say: 'So the temperature changed by negative three degrees Celsius per hour. Check: six times negative three is negative eighteen.', show: 'm.2', focus: 'm.2' },
      ],
    },
    {
      chapter: 'The mean',
      layout: 'center',
      main: [
        { kind: 'callout', id: 'def', tone: 'definition', title: 'Mean', md: 'The **mean** of a set of numbers is their **sum** divided by **how many** numbers there are.' },
        { kind: 'table', id: 't', head: ['Day', '1', '2', '3', '4', '5'], rows: [['Low ($^\\circ$C)', '$-8$', '$-3$', '$2$', '$-6$', '$-10$']] },
        { kind: 'math', id: 'm', size: 'lg', lines: ['(-8) + (-3) + 2 + (-6) + (-10) = -25', '(-25) \\div 5 = -5'] },
      ],
      lines: [
        { say: 'Now a mean. The mean of a set of numbers is their sum, divided by how many numbers there are.', show: 'def' },
        { say: 'Here are the daily low temperatures for five winter days: negative eight, negative three, two, negative six and negative ten degrees Celsius. What is the mean low temperature?', show: 't' },
        { say: 'First, add them. Negative eight plus negative three is negative eleven. Adding two gives negative nine. Adding negative six gives negative fifteen. And adding negative ten gives negative twenty-five.', show: 'm.0', focus: 'm.0' },
        { say: 'There are five days, so divide by five. Negative twenty-five divided by five is negative five. The mean low temperature is negative five degrees Celsius.', show: 'm.1', focus: 'm.1' },
      ],
    },
    {
      chapter: 'Where the mean sits',
      layout: 'center',
      main: [lows('lw'), { kind: 'callout', id: 'key', tone: 'key', title: 'The mean shares the total', md: 'If the total, $-25$, were shared equally among the $5$ days, each day would get $-5$.' }],
      lines: [
        { say: 'Here are the five lows on a number line.', show: ['lw.axis', 'lw.d0', 'lw.d1', 'lw.d2', 'lw.d3', 'lw.d4'] },
        { say: 'The mean, negative five, sits among them. Some days were colder than the mean, and some were warmer.', show: 'lw.mean', focus: 'lw.mean' },
        { say: 'You can think of the mean as sharing. If the total, negative twenty-five, were shared equally among the five days, each day would get negative five.', show: 'key' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q',
          prompt: 'The low temperatures for four days were $-6^\\circ\\text{C}$, $1^\\circ\\text{C}$, $-9^\\circ\\text{C}$ and $-2^\\circ\\text{C}$. What is the mean low temperature?',
          choices: ['$4^\\circ\\text{C}$', '$-4^\\circ\\text{C}$', '$-16^\\circ\\text{C}$', '$-5^\\circ\\text{C}$'],
          answer: 1,
          working: 'Sum: $(-6) + 1 + (-9) + (-2) = -16$. Mean: $(-16) \\div 4 = -4$, so the mean is $-4^\\circ\\text{C}$.',
        },
      ],
      lines: [
        { say: 'Your turn. The low temperatures for four days were negative six, one, negative nine and negative two degrees Celsius. What is the mean low temperature? Pause the video and try it.', show: 'q', wait: 6 },
        { say: 'The answer is B, negative four degrees Celsius. The sum is negative sixteen, and negative sixteen divided by four is negative four. Choice C is the sum. To find the mean, you still need to divide the sum by four.', show: 'q.answer' },
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
            'Average change $=$ total change $\\div$ number of time periods.',
            'Total change $=$ final value $-$ starting value.',
            'The mean is the sum of the values divided by how many there are.',
            'Use the integer sign rules when you divide.',
          ],
        },
      ],
      lines: [
        { say: 'Let’s sum up. An average change is the total change divided by the number of time periods.', show: 'sum.0' },
        { say: 'The total change is the final value minus the starting value.', show: 'sum.1' },
        { say: 'The mean is the sum of the values, divided by how many values there are.', show: 'sum.2' },
        { say: 'And use the sign rules every time you divide. Next, you will put several operations with integers together, in the right order. See you there!', show: 'sum.3' },
      ],
    },
  ],
};

export default video;
