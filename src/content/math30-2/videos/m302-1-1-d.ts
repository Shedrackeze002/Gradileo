import type { Explainer } from '@/video/script.ts';
import { figure } from '@/video/solids.ts';
import { venn } from './lib/m302-1-figures.ts';

/** B inside A, inside the universal set. */
const subset = venn({
  box: [-5.2, -3.5, 5.2, 3.7],
  sets: [
    { key: 'A', c: [0, 0], r: 3.1, title: 'A', tone: 'adj', titlePos: [-2.9, 2.85] },
    { key: 'B', c: [0.7, -0.7], r: 1.5, title: 'B', tone: 'opp', titlePos: [0.7, 1.3] },
  ],
});

/** The even and the odd numbers: two circles that do not meet. */
const disjoint = venn({
  box: [-6, -3.2, 6, 3.7],
  sets: [
    { key: 'E', c: [-2.9, 0], r: 2.5, title: '\\text{even}', tone: 'adj', titlePos: [-2.9, 3.05] },
    { key: 'O', c: [2.9, 0], r: 2.5, title: '\\text{odd}', tone: 'opp', titlePos: [2.9, 3.05] },
  ],
  values: { E: '\\begin{matrix}2,\\ 4,\\ 6,\\\\ 8,\\ \\ldots\\end{matrix}', O: '\\begin{matrix}1,\\ 3,\\ 5,\\\\ 7,\\ \\ldots\\end{matrix}' },
  valueAt: { E: [-2.9, 0], O: [2.9, 0] },
});

/** U = {1, …, 20}: A the even numbers, B the multiples of 4 and C the odd numbers. */
const example = venn({
  box: [-6.8, -3.6, 6.8, 3.6],
  sets: [
    { key: 'A', c: [-3.3, 0], r: 3.1, title: 'A', tone: 'adj', titlePos: [-0.55, 2.6] },
    { key: 'B', c: [-3.3, -1.15], r: 1.75, title: 'B', tone: 'opp', titlePos: [-0.95, -1.0] },
    { key: 'C', c: [3.4, 0], r: 2.95, title: 'C', tone: 'good', titlePos: [6.15, 2.6] },
  ],
  values: {
    A: '\\begin{matrix}2,\\ 6,\\ 10\\\\ 14,\\ 18\\end{matrix}',
    AB: '\\begin{matrix}4,\\ 8,\\ 12\\\\ 16,\\ 20\\end{matrix}',
    C: '\\begin{matrix}1,\\ 3,\\ 5,\\ 7\\\\ 9,\\ 11,\\ 13\\\\ 15,\\ 17,\\ 19\\end{matrix}',
  },
  valueAt: { A: [-3.3, 1.65], AB: [-3.3, -1.15], C: [3.4, 0] },
});

