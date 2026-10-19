import type { Explainer } from '@/video/script.ts';
import { areaModel } from '@/video/algebra.ts';
import { figure } from '@/video/solids.ts';
import { columnMultiply, heightFor } from './lib/m5-4-figures.ts';

// 347 × 26: 347 × 6 = 2082 (carry 4, then 2), 347 × 20 = 6940 (carry 1), and 2082 + 6940 = 9022.
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

// The finished work with no carried digits, for adding the partial products (and the thumbnail).
const done = (id: string) => {
  const part = columnMultiply({
    top: '347',
    bottom: '26',
    rows: ['2082', '6940'],
    answer: '9022',
    notes: ['\\leftarrow 347 \\times 6', '\\leftarrow 347 \\times 20'],
  });
  return figure(id, [part], heightFor(part, 46));
};

// The mistake: the second row written as 694, with no zero, so the sum is 2776.
const wrong = (id: string) => {
  const part = columnMultiply({ top: '347', bottom: '26', rows: ['2082', '694'], answer: '2776', answerTone: 'bad', placeholders: false });
  return figure(id, [part], heightFor(part, 46));
};

const video: Explainer = {
  id: 'm5-4-1-b',
  lessonId: 'm5-4-1',
  title: 'Multiplying with the Standard Algorithm, Part 2: Multiplying by a Two-Digit Number',
  thumbnailTitle: 'Multiplying by Two Digits',
  thumbnail: 'cm4',
  summary: 'Multiplying 347 × 26 by splitting 26 into 20 + 6: an area model of the partial products, then the standard algorithm (347 × 6 = 2082, a zero in the ones place and 347 × 2 tens = 6940, then 2082 + 6940 = 9022), and the mistake of forgetting the zero.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Multiplying and Dividing · Part 2', title: 'Multiplying by a Two-Digit Number', subtitle: 'Two partial products, then add' }],
      lines: [
        { say: 'Back to the granola bars. The school really orders 26 boxes, and each box holds 347 grams. How many grams is that in all? Now we need 347 times 26.', show: 'title' },
        { say: 'In this video, you will multiply by a two-digit number. The trick is to split it into two easier multiplications, and then add.' },
      ],
    },
    {
      chapter: 'Split 26 into 20 and 6',
      layout: 'center',
      main: [
        figure('am', [
          areaModel({
            top: ['300', '40', '7'],
            side: ['20', '6'],
            cells: [
              ['6000', '800', '140'],
              ['1800', '240', '42'],
            ],
            widths: [5, 3, 2],
            heights: [1.5, 1.2],
            tones: [
              ['brand', 'brand', 'brand'],
              ['adj', 'adj', 'adj'],
            ],
          }),
        ], 300),
        { kind: 'math', id: 'm', size: 'md', lines: ['1800 + 240 + 42 = \\adj{2082}', '6000 + 800 + 140 = \\brand{6940}', '\\adj{2082} + \\brand{6940} = 9022'] },
      ],
      lines: [
        { say: 'Twenty-six is 20 plus six. So 26 groups of 347 are 20 groups, plus six more groups.', show: ['am.outline', 'am.side'] },
        { say: 'Here is the area model. 347 goes along the top, split into 300, 40 and seven. And 26 goes down the side, split into 20 and six.', show: ['am.grid', 'am.top'] },
        { say: 'The bottom row is 347 times six. We found it in part one: 1,800 plus 240 plus 42 is 2,082.', show: ['am.c1-0', 'am.c1-1', 'am.c1-2', 'm.0'], focus: ['am.c1-0', 'am.c1-1', 'am.c1-2', 'm.0'] },
        { say: 'The top row is 347 times 20. Twenty times 300 is 6,000. Twenty times 40 is 800. And 20 times seven is 140.', show: ['am.c0-0', 'am.c0-1', 'am.c0-2'], focus: ['am.c0-0', 'am.c0-1', 'am.c0-2'] },
        { say: 'Together, the top row is 6,000 plus 800 plus 140, which is 6,940.', show: 'm.1', focus: ['am.c0-0', 'am.c0-1', 'am.c0-2', 'm.1'] },
        { say: 'Now add the two rows: 2,082 plus 6,940 is 9,022. So 347 times 26 is 9,022.', show: 'm.2', focus: ['am', 'm.2'] },
      ],
    },
    {
      chapter: 'Partial products',
      layout: 'center',
      main: [
        { kind: 'callout', id: 'def', tone: 'definition', title: 'Partial products', md: 'To multiply by $26$, think of $26$ as $20 + 6$. Multiply by the $6$, then by the $20$, then add. The two answers you add are called **partial products**.' },
        { kind: 'math', id: 'm', size: 'md', lines: ['347 \\times 26 = \\adj{347 \\times 6} + \\brand{347 \\times 20}'] },
      ],
      lines: [
        { say: 'The two answers we added have a name. They are called partial products. Partial means part: each one is part of the whole product.', show: 'def' },
        { say: '347 times 26 is 347 times six, plus 347 times 20. The standard algorithm finds these same two partial products, written in columns.', show: 'm.0', focus: 'm.0' },
      ],
    },
    {
      chapter: 'Multiply by the ones',
      layout: 'split',
      leftWidth: 560,
      left: [work('cm')],
      right: [{ kind: 'math', id: 'm', size: 'md', align: 'left', lines: ['6 \\times 7 = 42', '6 \\times 4 + \\thc{4} = 28', '6 \\times 3 + \\thc{2} = 20'] }],
      lines: [
        { say: 'Write 347, and write 26 under it, with the ones lined up. Draw a line.', show: ['cm.top', 'cm.bottom', 'cm.rule'] },
        { say: 'Step one: multiply 347 by the ones digit, six, just like in part one. Six times seven is 42. Write the two, and carry the four.', show: ['m.0', 'cm.r0-0', 'cm.k0-1'], focus: ['cm.bot0', 'cm.top0', 'm.0'] },
        { say: 'Six times four is 24, plus the four you carried is 28. Write the eight, and carry the two.', show: ['m.1', 'cm.r0-1', 'cm.k0-2'], focus: ['cm.bot0', 'cm.top1', 'm.1'] },
        { say: 'Six times three is 18, plus the two you carried is 20. Write 20.', show: ['m.2', 'cm.r0-2', 'cm.r0-3'], focus: ['cm.bot0', 'cm.top2', 'm.2'] },
        { say: 'That is the first partial product: 2,082. It is 347 times six.', show: 'cm.note0', focus: ['cm.r0', 'cm.note0'] },
      ],
    },
    {
      chapter: 'Multiply by the tens',
      layout: 'split',
      leftWidth: 560,
      left: [work('cm3')],
      right: [{ kind: 'math', id: 'm', size: 'md', align: 'left', lines: ['\\text{Write } \\good{0} \\text{ first}', '2 \\times 7 = 14', '2 \\times 4 + \\thc{1} = 9', '2 \\times 3 = 6'] }],
      lines: [
        { say: 'Step two: multiply by the tens digit, the two. Start a new row. The old carries are finished, so clear them away.', show: ['cm3.top', 'cm3.bottom', 'cm3.rule', 'cm3.r0', 'cm3.note0'], focus: 'cm3.bot1' },
        { say: 'This two is in the tens place, so it really means 20. To show that, write a zero in the ones place first. Now everything in this row will be tens.', show: ['m.0', 'cm3.r1-0'], focus: ['cm3.bot1', 'cm3.r1-0', 'm.0'] },
        { say: 'Now multiply by two. Two times seven is 14. Write the four next to the zero, and carry the one.', show: ['m.1', 'cm3.r1-1', 'cm3.k1-1'], focus: ['cm3.bot1', 'cm3.top0', 'm.1'] },
        { say: 'Two times four is eight. Add the one you carried, to make nine. Write the nine.', show: ['m.2', 'cm3.r1-2'], focus: ['cm3.bot1', 'cm3.top1', 'cm3.k1-1', 'm.2'] },
        { say: 'Two times three is six. Write the six.', show: ['m.3', 'cm3.r1-3'], focus: ['cm3.bot1', 'cm3.top2', 'm.3'] },
        { say: 'The second partial product is 6,940. It is 347 times 20, just like the top row of the area model.', show: 'cm3.note1', focus: ['cm3.r1', 'cm3.note1'] },
      ],
    },
    {
      chapter: 'Add the partial products',
      layout: 'split',
      leftWidth: 560,
      left: [done('cm4')],
      right: [{ kind: 'math', id: 'm', size: 'md', align: 'left', lines: ['2 + 0 = 2', '8 + 4 = 12', '0 + 9 + 1 = 10', '2 + 6 + 1 = 9'] }],
      lines: [
        { say: 'Step three: add the two partial products. Draw a plus sign and a line.', show: ['cm4.top', 'cm4.bottom', 'cm4.rule', 'cm4.r0', 'cm4.r1', 'cm4.note0', 'cm4.note1', 'cm4.rule2'] },
        { say: 'Add from the ones, like any addition. Two plus zero is two. Eight plus four is 12: write the two, and carry one.', show: ['m.0', 'm.1', 'cm4.ans0', 'cm4.ans1'], focus: ['cm4.ans0', 'cm4.ans1', 'm.0', 'm.1'] },
        { say: 'Zero plus nine, plus the one, is ten: write zero, and carry one. Two plus six, plus one, is nine.', show: ['m.2', 'm.3', 'cm4.ans2', 'cm4.ans3'], focus: ['cm4.ans2', 'cm4.ans3', 'm.2', 'm.3'] },
        { say: 'So 347 times 26 is 9,022. The school orders 9,022 grams of granola bars. It is the same answer the area model gave us.', focus: 'cm4.ans' },
      ],
    },
    {
      chapter: 'Watch out',
      layout: 'split',
      leftWidth: 420,
      left: [wrong('w')],
      right: [
        { kind: 'callout', id: 'oops', tone: 'mistake', title: 'Forgetting the zero', md: 'The $2$ in $26$ means $2$ tens. Without the $0$, the second row is $694$ instead of $6940$, and the answer is far too small.' },
        { kind: 'math', id: 'm', size: 'md', lines: ['\\bad{2082 + 694 = 2776}', '\\good{2082 + 6940 = 9022}'] },
      ],
      lines: [
        { say: 'The most common mistake is forgetting the zero. Look at this work. The second row was written as 694, starting in the ones place.', show: ['oops', 'w.top', 'w.bottom', 'w.rule', 'w.r0', 'w.r1'], focus: 'w.r1' },
        { say: 'Then the sum is 2,082 plus 694, which is only 2,776.', show: ['m.0', 'w.rule2', 'w.ans'], focus: ['m.0', 'w.ans'] },
        { say: 'But the two in 26 means two tens, so that row must be 6,940. The zero in the ones place moves every digit to the correct place. Then the answer is 9,022.', show: 'm.1', focus: 'm.1' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q',
          prompt: 'Find $214 \\times 32$.',
          choices: ['$1070$', '$6420$', '$6748$', '$6848$'],
          answer: 3,
          working: '$214 \\times 2 = 428$ and $214 \\times 30 = 6420$ (a $0$ in the ones place, then $214 \\times 3 = 642$). Add: $428 + 6420 = 6848$.',
        },
      ],
      lines: [
        { say: 'Your turn. Find 214 times 32. Pause the video and try it.', show: 'q', wait: 6 },
        { say: 'The answer is D, 6,848. 214 times two is 428. Then write a zero, and multiply by three: 214 times 30 is 6,420. Add them: 428 plus 6,420 is 6,848. Choice A forgets the zero in the second partial product.', show: 'q.answer' },
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
          items: ['Split the two-digit number into tens and ones: $26 = 20 + 6$.', 'Multiply by the ones digit. That is the first partial product.', 'Write a $0$ in the ones place, then multiply by the tens digit.', 'Add the partial products.'],
        },
      ],
      lines: [
        { say: 'Let’s sum up. To multiply by a two-digit number, split it into tens and ones. 26 is 20 plus six.', show: 'sum.0' },
        { say: 'Multiply by the ones digit. That is the first partial product.', show: 'sum.1' },
        { say: 'For the second partial product, write a zero in the ones place, then multiply by the tens digit.', show: 'sum.2' },
        { say: 'Then add the partial products. In the next part, we check a product with an estimate. See you there!', show: 'sum.3' },
      ],
    },
  ],
};

export default video;
