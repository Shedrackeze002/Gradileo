import type { Explainer } from '@/video/script.ts';
import { areaModel } from '@/video/algebra.ts';
import { figure } from '@/video/solids.ts';
import { columnMultiply, heightFor } from '@/content/math5/videos/lib/m5-4-figures.ts';

// 347 × 26 as an area model: 300 + 40 + 7 along the top, 20 + 6 down the side.
const area = figure(
  'am',
  [
    areaModel({
      top: ['300', '40', '7'],
      side: ['20', '6'],
      cells: [
        ['6000', '800', '140'],
        ['1800', '240', '42'],
      ],
      widths: [5.2, 2.6, 1.6],
      heights: [2.2, 1.2],
      tones: [
        ['adj', 'adj', 'adj'],
        ['opp', 'opp', 'opp'],
      ],
    }),
  ],
  320,
);

// 347 × 26: 347 × 6 = 2082 (carry 4, then 2), 347 × 20 = 6940 (carry 1), 2082 + 6940 = 9022.
const work = (id: string) => {
  const part = columnMultiply({
    top: '347',
    bottom: '26',
    rows: ['2082', '6940'],
    answer: '9022',
    carries: [{ 1: '4', 2: '2' }, { 1: '1' }],
    notes: ['\\leftarrow 347 \\times 6', '\\leftarrow 347 \\times 20'],
  });
  return figure(id, [part], heightFor(part, 46));
};

// The mistake: the second partial product written as 694, with no zero, so the sum is 2776.
const noZero = (() => {
  const part = columnMultiply({ top: '347', bottom: '26', rows: ['2082', '694'], answer: '2776', placeholders: false, answerTone: 'bad' });
  return figure('nz', [part], heightFor(part, 44));
})();

