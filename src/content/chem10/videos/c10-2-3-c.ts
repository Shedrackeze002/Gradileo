import type { Explainer } from '@/video/script.ts';
import { atomShells, periodicTable } from '@/video/chem.ts';
import { figure } from '@/video/solids.ts';
import { tag } from './lib/c10-2-figures.ts';

// Lithium, sodium and potassium: one more shell each time, and one outer electron each.
const group1 = figure(
  'g1',
  [
    atomShells({ name: 'li', at: [0, 0], nucleus: '\\text{Li}', shells: [2, 1], r: 0.9, gap: 0.8 }),
    tag({ id: 'li-arr', at: [0, -5], tex: '\\text{2,1}' }),
    atomShells({ name: 'na', at: [7, 0], nucleus: '\\text{Na}', shells: [2, 8, 1], r: 0.9, gap: 0.8 }),
    tag({ id: 'na-arr', at: [7, -5], tex: '\\text{2,8,1}' }),
    atomShells({ name: 'k', at: [15.6, 0], nucleus: '\\text{K}', shells: [2, 8, 8, 1], r: 0.9, gap: 0.8 }),
    tag({ id: 'k-arr', at: [15.6, -5], tex: '\\text{2,8,8,1}' }),
  ],
  440,
);

const table = figure(
  'pt',
  [
    periodicTable({
      highlights: [
        { id: 'g1', cells: ['Li', 'Na', 'K'], tone: 'opp' },
        { id: 'p3', cells: ['Na', 'Mg', 'Al', 'Si', 'P', 'S', 'Cl', 'Ar'], tone: 'adj' },
      ],
    }),
  ],
  380,
);

