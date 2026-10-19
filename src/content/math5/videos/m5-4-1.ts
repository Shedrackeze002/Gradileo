import type { Explainer } from '@/video/script.ts';
import { areaModel } from '@/video/algebra.ts';
import { figure } from '@/video/solids.ts';
import { columnMultiply, heightFor } from './lib/m5-4-figures.ts';

// 347 × 6 = 2082: the ones carry 4 into the tens, and the tens carry 2 into the hundreds.
const work = (id: string) => {
  const part = columnMultiply({ top: '347', bottom: '6', rows: ['2082'], carries: [{ 1: '4', 2: '2' }], rowTone: 'good' });
  return figure(id, [part], heightFor(part, 50));
};

const video: Explainer = {
  id: 'm5-4-1',
  lessonId: 'm5-4-1',
  title: 'Multiplying with the Standard Algorithm, Part 1: Multiplying by a One-Digit Number',
  thumbnailTitle: 'Multiplying by One Digit',
  thumbnail: 'cm',
  summary: 'What 347 × 6 means (six groups of 347, split into 300, 40 and 7), then the standard algorithm: multiply each place from the ones, carry the tens digit, and add the carry after the next multiplication. Includes the mistake of adding the carry too soon.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Multiplying and Dividing · Part 1', title: 'Multiplying by a One-Digit Number', subtitle: 'Multiply each place, and carry the tens' }],
      lines: [
        { say: 'A school orders boxes of granola bars. Each box holds 347 grams. How many grams are in six boxes? To find out, we multiply 347 times six.', show: 'title' },
        { say: 'In this video, you will learn the standard algorithm for multiplying. An algorithm is a set of steps that always works. This one breaks a big multiplication into small steps that you already know.' },
      ],
    },
    {
      chapter: 'Six groups of 347',
      layout: 'center',
      main: [
        figure('am', [areaModel({ top: ['300', '40', '7'], side: ['6'], cells: [['1800', '240', '42']], widths: [5, 3, 2], heights: [2.2], tones: [['brand', 'adj', 'good']] })], 300),
        { kind: 'math', id: 'm', size: 'md', lines: ['1800 + 240 + 42 = 2082'] },
      ],
      lines: [
        { say: 'Multiplying puts equal groups together. 347 times six means six groups of 347.', show: ['am.outline', 'am.side'] },
        { say: 'An area model shows this as a rectangle. The six goes down the side. The 347 goes along the top, split by its places: 300, 40 and seven.', show: ['am.grid', 'am.top'] },
        { say: 'Now multiply each piece by six. Six times 300 is 1,800.', show: 'am.c0-0', focus: 'am.c0-0' },
        { say: 'Six times 40 is 240.', show: 'am.c0-1', focus: 'am.c0-1' },
        { say: 'And six times seven is 42.', show: 'am.c0-2', focus: 'am.c0-2' },
        { say: 'Add the pieces: 1,800 plus 240 plus 42 is 2,082. So 347 times six is 2,082.', show: 'm.0', focus: ['am', 'm.0'] },
        { say: 'The standard algorithm does the same multiplying, in a shorter way. It works one place at a time, starting with the ones.' },
      ],
    },
    {
      chapter: 'Words to know',
      layout: 'center',
      main: [
        { kind: 'callout', id: 'def', tone: 'definition', title: 'Product', md: 'The **product** is the answer to a multiplication. In $347 \\times 6 = 2082$, the product is $2082$.' },
        { kind: 'callout', id: 'key', tone: 'key', title: 'Carrying', md: 'Multiply each digit, starting with the **ones**. When a product is $10$ or more, write its ones digit and **carry** the tens digit to the next place. Add the carry **after** you multiply the next digit.' },
      ],
      lines: [
        { say: 'First, a word. The product is the answer to a multiplication. In 347 times six equals 2,082, the product is 2,082.', show: 'def' },
        { say: 'Here is the plan. Multiply each digit by six, starting with the ones. When a product is ten or more, it does not fit in one place.', show: 'key' },
        { say: 'So write its ones digit, and carry the tens digit over to the next place. Carry means you take it with you. Then add the carried digit after you multiply the next digit.' },
      ],
    },
    {
      chapter: 'Ones, tens, hundreds',
      layout: 'split',
      leftWidth: 460,
      left: [work('cm')],
      right: [
        { kind: 'math', id: 'm', size: 'md', align: 'left', lines: ['\\text{Ones: } 6 \\times 7 = 42', '\\text{Tens: } 6 \\times 4 = 24', '24 + \\thc{4} = 28', '\\text{Hundreds: } 6 \\times 3 + \\thc{2} = 20'] },
      ],
      lines: [
        { say: 'Write 347. Under it, write the six, lined up with the ones. Then draw a line under them.', show: ['cm.top', 'cm.bottom', 'cm.rule'] },
        { say: 'Start with the ones. Six times seven is 42. That is four tens and two ones.', show: 'm.0', focus: ['cm.top0', 'cm.bot0', 'm.0'] },
        { say: 'Write the two in the ones place. Carry the four tens over to the tens place: write a small four above the tens digit.', show: ['cm.r0-0', 'cm.k0-1'], focus: ['cm.r0-0', 'cm.k0-1'] },
        { say: 'Next, the tens. Six times four is 24. This four means four tens, so that is 24 tens.', show: 'm.1', focus: ['cm.top1', 'cm.bot0', 'm.1'] },
        { say: 'Now add the four tens you carried. 24 plus four is 28. Write the eight in the tens place, and carry the two to the hundreds.', show: ['m.2', 'cm.r0-1', 'cm.k0-2'], focus: ['cm.k0-1', 'cm.r0-1', 'cm.k0-2', 'm.2'] },
        { say: 'Last, the hundreds. Six times three is 18. Add the two you carried: 18 plus two is 20.', show: 'm.3', focus: ['cm.top2', 'cm.k0-2', 'm.3'] },
        { say: 'There are no more digits to multiply, so write the whole 20 at the front.', show: ['cm.r0-2', 'cm.r0-3'], focus: ['cm.r0-2', 'cm.r0-3'] },
        { say: 'So 347 times six is 2,082. That is the same product the area model gave us. Six boxes hold 2,082 grams of granola bars.', focus: 'cm.r0' },
      ],
    },
    {
      chapter: 'Watch out',
      layout: 'split',
      leftWidth: 400,
      left: [work('cm2')],
      right: [
        { kind: 'callout', id: 'oops', tone: 'mistake', title: 'Adding the carry too soon', md: 'Multiply first, then add the carry. In the tens, $6 \\times 4 = 24$, then $24 + 4 = 28$. Do **not** add $4 + 4$ first and then multiply.' },
        { kind: 'math', id: 'm', size: 'md', lines: ['\\bad{(4 + 4) \\times 6 = 48}', '\\good{6 \\times 4 + 4 = 28}'] },
      ],
      lines: [
        { say: 'Watch out for this mistake. In the tens, the carried four sits right on top of the four in 347. It is easy to add them first.', show: ['oops', 'cm2.top', 'cm2.bottom', 'cm2.rule', 'cm2.k0-1', 'cm2.r0-0'], focus: ['cm2.k0-1', 'cm2.top1'] },
        { say: 'But four plus four is eight, and eight times six is 48. That is wrong.', show: 'm.0', focus: 'm.0' },
        { say: 'The carried digit is not part of the number you multiply. Multiply first: six times four is 24. Then add the carry: 24 plus four is 28.', show: ['m.1', 'cm2.r0-1'], focus: ['m.1', 'cm2.r0-1'] },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q',
          prompt: 'Find $258 \\times 4$.',
          choices: ['$802$', '$1032$', '$2022$', '$1132$'],
          answer: 1,
          working: 'Ones: $4 \\times 8 = 32$, write $2$, carry $3$. Tens: $4 \\times 5 = 20$, plus $3$ is $23$, write $3$, carry $2$. Hundreds: $4 \\times 2 = 8$, plus $2$ is $10$. So $258 \\times 4 = 1032$.',
        },
      ],
      lines: [
        { say: 'Your turn. Find 258 times four. Pause the video and try it.', show: 'q', wait: 6 },
        { say: 'The answer is B, 1,032. Four times eight is 32: write two, carry three. Four times five is 20, plus three is 23: write three, carry two. Four times two is eight, plus two is ten. Choice C adds each carry before multiplying.', show: 'q.answer' },
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
          items: ['The **product** is the answer to a multiplication.', 'Multiply one place at a time, starting with the ones.', 'Write the ones digit and carry the tens digit to the next place.', 'Multiply first, then add the carry.'],
        },
      ],
      lines: [
        { say: 'Let’s sum up. The product is the answer to a multiplication.', show: 'sum.0' },
        { say: 'To multiply by a one-digit number, multiply one place at a time, starting with the ones.', show: 'sum.1' },
        { say: 'When a product is ten or more, write the ones digit, and carry the tens digit to the next place.', show: 'sum.2' },
        { say: 'And always multiply first, then add the carry. In the next part, we multiply by a two-digit number. See you there!', show: 'sum.3' },
      ],
    },
  ],
};

export default video;