const video: Explainer = {
  id: 'm6-2-2',
  lessonId: 'm6-2-2',
  title: 'Multiplying Decimal and Natural Numbers, Part 1: Multiplying by a Two-Digit Number',
  thumbnailTitle: 'Multiplying by Two Digits',
  thumbnail: 'cm',
  summary: 'Multiplying by a two-digit number with partial products: 347 × 26 is 347 × 6 = 2082 plus 347 × 20 = 6940, which is 9022, shown first as an area model. Forgetting the zero in the second partial product (694 instead of 6940) gives 2776, far from the estimate 300 × 30 = 9000.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Operations and Problem Solving · Part 1', title: 'Multiplying by a Two-Digit Number', subtitle: 'Partial products, then add' }],
      lines: [
        { say: 'A class orders 23 T-shirts. A runner does 26 laps of a loop. To find totals like these, we multiply by a two-digit number.', show: 'title' },
        { say: 'In this lesson, we will multiply decimal numbers as well. But first, in this video, you will multiply whole numbers by a two-digit number, using partial products.' },
      ],
    },
    {
      chapter: 'Picture it',
      layout: 'center',
      main: [area, { kind: 'math', id: 'm', size: 'md', lines: ['\\opp{1800 + 240 + 42 = 2082}', '\\adj{6000 + 800 + 140 = 6940}', '2082 + 6940 = 9022'] }],
      lines: [
        { say: 'Let’s find 347 times 26. That means 26 groups of 347. An area model shows it as a rectangle.', show: ['am.outline', 'am.grid'] },
        { say: 'Split 347 by its places, into 300, 40 and seven. Split 26 into 20 and six.', show: ['am.top', 'am.side'] },
        { say: 'The bottom row is 347 times six. Six times 300 is 1,800. Six times 40 is 240. Six times seven is 42. Together that is 2,082.', show: ['am.c1-0', 'am.c1-1', 'am.c1-2', 'm.0'], focus: ['am.c1-0', 'am.c1-1', 'am.c1-2', 'm.0'] },
        { say: 'The top row is 347 times 20. Twenty times 300 is 6,000. Twenty times 40 is 800. Twenty times seven is 140. Together that is 6,940.', show: ['am.c0-0', 'am.c0-1', 'am.c0-2', 'm.1'], focus: ['am.c0-0', 'am.c0-1', 'am.c0-2', 'm.1'] },
        { say: 'Add the two rows: 2,082 plus 6,940 is 9,022. So 347 times 26 is 9,022.', show: 'm.2', focus: ['am', 'm.2'] },
      ],
    },
    {
      chapter: 'Partial products',
      layout: 'center',
      main: [
        { kind: 'callout', id: 'def', tone: 'definition', title: 'Partial products', md: 'To multiply by a two-digit number, multiply by the **ones** digit and by the **tens** separately. Each answer is a **partial product**. Add the partial products to get the product.' },
        { kind: 'math', id: 'm', size: 'lg', lines: ['347 \\times 26 = \\opp{347 \\times 6} + \\adj{347 \\times 20}'] },
      ],
      lines: [
        { say: 'Each row of the area model is called a partial product. A partial product is part of the whole answer.', show: 'def' },
        { say: 'To multiply by a two-digit number, multiply by the ones digit and by the tens separately. Then add the partial products to get the product.', show: 'm.0', focus: 'm.0' },
        { say: 'The standard algorithm writes the partial products in columns, one under the other.' },
      ],
    },
    {
      chapter: 'Multiply 347 by 26',
      layout: 'split',
      leftWidth: 560,
      left: [work('cm')],
      right: [{ kind: 'math', id: 'm', size: 'md', align: 'left', lines: ['347 \\times 6 = 2082', '347 \\times 20 = 6940', '2082 + 6940 = 9022'] }],
      lines: [
        { say: 'Write 347. Under it, write 26, lined up on the right. Draw a line under them.', show: ['cm.top', 'cm.bottom', 'cm.rule'] },
        { say: 'First, multiply by the ones digit, six. Six times seven is 42: write two and carry four. Six times four is 24, plus four is 28: write eight and carry two. Six times three is 18, plus two is 20.', show: ['cm.r0', 'cm.k0'], focus: ['cm.r0', 'cm.k0'] },
        { say: 'So the first partial product is 347 times six, which is 2,082.', show: ['cm.note0', 'm.0'], focus: ['cm.r0', 'm.0'] },
        { say: 'Next, multiply by the tens digit. The two in 26 really means two tens, or 20. So first, write a zero in the ones place.', hide: 'cm.k0', show: 'cm.r1-0', focus: 'cm.r1-0' },
        { say: 'Now two times seven is 14: write four and carry one. Two times four is eight, plus one is nine. Two times three is six. The second partial product is 6,940.', show: ['cm.r1', 'cm.k1', 'cm.note1', 'm.1'], focus: ['cm.r1', 'm.1'] },
        { say: 'Last, add the partial products. 2,082 plus 6,940 is 9,022. That is the same answer as the area model.', hide: 'cm.k1', show: ['cm.rule2', 'cm.ans', 'm.2'], focus: ['cm.ans', 'm.2'] },
      ],
    },
    {
      chapter: 'Watch out',
      layout: 'split',
      leftWidth: 460,
      left: [noZero],
      right: [
        { kind: 'callout', id: 'oops', tone: 'mistake', title: 'Forgetting the zero', md: 'When you multiply by the $2$ in $26$, you are really multiplying by $20$. The second partial product is $6940$, not $694$. Write a $0$ in the ones place first.' },
        { kind: 'math', id: 'm', size: 'md', lines: ['\\bad{2082 + 694 = 2776}', '\\good{2082 + 6940 = 9022}'] },
      ],
      lines: [
        { say: 'Watch out for this mistake. Here, the second partial product was written as 694, with no zero, so it sits one place too far to the right.', show: ['oops', 'nz.top', 'nz.bottom', 'nz.rule', 'nz.r0', 'nz.r1'], focus: 'nz.r1' },
        { say: 'But the two in 26 means 20, not two. 347 times 20 is 6,940, not 694.' },
        { say: 'Without the zero, the sum is only 2,776. With the zero, it is 9,022. So always write the zero in the ones place before you multiply by the tens digit.', show: ['nz.rule2', 'nz.ans', 'm.0', 'm.1'], focus: ['m.0', 'm.1'] },
      ],
    },
    {
      chapter: 'Is it reasonable?',
      layout: 'center',
      main: [{ kind: 'math', id: 'm', size: 'lg', lines: ['347 \\to 300, \\quad 26 \\to 30', '300 \\times 30 = 9000', '9022 \\text{ is close to } 9000 \\;\\good{\\checkmark}'] }],
      lines: [
        { say: 'You can catch a mistake like that with an estimate. 347 is about 300, and 26 is about 30.', show: 'm.0', focus: 'm.0' },
        { say: 'Three times three is nine, then write two zeros: 300 times 30 is 9,000.', show: 'm.1', focus: 'm.1' },
        { say: '9,022 is close to 9,000, so it is reasonable. But 2,776 is far away, so it must be wrong.', show: 'm.2', focus: 'm.2' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q',
          prompt: 'Find $128 \\times 34$.',
          choices: ['$896$', '$4252$', '$4352$', '$43\\,520$'],
          answer: 2,
          working: '$128 \\times 4 = 512$ and $128 \\times 30 = 3840$. Add the partial products: $512 + 3840 = 4352$.',
        },
      ],
      lines: [
        { say: 'Your turn. Find 128 times 34. Pause the video and try it.', show: 'q', wait: 6 },
        { say: 'The answer is C, 4,352. 128 times four is 512, and 128 times 30 is 3,840. Add them to get 4,352. Choice A forgets the zero, and adds 512 and 384.', show: 'q.answer' },
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
          items: ['Multiply by the ones digit, then by the tens: each answer is a **partial product**.', 'Write a $0$ in the ones place before multiplying by the tens digit.', 'Add the partial products: $2082 + 6940 = 9022$.'],
        },
      ],
      lines: [
        { say: 'Let’s sum up. To multiply by a two-digit number, multiply by the ones digit, then by the tens. Each answer is a partial product.', show: 'sum.0' },
        { say: 'Before you multiply by the tens digit, write a zero in the ones place.', show: 'sum.1' },
        { say: 'Then add the partial products to get the product. In the next part, we multiply a decimal number. See you there!', show: 'sum.2' },
      ],
    },
  ],
};

export default video;
