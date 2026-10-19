import type { Explainer } from '@/video/script.ts';
import { figure } from '@/video/solids.ts';
import { columnMultiply, dotGroups, heightFor } from './lib/m5-4-figures.ts';

// Four boxes of six markers: 4 × 6 = 24, 24 ÷ 4 = 6 and 24 ÷ 6 = 4 all describe this picture.
const boxes = (id: string) => figure(id, [dotGroups({ groups: 4, size: 6, cols: 3, perRow: 2, tone: 'adj', labels: ['6', '6', '6', '6'] })], 460);

// 36 × 24: 36 × 4 = 144 (carry 2), 36 × 20 = 720 (carry 1), 144 + 720 = 864.
const work = (id: string) => {
  const part = columnMultiply({
    top: '36',
    bottom: '24',
    rows: ['144', '720'],
    answer: '864',
    carries: [{ 1: '2' }, { 1: '1' }],
    notes: ['\\leftarrow 36 \\times 4', '\\leftarrow 36 \\times 20'],
  });
  return figure(id, [part], heightFor(part, 46));
};

const video: Explainer = {
  id: 'm5-4-3',
  lessonId: 'm5-4-3',
  title: 'Solving Multiplication and Division Problems, Part 1: Multiply or Divide?',
  thumbnailTitle: 'Multiply or Divide?',
  thumbnail: 'bx',
  summary: 'Deciding whether a story needs multiplication (putting equal groups together) or division (sharing a total into equal groups, or finding how many groups fit), with 24 boxes of 36 markers (864, checked with the estimate 40 × 20 = 800).',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Multiplying and Dividing · Part 1', title: 'Multiply or Divide?', subtitle: 'Picture the story first' }],
      lines: [
        { say: 'You know how to multiply and divide big numbers. But a word problem does not tell you which one to do. You have to decide.', show: 'title' },
        { say: 'In this video, you will picture what is happening in a story, and decide whether to multiply or divide.' },
      ],
    },
    {
      chapter: 'Putting groups together',
      layout: 'split',
      leftWidth: 600,
      left: [boxes('bx')],
      right: [
        { kind: 'text', id: 't', size: 'md', md: 'There are $4$ boxes. Each box holds $6$ markers. How many markers are there in all?' },
        { kind: 'math', id: 'm', size: 'md', align: 'left', lines: ['4 \\times 6 = 24'] },
      ],
      lines: [
        { say: 'Here is a small story. There are four boxes, and each box holds six markers. How many markers are there in all?', show: ['t', 'bx.g0', 'bx.g1', 'bx.g2', 'bx.g3'] },
        { say: 'Picture it. There are four equal groups, with six in each group.', show: 'bx.labels', focus: 'bx.labels' },
        { say: 'We want the total, so we put the equal groups together. That is multiplying: four times six is 24 markers.', show: 'm.0', focus: 'm.0' },
      ],
    },
    {
      chapter: 'Sharing and grouping',
      layout: 'split',
      leftWidth: 600,
      left: [boxes('bx2')],
      right: [
        { kind: 'text', id: 't1', size: 'md', md: '$24$ markers are shared equally among $4$ boxes. How many go in each box?' },
        { kind: 'math', id: 'm1', size: 'md', align: 'left', lines: ['24 \\div 4 = 6'] },
        { kind: 'text', id: 't2', size: 'md', md: '$24$ markers are packed $6$ to a box. How many boxes are filled?' },
        { kind: 'math', id: 'm2', size: 'md', align: 'left', lines: ['24 \\div 6 = 4'] },
      ],
      lines: [
        { say: 'Now turn the story around. 24 markers are shared equally among four boxes. How many go in each box?', show: ['t1', 'bx2.g0', 'bx2.g1', 'bx2.g2', 'bx2.g3'] },
        { say: 'This time we know the total, and we share it into equal groups. That is dividing: 24 divided by four is six in each box.', show: ['m1.0', 'bx2.labels'], focus: ['m1.0', 'bx2.labels'] },
        { say: 'Here is another way. 24 markers are packed six to a box. How many boxes are filled?', show: 't2' },
        { say: 'We know the total, and the size of each group. We want to know how many groups fit. That is dividing as well: 24 divided by six is four boxes.', show: 'm2.0', focus: ['m2.0', 'bx2.g0', 'bx2.g1', 'bx2.g2', 'bx2.g3'] },
      ],
    },
    {
      chapter: 'How to decide',
      layout: 'center',
      main: [
        { kind: 'callout', id: 'key', tone: 'key', title: 'Multiply or divide?', md: '**Multiply** when you put equal groups together and want the total. **Divide** when you share a total into equal groups, or want to know how many groups fit.' },
        { kind: 'table', id: 'tb', head: ['You know', 'You want', 'So'], rows: [['the groups and the size of each', 'the total', '**multiply**'], ['the total and the number of groups', 'the size of each', '**divide**'], ['the total and the size of each', 'how many groups', '**divide**']] },
      ],
      lines: [
        { say: 'So read the story and picture what is happening.', show: 'key' },
        { say: 'If you know how many groups there are and the size of each group, and you want the total, multiply.', show: 'tb.0', focus: 'tb.0' },
        { say: 'If you know the total and the number of groups, and you want the size of each group, divide.', show: 'tb.1', focus: 'tb.1' },
        { say: 'And if you know the total and the size of each group, and you want how many groups, divide as well.', show: 'tb.2', focus: 'tb.2' },
      ],
    },
    {
      chapter: 'Boxes of markers',
      layout: 'split',
      leftWidth: 540,
      left: [work('cm')],
      right: [
        { kind: 'text', id: 't', size: 'md', md: 'A school orders $24$ boxes of markers. Each box holds $36$ markers. How many markers is that?' },
        { kind: 'math', id: 'm', size: 'md', align: 'left', lines: ['36 \\times 4 = 144', '36 \\times 20 = 720', '144 + 720 = 864'] },
      ],
      lines: [
        { say: 'Now a bigger one. A school orders 24 boxes of markers. Each box holds 36 markers. How many markers is that?', show: 't' },
        { say: 'Picture it: 24 equal groups, with 36 in each. We want the total, so we put the groups together. Multiply 36 times 24.', show: ['cm.top', 'cm.bottom', 'cm.rule'] },
        { say: 'First, the ones digit. Four times six is 24: write four, carry two. Four times three is twelve, plus two is 14. So 36 times four is 144.', show: ['m.0', 'cm.r0', 'cm.k0', 'cm.note0'], focus: ['cm.r0', 'm.0'] },
        { say: 'Next, the tens digit. Write a zero in the ones place. Two times six is twelve: write two, carry one. Two times three is six, plus one is seven. So 36 times 20 is 720.', hide: 'cm.k0', show: ['m.1', 'cm.r1', 'cm.k1', 'cm.note1'], focus: ['cm.r1', 'm.1'] },
        { say: 'Add the partial products: 144 plus 720 is 864. The school orders 864 markers.', show: ['m.2', 'cm.rule2', 'cm.ans'], focus: ['cm.ans', 'm.2'] },
      ],
    },
    {
      chapter: 'Check with an estimate',
      layout: 'center',
      main: [{ kind: 'math', id: 'm', size: 'lg', lines: ['36 \\to 40, \\quad 24 \\to 20', '40 \\times 20 = 800', '864 \\text{ is close to } 800 \\;\\good{\\checkmark}'] }],
      lines: [
        { say: 'Is 864 reasonable? Estimate. 36 rounds to 40, and 24 rounds to 20.', show: 'm.0', focus: 'm.0' },
        { say: 'Four times two is eight, then write two zeros: 40 times 20 is 800.', show: 'm.1', focus: 'm.1' },
        { say: '864 is close to 800, so the answer is reasonable.', show: 'm.2', focus: 'm.2' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q',
          prompt: 'A baker puts $144$ muffins into boxes. Each box holds $6$ muffins. Which number sentence finds how many boxes the baker fills?',
          choices: ['$144 \\times 6$', '$144 + 6$', '$144 - 6$', '$144 \\div 6$'],
          answer: 3,
          working: 'The total ($144$) and the size of each group ($6$) are known. To find how many groups fit, divide: $144 \\div 6 = 24$ boxes.',
        },
      ],
      lines: [
        { say: 'Your turn. A baker puts 144 muffins into boxes. Each box holds six muffins. Which number sentence finds how many boxes the baker fills? Pause the video and try it.', show: 'q', wait: 6 },
        { say: 'The answer is D. We know the total, 144, and the size of each group, six. We want how many groups fit, so divide: 144 divided by six is 24 boxes. Choice A multiplies, which would be the number of muffins in 144 boxes.', show: 'q.answer' },
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
          items: ['Picture the story before you choose.', '**Multiply** to put equal groups together and find the total.', '**Divide** to share a total into equal groups, or to find how many groups fit.', 'Check your answer with an estimate.'],
        },
      ],
      lines: [
        { say: 'Let’s sum up. Picture the story before you choose an operation.', show: 'sum.0' },
        { say: 'Multiply to put equal groups together and find the total.', show: 'sum.1' },
        { say: 'Divide to share a total into equal groups, or to find how many groups fit.', show: 'sum.2' },
        { say: 'And check your answer with an estimate. In the next part, we decide what to do with a remainder. See you there!', show: 'sum.3' },
      ],
    },
  ],
};

export default video;
