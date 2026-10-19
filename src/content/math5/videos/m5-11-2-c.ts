import type { Explainer } from '@/video/script.ts';
import { figure } from '@/video/solids.ts';
import { valueTable } from './lib/m5-11-figures.ts';

// Terms 11, 12, 13, 14 at positions 1 to 4: the rule is n + 10.
const table = () => figure('t', [valueTable({ x: { title: '\\text{Position}', values: [1, 2, 3, 4] }, y: { title: '\\text{Term}', values: [11, 12, 13, 14] }, titleW: 2.8, cellW: 1.5 })], 300);

const video: Explainer = {
  id: 'm5-11-2-c',
  lessonId: 'm5-11-2',
  title: 'Rules and Missing Terms, Part 3: Finding Any Term',
  thumbnailTitle: 'Finding Any Term',
  thumbnail: 't',
  summary: 'To find any term, put its position in place of n: the term of 4n at position 25 is 4 × 25 = 100. From a table of 11, 12, 13, 14 the rule is n + 10, so the term at position 30 is 40, found in one step instead of counting on.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Arithmetic Sequences · Part 3', title: 'Finding Any Term', subtitle: 'Put the position in place of n' }],
      lines: [
        { say: 'Once you know the rule, you can find any term at all, even the hundredth one, without writing out the whole list.', show: 'title' },
        { say: 'In this video, you will put a position in place of n, to find the term at that position.' },
      ],
    },
    {
      chapter: 'The term at position 25',
      layout: 'center',
      main: [
        { kind: 'text', id: 'q', size: 'md', md: 'The expression $4n$ gives the term at position $n$. What is the term at position $25$?' },
        { kind: 'math', id: 'm', size: 'lg', lines: ['4n', '4 \\times \\good{25}', '= 100'] },
      ],
      lines: [
        { say: 'The expression four n gives the term at position n. What is the term at position twenty-five?', show: 'q' },
        { say: 'Remember, four n means four times n.', show: 'm.0', focus: 'm.0' },
        { say: 'We want position twenty-five, so replace n with twenty-five. That gives four times twenty-five.', show: 'm.1', focus: 'm.1' },
        { say: 'Four times twenty-five is one hundred. Think of four groups of twenty-five: twenty-five, fifty, seventy-five, one hundred.', show: 'm.2', focus: 'm.2' },
        { say: 'So the term at position twenty-five is one hundred. We did not have to write out twenty-five terms!' },
      ],
    },
    {
      chapter: 'Using a table',
      layout: 'split',
      leftWidth: 660,
      left: [table()],
      right: [{ kind: 'math', id: 'm', size: 'md', align: 'left', lines: ['11 = 1 + 10', '12 = 2 + 10', '13 = 3 + 10', '\\text{rule: } n + 10', '30 + 10 = 40'] }],
      lines: [
        { say: 'This table shows the terms eleven, twelve, thirteen and fourteen at positions one to four. What is the term at position thirty?', show: 't' },
        { say: 'First, find the rule. Compare each term with its own position. Eleven is one plus ten. Twelve is two plus ten.', show: ['t.hl0', 't.hl1', 'm.0', 'm.1'], focus: ['m.0', 'm.1'] },
        { say: 'Thirteen is three plus ten. Each term is its position plus ten, so the rule is n plus ten.', show: ['t.hl2', 'm.2', 'm.3'], focus: ['m.2', 'm.3'] },
        { say: 'Now put thirty in place of n. Thirty plus ten is forty. So the term at position thirty is forty.', show: 'm.4', focus: 'm.4' },
      ],
    },
    {
      chapter: 'Why a rule is faster',
      layout: 'center',
      main: [
        { kind: 'math', id: 'm', size: 'lg', lines: ['\\bad{14 + 1 + 1 + \\cdots + 1 \\;\\; (26 \\text{ times})}', '\\good{30 + 10 = 40}'] },
        { kind: 'callout', id: 'tip', tone: 'tip', title: 'Jump straight there', md: 'Counting on from the table takes many steps. The rule takes one.' },
      ],
      lines: [
        { say: 'You could find the term at position thirty by counting on from the table. Position four is fourteen, so you would add one, again and again.', show: 'm.0', focus: 'm.0' },
        { say: 'From position four to position thirty is twenty-six steps. That is a lot of adding, and it is easy to lose count!' },
        { say: 'With the rule, it takes just one step: thirty plus ten is forty. The rule lets you jump straight to any term.', show: ['m.1', 'tip'], focus: 'm.1' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q',
          prompt: 'The expression $6n$ gives the term at position $n$. What is the term at position $12$?',
          choices: ['$18$', '$60$', '$72$', '$612$'],
          answer: 2,
          working: 'Replace $n$ with $12$: $6 \\times 12 = 72$.',
        },
      ],
      lines: [
        { say: 'Your turn. The expression six n gives the term at position n. What is the term at position twelve? Pause the video and try it.', show: 'q', wait: 6 },
        { say: 'The answer is C, seventy-two. Replace n with twelve: six times twelve is seventy-two. Choice A adds six and twelve, but six n means six times n.', show: 'q.answer' },
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
          items: ['To find any term, put its position in place of $n$.', '$4n$ at position $25$: $4 \\times 25 = 100$.', 'From a table, find the rule first, then use it.'],
        },
      ],
      lines: [
        { say: 'Let’s sum up. To find any term, put its position in place of n.', show: 'sum.0' },
        { say: 'For four n at position twenty-five, that is four times twenty-five, which is one hundred.', show: 'sum.1' },
        { say: 'And from a table, find the rule first, then use it to jump to any position. In the next part, you will solve problems with sequences. See you there!', show: 'sum.2' },
      ],
    },
  ],
};

export default video;
