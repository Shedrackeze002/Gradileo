import type { Explainer } from '@/video/script.ts';
import { figure } from '@/video/solids.ts';
import { dotGroups } from '@/content/math6/videos/lib/m6-4-figures.ts';
import { rainbow } from '@/content/math5/videos/lib/m5-3-figures.ts';
import { spare } from './lib/m7-1-figures.ts';

// 24 counters shared into 6 equal groups of 4, with nothing left over.
const share24 = figure('g', [dotGroups({ groups: 6, size: 4, cols: 2, perRow: 3, labels: ['4', '4', '4', '4', '4', '4'] })], 420);

// 26 counters shared into 6 groups of 4: 2 are left over.
const share26 = figure('h', [
  dotGroups({ groups: 6, size: 4, cols: 2, perRow: 3, labels: ['4', '4', '4', '4', '4', '4'] }),
  spare({ count: 2, at: [2.75, -6.1], tex: '\\text{2 left over}' }),
], 470);

// The factors of 24 in order, each joined to its partner: 1 × 24, 2 × 12, 3 × 8, 4 × 6.
const factors = figure('f', [rainbow({ factors: [1, 2, 3, 4, 6, 8, 12, 24], gap: 1.4 })], 300);

const video: Explainer = {
  id: 'm7-1-1',
  lessonId: 'm7-1-1',
  title: 'Divisibility Rules, Part 1: What Divisible Means',
  thumbnailTitle: 'What Divisible Means',
  thumbnail: 'g',
  summary:
    'A number is divisible by another when the division leaves no remainder: 24 counters share into 6 equal groups of 4 with none left over, so 24 is divisible by 6 and 6 is a factor of 24, but 26 is not divisible by 6. The factors of 24 are 1, 2, 3, 4, 6, 8, 12 and 24. A divisibility rule is a quick test for this that needs no division.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Number Relationships · Part 1', title: 'What Divisible Means', subtitle: 'Sharing with nothing left over' }],
      lines: [
        { say: 'Can two hundred thirty-four students be split into teams of nine, with nobody left out? You could do a long division. Or you could add three digits and know the answer in a few seconds!', show: 'title' },
        { say: 'In this lesson, you will learn quick tests that tell you when one number divides evenly into another. This first part shows what that means.' },
      ],
    },
    {
      chapter: 'Sharing into equal groups',
      layout: 'split',
      leftWidth: 560,
      left: [share24],
      right: [{ kind: 'math', id: 'm', size: 'lg', align: 'left', lines: ['24 \\div 6 = 4', '\\text{Left over: } 0'] }],
      lines: [
        { say: 'Here are twenty-four counters. Let’s share them into six equal groups, the way you might deal out cards.' },
        { say: 'Each group gets one counter, then another, and another, and another. Every group has four counters.', show: ['g.g0', 'g.g1', 'g.g2', 'g.g3', 'g.g4', 'g.g5', 'g.labels'] },
        { say: 'All twenty-four counters are used, and none are left over. So twenty-four divided by six is four.', show: 'm.0', focus: 'm.0' },
        { say: 'Nothing is left over. We say the remainder is zero.', show: 'm.1', focus: 'm.1' },
      ],
    },
    {
      chapter: 'Something left over',
      layout: 'split',
      leftWidth: 560,
      left: [share26],
      right: [{ kind: 'math', id: 'm', size: 'lg', align: 'left', lines: ['26 \\div 6 = 4 \\text{ R } 2', '\\text{Left over: } 2'] }],
      lines: [
        { say: 'Now try twenty-six counters, shared into six equal groups.' },
        { say: 'Six groups of four use up twenty-four counters.', show: ['h.g0', 'h.g1', 'h.g2', 'h.g3', 'h.g4', 'h.g5', 'h.labels'] },
        { say: 'But two counters are left over. There are not enough of them to give every group one more.', show: 'h.spare', focus: 'h.spare' },
        { say: 'So twenty-six divided by six is four, remainder two. The two counters left over are the remainder.', show: ['m.0', 'm.1'], focus: 'm.0' },
      ],
    },
    {
      chapter: 'Divisible',
      layout: 'center',
      main: [
        { kind: 'callout', id: 'def', tone: 'definition', title: 'Divisible', md: 'A number is **divisible** by another number when the division leaves no remainder. $24 \\div 6 = 4$ with nothing left over, so $24$ is divisible by $6$.' },
        { kind: 'math', id: 'm', size: 'lg', lines: ['24 \\text{ is divisible by } 6', '26 \\text{ is not divisible by } 6'] },
      ],
      lines: [
        { say: 'Here is the word for this. A number is divisible by another number when the division leaves no remainder.', show: 'def' },
        { say: 'For example, a number is divisible by three when it can be shared into three equal groups with nothing left over.' },
        { say: 'Twenty-four counters shared into six groups left nothing over. So twenty-four is divisible by six.', show: 'm.0', focus: 'm.0' },
        { say: 'Twenty-six counters left two over. So twenty-six is not divisible by six.', show: 'm.1', focus: 'm.1' },
      ],
    },
    {
      chapter: 'Factors',
      layout: 'center',
      main: [
        { kind: 'callout', id: 'def', tone: 'definition', title: 'Factor', md: 'When $24$ is divisible by $6$, we say $6$ is a **factor** of $24$.' },
        factors,
        { kind: 'math', id: 'm', size: 'md', lines: ['1 \\times 24 \\qquad 2 \\times 12 \\qquad 3 \\times 8 \\qquad 4 \\times 6'] },
      ],
      lines: [
        { say: 'There is another way to say the same thing. When twenty-four is divisible by six, we say six is a factor of twenty-four.', show: 'def' },
        { say: 'Twenty-four has eight factors: one, two, three, four, six, eight, twelve and twenty-four. Each of them divides twenty-four with nothing left over.', show: ['f.f0', 'f.f1', 'f.f2', 'f.f3', 'f.f4', 'f.f5', 'f.f6', 'f.f7'] },
        { say: 'Factors come in pairs that multiply to make twenty-four. One times twenty-four, two times twelve, three times eight, and four times six.', show: ['f.p0', 'f.p1', 'f.p2', 'f.p3', 'm'] },
        { say: 'Five is not a factor of twenty-four. Twenty-four counters in groups of five would leave four over.' },
      ],
    },
    {
      chapter: 'Divisibility rules',
      layout: 'center',
      main: [
        { kind: 'callout', id: 'def', tone: 'definition', title: 'Divisibility rule', md: 'A **divisibility rule** is a quick test that tells you whether a number is divisible by another number, without doing the division.' },
        {
          kind: 'table',
          id: 't',
          head: ['Divisible by', 'Look at'],
          rows: [
            ['$2$, $5$ and $10$', 'the last digit'],
            ['$4$', 'the last two digits'],
            ['$8$', 'the last three digits'],
            ['$3$ and $9$', 'the sum of the digits'],
            ['$6$', 'the tests for $2$ and $3$'],
          ],
        },
      ],
      lines: [
        { say: 'Sharing counters works well for small numbers. But what about two thousand four hundred? Dividing by hand would take a while.' },
        { say: 'That is where divisibility rules help. A divisibility rule is a quick test that tells you whether a number is divisible by another number, without doing the division.', show: 'def' },
        { say: 'Each rule looks at only part of the number. For two, five and ten, you look at the last digit. For four, the last two digits. For eight, the last three digits.', show: ['t.0', 't.1', 't.2'] },
        { say: 'For three and nine, you add up the digits. And for six, you use two tests together: the test for two and the test for three.', show: ['t.3', 't.4'] },
        { say: 'The next parts explain every one of these rules, and why they work.' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q',
          prompt: 'Which of these numbers is a **factor** of $24$?',
          choices: ['$5$', '$7$', '$8$', '$9$'],
          answer: 2,
          working: '$24 \\div 8 = 3$ with nothing left over, so $8$ is a factor of $24$. $24 \\div 5$ leaves $4$ over, so $5$ is not a factor.',
        },
      ],
      lines: [
        { say: 'Your turn. Which of these numbers is a factor of twenty-four? Pause the video and try it.', show: 'q', wait: 6 },
        { say: 'The answer is C, which is eight. Twenty-four divided by eight is three, with nothing left over. Choice A is wrong: twenty-four divided by five is four, with four left over.', show: 'q.answer' },
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
            'A number is **divisible** by another when the division leaves **no remainder**.',
            'If $24$ is divisible by $6$, then $6$ is a **factor** of $24$.',
            'A **divisibility rule** is a quick test that needs no division.',
          ],
        },
      ],
      lines: [
        { say: 'Let’s sum up. A number is divisible by another number when the division leaves no remainder. The counters share out with nothing left over.', show: 'sum.0' },
        { say: 'When twenty-four is divisible by six, six is a factor of twenty-four.', show: 'sum.1' },
        { say: 'And a divisibility rule is a quick test that tells you, without dividing. In the next part, you will learn the rules that look at the last digits of a number. See you there!', show: 'sum.2' },
      ],
    },
  ],
};

export default video;
