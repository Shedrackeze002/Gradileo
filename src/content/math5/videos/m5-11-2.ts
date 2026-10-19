import type { Explainer } from '@/video/script.ts';
import { figure } from '@/video/solids.ts';
import { valueTable } from './lib/m5-11-figures.ts';

const table = (id: string, terms: number[], dy?: string[]) =>
  figure(id, [valueTable({ x: { title: '\\text{Position}', values: [1, 2, 3, 4] }, y: { title: '\\text{Term}', values: terms }, dy, titleW: 2.8, cellW: 1.5 })], 300);

const video: Explainer = {
  id: 'm5-11-2',
  lessonId: 'm5-11-2',
  title: 'Rules and Missing Terms, Part 1: A Rule from Position to Term',
  thumbnailTitle: 'A Rule from Position to Term',
  thumbnail: 'mul',
  summary: 'A rule tells how to get each term from its own position with one operation. For the terms 4, 8, 12, 16 the rule is term = 4 × position; for 7, 8, 9, 10 it is term = position + 6. Why "position + 4" is wrong for 4, 8, 12, 16, and why to test a rule on every column.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Arithmetic Sequences · Part 1', title: 'A Rule from Position to Term', subtitle: 'Compare each term with its own position' }],
      lines: [
        { say: 'How many legs do twenty-five spiders have? You could count by eights, twenty-five times. But there is a faster way!', show: 'title' },
        { say: 'A rule that connects each position to its term lets you jump straight to any term. In this video, you will learn how to find a rule like this.' },
      ],
    },
    {
      chapter: 'What is a rule?',
      layout: 'center',
      main: [
        { kind: 'callout', id: 'def', tone: 'definition', title: 'Rule', md: 'A **rule** tells you how to get a term from its **position**. Here, the rule uses just **one operation**, such as "multiply the position by $4$" or "add $6$ to the position".' },
        { kind: 'math', id: 'm', size: 'lg', lines: ['\\adj{\\text{position}} \\;\\xrightarrow{\\text{rule}}\\; \\opp{\\text{term}}'] },
      ],
      lines: [
        { say: 'So far, you found each term by adding to the term before it. That works, but to reach the hundredth term, you would have to add ninety-nine times!', show: 'm' },
        { say: 'A rule is faster. A rule tells you how to get a term straight from its position.', show: 'def', focus: 'm' },
        { say: 'In this lesson, the rule uses just one operation, such as multiply the position by four, or add six to the position.' },
      ],
    },
    {
      chapter: 'A rule that multiplies',
      layout: 'split',
      leftWidth: 660,
      left: [table('mul', [4, 8, 12, 16])],
      right: [{ kind: 'math', id: 'm', size: 'md', align: 'left', lines: ['4 = 4 \\times 1', '8 = 4 \\times 2', '12 = 4 \\times 3', '16 = 4 \\times 4', '\\text{term} = 4 \\times \\text{position}'] }],
      lines: [
        { say: 'Find a rule for this table. The positions are one, two, three and four, and the terms are four, eight, twelve and sixteen.', show: 'mul' },
        { say: 'Compare each term with its own position, the number right above it. Position one has the term four, and four is four times one.', show: ['mul.hl0', 'm.0'], focus: ['mul.x0', 'mul.y0', 'm.0'] },
        { say: 'Position two has the term eight, and eight is four times two. Position three has twelve, which is four times three.', show: ['mul.hl1', 'mul.hl2', 'm.1', 'm.2'], focus: ['m.1', 'm.2'] },
        { say: 'And position four has sixteen, which is four times four.', show: ['mul.hl3', 'm.3'], focus: 'm.3' },
        { say: 'Every term is its position multiplied by four. So the rule is: term equals four times the position.', show: 'm.4', focus: 'm.4' },
      ],
    },
    {
      chapter: 'A rule that adds',
      layout: 'split',
      leftWidth: 660,
      left: [table('add', [7, 8, 9, 10])],
      right: [{ kind: 'math', id: 'm', size: 'md', align: 'left', lines: ['7 = 1 + 6', '8 = 2 + 6', '9 = 3 + 6', '10 = 4 + 6', '\\text{term} = \\text{position} + 6'] }],
      lines: [
        { say: 'Here is another table. The positions are one to four again, and the terms are seven, eight, nine and ten.', show: 'add' },
        { say: 'Compare each term with its own position. Seven is one plus six. Eight is two plus six.', show: ['add.hl0', 'add.hl1', 'm.0', 'm.1'], focus: ['m.0', 'm.1'] },
        { say: 'Nine is three plus six, and ten is four plus six.', show: ['add.hl2', 'add.hl3', 'm.2', 'm.3'], focus: ['m.2', 'm.3'] },
        { say: 'Each term is six more than its position. So the rule is: term equals the position plus six.', show: 'm.4', focus: 'm.4' },
      ],
    },
    {
      chapter: 'Watch out',
      layout: 'split',
      leftWidth: 580,
      left: [table('w', [4, 8, 12, 16], ['+4', '+4', '+4'])],
      right: [
        { kind: 'callout', id: 'oops', tone: 'mistake', title: 'Looking only at the change', md: 'The terms go up by $4$, but $\\text{term} = \\text{position} + 4$ is wrong: position $2$ gives $2 + 4 = 6$, not $8$.' },
        { kind: 'callout', id: 'tip', tone: 'tip', title: 'Test your rule', md: 'Compare each term with its **own position**, and test your rule on **every** column.' },
      ],
      lines: [
        { say: 'Here is a trap. In the first table, the terms go up by four each time. So it is tempting to write the rule as: term equals the position plus four.', show: ['w.frame', 'w.xs', 'w.ys', 'w.dys'], focus: 'w.dys' },
        { say: 'Test it. Position two would give two plus four, which is six. But the term at position two is eight. The rule does not work!', show: ['oops', 'w.hl1'], focus: ['w.x1', 'w.y1'] },
        { say: 'The change from term to term helps you continue the pattern. But a rule must connect each term with its own position.', focus: 'oops' },
        { say: 'So always compare each term with its own position, and test your rule on every column of the table.', show: 'tip' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q',
          prompt: 'A table has the positions $1,\\ 2,\\ 3,\\ 4$ and the terms $5,\\ 10,\\ 15,\\ 20$. Which rule fits every column?',
          choices: ['$\\text{term} = \\text{position} + 5$', '$\\text{term} = \\text{position} + 4$', '$\\text{term} = 5 \\times \\text{position}$', '$\\text{term} = 4 \\times \\text{position}$'],
          answer: 2,
          working: '$5 = 5 \\times 1$, $10 = 5 \\times 2$, $15 = 5 \\times 3$ and $20 = 5 \\times 4$, so $\\text{term} = 5 \\times \\text{position}$.',
        },
      ],
      lines: [
        { say: 'Your turn. A table has the positions one, two, three and four, and the terms five, ten, fifteen and twenty. Which rule fits every column? Pause the video and try it.', show: 'q', wait: 6 },
        { say: 'The answer is C: the term is five times the position. Five is five times one, ten is five times two, and so on. Choice A only looks at the change: position two would give seven, not ten.', show: 'q.answer' },
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
          items: ['A rule gets each term from its position with one operation.', 'Compare each term with its own position: $\\text{term} = 4 \\times \\text{position}$, or $\\text{position} + 6$.', 'Test your rule on every column.'],
        },
      ],
      lines: [
        { say: 'Let’s sum up. A rule tells you how to get each term from its position, with one operation.', show: 'sum.0' },
        { say: 'To find the rule, compare each term with its own position. It might multiply, like four times the position, or add, like the position plus six.', show: 'sum.1' },
        { say: 'And test your rule on every column. In the next part, you will write rules in a shorter way. See you there!', show: 'sum.2' },
      ],
    },
  ],
};

export default video;
