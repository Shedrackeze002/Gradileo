import type { Explainer } from '@/video/script.ts';
import { figure } from '@/video/solids.ts';
import { towers, valueTable } from './lib/m5-11-figures.ts';

const cups = () => figure('cups', [towers({ counts: [3, 5, 7, 9] })]);

// A table of positions 1 to 4 and their terms; `compact` for the narrow column of a split scene.
const table = (id: string, terms: number[], o: { compact?: boolean } = {}) =>
  figure(id, [valueTable({ x: { title: '\\text{Position}', values: [1, 2, 3, 4] }, y: { title: '\\text{Term}', values: terms }, ...(o.compact ? { titleW: 2.8, cellW: 1.5 } : {}) })], o.compact ? 300 : 260);

const video: Explainer = {
  id: 'm5-11-1',
  lessonId: 'm5-11-1',
  title: 'Arithmetic Sequences in Tables and Graphs, Part 1: Positions and Terms',
  thumbnailTitle: 'Positions and Terms',
  thumbnail: 'cups',
  summary: 'Towers of 3, 5, 7 and 9 cups: a sequence is a list of numbers in order, each number is a term, and its position tells where it is, starting at 1. In an arithmetic sequence you add the same number each time. The term at position 3 of 4, 10, 16, 22 is 16, and why positions never start at 0.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Arithmetic Sequences · Part 1', title: 'Positions and Terms', subtitle: 'Patterns that add the same number' }],
      lines: [
        { say: 'Maya stacks cups in towers. The first tower has three cups, then five, then seven, then nine. Can you guess what comes next?', show: 'title' },
        { say: 'Patterns like this are everywhere. In this video, you will learn the words sequence, term and position, and meet a special kind of pattern called an arithmettic sequence.', caption: 'Patterns like this are everywhere. In this video, you will learn the words sequence, term and position, and meet a special kind of pattern called an arithmetic sequence.' },
      ],
    },
    {
      chapter: 'Cup towers',
      layout: 'split',
      leftWidth: 560,
      left: [cups()],
      right: [{ kind: 'math', id: 'm', size: 'lg', align: 'left', lines: ['3,\\ 5,\\ 7,\\ 9,\\ \\ldots', '\\text{add } 2 \\text{ each time}', '9 + 2 = 11'] }],
      lines: [
        { say: 'Here are the towers. The first tower has three cups. The second has five cups.', show: ['cups.tower0', 'cups.n0', 'cups.name0', 'cups.tower1', 'cups.n1', 'cups.name1'] },
        { say: 'The third tower has seven cups, and the fourth has nine.', show: ['cups.tower2', 'cups.n2', 'cups.name2', 'cups.tower3', 'cups.n3', 'cups.name3'] },
        { say: 'We can write the numbers of cups as a list: three, five, seven, nine, and so on. The three dots mean that the pattern keeps going.', show: 'm.0', focus: 'm.0' },
        { say: 'Look at how the towers grow. Each tower has two more cups than the one before.', show: 'm.1', focus: ['m.1', 'cups.tower1', 'cups.tower2'] },
        { say: 'So the next tower would have nine plus two, which is eleven cups.', show: 'm.2', focus: 'm.2' },
      ],
    },
    {
      chapter: 'Sequence, term and position',
      layout: 'center',
      main: [
        table('t', [3, 5, 7, 9]),
        { kind: 'callout', id: 'def', tone: 'definition', title: 'Sequence, term and position', md: 'A **sequence** is a list of numbers in order. Each number is a **term**. The **position** tells where a term is in the list: first, second, third… Positions start at $1$.' },
      ],
      lines: [
        { say: 'A list of numbers in order is called a sequence. Three, five, seven, nine is a sequence.', show: ['def', 't.frame', 't.ys'], focus: 't.ys' },
        { say: 'Each number in the list is called a term. Three is a term, and so is nine.', focus: ['t.y0', 't.y3'] },
        { say: 'The position tells where a term is in the list: first, second, third, and so on. We write the positions above the terms.', show: 't.xs', focus: 't.xs' },
        { say: 'So the term three is at position one, and the term nine is at position four. Positions are the counting numbers, starting at one.', show: ['t.hl0', 't.hl3'], focus: ['t.x0', 't.y0', 't.x3', 't.y3'] },
      ],
    },
    {
      chapter: 'Arithmetic sequences',
      layout: 'center',
      main: [
        { kind: 'callout', id: 'def', tone: 'definition', title: 'Arithmetic sequence', md: 'In an **arithmetic sequence**, you add the same number each time to get the next term.' },
        { kind: 'math', id: 'm', size: 'lg', lines: ['3 \\xrightarrow{+2} 5 \\xrightarrow{+2} 7 \\xrightarrow{+2} 9 \\quad \\good{\\text{arithmetic}}', '1 \\xrightarrow{+1} 2 \\xrightarrow{+2} 4 \\xrightarrow{+4} 8 \\quad \\bad{\\text{not arithmetic}}'] },
      ],
      lines: [
        { say: 'Our cup pattern is a special kind of sequence. In an arithmettic sequence, you add the same number each time to get the next term.', caption: 'Our cup pattern is a special kind of sequence. In an arithmetic sequence, you add the same number each time to get the next term.', show: 'def' },
        { say: 'In three, five, seven, nine, you add two every time. So it is an arithmettic sequence.', caption: 'In three, five, seven, nine, you add two every time. So it is an arithmetic sequence.', show: 'm.0', focus: 'm.0' },
        { say: 'Not every sequence is like this. In one, two, four, eight, you add one, then two, then four. The number you add keeps changing, so it is not an arithmettic sequence.', caption: 'Not every sequence is like this. In one, two, four, eight, you add one, then two, then four. The number you add keeps changing, so it is not an arithmetic sequence.', show: 'm.1', focus: 'm.1' },
      ],
    },
    {
      chapter: 'Finding a term',
      layout: 'split',
      leftWidth: 660,
      left: [table('f', [4, 10, 16, 22], { compact: true })],
      right: [
        { kind: 'text', id: 'q', size: 'md', md: 'What is the term at position $3$ in the sequence $4,\\ 10,\\ 16,\\ 22,\\ \\ldots$?' },
        { kind: 'math', id: 'm', size: 'md', align: 'left', lines: ['\\text{position 1: } 4', '\\text{position 2: } 10', '\\text{position 3: } \\good{16}'] },
      ],
      lines: [
        { say: 'What is the term at position three in the sequence four, ten, sixteen, twenty-two?', show: ['q', 'f.frame', 'f.ys'] },
        { say: 'Write the positions above the terms, and count along, one position at a time. Position one is four. Position two is ten.', show: ['f.xs', 'm.0', 'm.1'], focus: ['f.x0', 'f.y0', 'f.x1', 'f.y1'] },
        { say: 'And position three is sixteen. So the term at position three is sixteen.', show: ['m.2', 'f.hl2'], focus: ['m.2', 'f.x2', 'f.y2'] },
      ],
    },
    {
      chapter: 'Watch out',
      layout: 'center',
      main: [
        { kind: 'callout', id: 'oops', tone: 'mistake', title: 'Starting at zero', md: 'The first term is at position $1$, not position $0$. Always start counting positions at $1$.' },
        { kind: 'table', id: 't', head: ['', 'First', 'Second', 'Third', 'Fourth'], rows: [['Term', '$4$', '$10$', '$16$', '$22$'], ['Right', 'position $1$', 'position $2$', 'position $3$', 'position $4$'], ['Wrong', 'position $0$', 'position $1$', 'position $2$', 'position $3$']] },
      ],
      lines: [
        { say: 'A common mistake is to start counting positions at zero.', show: 'oops' },
        { say: 'If you call the first term position zero, then every position is off by one. Sixteen looks like position two, and twenty-two looks like position three.', show: ['t.0', 't.2'], focus: 't.2' },
        { say: 'But the first term is always at position one. Count the positions just as you count objects: one, two, three, four.', show: 't.1', focus: 't.1' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q',
          prompt: 'In the sequence $5,\\ 9,\\ 13,\\ 17,\\ 21,\\ \\ldots$, what is the term at position $4$?',
          choices: ['$17$', '$13$', '$21$', '$4$'],
          answer: 0,
          working: 'Count from position $1$: $5$, $9$, $13$, $17$. The term at position $4$ is $17$.',
        },
      ],
      lines: [
        { say: 'Your turn. In the sequence five, nine, thirteen, seventeen, twenty-one, what is the term at position four? Pause the video and try it.', show: 'q', wait: 6 },
        { say: 'The answer is A, seventeen. Count from position one: five, nine, thirteen, seventeen. Choice C, twenty-one, starts counting the positions at zero.', show: 'q.answer' },
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
          items: ['A sequence is a list of terms in order.', 'The position tells where a term is. Positions start at $1$.', 'In an arithmetic sequence, you add the same number each time.'],
        },
      ],
      lines: [
        { say: 'Let’s sum up. A sequence is a list of numbers in order, and each number is a term.', show: 'sum.0' },
        { say: 'The position tells where a term is in the list, and positions start at one.', show: 'sum.1' },
        { say: 'In an arithmettic sequence, you add the same number each time. In the next part, you will put sequences into tables. See you there!', caption: 'In an arithmetic sequence, you add the same number each time. In the next part, you will put sequences into tables. See you there!', show: 'sum.2' },
      ],
    },
  ],
};

export default video;
