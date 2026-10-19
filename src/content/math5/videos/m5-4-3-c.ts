import type { Explainer } from '@/video/script.ts';
import { figure } from '@/video/solids.ts';
import { columnMultiply, heightFor, longDivision } from './lib/m5-4-figures.ts';

// Step 1: 27 × 6 = 162 (6 × 7 = 42, carry 4; 6 × 2 + 4 = 16).
const step1 = (id: string) => {
  const part = columnMultiply({ top: '27', bottom: '6', rows: ['162'], carries: [{ 1: '4' }], rowTone: 'good' });
  return figure(id, [part], heightFor(part, 52));
};

// Step 2: 162 ÷ 8 = 20 R 2 (16 − 16 = 0, bring down 2; 8 does not go into 2, so 0, remainder 2).
const step2 = (id: string) => {
  const part = longDivision({
    divisor: '8',
    dividend: '162',
    quotient: ' 20',
    remainder: '2',
    steps: [
      { prod: '16', at: 1, down: true },
      { prod: '0', at: 2, diff: '2' },
    ],
  });
  return figure(id, [part], heightFor(part, 52));
};

const video: Explainer = {
  id: 'm5-4-3-c',
  lessonId: 'm5-4-3',
  title: 'Solving Multiplication and Division Problems, Part 3: Two-Step Problems',
  thumbnailTitle: 'Two-Step Problems',
  thumbnail: 'ld',
  summary: 'Solving a problem in two steps: 6 classes of 27 students need buses that hold 8 (27 × 6 = 162, then 162 ÷ 8 = 20 R 2, so 21 buses), and checking that an answer fits the story. A second problem: 9 boxes of 48 pencils packed 6 to a bag make 72 bags.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Multiplying and Dividing · Part 3', title: 'Two-Step Problems', subtitle: 'Use the first answer in the second step' }],
      lines: [
        { say: 'Some problems need two steps. You find one answer first, and then you use it to find the next one.', show: 'title' },
        { say: 'In this video, you will solve a two-step problem, and check that your answer makes sense.' },
      ],
    },
    {
      chapter: 'Buses for skating',
      layout: 'center',
      main: [
        { kind: 'text', id: 't', size: 'lg', md: '$6$ classes are going skating. Each class has $27$ students. Each bus holds $8$ students. How many buses are needed?' },
        { kind: 'bullets', id: 'b', items: ['**Step 1:** How many students are going?', '**Step 2:** How many buses do they need?'] },
      ],
      lines: [
        { say: 'Six classes are going skating. Each class has 27 students. Each bus holds eight students. How many buses are needed?', show: 't' },
        { say: 'We cannot find the buses straight away, because we do not know how many students there are. So that is the first step: find the number of students.', show: 'b.0' },
        { say: 'The second step uses that number to find the buses.', show: 'b.1' },
      ],
    },
    {
      chapter: 'Step 1: the students',
      layout: 'split',
      leftWidth: 420,
      left: [step1('cm')],
      right: [
        { kind: 'text', id: 't', size: 'md', md: '$6$ equal groups of $27$ students: **multiply**.' },
        { kind: 'math', id: 'm', size: 'md', align: 'left', lines: ['6 \\times 7 = 42', '6 \\times 2 + \\thc{4} = 16', '27 \\times 6 = 162'] },
      ],
      lines: [
        { say: 'Step one. There are six classes, and each class has 27 students. That is six equal groups of 27, and we want the total. So multiply: 27 times six.', show: ['t', 'cm.top', 'cm.bottom', 'cm.rule'] },
        { say: 'Six times seven is 42. Write the two, and carry the four.', show: ['m.0', 'cm.r0-0', 'cm.k0'], focus: ['cm.r0-0', 'cm.k0', 'm.0'] },
        { say: 'Six times two is twelve, plus the four you carried is 16. Write 16.', show: ['m.1', 'cm.r0-1', 'cm.r0-2'], focus: ['cm.r0-1', 'cm.r0-2', 'm.1'] },
        { say: 'So 162 students are going skating.', show: 'm.2', focus: ['cm.r0', 'm.2'] },
      ],
    },
    {
      chapter: 'Step 2: the buses',
      layout: 'split',
      leftWidth: 460,
      left: [step2('ld')],
      right: [
        { kind: 'text', id: 't', size: 'md', md: '$162$ students, $8$ in each bus: **divide**.' },
        { kind: 'math', id: 'm', size: 'md', align: 'left', lines: ['16 \\div 8 = 2', '2 \\div 8 = \\good{0} \\text{ R } 2', '162 \\div 8 = 20 \\text{ R } 2'] },
      ],
      lines: [
        { say: 'Step two. Now we know the total, 162 students, and the size of each group, eight. We want how many groups fit, so divide: 162 divided by eight.', show: ['t', 'ld.bracket', 'ld.dividend', 'ld.dv'] },
        { say: 'Eight does not go into one, so start with 16. Eight goes into 16 two times. Write two on top. Two times eight is 16, and 16 minus 16 is zero.', show: ['m.0', 'ld.q1', 'ld.s0-prod', 'ld.s0-rule'], focus: ['ld.q1', 'm.0'] },
        { say: 'Bring down the two. Eight does not go into two, so write a zero in the quotient. Two is left over.', show: ['m.1', 'ld.s0-down', 'ld.q2', 'ld.s1-prod', 'ld.s1-rule', 'ld.s1-diff'], focus: ['ld.q2', 'ld.s1-diff', 'm.1'] },
        { say: 'So 162 divided by eight is 20 remainder two.', show: ['m.2', 'ld.rem'], focus: ['ld.quotient', 'ld.rem', 'm.2'] },
      ],
    },
    {
      chapter: 'What the remainder means',
      layout: 'center',
      main: [{ kind: 'math', id: 'm', size: 'lg', lines: ['20 \\times 8 = 160 \\text{ students}', '162 - 160 = 2 \\text{ students without a seat}', '\\good{21 \\text{ buses}}'] }],
      lines: [
        { say: 'Now think about the remainder. Twenty buses hold 20 times eight, which is 160 students.', show: 'm.0', focus: 'm.0' },
        { say: 'That leaves two students without a seat. They need a bus as well, so round up.', show: 'm.1', focus: 'm.1' },
        { say: 'So 21 buses are needed.', show: 'm.2', focus: 'm.2' },
      ],
    },
    {
      chapter: 'Does it make sense?',
      layout: 'center',
      main: [
        { kind: 'callout', id: 'tip', tone: 'tip', title: 'Does it make sense?', md: 'Read the question again. Check that your answer fits the story: a whole number of buses, enough seats for everyone, and the right unit.' },
        { kind: 'bullets', id: 'b', check: true, items: ['A whole number of buses: $21$.', 'Enough seats: $21 \\times 8 = 168$, and $168$ is more than $162$.', 'The right unit: the question asks for buses, not students.'] },
      ],
      lines: [
        { say: 'After you solve a problem, read the question again, and check that the answer fits the story.', show: 'tip' },
        { say: 'Is it a whole number of buses? Yes: 21.', show: 'b.0' },
        { say: 'Are there enough seats for everyone? 21 buses hold 21 times eight, which is 168 seats. That is more than 162 students, so yes.', show: 'b.1' },
        { say: 'And is it the right unit? The question asks for buses, and our answer is in buses. It makes sense.', show: 'b.2' },
      ],
    },
    {
      chapter: 'Another two-step problem',
      layout: 'center',
      main: [
        { kind: 'text', id: 't', size: 'md', md: 'A store has $9$ boxes of pencils, with $48$ pencils in each box. The pencils are packed into bags of $6$. How many bags can be filled?' },
        { kind: 'math', id: 'm', size: 'md', lines: ['\\text{Step 1: } 48 \\times 9 = 432 \\text{ pencils}', '\\text{Step 2: } 432 \\div 6 = 72 \\text{ bags}', '\\text{Check: } 72 \\times 6 = 432 \\;\\good{\\checkmark}'] },
      ],
      lines: [
        { say: 'Here is one more. A store has nine boxes of pencils, with 48 pencils in each box. The pencils are packed into bags of six. How many bags can be filled?', show: 't' },
        { say: 'Step one: find the number of pencils. Nine equal groups of 48: multiply. 48 times nine is 432 pencils.', show: 'm.0', focus: 'm.0' },
        { say: 'Step two: 432 pencils, six in each bag. How many bags fit? Divide: 432 divided by six is 72, with no remainder.', show: 'm.1', focus: 'm.1' },
        { say: 'Check: 72 times six is 432. So the store fills 72 bags.', show: 'm.2', focus: 'm.2' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q',
          prompt: '$5$ classes of $26$ students go to a museum. Each van holds $9$ students. How many vans are needed?',
          choices: ['$15$ vans', '$14$ vans', '$4$ vans', '$16$ vans'],
          answer: 0,
          working: 'Students: $26 \\times 5 = 130$. Vans: $130 \\div 9 = 14$ R $4$. The $4$ students left still need a seat, so round up: $15$ vans.',
        },
      ],
      lines: [
        { say: 'Your turn. Five classes of 26 students go to a museum. Each van holds nine students. How many vans are needed? Pause the video and try it.', show: 'q', wait: 6 },
        { say: 'The answer is A, 15 vans. First find the students: 26 times five is 130. Then divide: 130 divided by nine is 14 remainder four. The four students left still need a seat, so round up. Choice B drops the remainder, and leaves four students behind.', show: 'q.answer' },
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
          items: ['In a two-step problem, find what you need first.', 'Use the answer from the first step in the second step.', 'Decide what any remainder means.', 'Check that the answer fits the story.'],
        },
      ],
      lines: [
        { say: 'Let’s sum up. In a two-step problem, ask what you need to find first.', show: 'sum.0' },
        { say: 'Then use the answer from the first step in the second step.', show: 'sum.1' },
        { say: 'Decide what any remainder means for the story.', show: 'sum.2' },
        { say: 'And check that your answer fits the story, with an estimate and by reading the question again. Well done: you can now multiply and divide big numbers, and use them to solve problems!', show: 'sum.3' },
      ],
    },
  ],
};

export default video;
