import type { Explainer } from '@/video/script.ts';
import { figure } from '@/video/solids.ts';
import { moved, venn2, venn3 } from './lib/m302-1-figures.ts';

const video: Explainer = {
  id: 'm302-1-2-e',
  lessonId: 'm302-1-2',
  title: 'Venn Diagrams and Set Operations, Part 5: Naming Shaded Regions',
  thumbnailTitle: 'Naming Shaded Regions',
  thumbnail: 'v',
  summary: "Writing a shaded region of a Venn diagram in set notation by describing it in words first: B \\ A (or B ∩ A′), A ∩ (B ∪ C) and (A ∩ B) \\ C, and why A ∩ (B ∪ C) and (A ∩ B) ∪ C are different regions.",
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Set Theory and Logic · Part 5', title: 'Naming Shaded Regions', subtitle: 'From a picture to set notation' }],
      lines: [
        { say: 'A Venn diagram and set notation are two ways of saying the same thing. Moving between them lets you describe any group exactly.', show: 'title' },
        { say: 'In this video, you will name shaded regions of Venn diagrams in set notation, by describing each region in words first.' },
      ],
    },
    {
      chapter: 'Symbols as words',
      layout: 'center',
      main: [
        { kind: 'table', id: 't', head: ['Symbol', 'In words', 'In a diagram'], rows: [['$\\cup$', 'or', 'inside either circle'], ['$\\cap$', 'and', 'inside both circles'], ['$\\setminus$', 'but not', 'inside one, outside the other'], ["$'$", 'not in', 'outside a circle']] },
        { kind: 'text', id: 'note', size: 'md', md: 'Work inside brackets first.' },
      ],
      lines: [
        { say: 'First, a reminder from part two. Each symbol can be read as a word, and each word describes a part of the diagram.' },
        { say: 'Union means or: inside either circle. Intersection means and: inside both circles.', show: ['t.0', 't.1'], focus: ['t.0', 't.1'] },
        { say: 'The backslash of a difference means but not: inside one circle and outside the other. And a prime means not in: outside a circle.', show: ['t.2', 't.3'], focus: ['t.2', 't.3'] },
        { say: 'So the method is: describe the shaded region in words, then turn the words into symbols, working inside brackets first.', show: 'note' },
      ],
    },
    {
      chapter: 'A region of two sets',
      layout: 'split',
      leftWidth: 600,
      left: [figure('d', [venn2({ titles: ['A', 'B'], shade: [{ id: 's', where: (m) => m.B && !m.A }] })])],
      right: [{ kind: 'math', id: 'm', size: 'md', align: 'left', lines: ['\\text{in } B \\text{ but not in } A', 'B \\setminus A', "\\text{or } B \\cap A'"] }],
      lines: [
        { say: 'Name this shaded region.', show: ['d.box', 'd.A', 'd.B', 'd.s'], focus: 'd.s' },
        { say: 'In words, it is inside circle B, but outside circle A.', show: 'm.0', focus: 'm.0' },
        { say: 'In but not in is a difference, so the region is B minus A.', show: 'm.1', focus: 'm.1' },
        { say: 'You could also say it is in B, and not in A. That is B intersection A prime. Both names describe the same region.', show: 'm.2', focus: 'm.2' },
      ],
    },
    {
      chapter: 'A region of three sets',
      layout: 'split',
      leftWidth: 560,
      left: [figure('d', [venn3({ titles: ['A', 'B', 'C'], shade: [{ id: 's', where: (m) => m.A && (m.B || m.C) }] })])],
      right: [{ kind: 'math', id: 'm', size: 'md', align: 'left', lines: ['\\text{inside } A', '\\text{and inside } B \\text{ or } C', 'B \\cup C', 'A \\cap (B \\cup C)'] }],
      lines: [
        { say: 'Here is a region of three sets. Write it in set notation.', show: ['d.box', 'd.A', 'd.B', 'd.C', 'd.s'], focus: 'd.s' },
        { say: 'First, notice that every shaded part is inside circle A. Nothing outside A is shaded.', show: 'm.0', focus: ['m.0', 'd.A'] },
        { say: 'Within A, the shading covers the parts that are also inside B, or inside C, or inside both. The part of A that is outside both B and C is not shaded.', show: 'm.1', focus: ['m.1', 'd.s'] },
        { say: 'Inside B or C is B union C.', show: 'm.2', focus: 'm.2' },
        { say: 'And inside A, and also inside B union C, is A intersection, B union C, with B union C in brackets.', show: 'm.3', focus: 'm.3' },
      ],
    },
    {
      chapter: 'Another region',
      layout: 'split',
      leftWidth: 560,
      left: [figure('d', [venn3({ titles: ['A', 'B', 'C'], shade: [{ id: 's', where: (m) => m.A && m.B && !m.C }] })])],
      right: [{ kind: 'math', id: 'm', size: 'md', align: 'left', lines: ['\\text{in } A \\text{ and } B, \\text{ but not } C', '(A \\cap B) \\setminus C', "\\text{or } A \\cap B \\cap C'"] }],
      lines: [
        { say: 'Try another. This time, only one small region is shaded.', show: ['d.box', 'd.A', 'd.B', 'd.C', 'd.s'], focus: 'd.s' },
        { say: 'It is inside A and inside B, but outside C.', show: 'm.0', focus: 'm.0' },
        { say: 'Inside A and B is A intersection B. Then but not C is a difference. So the region is A intersection B, in brackets, minus C.', show: 'm.1', focus: 'm.1' },
        { say: 'Or, reading it as in A and B and not in C: A intersection B intersection C prime.', show: 'm.2', focus: 'm.2' },
      ],
    },
    {
      chapter: 'Watch out',
      layout: 'center',
      main: [
        figure('two', [
          venn3({ name: 'p', titles: ['A', 'B', 'C'], shade: [{ id: 's', where: (m) => m.A && (m.B || m.C) }] }),
          moved(venn3({ name: 'q', titles: ['A', 'B', 'C'], shade: [{ id: 's', where: (m) => (m.A && m.B) || m.C, tone: 'hyp' }] }), [13.5, 0]),
          {
            points: { 'p-at': [0, -6.6], 'q-at': [13.5, -6.6] },
            items: [
              { kind: 'label', id: 'p-name', at: 'p-at', tex: 'A \\cap (B \\cup C)', tone: 'theta', place: 'center' },
              { kind: 'label', id: 'q-name', at: 'q-at', tex: '(A \\cap B) \\cup C', tone: 'hyp', place: 'center' },
            ],
          },
        ], 440),
        { kind: 'text', id: 'oops', size: 'md', md: 'Brackets change the region: do the operation in brackets first.' },
      ],
      lines: [
        { say: 'A common mistake is to ignore the brackets. Here is A intersection, B union C, from before.', show: ['two.p-box', 'two.p-A', 'two.p-B', 'two.p-C', 'two.p-s', 'two.p-name'], focus: 'two.p-s' },
        { say: 'Now move the brackets: A intersection B, in brackets, union C. First find A intersection B, the overlap of A and B. Then take the union with C: add all of circle C.', show: ['two.q-box', 'two.q-A', 'two.q-B', 'two.q-C', 'two.q-s', 'two.q-name'], focus: 'two.q-s' },
        { say: 'The same letters and symbols, with the brackets in a different place, name a very different region. So always work inside the brackets first.', show: 'oops' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q',
          prompt: 'A region of a Venn diagram is inside $B$ and inside $C$, but outside $A$. Which notation names it?',
          choices: ['$A \\cap B \\cap C$', '$(B \\cup C) \\setminus A$', '$(B \\cap C) \\setminus A$', '$(B \\cap C) \\cup A$'],
          answer: 2,
          working: 'Inside $B$ and $C$: $B \\cap C$. But not in $A$: $(B \\cap C) \\setminus A$.',
        },
      ],
      lines: [
        { say: 'Your turn. A region of a Venn diagram is inside B and inside C, but outside A. Which notation names it? Pause the video and try it.', show: 'q', wait: 6 },
        { say: 'The answer is C. Inside B and C is B intersection C, and but not A is a difference: B intersection C, in brackets, minus A. Choice B uses a union, which would also include the parts of B and of C that are outside the other circle.', show: 'q.answer' },
      ],
    },
    {
      chapter: 'Summary',
      layout: 'center',
      main: [{ kind: 'bullets', id: 'sum', check: true, items: ["Read $\\cup$ as or, $\\cap$ as and, $\\setminus$ as but not, and $'$ as not in.", 'Describe the shaded region in words first, then write the symbols.', 'Brackets matter: $A \\cap (B \\cup C)$ is not $(A \\cap B) \\cup C$.'] }],
      lines: [
        { say: 'Let’s sum up. Read union as or, intersection as and, the backslash as but not, and a prime as not in.', show: 'sum.0' },
        { say: 'To name a shaded region, describe it in words first, then write the symbols.', show: 'sum.1' },
        { say: 'And the brackets matter: moving them changes the region. In the next lesson, we turn to logic, with if-then statements. See you there!', show: 'sum.2' },
      ],
    },
  ],
};

export default video;
