import type { Explainer } from '@/video/script.ts';
import { figure } from '@/video/solids.ts';
import { venn2 } from './lib/m302-1-figures.ts';

/** U = {1, …, 12}, A = the factors of 12 and B = the even numbers in U. */
const values = { A: '1,\\ 3', AB: '\\begin{matrix}2,\\ 4\\\\ 6,\\ 12\\end{matrix}', B: '8,\\ 10', out: '\\begin{matrix}5,\\ 7\\\\ 9,\\ 11\\end{matrix}' };
const valueAt = { out: [5.5, -3.2] as [number, number] };
const diagram = (shade: Parameters<typeof venn2>[0]['shade']) => venn2({ titles: ['A', 'B'], values, valueAt, shade });

const video: Explainer = {
  id: 'm302-1-2-b',
  lessonId: 'm302-1-2',
  title: 'Venn Diagrams and Set Operations, Part 2: Complement and Difference',
  thumbnailTitle: 'Complement and Difference',
  thumbnail: 'd',
  summary: "The complement A′ (in U but not in A) and the difference A \\ B (in A but not in B), read from a Venn diagram of the factors of 12 and the even numbers to 12: A′ = {5, 7, 8, 9, 10, 11}, A \\ B = {1, 3} and (A ∪ B)′ = {5, 7, 9, 11}. Why A \\ B and B \\ A differ. Part 3 counts the elements of two overlapping sets.",
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Set Theory and Logic · Part 2', title: 'Complement and Difference', subtitle: 'Not in, and but not' }],
      lines: [
        { say: 'Sometimes what matters is what is not in a set: the students who do not play hockey, or the factors of twelve that are not even.', show: 'title' },
        { say: 'In this video, you will find the complement of a set and the difference of two sets, and read both from a Venn diagram.' },
      ],
    },
    {
      chapter: 'The complement',
      layout: 'split',
      leftWidth: 600,
      left: [figure('d', [diagram([{ id: 'comp', where: (m) => !m.A }])])],
      right: [
        { kind: 'callout', id: 'def', tone: 'definition', title: 'Complement', md: "The **complement** of $A$, written $A'$, is the set of elements of $U$ that are **not** in $A$." },
        { kind: 'math', id: 'm', size: 'md', align: 'left', lines: ["A' = \\{5, 7, 8, 9, 10, 11\\}", "n(A) + n(A') = 6 + 6 = 12"] },
      ],
      lines: [
        { say: 'Here is the Venn diagram from part one: the numbers from one to twelve, with A, the factors of twelve, and B, the even numbers.', show: ['d.box', 'd.A', 'd.B', 'd.values'] },
        { say: 'The complement of A is the set of elements of the universal set that are not in A. It is written A with a small mark after it, called a prime, and it is read A prime.', show: 'def' },
        { say: 'In the diagram, the complement of A is everything outside circle A. That includes eight and ten, which are in B, and five, seven, nine and eleven, which are outside both circles.', show: 'd.comp', focus: 'd.comp' },
        { say: 'So A prime is five, seven, eight, nine, ten and eleven.', show: 'm.0', focus: 'm.0' },
        { say: 'Notice that A and its complement together make up the universal set, with no overlap. Every number is either in A or not in A. So n of A plus n of A prime is six plus six, which is twelve, the number of elements in U.', show: 'm.1', focus: 'm.1' },
      ],
    },
    {
      chapter: 'The difference',
      layout: 'split',
      leftWidth: 600,
      left: [figure('d', [diagram([{ id: 'diff', where: (m) => m.A && !m.B }])])],
      right: [
        { kind: 'callout', id: 'def', tone: 'definition', title: 'Difference', md: 'The **difference** $A \\setminus B$ is the set of elements of $A$ that are not in $B$.' },
        { kind: 'math', id: 'm', size: 'md', align: 'left', lines: ['A \\setminus B = \\{1, 3\\}'] },
      ],
      lines: [
        { say: 'The difference of A and B is the set of elements of A that are not in B.', show: ['def', 'd.box', 'd.A', 'd.B', 'd.values'] },
        { say: 'It is written A, then a backslash, then B. Read it as A minus B, or as A but not B.' },
        { say: 'In the diagram, it is the part of circle A that is outside circle B: the factors of twelve that are not even.', show: 'd.diff', focus: 'd.diff' },
        { say: 'So A minus B is one and three.', show: 'm.0', focus: 'm.0' },
      ],
    },
    {
      chapter: 'Outside both circles',
      layout: 'split',
      leftWidth: 600,
      left: [figure('d', [diagram([{ id: 'cup', where: (m) => m.A || m.B, tone: 'muted', shade: 0.18 }, { id: 'neither', where: (m) => !m.A && !m.B }])])],
      right: [{ kind: 'math', id: 'm', size: 'md', align: 'left', lines: ["(A \\cup B)'", 'A \\cup B: \\text{ inside either circle}', "(A \\cup B)' = \\{5, 7, 9, 11\\}"] }],
      lines: [
        { say: 'Brackets work just as they do in arithmetic: work inside them first. Find the complement of A union B, written as A union B in brackets, followed by a prime.', show: ['d.box', 'd.A', 'd.B', 'd.values', 'm.0'], focus: 'm.0' },
        { say: 'First, find A union B: everything inside either circle.', show: ['d.cup', 'm.1'], focus: ['d.cup', 'm.1'] },
        { say: 'Its complement is everything else: the region outside both circles.', hide: 'd.cup', show: 'd.neither', focus: 'd.neither' },
        { say: 'So the complement of A union B is five, seven, nine and eleven: the numbers from one to twelve that are neither factors of twelve nor even.', show: 'm.2', focus: 'm.2' },
      ],
    },
    {
      chapter: 'Watch out',
      layout: 'split',
      leftWidth: 600,
      left: [figure('d', [diagram([{ id: 'ab', where: (m) => m.A && !m.B }, { id: 'ba', where: (m) => m.B && !m.A, tone: 'hyp' }])])],
      right: [
        { kind: 'callout', id: 'oops', tone: 'mistake', title: 'The order of a difference matters', md: '$A \\setminus B$ and $B \\setminus A$ are different sets.' },
        { kind: 'math', id: 'm', size: 'md', align: 'left', lines: ['A \\setminus B = \\{1, 3\\}', 'B \\setminus A = \\{8, 10\\}'] },
      ],
      lines: [
        { say: 'A common mistake is to treat a difference as if order did not matter. A minus B and B minus A are different sets.', show: ['oops', 'd.box', 'd.A', 'd.B', 'd.values'] },
        { say: 'First, A minus B is in A but not in B: one and three.', show: ['d.ab', 'm.0'], focus: ['d.ab', 'm.0'] },
        { say: 'But B minus A is in B but not in A: the even numbers that are not factors of twelve, eight and ten. It is the other side of the diagram.', show: ['d.ba', 'm.1'], focus: ['d.ba', 'm.1'] },
      ],
    },
    {
      chapter: 'Read the symbols as words',
      layout: 'center',
      main: [
        { kind: 'callout', id: 'tip', tone: 'tip', title: 'Read the symbols as words', md: "$\\cup$ means “or”, $\\cap$ means “and”, $\\setminus$ means “but not”, and a prime ($'$) means “not in”. Work inside brackets first." },
        { kind: 'table', id: 't', head: ['Symbols', 'In words'], rows: [['$A \\cup B$', 'in $A$ or $B$'], ['$A \\cap B$', 'in $A$ and $B$'], ['$A \\setminus B$', 'in $A$ but not $B$'], ["$(A \\cup B)'$", 'not in ($A$ or $B$)']] },
      ],
      lines: [
        { say: 'Here is a tip for reading set notation: read each symbol as a word.', show: 'tip' },
        { say: 'Union means or, and intersection means and.', show: ['t.0', 't.1'], focus: ['t.0', 't.1'] },
        { say: 'The backslash of a difference means but not.', show: 't.2', focus: 't.2' },
        { say: 'And a prime means not in. So the complement of A union B reads: not in A or B. That is exactly the region outside both circles.', show: 't.3', focus: 't.3' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q',
          prompt: 'Let $U = \\{1, 2, 3, \\ldots, 10\\}$, $P = \\{1, 2, 3, 4, 5\\}$ and $Q = \\{2, 4, 6, 8, 10\\}$. Find $Q \\setminus P$.',
          choices: ['$\\{6, 8, 10\\}$', '$\\{1, 3, 5\\}$', '$\\{2, 4\\}$', '$\\{7, 9\\}$'],
          answer: 0,
          working: '$Q \\setminus P$ is in $Q$ but not in $P$: remove $2$ and $4$ from $Q$, leaving $\\{6, 8, 10\\}$.',
        },
      ],
      lines: [
        { say: 'Your turn. The universal set is the numbers from one to ten. P is one, two, three, four, five, and Q is two, four, six, eight, ten. Find Q minus P. Pause the video and try it.', show: 'q', wait: 6 },
        { say: 'The answer is A. Q minus P is in Q but not in P, so remove two and four from Q, which leaves six, eight and ten. Choice B is P minus Q: the order of a difference matters.', show: 'q.answer' },
      ],
    },
    {
      chapter: 'Summary',
      layout: 'center',
      main: [{ kind: 'bullets', id: 'sum', check: true, items: ["$A'$, the complement: in $U$ but not in $A$.", '$A \\setminus B$, the difference: in $A$ but not in $B$. It is not the same as $B \\setminus A$.', "Work inside brackets first: $(A \\cup B)'$ is outside both circles."] }],
      lines: [
        { say: 'Let’s sum up. The complement, A prime, is everything in the universal set that is not in A.', show: 'sum.0' },
        { say: 'The difference, A minus B, is everything in A that is not in B, and it is not the same as B minus A.', show: 'sum.1' },
        { say: 'And work inside brackets first. In part three, we count the elements of two overlapping sets without counting anything twice. See you there!', show: 'sum.2' },
      ],
    },
  ],
};

export default video;
