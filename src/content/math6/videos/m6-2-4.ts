import type { Explainer } from '@/video/script.ts';
import { figure } from '@/video/solids.ts';
import { partWhole } from '@/content/math5/videos/lib/m5-2-figures.ts';
import { columnMultiply, heightFor } from '@/content/math5/videos/lib/m5-4-figures.ts';

// Equal groups, total unknown: three bags at $2.35 each.
const groups = figure(
  'gr',
  [partWhole({ total: '\\text{total?}', parts: [{ tex: '\\$2.35', share: 1, tone: 'adj' }, { tex: '\\$2.35', share: 1, tone: 'adj' }, { tex: '\\$2.35', share: 1, tone: 'adj' }], width: 10 })],
  220,
);

// A total shared equally, one share unknown: $6.00 shared by three friends.
const sharing = figure(
  'sh',
  [partWhole({ total: '\\$6.00', parts: [{ tex: '?', share: 1, tone: 'theta' }, { tex: '?', share: 1, tone: 'theta' }, { tex: '?', share: 1, tone: 'theta' }], width: 10 })],
  220,
);

// 235 × 15: 235 × 5 = 1175 (carry 2, then 1), 235 × 10 = 2350, 1175 + 2350 = 3525.
const work = (() => {
  const part = columnMultiply({ top: '235', bottom: '15', rows: ['1175', '2350'], answer: '3525', carries: [{ 1: '2', 2: '1' }], notes: ['\\leftarrow 235 \\times 5', '\\leftarrow 235 \\times 10'] });
  return figure('cm', [part], heightFor(part, 46));
})();

