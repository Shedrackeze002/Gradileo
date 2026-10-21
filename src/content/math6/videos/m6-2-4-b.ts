import type { Explainer } from '@/video/script.ts';
import { figure } from '@/video/solids.ts';
import { heightFor } from '@/content/math5/videos/lib/m5-4-figures.ts';
import { bar } from '@/content/math5/videos/lib/m5-5-figures.ts';
import { decimalDivision } from './lib/m6-2-figures.ts';

// $5.28 for a pack of 16 juice boxes: the pack as a bar of 16 equal parts, one shaded.
const pack = figure('pk', [bar({ parts: 16, shaded: 1, tone: 'theta', width: 12, height: 1, label: '\\$5.28', labelPlace: 'above' })], 200);

// 5.28 ÷ 16 = 0.33: 0 in the ones, 52 − 48 = 4, bring down 8 to make 48, 48 − 48 = 0.
const juice = (() => {
  const part = decimalDivision({
    divisor: '16',
    dividend: '5.28',
    quotient: '033',
    steps: [
      { prod: '48', at: 1, diff: '4', down: true },
      { prod: '48', at: 2, diff: '0' },
    ],
  });
  return figure('ju', [part], heightFor(part, 50));
})();

// 8.88 ÷ 12 = 0.74: 0 in the ones, 88 − 84 = 4, bring down 8 to make 48, 48 − 48 = 0.
const rope = (() => {
  const part = decimalDivision({
    divisor: '12',
    dividend: '8.88',
    quotient: '074',
    steps: [
      { prod: '84', at: 1, diff: '4', down: true },
      { prod: '48', at: 2, diff: '0' },
    ],
  });
  return figure('rp', [part], heightFor(part, 50));
})();

