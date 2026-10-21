import type { Explainer } from '@/video/script.ts';
import { figure } from '@/video/solids.ts';
import { intLine } from './lib/m7-4-figures.ts';

// (+1) − (+4): 4 steps left to −3. (+1) − (−4): 4 steps right to +5.
const lines = (id: string) =>
  figure(
    id,
    [
      intLine({
        name: 'a',
        min: -5,
        max: 6,
        signed: true,
        at: [0, 3.6],
        moves: [{ id: 'mv', from: 1, to: -3, tone: 'adj', label: '-(+4)' }],
        points: [
          { id: 'start', value: 1, tex: '\\text{start}', tone: 'theta' },
          { id: 'end', value: -3, tex: '-3', tone: 'adj' },
        ],
      }),
      intLine({
        name: 'b',
        min: -5,
        max: 6,
        signed: true,
        at: [0, 0],
        moves: [{ id: 'mv', from: 1, to: 5, tone: 'opp', label: '-(-4)' }],
        points: [
          { id: 'start', value: 1, tex: '\\text{start}', tone: 'theta' },
          { id: 'end', value: 5, tex: '+5', tone: 'opp' },
        ],
      }),
    ],
    420,
  );

const video: Explainer = {
  id: 'm7-4-2-d',
  lessonId: 'm7-4-2',
  title: 'Subtracting Integers, Part 4: Several Steps',
  thumbnailTitle: 'Subtracting in Several Steps',
  thumbnail: 'nl',
  summary:
    'When an expression has several subtractions, change each one to adding the opposite, then group the positives and the negatives: (−14) − (−10) − (−6) = (−14) + (+10) + (+6) = +2, and (+5) − (+9) − (−3) = (+5) + (−9) + (+3) = −1. On a number line, subtracting a positive integer moves left and subtracting a negative integer moves right: (+1) − (+4) = −3 and (+1) − (−4) = +5.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Adding and Subtracting Integers · Part 4', title: 'Several Steps', subtitle: 'Change every subtraction, then add' }],
      lines: [
        { say: 'What is negative fourteen minus negative ten minus negative six? That is a lot of minus signs! But the shortcut from the last part handles them all.', show: 'title' },
        { say: 'In this part, you will work out expressions with several subtractions, and see what subtracting looks like on a number line.' },
      ],
    },
    {
      chapter: 'Change every subtraction',
      layout: 'center',
      main: [
        { kind: 'text', id: 'q', size: 'md', md: 'Find $(-14) - (-10) - (-6)$.' },
        { kind: 'math', id: 'm', size: 'lg', lines: ['(-14) - (-10) - (-6)', '= (-14) + (+10) + (+6)', '\\text{Positives: } 10 + 6 = 16 \\qquad \\text{Negative: } {-14}', '(+16) + (-14) = +2'] },
      ],
      lines: [
        { say: 'Find negative fourteen minus negative ten minus negative six.', show: ['q', 'm.0'] },
        { say: 'First, change each subtraction to adding the opposite. Minus negative ten becomes plus positive ten. Minus negative six becomes plus positive six.', show: 'm.1', focus: 'm.1' },
        { say: 'Now it is all addition, so group the positives and the negatives. The positives make positive sixteen. The only negative is negative fourteen.', show: 'm.2', focus: 'm.2' },
        { say: 'Positive sixteen plus negative fourteen: the signs are different, so subtract the sizes. Sixteen minus fourteen is two, and there are more positives. The answer is positive two.', show: 'm.3', focus: 'm.3' },
      ],
    },
    {
      chapter: 'A mix of signs',
      layout: 'center',
      main: [
        { kind: 'text', id: 'q', size: 'md', md: 'Find $(+5) - (+9) - (-3)$.' },
        { kind: 'math', id: 'm', size: 'lg', lines: ['= (+5) + (-9) + (+3)', '\\text{Positives: } 5 + 3 = 8 \\qquad \\text{Negative: } {-9}', '(+8) + (-9) = -1'] },
      ],
      lines: [
        { say: 'Here is one with a mix of signs. Find positive five minus positive nine minus negative three.', show: 'q' },
        { say: 'Change each subtraction. Minus positive nine becomes plus negative nine. Minus negative three becomes plus positive three.', show: 'm.0', focus: 'm.0' },
        { say: 'Group them. The positives make positive eight, and the negative is negative nine.', show: 'm.1', focus: 'm.1' },
        { say: 'Positive eight plus negative nine is negative one, because there is one more negative than positive.', show: 'm.2', focus: 'm.2' },
      ],
    },
    {
      chapter: 'Subtracting on a number line',
      layout: 'center',
      main: [
        lines('nl'),
        { kind: 'callout', id: 'tip', tone: 'tip', title: 'Subtracting on a number line', md: 'Subtracting a **positive** integer moves **left**. Subtracting a **negative** integer moves **right**, just like adding a positive.' },
      ],
      lines: [
        { say: 'You can subtract on a number line as well. Find positive one minus positive four. Start at positive one.', show: ['nl.a-axis', 'nl.a-start'] },
        { say: 'Subtracting a positive integer moves left, just like adding a negative. Four steps to the left lands on negative three.', show: ['nl.a-mv', 'nl.a-end'], focus: 'nl.a-end' },
        { say: 'Now find positive one minus negative four. Start at positive one again.', show: ['nl.b-axis', 'nl.b-start'] },
        { say: 'Subtracting a negative integer moves the opposite way: right, just like adding a positive. Four steps to the right lands on positive five.', show: ['nl.b-mv', 'nl.b-end', 'tip'], focus: 'nl.b-end' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q',
          prompt: 'Find $(+6) - (-2) - (+10)$.',
          choices: ['$-6$', '$-2$', '$+2$', '$+18$'],
          answer: 1,
          working: 'Add the opposites: $(+6) + (+2) + (-10)$. Positives: $+8$. Then $(+8) + (-10) = -2$.',
        },
      ],
      lines: [
        { say: 'Your turn. Find positive six minus negative two minus positive ten. Pause the video and try it.', show: 'q', wait: 6 },
        { say: 'The answer is B, negative two. Change each subtraction: positive six plus positive two plus negative ten. The positives make eight, and eight plus negative ten is negative two. Choice A forgets that subtracting negative two is the same as adding positive two.', show: 'q.answer' },
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
            'Change every subtraction to adding the opposite.',
            'Then group the positives and the negatives, and add.',
            'On a number line, subtracting a positive moves left.',
            'Subtracting a negative moves right.',
          ],
        },
      ],
      lines: [
        { say: 'Let’s sum up. With several subtractions, change each one to adding the opposite first.', show: 'sum.0' },
        { say: 'Then group the positives and the negatives, and add.', show: 'sum.1' },
        { say: 'On a number line, subtracting a positive integer moves left.', show: 'sum.2' },
        { say: 'And subtracting a negative integer moves right. Next, you will use integers to solve real problems. See you there!', show: 'sum.3' },
      ],
    },
  ],
};

export default video;
