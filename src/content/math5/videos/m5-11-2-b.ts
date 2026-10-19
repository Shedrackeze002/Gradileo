import type { Explainer } from '@/video/script.ts';
import { figure } from '@/video/solids.ts';
import { valueTable } from './lib/m5-11-figures.ts';

// The terms of 9n at positions 1 to 4.
const nine = () => figure('t', [valueTable({ x: { title: 'n', values: [1, 2, 3, 4] }, y: { title: '9n', values: [9, 18, 27, 36] } })], 240);

const video: Explainer = {
  id: 'm5-11-2-b',
  lessonId: 'm5-11-2',
  title: 'Rules and Missing Terms, Part 2: Writing an Expression',
  thumbnailTitle: 'Writing an Expression',
  thumbnail: 't',
  summary: 'A variable is a letter that stands for a number; we use n for the position. An expression such as 4n or n + 6 tells how to get the term at position n, and 4n means 4 × n. Writing term = 9 × position as 9n and term = position + 12 as n + 12, and checking 9n with a table.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Arithmetic Sequences · Part 2', title: 'Writing an Expression', subtitle: 'A letter for the position' }],
      lines: [
        { say: 'Writing the word position again and again takes a long time. Mathematicians have a shortcut: they use a letter instead.', show: 'title' },
        { say: 'In this video, you will learn what a variable and an expression are, and write a rule as an expression.' },
      ],
    },
    {
      chapter: 'Variables',
      layout: 'center',
      main: [
        { kind: 'callout', id: 'def', tone: 'definition', title: 'Variable and expression', md: 'A **variable** is a letter that stands for a number. We use $n$ for the position. An **expression** such as $4n$ or $n + 6$ tells how to get the term at position $n$.' },
        { kind: 'math', id: 'm', size: 'lg', lines: ['\\text{term} = 4 \\times \\text{position}', '4 \\times n', '4n'] },
      ],
      lines: [
        { say: 'A variable is a letter that stands for a number. For a sequence, we use the letter n to stand for the position.', show: 'def' },
        { say: 'Take the rule: term equals four times the position.', show: 'm.0', focus: 'm.0' },
        { say: 'Replace the word position with the letter n. Now the rule says four times n.', show: 'm.1', focus: 'm.1' },
        { say: 'We write four times n as four n, with no times sign. This is called an expression. It tells you how to get the term at any position n.', show: 'm.2', focus: 'm.2' },
      ],
    },
    {
      chapter: 'What 4n means',
      layout: 'center',
      main: [
        { kind: 'math', id: 'm', size: 'xl', lines: ['4n = 4 \\times n', 'n + 6'] },
        {
          kind: 'bullets',
          id: 'b',
          items: ['Write the **number first**, then the letter: $4n$, not $n4$.', 'Leave out the $\\times$ sign: it looks a lot like the letter $x$.', 'Adding keeps its sign: $n + 6$.'],
        },
      ],
      lines: [
        { say: 'So four n means four times n. When a number sits right next to a letter, they are multiplied.', show: 'm.0', focus: 'm.0' },
        { say: 'We always write the number first and the letter second: four n, not n four.', show: 'b.0' },
        { say: 'Why leave out the times sign? Because it looks a lot like the letter x, and that could be confusing.', show: 'b.1' },
        { say: 'Adding is different. The rule, the position plus six, is written n plus six. The plus sign stays.', show: ['m.1', 'b.2'], focus: 'm.1' },
      ],
    },
    {
      chapter: 'From a rule to an expression',
      layout: 'center',
      main: [
        { kind: 'math', id: 'm', size: 'lg', lines: ['\\text{(a) term} = 9 \\times \\text{position} \\;\\to\\; 9 \\times n \\;\\to\\; \\good{9n}', '\\text{(b) term} = \\text{position} + 12 \\;\\to\\; \\good{n + 12}'] },
      ],
      lines: [
        { say: 'Let’s write an expression for two rules. First: the term equals nine times the position.', show: 'm.0', focus: 'm.0' },
        { say: 'Replace the word position with n, to get nine times n. Then leave out the times sign. The expression is nine n.' },
        { say: 'Second: the term equals the position plus twelve.', show: 'm.1', focus: 'm.1' },
        { say: 'Replace the word position with n. The expression is n plus twelve.' },
      ],
    },
    {
      chapter: 'Checking with a table',
      layout: 'center',
      main: [
        nine(),
        { kind: 'math', id: 'm', size: 'md', lines: ['9 \\times 1 = 9, \\quad 9 \\times 2 = 18, \\quad 9 \\times 3 = 27, \\quad 9 \\times 4 = 36'] },
      ],
      lines: [
        { say: 'An expression gives the same table as its rule. Let’s check nine n. Put in each position for n.', show: ['t.frame', 't.xs'] },
        { say: 'When n is one, nine times one is nine. When n is two, nine times two is eighteen.', show: ['t.y0', 't.y1', 'm'], focus: ['t.y0', 't.y1'] },
        { say: 'When n is three, it is twenty-seven, and when n is four, it is thirty-six. The terms go up by nine each time, just as you would expect.', show: ['t.y2', 't.y3'], focus: ['t.y2', 't.y3'] },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q',
          prompt: 'Which expression matches the rule $\\text{term} = \\text{position} + 7$?',
          choices: ['$n + 7$', '$7n$', '$n - 7$', '$7$'],
          answer: 0,
          working: 'Replace the word position with $n$: $n + 7$.',
        },
      ],
      lines: [
        { say: 'Your turn. Which expression matches the rule: the term equals the position plus seven? Pause the video and try it.', show: 'q', wait: 6 },
        { say: 'The answer is A, n plus seven. Replace the word position with n. Choice B, seven n, means seven times the position, which is a different rule.', show: 'q.answer' },
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
          items: ['A variable is a letter that stands for a number. We use $n$ for the position.', 'An expression, like $4n$ or $n + 6$, gives the term at position $n$.', '$4n$ means $4 \\times n$: the number first, and no $\\times$ sign.'],
        },
      ],
      lines: [
        { say: 'Let’s sum up. A variable is a letter that stands for a number, and we use n for the position.', show: 'sum.0' },
        { say: 'An expression, like four n or n plus six, tells you the term at position n.', show: 'sum.1' },
        { say: 'And four n means four times n, with the number first. In the next part, you will use an expression to find any term. See you there!', show: 'sum.2' },
      ],
    },
  ],
};

export default video;
