import type { Explainer } from '@/video/script.ts';
import { figure } from '@/video/solids.ts';
import { moved, venn2 } from './lib/m302-1-figures.ts';

/** U = {1, …, 12}, A = the factors of 12 and B = the even numbers in U. */
const values = { A: '1,\\ 3', AB: '\\begin{matrix}2,\\ 4\\\\ 6,\\ 12\\end{matrix}', B: '8,\\ 10', out: '\\begin{matrix}5,\\ 7\\\\ 9,\\ 11\\end{matrix}' };
const valueAt = { out: [5.5, -3.2] as [number, number] };

const video: Explainer = {
  id: 'm302-1-2',
  lessonId: 'm302-1-2',
  title: 'Venn Diagrams and Set Operations, Part 1: Union and Intersection',
  thumbnailTitle: 'Union and Intersection',
  thumbnail: 'both',
  summary: 'The union A ∪ B (in A or B or both) and the intersection A ∩ B (in both), shown in Venn diagrams, and read from a diagram of the factors of 12 and the even numbers from 1 to 12. Part 2 finds complements and differences.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Set Theory and Logic · Part 1', title: 'Union and Intersection', subtitle: 'In either set, or in both' }],
      lines: [
        { say: 'In a survey at a high school, forty-two students play hockey and thirty-three play soccer. That does not mean seventy-five students play a sport, because some students play both.', show: 'title' },
        { say: 'To work with groups that overlap, you need to combine sets carefully. In this video, you will combine two sets in two ways, with the union and the intersection, and read both from a Venn diagram.' },
      ],
    },
    {
      chapter: 'Union and intersection',
      layout: 'center',
      main: [
        figure('both', [
          venn2({ name: 'u', titles: ['A', 'B'], universe: 'U', shade: [{ id: 'cup', where: (m) => m.A || m.B }] }),
          moved(venn2({ name: 'i', titles: ['A', 'B'], universe: 'U', shade: [{ id: 'cap', where: (m) => m.A && m.B }] }), [14, 0]),
          {
            points: { 'cup-at': [0, -5.2], 'cap-at': [14, -5.2] },
            items: [
              { kind: 'label', id: 'cup-name', at: 'cup-at', tex: 'A \\cup B', tone: 'theta', place: 'center' },
              { kind: 'label', id: 'cap-name', at: 'cap-at', tex: 'A \\cap B', tone: 'theta', place: 'center' },
            ],
          },
        ], 360),
        { kind: 'callout', id: 'def', tone: 'definition', title: 'Union and intersection', md: 'The **union** $A \\cup B$ is the set of elements in $A$ **or** in $B$ (or in both). The **intersection** $A \\cap B$ is the set of elements in **both** $A$ and $B$.' },
      ],
      lines: [
        { say: 'There are two main ways to combine two sets. The first is the union. The union of A and B is the set of elements that are in A, or in B, or in both.', show: 'def' },
        { say: 'It is written A, then a symbol shaped like a letter U, then B, and it is read as A union B. In a Venn diagram, the union is everything inside either circle.', show: ['both.u-box', 'both.u-A', 'both.u-B', 'both.u-cup', 'both.cup-name'], focus: 'both.u-cup' },
        { say: 'The second is the intersection. The intersection of A and B is the set of elements that are in both A and B. Its symbol is an upside-down U, and it is read as A intersection B.', show: ['both.i-box', 'both.i-A', 'both.i-B'] },
        { say: 'In a Venn diagram, the intersection is the overlap: the part inside both circles.', show: ['both.i-cap', 'both.cap-name'], focus: 'both.i-cap' },
        { say: 'To remember which is which, think of the union symbol as a cup, which holds everything from both sets. And think of the word intersection as the place where two roads cross: the part they share.', focus: 'both' },
      ],
    },
    {
      chapter: 'A Venn diagram',
      layout: 'split',
      leftWidth: 620,
      left: [figure('d', [venn2({ titles: ['A', 'B'], values, valueAt })])],
      right: [{ kind: 'math', id: 'm', size: 'md', align: 'left', lines: ['U = \\{1, 2, 3, \\ldots, 12\\}', 'A: \\text{ the factors of } 12', 'B: \\text{ the even numbers}'] }],
      lines: [
        { say: 'Here is a Venn diagram. The rectangle is the universal set U: the whole numbers from one to twelve. Circle A is the factors of twelve, and circle B is the even numbers in U.', show: ['d.box', 'd.A', 'd.B', 'm.0', 'm.1', 'm.2'] },
        { say: 'Start with the overlap. It holds the numbers in both sets: the factors of twelve that are even. They are two, four, six and twelve.', show: 'd.v-AB', focus: 'd.v-AB' },
        { say: 'The rest of circle A holds the factors of twelve that are not even: one and three.', show: 'd.v-A', focus: 'd.v-A' },
        { say: 'The rest of circle B holds the even numbers that are not factors of twelve: eight and ten.', show: 'd.v-B', focus: 'd.v-B' },
        { say: 'Outside both circles are the numbers in neither set: five, seven, nine and eleven. Every number from one to twelve appears exactly once in the diagram.', show: 'd.v-out', focus: 'd.v-out' },
      ],
    },
    {
      chapter: 'Reading the diagram',
      layout: 'split',
      leftWidth: 620,
      left: [
        figure('d', [
          venn2({
            titles: ['A', 'B'],
            values,
            valueAt,
            shade: [
              { id: 'cap', where: (m) => m.A && m.B },
              { id: 'cup', where: (m) => m.A || m.B },
            ],
          }),
        ]),
      ],
      right: [{ kind: 'math', id: 'm', size: 'md', align: 'left', lines: ['A \\cap B = \\{2, 4, 6, 12\\}', 'A \\cup B =', '\\{1, 2, 3, 4, 6, 8, 10, 12\\}', 'n(A \\cap B) = 4', 'n(A \\cup B) = 8'] }],
      lines: [
        { say: 'Now read the two combinations from the diagram. First, the intersection: A intersection B is the overlap, the numbers inside both circles. It is two, four, six and twelve.', show: ['d.box', 'd.A', 'd.B', 'd.values', 'd.cap', 'm.0'], focus: ['d.cap', 'm.0'] },
        { say: 'Next, the union: A union B is everything inside either circle. List each number once, even the ones in the overlap. It is one, two, three, four, six, eight, ten and twelve.', hide: 'd.cap', show: ['d.cup', 'm.1', 'm.2'], focus: ['d.cup', 'm.1', 'm.2'] },
        { say: 'Count the elements. The intersection has four elements, so n of A intersection B is four.', show: 'm.3', focus: 'm.3' },
        { say: 'And the union has eight elements, so n of A union B is eight.', show: 'm.4', focus: 'm.4' },
      ],
    },
    {
      chapter: 'Watch out',
      layout: 'center',
      main: [
        { kind: 'callout', id: 'oops', tone: 'mistake', title: 'A union is not a sum', md: '$n(A) = 6$ and $n(B) = 6$, but $n(A \\cup B)$ is **not** $6 + 6 = 12$. The 4 elements in the overlap belong to both sets, and the union lists them once.' },
        { kind: 'math', id: 'm', size: 'md', lines: ['\\bad{6 + 6 = 12}', '\\good{n(A \\cup B) = 8}'] },
      ],
      lines: [
        { say: 'A common mistake is to find the size of a union by adding the sizes of the two sets. Set A has six elements, and set B has six. But the union does not have twelve.', show: ['oops', 'm.0'], focus: 'm.0' },
        { say: 'The four numbers in the overlap, two, four, six and twelve, belong to both sets. Adding six and six counts each of them twice, but the union lists each of them once. So the union has eight elements.', show: 'm.1', focus: 'm.1' },
        { say: 'In part three, you will see a formula that fixes this, by subtracting the overlap.' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q',
          prompt: 'Let $U = \\{1, 2, 3, \\ldots, 10\\}$, $P = \\{1, 2, 3, 4, 5\\}$ and $Q = \\{2, 4, 6, 8, 10\\}$. Find $P \\cap Q$.',
          choices: ['$\\{1, 2, 3, 4, 5, 6, 8, 10\\}$', '$\\{1, 3, 5\\}$', '$\\{6, 8, 10\\}$', '$\\{2, 4\\}$'],
          answer: 3,
          working: 'The intersection holds the elements in **both** sets. Only 2 and 4 are in $P$ and in $Q$.',
        },
      ],
      lines: [
        { say: 'Your turn. The universal set is the numbers from one to ten. P is one, two, three, four, five, and Q is two, four, six, eight, ten. Find P intersection Q. Pause the video and try it.', show: 'q', wait: 6 },
        { say: 'The answer is D. The intersection holds the elements in both sets, and only two and four are in P and in Q. Choice A is the union: everything in either set.', show: 'q.answer' },
      ],
    },
    {
      chapter: 'Summary',
      layout: 'center',
      main: [{ kind: 'bullets', id: 'sum', check: true, items: ['$A \\cup B$, the union: the elements in $A$ or in $B$ or in both.', '$A \\cap B$, the intersection: the elements in both $A$ and $B$.', 'In a Venn diagram, the intersection is the overlap, and the union is everything inside the circles. List each element once.'] }],
      lines: [
        { say: 'Let’s sum up. The union, A union B, is the set of elements in A, or in B, or in both.', show: 'sum.0' },
        { say: 'The intersection, A intersection B, is the set of elements in both A and B.', show: 'sum.1' },
        { say: 'In a Venn diagram, the intersection is the overlap, and the union is everything inside the circles. List each element once. In part two, we look at what is outside a set, with the complement and the difference. See you there!', show: 'sum.2' },
      ],
    },
  ],
};

export default video;
