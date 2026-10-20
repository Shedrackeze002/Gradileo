import type { Explainer } from '@/video/script.ts';
import { figure } from '@/video/solids.ts';
import { dotGroups, heightFor, longDivision } from '@/content/math5/videos/lib/m5-4-figures.ts';

// 645 ÷ 30 = 21 R 15: 64 − 60 = 4, bring down 5 to make 45; 45 − 30 = 15.
const cans = (() => {
  const part = longDivision({
    divisor: '30',
    dividend: '645',
    quotient: ' 21',
    remainder: '15',
    steps: [
      { prod: '60', at: 1, diff: '4', down: true },
      { prod: '30', at: 2, diff: '15' },
    ],
  });
  return figure('ld', [part], heightFor(part, 50));
})();

// Boxes of 30 cans, each dot standing for 5 cans: boxes 1, 2 and 21 are full, and box 22 holds the 15 cans left over.
const boxes = figure('bx', [dotGroups({ groups: 3, size: 6, cols: 3, extra: 3, extraRing: true, tone: 'adj', labels: ['\\text{box 1}', '\\text{box 2}', '\\ldots\\text{ box 21}', '\\text{box 22}'] })], 260);

const video: Explainer = {
  id: 'm6-2-4-d',
  lessonId: 'm6-2-4',
  title: 'Multiplication and Division Problems, Part 4: The Better Buy and Remainders',
  thumbnailTitle: 'The Better Buy',
  thumbnail: 'ld',
  summary: 'Comparing unit prices to find the better buy: 12 granola bars for $5.40 is $0.45 a bar and 15 bars for $6.45 is $0.43 a bar, so the pack with the higher total price is the better buy. And what a remainder means in a problem: 645 cans in boxes of 30 is 21 R 15, so 22 boxes are needed.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Operations and Problem Solving · Part 4', title: 'The Better Buy and Remainders', subtitle: 'What does the answer mean?' }],
      lines: [
        { say: 'Two packs of granola bars are on the shelf. One is bigger, but it costs more. Which one is the better deal?', show: 'title' },
        { say: 'In this video, you will compare unit prices to find the better buy, and decide what a remainder means in a problem.' },
      ],
    },
    {
      chapter: 'Which is the better buy?',
      layout: 'center',
      main: [
        { kind: 'text', id: 'q', size: 'md', md: 'Pack A has $12$ granola bars for \\$5.40. Pack B has $15$ granola bars for \\$6.45. Which pack is the better buy?' },
        {
          kind: 'table',
          id: 't',
          head: ['Pack', 'Bars', 'Price', 'Price of one bar'],
          rows: [
            ['A', '$12$', '\\$5.40', '$5.40 \\div 12 = 0.45$'],
            ['B', '$15$', '\\$6.45', '$6.45 \\div 15 = 0.43$'],
          ],
        },
        { kind: 'text', id: 'a', size: 'md', md: '**Pack B** is the better buy: \\$0.43 a bar is less than \\$0.45 a bar.' },
      ],
      lines: [
        { say: 'Pack A has twelve granola bars for 5 dollars and 40 cents. Pack B has fifteen granola bars for 6 dollars and 45 cents. Which pack is the better buy?', show: 'q' },
        { say: 'The packs have different numbers of bars, so we cannot just compare the prices. Instead, find the unit price of each pack: the price of one bar.', show: 't' },
        { say: 'Pack A: 5.40 divided by twelve is 0.45. One bar costs 45 cents.', focus: 't.0' },
        { say: 'Pack B: 6.45 divided by fifteen is 0.43. One bar costs 43 cents.', focus: 't.1' },
        { say: 'Forty-three cents is less than 45 cents. So Pack B is the better buy, even though its total price is higher.', show: 'a', focus: 't.1' },
      ],
    },
    {
      chapter: 'Compare unit prices',
      layout: 'center',
      main: [
        { kind: 'callout', id: 'key', tone: 'key', title: 'The better buy', md: 'To compare packs of different sizes, find the **unit price** of each. The lower unit price is the better buy.' },
        { kind: 'math', id: 'm', size: 'md', lines: ['0.45 \\times 12 = 5.40 \\;\\good{\\checkmark}', '0.43 \\times 15 = 6.45 \\;\\good{\\checkmark}'] },
      ],
      lines: [
        { say: 'So when packs have different sizes, compare the unit prices. The lower unit price is the better buy.', show: 'key' },
        { say: 'Check each unit price by multiplying. 0.45 times twelve is 5.40, and 0.43 times fifteen is 6.45. Both check out.', show: ['m.0', 'm.1'], focus: ['m.0', 'm.1'] },
      ],
    },
    {
      chapter: 'What a remainder means',
      layout: 'split',
      leftWidth: 480,
      left: [cans],
      right: [
        { kind: 'text', id: 'q', size: 'md', md: 'Each box holds $30$ cans, and there are $645$ cans. How many boxes are needed to pack all the cans?' },
        { kind: 'math', id: 'm', size: 'md', align: 'left', lines: ['645 \\div 30 = 21 \\text{ R } 15'] },
      ],
      lines: [
        { say: 'Sometimes a division has a remainder, and you have to think about what it means. Each box holds 30 cans, and there are 645 cans. How many boxes are needed to pack all the cans?', show: 'q' },
        { say: 'Divide 645 by 30. Thirty goes into 64 two times, which is 60, leaving four. Bring down the five to make 45.', show: ['ld.bracket', 'ld.dividend', 'ld.dv', 'ld.q1', 'ld.s0-prod', 'ld.s0-rule', 'ld.s0-diff', 'ld.s0-arrow', 'ld.s0-down'], focus: 'ld.q1' },
        { say: 'Thirty goes into 45 once, leaving fifteen. So 645 divided by 30 is 21, remainder fifteen.', hide: 'ld.s0-arrow', show: ['ld.q2', 'ld.s1-prod', 'ld.s1-rule', 'ld.s1-diff', 'ld.rem', 'm.0'], focus: ['ld.rem', 'm.0'] },
      ],
    },
    {
      chapter: 'One more box',
      layout: 'center',
      main: [
        boxes,
        { kind: 'callout', id: 'tip', tone: 'tip', title: 'Think about what the remainder means', md: '$645 \\div 30 = 21$ R $15$. Only $21$ boxes are full, but you need **$22$ boxes** to pack all the cans.' },
      ],
      lines: [
        { say: 'What does 21 remainder fifteen mean here? Picture the boxes, with each dot standing for five cans. 21 boxes can be filled, with thirty cans in each.', show: ['bx.g0', 'bx.g1', 'bx.g2', 'bx.labels'] },
        { say: 'That leaves fifteen cans. The question asks for enough boxes to pack all the cans, so the fifteen cans left over need a box of their own.', show: 'bx.extra', focus: 'bx.extra' },
        { say: 'So you need 22 boxes, even though only 21 of them are full. Always ask: what does the remainder mean in this problem?', show: 'tip' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q',
          prompt: 'A bus holds $40$ students. $258$ students are going on a trip. How many buses are needed?',
          choices: ['$6$', '$6.45$', '$6$ R $18$', '$7$'],
          answer: 3,
          working: '$258 \\div 40 = 6$ R $18$. Six buses are full, and the $18$ students left over need one more bus, so $7$ buses are needed.',
        },
      ],
      lines: [
        { say: 'Your turn. A bus holds 40 students. 258 students are going on a trip. How many buses are needed? Pause the video and try it.', show: 'q', wait: 6 },
        { say: 'The answer is D, seven buses. 258 divided by 40 is six, remainder eighteen. Six buses are full, and the eighteen students left over need one more bus. Choice A would leave eighteen students behind!', show: 'q.answer' },
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
          items: ['To find the better buy, compare unit prices: the lower one wins.', 'A bigger total price can still be the better buy.', 'Think about what a remainder means: sometimes you need one more box.'],
        },
      ],
      lines: [
        { say: 'Let’s sum up. To find the better buy, compare the unit prices. The lower unit price is the better buy.', show: 'sum.0' },
        { say: 'A pack with a bigger total price can still be the better buy.', show: 'sum.1' },
        { say: 'And think about what a remainder means in the problem. Sometimes you need one more box, or one more bus. Well done on finishing this unit!', show: 'sum.2' },
      ],
    },
  ],
};

export default video;
