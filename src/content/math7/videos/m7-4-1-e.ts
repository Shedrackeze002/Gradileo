import type { Explainer } from '@/video/script.ts';
import { figure } from '@/video/solids.ts';
import { counters, ids } from '@/content/math6/videos/lib/m6-1-figures.ts';

// (+12) + (+3) over (−7) + (−9): fifteen positives and sixteen negatives make fifteen zero pairs,
// and one negative counter is left.
const four = (id: string) =>
  figure(
    id,
    [
      counters({
        sets: [
          { id: 'a', sign: '+', count: 12 },
          { id: 'b', sign: '+', count: 3, col: 12 },
          { id: 'c', sign: '-', count: 7, row: 1 },
          { id: 'd', sign: '-', count: 9, row: 1, col: 7 },
        ],
        pairs: Array.from({ length: 15 }, (_, c) => ({ id: `z${c}`, col: c, zero: false })),
      }),
    ],
    200,
  );

const video: Explainer = {
  id: 'm7-4-1-e',
  lessonId: 'm7-4-1',
  title: 'Adding Integers, Part 5: Adding Several Integers',
  thumbnailTitle: 'Adding Several Integers',
  thumbnail: 'fr',
  summary:
    'Integers can be added in any order, so group the positive integers, group the negative integers, then add the two results: (+12) + (−7) + (−9) + (+3) = (+15) + (−16) = −1. Look for opposites, which add to 0: in (+6) + (−4) + (−6), the +6 and −6 cancel, so the sum is −4.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Adding and Subtracting Integers · Part 5', title: 'Adding Several Integers', subtitle: 'Group the positives and the negatives' }],
      lines: [
        { say: 'A diver goes up, then down, then down again, then up. A bank account has money coming in and going out. Often you need to add more than two integers.', show: 'title' },
        { say: 'In this part, you will add several integers at once, by grouping the positive integers and the negative integers.' },
      ],
    },
    {
      chapter: 'Any order',
      layout: 'center',
      main: [
        { kind: 'callout', id: 'key', tone: 'key', title: 'Adding several integers', md: 'You can add integers in **any order**. Group the **positive** integers, group the **negative** integers, then add the two results.' },
        { kind: 'math', id: 'm', size: 'lg', lines: ['(+2) + (-5) = -3', '(-5) + (+2) = -3'] },
      ],
      lines: [
        { say: 'When you add integers, the order does not matter. Positive two plus negative five is negative three.', show: 'm.0', focus: 'm.0' },
        { say: 'And negative five plus positive two is negative three as well. With counters, it is the same pile of counters either way.', show: 'm.1', focus: 'm.1' },
        { say: 'So with several integers, you can group the positive integers, group the negative integers, and then add the two results.', show: 'key' },
      ],
    },
    {
      chapter: 'Four integers',
      layout: 'center',
      main: [
        { kind: 'text', id: 'q', size: 'md', md: 'Find $(+12) + (-7) + (-9) + (+3)$.' },
        four('fr'),
        {
          kind: 'math',
          id: 'm',
          size: 'md',
          lines: ['\\text{Positives: } (+12) + (+3) = +15', '\\text{Negatives: } (-7) + (-9) = -16', '(+15) + (-16) \\;\\to\\; 16 - 15 = 1 \\;\\to\\; -1'],
        },
      ],
      lines: [
        { say: 'Find positive twelve plus negative seven plus negative nine plus positive three.', show: 'q' },
        { say: 'Group the positive integers. Positive twelve plus positive three is positive fifteen: fifteen positive counters.', show: ['m.0', ...ids('fr', 'a', 12), ...ids('fr', 'b', 3)], focus: 'm.0' },
        { say: 'Group the negative integers. Negative seven plus negative nine: same signs, so add the sizes and keep the sign. That is negative sixteen: sixteen negative counters.', show: ['m.1', ...ids('fr', 'c', 7), ...ids('fr', 'd', 9)], focus: 'm.1' },
        { say: 'Now add the two results: positive fifteen plus negative sixteen. Fifteen zero pairs cancel out. The signs are different, so subtract the sizes. Sixteen minus fifteen is one.', show: ['m.2', ...Array.from({ length: 15 }, (_, c) => `fr.z${c}`)], focus: 'm.2' },
        { say: 'One negative counter is left over. So the answer is negative one. There was just one more negative than positive.', focus: ['m.2', 'fr.d8'] },
      ],
    },
    {
      chapter: 'Look for opposites',
      layout: 'center',
      main: [
        { kind: 'callout', id: 'tip', tone: 'tip', title: 'Look for opposites', md: 'Opposite integers add to $0$. Cancel them first.' },
        { kind: 'math', id: 'm', size: 'lg', lines: ['(\\good{+6}) + (-4) + (\\good{-6})', '= 0 + (-4) = -4'] },
      ],
      lines: [
        { say: 'Here is a shortcut. Opposite integers add to zero, so look for them first.', show: 'tip' },
        { say: 'Find positive six plus negative four plus negative six. Positive six and negative six are opposites.', show: 'm.0', focus: 'm.0' },
        { say: 'They make six zero pairs, so together they are zero. Only negative four is left. The sum is negative four.', show: 'm.1', focus: 'm.1' },
      ],
    },
    {
      chapter: 'A day of temperatures',
      layout: 'center',
      main: [
        { kind: 'text', id: 'q', size: 'md', md: 'At dawn the temperature is $-5^\\circ\\text{C}$. During the day it rises $8$ degrees, rises $4$ more degrees, then falls $10$ degrees. What is the temperature at night?' },
        { kind: 'math', id: 'm', size: 'md', lines: ['(-5) + (+8) + (+4) + (-10)', '\\text{Positives: } (+8) + (+4) = +12', '\\text{Negatives: } (-5) + (-10) = -15', '(+12) + (-15) = -3'] },
      ],
      lines: [
        { say: 'Here is a problem. At dawn the temperature is negative five degrees Celsius. During the day, it rises eight degrees, rises four more degrees, and then falls ten degrees. What is the temperature at night?', show: 'q' },
        { say: 'A rise is a positive integer, and a fall is a negative integer. So add negative five, positive eight, positive four and negative ten.', show: 'm.0', focus: 'm.0' },
        { say: 'Group them. The positives make positive twelve. The negatives make negative fifteen.', show: ['m.1', 'm.2'], focus: ['m.1', 'm.2'] },
        { say: 'Positive twelve plus negative fifteen: subtract the sizes to get three, and the bigger size is negative. So the temperature at night is negative three degrees Celsius.', show: 'm.3', focus: 'm.3' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q',
          prompt: 'Find $(-8) + (+5) + (+8) + (-3)$.',
          choices: ['$-2$', '$+2$', '$+24$', '$-8$'],
          answer: 1,
          working: '$(-8)$ and $(+8)$ are opposites, so they add to $0$. That leaves $(+5) + (-3) = +2$.',
        },
      ],
      lines: [
        { say: 'Your turn. Find negative eight plus positive five plus positive eight plus negative three. Pause the video and try it.', show: 'q', wait: 6 },
        { say: 'The answer is B, positive two. Negative eight and positive eight are opposites, so they cancel. That leaves positive five plus negative three, which is positive two. Choice C adds all the sizes and ignores the signs.', show: 'q.answer' },
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
          items: ['You can add integers in any order.', 'Group the positives and the negatives, then add the two results.', 'Opposites add to $0$: cancel them first.'],
        },
      ],
      lines: [
        { say: 'Let’s sum up. You can add integers in any order.', show: 'sum.0' },
        { say: 'So group the positive integers and the negative integers, then add the two results.', show: 'sum.1' },
        { say: 'And look for opposites: they add to zero, so cancel them first. Next, you will learn to subtract integers. See you there!', show: 'sum.2' },
      ],
    },
  ],
};

export default video;