const video: Explainer = {
  id: 'm6-2-4-b',
  lessonId: 'm6-2-4',
  title: 'Multiplication and Division Problems, Part 2: Finding One of Something',
  thumbnailTitle: 'Unit Price',
  thumbnail: 'ju',
  summary: 'The unit price is the price of one item: divide the total price by the number of items. A pack of 16 juice boxes for $5.28 gives 5.28 ÷ 16 = $0.33 a box, and a rope 8.88 m long cut into 12 equal pieces gives pieces 0.74 m long, both checked by multiplying.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Operations and Problem Solving · Part 2', title: 'Finding One of Something', subtitle: 'The unit price' }],
      lines: [
        { say: 'A pack of juice boxes costs 5 dollars and 28 cents. But how much are you paying for just one juice box?', show: 'title' },
        { say: 'In this video, you will find the price of one item, called the unit price, and the size of one equal piece.' },
      ],
    },
    {
      chapter: 'Unit price',
      layout: 'center',
      main: [
        { kind: 'callout', id: 'def', tone: 'definition', title: 'Unit price', md: 'The **unit price** is the price of **one** item. To find it, divide the total price by the number of items.' },
        pack,
        { kind: 'math', id: 'm', size: 'lg', lines: ['\\text{unit price} = 5.28 \\div 16'] },
      ],
      lines: [
        { say: 'The unit price is the price of one item. Unit means one.', show: 'def' },
        { say: 'A pack of sixteen juice boxes costs 5 dollars and 28 cents. Picture the price as a bar, shared equally among the sixteen boxes.', show: ['pk.frame', 'pk.label'] },
        { say: 'The price of one box is one of the sixteen equal parts. So divide the total price by the number of items: 5.28 divided by 16.', show: ['pk.shade', 'm.0'], focus: ['pk.shade', 'm.0'] },
      ],
    },
    {
      chapter: 'Price of one juice box',
      layout: 'split',
      leftWidth: 480,
      left: [juice],
      right: [
        { kind: 'math', id: 'm', size: 'md', align: 'left', lines: ['3 \\times 16 = 48, \\quad 52 - 48 = 4', '3 \\times 16 = 48, \\quad 48 - 48 = 0', '5.28 \\div 16 = 0.33', '0.33 \\times 16 = 5.28 \\;\\good{\\checkmark}'] },
        { kind: 'text', id: 'a', size: 'md', md: 'One juice box costs **\\$0.33**.' },
      ],
      lines: [
        { say: 'Divide 5.28 by 16. Put the decimal point in the quotient, right above the point in 5.28.', show: ['ju.bracket', 'ju.dividend', 'ju.dv', 'ju.qp'], focus: ['ju.dp', 'ju.qp'] },
        { say: 'Sixteen does not go into five, so write a zero in the ones place, and use 52.', show: 'ju.q0', focus: ['ju.q0', 'ju.dd0', 'ju.dd1'] },
        { say: 'Sixteen goes into 52 three times, which is 48. That leaves four.', show: ['ju.q1', 'ju.s0-prod', 'ju.s0-rule', 'ju.s0-diff', 'm.0'], focus: ['ju.q1', 'm.0'] },
        { say: 'Bring down the eight to make 48. Sixteen goes into 48 three times exactly.', show: ['ju.s0-arrow', 'ju.s0-down', 'ju.q2', 'ju.s1-prod', 'ju.s1-rule', 'ju.s1-diff', 'm.1'], focus: ['ju.q2', 'm.1'] },
        { say: 'So 5.28 divided by 16 is 0.33. One juice box costs 33 cents.', hide: 'ju.s0-arrow', show: ['m.2', 'a'], focus: ['ju.quotient', 'm.2'] },
        { say: 'Check by multiplying: 0.33 times 16 is 5.28, the price of the whole pack.', show: 'm.3', focus: 'm.3' },
      ],
    },
    {
      chapter: 'Cutting a rope',
      layout: 'split',
      leftWidth: 480,
      left: [rope],
      right: [
        { kind: 'text', id: 'q', size: 'md', md: 'Lena cuts a rope that is $8.88$ m long into $12$ equal pieces. How long is each piece?' },
        { kind: 'math', id: 'm', size: 'md', align: 'left', lines: ['7 \\times 12 = 84, \\quad 88 - 84 = 4', '4 \\times 12 = 48, \\quad 48 - 48 = 0', '8.88 \\div 12 = 0.74'] },
        { kind: 'text', id: 'a', size: 'md', md: 'Each piece is **0.74 m** long.' },
      ],
      lines: [
        { say: 'Finding one of something works for measurements as well. Lena cuts a rope that is 8.88 metres long into twelve equal pieces. How long is each piece?', show: 'q' },
        { say: 'We want the size of one equal piece, so divide: 8.88 divided by 12. Put the decimal point in the quotient first.', show: ['rp.bracket', 'rp.dividend', 'rp.dv', 'rp.qp'], focus: ['rp.dp', 'rp.qp'] },
        { say: 'Twelve does not go into eight, so write a zero. Twelve goes into 88 seven times, which is 84, leaving four.', show: ['rp.q0', 'rp.q1', 'rp.s0-prod', 'rp.s0-rule', 'rp.s0-diff', 'm.0'], focus: ['rp.q1', 'm.0'] },
        { say: 'Bring down the eight to make 48. Twelve goes into 48 four times exactly.', show: ['rp.s0-arrow', 'rp.s0-down', 'rp.q2', 'rp.s1-prod', 'rp.s1-rule', 'rp.s1-diff', 'm.1'], focus: ['rp.q2', 'm.1'] },
        { say: 'So each piece is 0.74 metres long. That makes sense: twelve pieces of less than one metre make less than twelve metres.', hide: 'rp.s0-arrow', show: ['m.2', 'a'], focus: ['rp.quotient', 'm.2'] },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q',
          prompt: 'A pack of $8$ pencils costs \\$3.60. What is the unit price?',
          choices: ['\\$28.80', '\\$0.45', '\\$4.50', '\\$0.40'],
          answer: 1,
          working: 'The unit price is the total price divided by the number of items: $3.60 \\div 8 = 0.45$. Check: $0.45 \\times 8 = 3.60$.',
        },
      ],
      lines: [
        { say: 'Your turn. A pack of eight pencils costs 3 dollars and 60 cents. What is the unit price? Pause the video and try it.', show: 'q', wait: 6 },
        { say: 'The answer is B, 45 cents. Divide the total price by the number of items: 3.60 divided by eight is 0.45. Choice A multiplies instead of dividing, which would be the price of eight packs.', show: 'q.answer' },
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
          items: ['The **unit price** is the price of one item.', 'Unit price $=$ total price $\\div$ number of items: $5.28 \\div 16 = 0.33$.', 'Divide to find the size of one equal piece, and check by multiplying.'],
        },
      ],
      lines: [
        { say: 'Let’s sum up. The unit price is the price of one item.', show: 'sum.0' },
        { say: 'To find it, divide the total price by the number of items.', show: 'sum.1' },
        { say: 'Divide to find the size of one equal piece as well, and check by multiplying. In the next part, we solve problems that take two steps. See you there!', show: 'sum.2' },
      ],
    },
  ],
};

export default video;