const video: Explainer = {
  id: 'c10-2-3-c',
  lessonId: 'c10-2-3',
  title: 'Electron Shells, Part 3: Outer Electrons, Groups and Periods',
  thumbnailTitle: 'Outer Electrons',
  thumbnail: 'g1',
  summary:
    'The outer (valence) electrons are those in the outermost shell, the last number of the electron arrangement. The number of occupied shells is the period; the number of outer electrons gives the group (the same number for groups 1 and 2, and 10 more for groups 13 to 18). Sulfur, 2,8,6, is in group 16, period 3.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Atoms and the Periodic Table · Part 3', title: 'Outer Electrons, Groups and Periods', subtitle: 'What the last shell tells you' }],
      lines: [
        { say: 'Why do lithium, sodium and potassium all react with water in the same way? The answer is in their outer shells.', show: 'title' },
        { say: 'In this part, you will meet outer electrons, and see how the electron arrangement tells you an element’s group and period.' },
      ],
    },
    {
      chapter: 'Outer electrons',
      layout: 'center',
      main: [
        { kind: 'callout', id: 'def', tone: 'definition', title: 'Outer electrons', md: 'The electrons in the outermost occupied shell, also called **valence electrons**: the last number in the electron arrangement.' },
        group1,
      ],
      lines: [
        { say: 'The outer electrons, also called valence electrons, are the electrons in the outermost occupied shell: the last number in the arrangement. They are the ones that meet other atoms when atoms react.', show: 'def' },
        {
          say: 'Lithium is two, one. Sodium is two, eight, one. Potassium is two, eight, eight, one.',
          show: ['g1.li-nucleus', 'g1.li-shell-1', 'g1.li-shell-2', 'g1.li-arr', 'g1.na-nucleus', 'g1.na-shell-1', 'g1.na-shell-2', 'g1.na-shell-3', 'g1.na-arr', 'g1.k-nucleus', 'g1.k-shell-1', 'g1.k-shell-2', 'g1.k-shell-3', 'g1.k-shell-4', 'g1.k-arr'],
        },
        { say: 'Each one has one outer electron. Elements in the same group have the same number of outer electrons, and that is why they behave alike.', focus: ['g1.li-shell-2', 'g1.na-shell-3', 'g1.k-shell-4'] },
      ],
    },
    {
      chapter: 'Groups and periods',
      layout: 'split',
      leftWidth: 640,
      left: [
        table,
        {
          kind: 'table',
          id: 't',
          head: ['Group', '1', '2', '13', '14', '15', '16', '17', '18'],
          rows: [['Outer electrons', '1', '2', '3', '4', '5', '6', '7', '8']],
        },
      ],
      right: [{ kind: 'bullets', id: 'b', items: ['**period** = number of occupied shells', 'groups **1** and **2**: group = outer electrons', 'groups **13** to **18**: group = outer electrons **+ 10**'] }],
      lines: [
        { say: 'Down a group, every element has the same number of outer electrons.', show: ['pt.table', 'pt.g1'] },
        { say: 'Across a period, every element has the same number of occupied shells: all the elements in period three have three shells.', show: 'pt.p3' },
        { say: 'So the period number is the number of occupied shells.', show: 'b.0', focus: 'b.0' },
        { say: 'In groups one and two, the group number is the number of outer electrons.', show: 'b.1', focus: 'b.1' },
        { say: 'In groups thirteen to eighteen, it is the number of outer electrons plus ten.', show: ['b.2', 't'], focus: 'b.2' },
        { say: 'Helium, with two outer electrons, sits in group eighteen with the other elements whose outer shells are full.', focus: 't' },
      ],
    },
    {
      chapter: 'Sulfur and fluorine',
      layout: 'split',
      leftWidth: 544,
      left: [
        { kind: 'text', id: 'q1', size: 'md', md: '**Sulfur**, atomic number $16$. Which group and period?' },
        { kind: 'math', id: 'a', size: 'md', align: 'left', lines: ['16 \\text{ electrons: } \\text{2,8,6}', '3 \\text{ shells: period } 3', '\\text{group } 6 + 10 = 16'] },
      ],
      right: [
        { kind: 'text', id: 'q2', size: 'md', md: 'Group $17$, period $2$. Which element?' },
        { kind: 'math', id: 'b', size: 'md', align: 'left', lines: ['17 - 10 = 7 \\text{ outer electrons}', '2 \\text{ shells: } \\text{2,7}', '2 + 7 = 9 \\text{ electrons: fluorine}'] },
      ],
      lines: [
        { say: 'Sulfur has atomic number sixteen. In which group and period is it? Its sixteen electrons are arranged two, eight, six.', show: ['q1', 'a.0'], focus: 'a.0' },
        { say: 'Three occupied shells puts it in period three. Six outer electrons puts it in group six plus ten: group sixteen.', show: ['a.1', 'a.2'], focus: ['a.1', 'a.2'] },
        { say: 'Now backwards. One of the first twenty elements is in group seventeen and period two. Group seventeen means seventeen minus ten: seven outer electrons.', show: ['q2', 'b.0'], focus: 'b.0' },
        { say: 'Period two means two shells, with the inner one full. So the arrangement is two, seven: nine electrons. Atomic number nine is fluorine.', show: ['b.1', 'b.2'], focus: ['b.1', 'b.2'] },
      ],
    },
    {
      chapter: 'The last number, not the total',
      layout: 'center',
      main: [
        { kind: 'callout', id: 'oops', tone: 'mistake', title: 'Outer electrons are the last number', md: 'Aluminium, 2,8,3, has $13$ electrons in all but only **3** outer electrons. It has **3** shells: one for each number in the arrangement.' },
      ],
      lines: [
        { say: 'Watch out. Aluminium, two, eight, three, has thirteen electrons in all, but only three outer electrons.', show: 'oops' },
        { say: 'And the number of shells is how many numbers the arrangement has, three for aluminium, not the largest number in it.' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q',
          prompt: 'An atom has the electron arrangement 2,6. In which group and which period of the periodic table is it? (Groups are numbered $1$ to $18$.)',
          choices: ['Group $6$, period $2$', 'Group $16$, period $6$', 'Group $2$, period $16$', 'Group $16$, period $2$'],
          answer: 3,
          working: 'Two shells: period $2$. Six outer electrons: group $6 + 10 = 16$.',
        },
      ],
      lines: [
        { say: 'Your turn. An atom has the electron arrangement two, six. In which group and which period is it? Pause the video and try it.', show: 'q', wait: 6 },
        { say: 'The answer is D: group sixteen, period two. Two numbers means two shells, so period two. Six outer electrons gives group six plus ten, which is sixteen. Choice A forgets to add ten.', show: 'q.answer' },
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
            'The **outer electrons** are the last number of the arrangement.',
            'The number of occupied shells is the **period**.',
            'The outer electrons give the **group**: the same number for groups 1 and 2, and $10$ more for groups 13 to 18.',
            'Elements in the same group have the same number of outer electrons.',
          ],
        },
      ],
      lines: [
        { say: 'Let’s sum up. The outer electrons are the last number of the arrangement.', show: 'sum.0' },
        { say: 'The number of occupied shells is the period.', show: 'sum.1' },
        { say: 'The outer electrons give the group: the same number for groups one and two, and ten more for groups thirteen to eighteen.', show: 'sum.2' },
        { say: 'And elements in the same group have the same number of outer electrons, so they behave alike. That completes this lesson. Next, you will explore the whole periodic table.', show: 'sum.3' },
      ],
    },
  ],
};

export default video;