const video: Explainer = {
  id: 'm302-1-1-d',
  lessonId: 'm302-1-1',
  title: 'Sets and Subsets, Part 4: The Universal Set and Subsets',
  thumbnailTitle: 'Universal Set and Subsets',
  thumbnail: 'sub',
  summary: 'The universal set U, subsets (B ⊂ A when every element of B is in A) and disjoint sets, drawn in Venn diagrams. Worked example in U = {1, …, 20}: the multiples of 4 are a subset of the even numbers, and the odd numbers are disjoint from both. Part 5 counts subsets.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Set Theory and Logic · Part 4', title: 'The Universal Set and Subsets', subtitle: 'Sets inside sets' }],
      lines: [
        { say: 'Every multiple of four is an even number, and every square is a rectangle. Sets often sit inside other sets.', show: 'title' },
        { say: 'In this video, you will meet the universal set, subsets and disjoint sets, and draw each of them in a Venn diagram.' },
      ],
    },
    {
      chapter: 'The universal set and subsets',
      layout: 'split',
      leftWidth: 560,
      left: [figure('sub', [subset])],
      right: [
        { kind: 'callout', id: 'def', tone: 'definition', title: 'Universal set and subset', md: 'The **universal set** $U$ contains all the elements being considered. $B$ is a **subset** of $A$ if every element of $B$ is also an element of $A$.' },
        { kind: 'math', id: 'm', size: 'lg', lines: ['B \\subset A'] },
      ],
      lines: [
        { say: 'In any situation, the universal set, written with a capital U, contains all the elements being considered. In a Venn diagram, it is drawn as a rectangle.', show: ['def', 'sub.box'], focus: 'sub.box' },
        { say: 'Each set inside it is drawn as a circle. Here is set A.', show: 'sub.A', focus: 'sub.A' },
        { say: 'Set B is a subset of A if every element of B is also an element of A. So circle B is drawn inside circle A: nothing in B is outside A.', show: 'sub.B', focus: 'sub.B' },
        { say: 'This is written B, then a symbol like a sideways letter U, then A. Read it as: B is a subset of A.', show: 'm.0', focus: 'm.0' },
      ],
    },
    {
      chapter: 'Disjoint sets',
      layout: 'center',
      main: [
        { kind: 'callout', id: 'def', tone: 'definition', title: 'Disjoint sets', md: 'Two sets are **disjoint** if they have no elements in common.' },
        figure('dis', [disjoint], 380),
      ],
      lines: [
        { say: 'Two sets are disjoint if they have no elements in common. In a Venn diagram, their circles do not overlap.', show: ['def', 'dis.box', 'dis.E', 'dis.O'] },
        { say: 'For example, the even numbers and the odd numbers are disjoint, because no number is both even and odd.', show: 'dis.values', focus: 'dis.values' },
      ],
    },
    {
      chapter: 'Subsets and disjoint sets',
      layout: 'center',
      main: [
        { kind: 'text', id: 'p', size: 'md', md: 'Let $U = \\{1, 2, 3, \\ldots, 20\\}$. Let $A$ be the even numbers, $B$ the multiples of 4 and $C$ the odd numbers in $U$. How are the sets related?' },
        figure('ex', [example], 440),
      ],
      lines: [
        { say: 'Let’s try one. The universal set is the numbers from one to twenty. Set A is the even numbers, set B is the multiples of four, and set C is the odd numbers. How are the sets related?', show: 'p' },
        { say: 'Start by listing them. The multiples of four are four, eight, twelve, sixteen and twenty.', show: ['ex.box', 'ex.B', 'ex.v-AB'], focus: 'ex.v-AB' },
        { say: 'Every multiple of four is even, so all of B goes inside A. The other even numbers, two, six, ten, fourteen and eighteen, fill the rest of A.', show: ['ex.A', 'ex.v-A'], focus: ['ex.A', 'ex.v-A'] },
        { say: 'The odd numbers are one, three, five, and so on up to nineteen. None of them is even, so circle C does not touch circle A or circle B.', show: ['ex.C', 'ex.v-C'], focus: ['ex.C', 'ex.v-C'] },
      ],
    },
    {
      chapter: 'What the diagram shows',
      layout: 'center',
      main: [{ kind: 'math', id: 'm', size: 'md', lines: ['B \\subset A', '2 \\in A \\text{ but } 2 \\notin B, \\text{ so } A \\text{ is not a subset of } B', 'C \\text{ is disjoint from } A \\text{ and from } B'] }],
      lines: [
        { say: 'Now read the relationships. Every element of B is in A, so B is a subset of A.', show: 'm.0', focus: 'm.0' },
        { say: 'But A is not a subset of B. Two is an element of A, and two is not an element of B. One element that is missing is enough.', show: 'm.1', focus: 'm.1' },
        { say: 'And no number is both odd and even, so C is disjoint from A, and C is disjoint from B too.', show: 'm.2', focus: 'm.2' },
      ],
    },
    {
      chapter: 'Two facts about subsets',
      layout: 'center',
      main: [
        { kind: 'callout', id: 'tip', tone: 'tip', title: 'Two facts about subsets', md: 'Every set is a subset of itself, and the empty set is a subset of every set.' },
        { kind: 'math', id: 'm', size: 'md', lines: ['A \\subset A', '\\varnothing \\subset A'] },
      ],
      lines: [
        { say: 'Here are two facts about subsets that can seem strange at first.', show: 'tip' },
        { say: 'Every set is a subset of itself. Every element of A is, of course, an element of A, so the rule for a subset holds.', show: 'm.0', focus: 'm.0' },
        { say: 'And the empty set is a subset of every set. To fail to be a subset, a set would need an element that is missing from A. The empty set has no elements at all, so it has nothing that could be missing.', show: 'm.1', focus: 'm.1' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q',
          prompt: 'Let $U = \\{1, 2, 3, \\ldots, 10\\}$, $P = \\{2, 3, 5, 7\\}$ and $Q = \\{3, 5\\}$. Which statement is true?',
          choices: ['$P \\subset Q$', '$Q \\subset P$', '$P$ and $Q$ are disjoint', '$2 \\in Q$'],
          answer: 1,
          working: 'Both elements of $Q$, $3$ and $5$, are in $P$, so $Q \\subset P$. But $2 \\in P$ and $2 \\notin Q$, so $P$ is not a subset of $Q$.',
        },
      ],
      lines: [
        { say: 'Your turn. The universal set is the numbers from one to ten. P is two, three, five, seven, and Q is three, five. Which statement is true? Pause the video and try it.', show: 'q', wait: 6 },
        { say: 'The answer is B. Every element of Q, three and five, is also in P, so Q is a subset of P. Choice A is false, because two is in P but not in Q.', show: 'q.answer' },
      ],
    },
    {
      chapter: 'Summary',
      layout: 'center',
      main: [{ kind: 'bullets', id: 'sum', check: true, items: ['The universal set $U$ contains every element being considered.', '$B \\subset A$ when every element of $B$ is also in $A$. Disjoint sets share no elements.', 'Every set is a subset of itself, and $\\varnothing$ is a subset of every set.'] }],
      lines: [
        { say: 'Let’s sum up. The universal set contains every element being considered.', show: 'sum.0' },
        { say: 'B is a subset of A when every element of B is also in A, and disjoint sets share no elements.', show: 'sum.1' },
        { say: 'Every set is a subset of itself, and the empty set is a subset of every set. In part five, we count how many subsets a set has. See you there!', show: 'sum.2' },
      ],
    },
  ],
};

export default video;