const video: Explainer = {
  id: 'm6-2-4',
  lessonId: 'm6-2-4',
  title: 'Multiplication and Division Problems, Part 1: Multiply or Divide?',
  thumbnailTitle: 'Multiply or Divide?',
  thumbnail: 'cm',
  summary: 'Deciding whether a problem needs multiplication (many equal groups, find the total) or division (share equally, or find the price of one). 15 bags of popcorn at $2.35 each cost 2.35 × 15 = $35.25, checked with the estimate 2 × 15 = 30, and money is always written with two decimal places: 7.8 × 14 = 109.2 is $109.20.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Operations and Problem Solving · Part 1', title: 'Multiply or Divide?', subtitle: 'Picture what is happening' }],
      lines: [
        { say: 'A class is ordering popcorn for a movie afternoon. A pack of juice boxes is on sale. Friends are splitting the cost of a gift.', show: 'title' },
        { say: 'Each of these problems is solved by multiplying or dividing, often with money. In this video, you will decide which one to do, and solve a money problem.' },
      ],
    },
    {
      chapter: 'Equal groups',
      layout: 'center',
      main: [
        { kind: 'callout', id: 'key', tone: 'key', title: 'Many equal groups', md: 'When there are **many equal groups** and you want the **total**, **multiply**. For example, $15$ bags at \\$2.35 each means $2.35 \\times 15$.' },
        groups,
        { kind: 'math', id: 'm', size: 'md', lines: ['2.35 + 2.35 + 2.35 = 2.35 \\times 3'] },
      ],
      lines: [
        { say: 'Read the problem, and picture what is happening. Here are three bags of popcorn, and each bag costs 2 dollars and 35 cents.', show: ['gr.part0', 'gr.part1', 'gr.part2'] },
        { say: 'We want the total cost. We could add 2.35 three times, but that is the same as 2.35 times three.', show: ['gr.whole', 'm.0'], focus: 'm.0' },
        { say: 'So when there are many equal groups, and you want the total, multiply. Fifteen bags at 2 dollars and 35 cents each means 2.35 times 15.', show: 'key' },
      ],
    },
    {
      chapter: 'Sharing equally',
      layout: 'center',
      main: [
        { kind: 'callout', id: 'key', tone: 'key', title: 'Sharing or finding one', md: 'When you **share equally**, or want the price of **one** thing, **divide**. For example, $16$ juice boxes for \\$5.28 means $5.28 \\div 16$.' },
        sharing,
        { kind: 'math', id: 'm', size: 'md', lines: ['6.00 \\div 3 = 2.00'] },
      ],
      lines: [
        { say: 'Now the other way round. Three friends share six dollars equally. This time we know the total, and we want the size of each share.', show: ['sh.whole', 'sh.part0', 'sh.part1', 'sh.part2'] },
        { say: 'Sharing equally means divide. Six dollars divided by three is two dollars each.', show: 'm.0', focus: 'm.0' },
        { say: 'So when you share equally, or want the price of one thing, divide. Sixteen juice boxes for 5 dollars and 28 cents means 5.28 divided by 16.', show: 'key' },
      ],
    },
    {
      chapter: 'Buying popcorn',
      layout: 'split',
      leftWidth: 540,
      left: [work],
      right: [
        { kind: 'text', id: 'q', size: 'md', md: 'The class buys $15$ bags of popcorn. Each bag costs \\$2.35. What is the total cost?' },
        { kind: 'math', id: 'm', size: 'md', align: 'left', lines: ['235 \\times 15 = 3525', '2.35 \\text{ has } \\thc{2} \\text{ decimal places: } 35.\\thc{25}', '\\text{Estimate: } 2 \\times 15 = 30'] },
        { kind: 'text', id: 'a', size: 'md', md: 'The total cost is **\\$35.25**.' },
      ],
      lines: [
        { say: 'The class buys fifteen bags of popcorn. Each bag costs 2 dollars and 35 cents. What is the total cost?', show: 'q' },
        { say: 'There are equal groups, and we want the total, so multiply: 2.35 times 15. Multiply as whole numbers first: 235 times 15.', show: ['cm.top', 'cm.bottom', 'cm.rule'] },
        { say: 'Five times 235: five times five is 25, write five and carry two. Five times three is 15, plus two is 17, write seven and carry one. Five times two is ten, plus one is eleven. That makes 1,175.', show: ['cm.r0', 'cm.k0', 'cm.note0'], focus: 'cm.r0' },
        { say: 'Ten times 235 is 2,350. Add the partial products: 1,175 plus 2,350 is 3,525.', hide: 'cm.k0', show: ['cm.r1', 'cm.note1', 'cm.rule2', 'cm.ans', 'm.0'], focus: ['cm.ans', 'm.0'] },
        { say: '2.35 has two decimal places, so the product has two decimal places: 35.25.', show: 'm.1', focus: 'm.1' },
        { say: 'Check with an estimate. 2.35 is about two, and two times 15 is 30. That is close, so the total cost is 35 dollars and 25 cents.', show: ['m.2', 'a'], focus: 'm.2' },
      ],
    },
    {
      chapter: 'Watch out',
      layout: 'center',
      main: [
        { kind: 'callout', id: 'oops', tone: 'mistake', title: 'Writing money with one decimal place', md: 'A product like $7.8 \\times 14 = 109.2$ is \\$109.20 in money. Always write cents with two digits.' },
        { kind: 'text', id: 't', size: 'lg', md: '[[bad:\\$109.2]] → [[good:\\$109.20]]' },
      ],
      lines: [
        { say: 'Watch out with money. Suppose a product comes out as 7.8 times 14, which is 109.2.', show: 'oops' },
        { say: 'In money, the digits after the point are cents, and cents always have two digits. 109.2 dollars is 109 dollars and 20 cents.', show: 't' },
        { say: 'So write it as 109.20, with a zero on the end. Always write money with two decimal places.' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q',
          prompt: 'A school buys $24$ notebooks at \\$1.85 each. What is the total cost?',
          choices: ['\\$4.44', '\\$444.00', '\\$44.40', '\\$25.85'],
          answer: 2,
          working: 'Equal groups, find the total: $1.85 \\times 24$. $185 \\times 24 = 740 + 3700 = 4440$, and $1.85$ has $2$ decimal places, so the total is \\$44.40. Estimate: $2 \\times 24 = 48$.',
        },
      ],
      lines: [
        { say: 'Your turn. A school buys 24 notebooks at one dollar and 85 cents each. What is the total cost? Pause the video and try it.', show: 'q', wait: 6 },
        { say: 'The answer is C, 44 dollars and 40 cents. Multiply 1.85 by 24: 185 times 24 is 4,440, and the product has two decimal places. Choice A has the point in the wrong place: the estimate, two times 24, is 48.', show: 'q.answer' },
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
          items: ['Many equal groups, find the total: **multiply**.', 'Share equally, or find the price of one: **divide**.', 'Write money with two decimal places, and check with an estimate.'],
        },
      ],
      lines: [
        { say: 'Let’s sum up. When there are many equal groups and you want the total, multiply.', show: 'sum.0' },
        { say: 'When you share equally, or want the price of one thing, divide.', show: 'sum.1' },
        { say: 'Write money with two decimal places, and check with an estimate. In the next part, we find the price of one item. See you there!', show: 'sum.2' },
      ],
    },
  ],
};

export default video;
