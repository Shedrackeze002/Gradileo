import type { Explainer } from '@/video/script.ts';
import { figure } from '@/video/solids.ts';
import { balance, chain } from './lib/m5-7-figures.ts';

// n + 7 = 15 on a balance: a bag and 7 marbles on the left, 15 marbles on the right. The 7 to take
// away from each side are the groups `take`.
const scale = (id: string, height?: number) =>
  figure(
    id,
    [
    balance({
      left: { bags: 1, marbles: [{ id: 'take', count: 7 }] },
      right: { marbles: [{ id: 'keep', count: 8 }, { id: 'take', count: 7 }] },
      labels: ['n + 7', '15'],
    }),
    ],
    height,
  );
const all = (id: string) => [`${id}.stand`, `${id}.lbags`, `${id}.l-take`, `${id}.r-keep`, `${id}.r-take`];

// n, add 7, gives 15; undo: 15, subtract 7, gives 8.
const undo = (id: string) => figure(id, [chain({ nodes: ['n', '15'], ops: ['+\\,7'], back: ['8', '15'], undo: ['-\\,7'], gap: 3.4 })], 260);

const video: Explainer = {
  id: 'm5-7-3',
  lessonId: 'm5-7-3',
  title: 'Solving Equations, Part 1: Keeping the Balance',
  thumbnailTitle: 'Keeping the Balance',
  thumbnail: 'sc',
  summary: 'An equation says two expressions have the same value, like a level balance; its solution is the value of the variable that makes both sides equal. Inverse operations undo each other, so n + 7 = 15 is solved by subtracting 7 from both sides (n = 8) and checked by substituting, not by adding 7.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Expressions and Equations · Part 1', title: 'Keeping the Balance', subtitle: 'Equations, solutions and inverse operations' }],
      lines: [
        { say: 'A balance scale stays level when both sides weigh the same. An equation works the same way: both sides have the same value.', show: 'title' },
        { say: 'In this video, you will learn what an equation is, and find the number that keeps it balanced.' },
      ],
    },
    {
      chapter: 'Equations',
      layout: 'center',
      main: [
        { kind: 'callout', id: 'def', tone: 'definition', title: 'Equation', md: 'An **equation** says that two expressions have the same value. It has an equals sign, such as $n + 7 = 15$.' },
        { kind: 'math', id: 'm', size: 'lg', lines: ['n + 7 = 15'] },
        scale('sc', 300),
      ],
      lines: [
        { say: 'An equation says that two expressions have the same value. It has an equals sign, like n plus seven equals fifteen.', show: ['def', 'm.0'] },
        { say: 'Picture it on a balance. The bag holds n marbles, and we do not know how many. With seven more marbles, the left side weighs the same as fifteen marbles on the right.', show: [...all('sc'), 'sc.labels'] },
        { say: 'The scale is level, so both sides are equal. That is just what the equals sign says.', focus: 'm.0' },
      ],
    },
    {
      chapter: 'Solutions',
      layout: 'center',
      main: [
        { kind: 'callout', id: 'def', tone: 'definition', title: 'Solution', md: 'The **solution** of an equation is the value of the variable that makes both sides equal.' },
        { kind: 'math', id: 'm', size: 'lg', lines: ['n + 7 = 15', '8 + 7 = 15 \\;\\checkmark \\quad \\text{so } n = 8'] },
      ],
      lines: [
        { say: 'To solve an equation means to find the number that the variable stands for.', show: 'm.0' },
        { say: 'The solution of an equation is the value of the variable that makes both sides equal.', show: 'def' },
        { say: 'For n plus seven equals fifteen, the solution is n equals eight, because eight plus seven is fifteen. But how can we find it, without guessing?', show: 'm.1', focus: 'm.1' },
      ],
    },
    {
      chapter: 'Inverse operations',
      layout: 'center',
      main: [
        undo('ud'),
        { kind: 'callout', id: 'def', tone: 'definition', title: 'Inverse operations', md: '**Inverse operations** undo each other. Adding and subtracting are inverse operations. Multiplying and dividing are inverse operations.' },
      ],
      lines: [
        { say: 'Inverse operations undo each other. Adding and subtracting are inverse operations. Multiplying and dividing are inverse operations as well.', show: 'def' },
        { say: 'Look at the top row. We start with n, and add seven, and we get fifteen.', show: ['ud.n0', 'ud.f0', 'ud.n1'], focus: 'ud.f0' },
        { say: 'To get back to n, undo the adding. Start at fifteen, and subtract seven. That takes us back to eight. So n must be eight.', show: ['ud.b1', 'ud.u0', 'ud.b0'], focus: ['ud.u0', 'ud.b0'] },
      ],
    },
    {
      chapter: 'Solve by undoing',
      layout: 'split',
      leftWidth: 700,
      left: [scale('s2')],
      right: [{ kind: 'math', id: 'm', size: 'md', align: 'left', lines: ['n + 7 = 15', 'n + 7 - 7 = 15 - 7', 'n = 8', '\\text{Check: } 8 + 7 = 15 \\;\\checkmark'] }],
      lines: [
        { say: 'Let’s solve n plus seven equals fifteen on the balance. Seven is added to n. The inverse of adding seven is subtracting seven.', show: [...all('s2'), 'm.0'] },
        { say: 'To keep the scale level, always do the same thing to both sides. Take seven marbles away from each side.', show: 'm.1', focus: ['m.1', 's2.l-take', 's2.r-take'] },
        { say: 'Now the bag is alone on the left, and eight marbles are left on the right. The scale is still level. So n equals fifteen minus seven, which is eight.', hide: ['s2.l-take', 's2.r-take'], show: 'm.2', focus: 'm.2' },
        { say: 'Check by putting eight back into the equation. Eight plus seven is fifteen. Both sides are equal, so n equals eight is correct.', show: 'm.3', focus: 'm.3' },
      ],
    },
    {
      chapter: 'Watch out',
      layout: 'center',
      main: [
        { kind: 'callout', id: 'oops', tone: 'mistake', title: 'Use the inverse', md: 'For $n + 7 = 15$, do not add $7$ to $15$. That gives $22$, and $22 + 7$ is not $15$. Do the **opposite** of what is done to the variable.' },
        { kind: 'math', id: 'm', size: 'lg', lines: ['n = 15 + 7 = 22: \\quad 22 + 7 = 29 \\quad \\text{\\bad{wrong}}', 'n = 15 - 7 = 8: \\quad 8 + 7 = 15 \\;\\checkmark'] },
      ],
      lines: [
        { say: 'Watch out. Seeing a plus sign, it is easy to add seven to fifteen. That gives twenty-two.', show: 'oops' },
        { say: 'Check it: twenty-two plus seven is twenty-nine, not fifteen. So twenty-two is not the solution.', show: 'm.0', focus: 'm.0' },
        { say: 'Always do the opposite of what is done to the variable. Seven was added to n, so subtract seven.', show: 'm.1', focus: 'm.1' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q',
          prompt: 'Solve $n + 9 = 14$.',
          choices: ['$n = 23$', '$n = 5$', '$n = 6$', '$n = 14$'],
          answer: 1,
          working: '$9$ is added to $n$, so subtract $9$ from both sides: $n = 14 - 9 = 5$. Check: $5 + 9 = 14$.',
        },
      ],
      lines: [
        { say: 'Your turn. Solve n plus nine equals fourteen. Pause the video and try it.', show: 'q', wait: 6 },
        { say: 'The answer is B, n equals five. Nine is added to n, so subtract nine from both sides: fourteen minus nine is five. Check: five plus nine is fourteen. Choice A adds nine instead of subtracting it.', show: 'q.answer' },
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
          items: ['An equation says two expressions are equal. Its solution makes both sides equal.', 'Inverse operations undo each other: adding and subtracting, multiplying and dividing.', 'Do the same thing to both sides to keep the equation balanced.', 'Check a solution by substituting it.'],
        },
      ],
      lines: [
        { say: 'Let’s sum up. An equation says two expressions are equal. Its solution makes both sides equal.', show: 'sum.0' },
        { say: 'Inverse operations undo each other: adding and subtracting, and multiplying and dividing.', show: 'sum.1' },
        { say: 'Do the same thing to both sides to keep the equation balanced.', show: 'sum.2' },
        { say: 'And check a solution by substituting it. In the next part, you will undo multiplying and dividing. See you there!', show: 'sum.3' },
      ],
    },
  ],
};

export default video;
