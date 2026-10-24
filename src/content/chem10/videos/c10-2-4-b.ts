import type { Explainer } from '@/video/script.ts';
import { periodicTable } from '@/video/chem.ts';
import { figure } from '@/video/solids.ts';

const table = figure(
  'pt',
  [
    periodicTable({
      upTo: 36,
      numbers: true,
      highlights: [
        { id: 'g1', cells: ['Li', 'Na', 'K'], tone: 'opp' },
        { id: 'g17', cells: ['F', 'Cl', 'Br'], tone: 'good' },
        { id: 'pair', cells: ['Na', 'Mg'], tone: 'adj' },
      ],
    }),
  ],
  500,
);

const P4 = ['K', 'Ca', 'Sc', 'Ti', 'V', 'Cr', 'Mn', 'Fe', 'Co', 'Ni', 'Cu', 'Zn', 'Ga', 'Ge', 'As', 'Se', 'Br', 'Kr'];

const video: Explainer = {
  id: 'c10-2-4-b',
  lessonId: 'c10-2-4',
  title: 'The Periodic Table, Part 2: Why the Table Works',
  thumbnailTitle: 'Why the Table Works',
  thumbnail: 'pt',
  summary:
    'Elements in the same group have the same number of outer electrons, so they have similar chemical properties: lithium, sodium and potassium all react with water. From period 4 onwards the transition metals, groups 3 to 12, fit between groups 2 and 13; to find a group in a long period, count on from group 1, so iron (26) is 7 places after potassium (19), in group 8.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Atoms and the Periodic Table · Part 2', title: 'Why the Table Works', subtitle: 'Outer electrons and the long periods' }],
      lines: [
        { say: 'Mendeleev put elements with similar properties in the same column, long before anyone knew about protons or electrons. Why does that work?', show: 'title' },
        { say: 'In this part, you will see the reason, and meet the longer periods, with the transition metals.' },
      ],
    },
    {
      chapter: 'Same group, same outer electrons',
      layout: 'split',
      leftWidth: 640,
      left: [table],
      right: [
        { kind: 'callout', id: 'key', tone: 'key', title: 'Why groups are alike', md: 'The same group means the same number of **outer electrons**, so similar chemical properties.' },
        { kind: 'bullets', id: 'b', items: ['Group 1: $1$ outer electron; all react with water.', 'Group 17: $7$ outer electrons; all react with sodium.'] },
      ],
      lines: [
        { say: 'Lesson two point three showed the reason. The elements in a period have the same number of occupied shells, and the elements in a group have the same number of outer electrons.', show: 'pt.table' },
        { say: 'The outer electrons decide how an atom reacts. So elements in the same group have similar chemical properties.', show: 'key' },
        { say: 'Lithium, sodium and potassium, in group one, each have one outer electron, and all three react with water to give off hydrogen.', show: ['pt.g1', 'b.0'], focus: 'b.0' },
        { say: 'Fluorine, chlorine and bromine, in group seventeen, each have seven outer electrons, and all three react with sodium to make a white salt.', show: ['pt.g17', 'b.1'], focus: 'b.1' },
        { say: 'Neighbours across a period, such as sodium and magnesium, are much less alike.', show: 'pt.pair', focus: 'pt.pair' },
      ],
    },
    {
      chapter: 'Potassium and sodium',
      layout: 'center',
      main: [
        { kind: 'text', id: 'q', size: 'md', align: 'center', md: 'Potassium has atomic number $19$. Which group and period? Which period 3 element behaves most like it?' },
        { kind: 'math', id: 'm', size: 'lg', lines: ['19 \\text{ electrons: } \\text{2,8,8,1}', '4 \\text{ shells: period } 4 \\qquad 1 \\text{ outer electron: group } 1', '\\text{group 1, period 3: sodium, } \\text{2,8,1}'] },
      ],
      lines: [
        { say: 'Potassium has atomic number nineteen. In which group and period is it, and which element in period three behaves most like it?', show: 'q' },
        { say: 'Its nineteen electrons are arranged two, eight, eight, one. Four shells puts it in period four, and one outer electron puts it in group one.', show: ['m.0', 'm.1'], focus: ['m.0', 'm.1'] },
        { say: 'The period three element in group one is sodium, two, eight, one, which also has one outer electron. So sodium behaves most like potassium.', show: 'm.2', focus: 'm.2' },
      ],
    },
    {
      chapter: 'The long periods',
      layout: 'center',
      main: [
        { kind: 'text', id: 'lead', size: 'md', align: 'center', md: '**Period 4**, group by group, with the [[theta:transition metals]] in groups 3 to 12:' },
        {
          kind: 'table',
          id: 't',
          head: P4.map((_, i) => String(i + 1)),
          rows: [P4.map((s, i) => (i >= 2 && i <= 11 ? `[[theta:${s}]]` : s))],
        },
        { kind: 'math', id: 'm', size: 'lg', lines: ['\\text{iron: } 26 - 19 = 7 \\text{ places after potassium}', '\\text{group } 1 + 7 = 8'] },
      ],
      lines: [
        { say: 'From period four onwards, ten more groups, groups three to twelve, fit between group two and group thirteen. These are the transition metals, such as iron, copper and zinc.', show: ['lead', 't'] },
        { say: 'Period four begins with potassium, atomic number nineteen, in group one, and has one element in each of the eighteen groups.' },
        { say: 'Iron has atomic number twenty-six. In which group is it? Iron is twenty-six minus nineteen: seven places after potassium.', show: 'm.0', focus: 'm.0' },
        { say: 'So it is in group one plus seven: group eight, a transition metal.', show: 'm.1', focus: 'm.1' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q',
          prompt: 'Period $4$ begins with potassium, atomic number $19$, in group $1$, and has one element in each group from $1$ to $18$, in order of atomic number. In which group is zinc, atomic number $30$?',
          choices: ['Group $11$', 'Group $12$', 'Group $30$', 'Group $2$'],
          answer: 1,
          working: 'Zinc is $30 - 19 = 11$ places after potassium, so it is in group $1 + 11 = 12$, a transition metal.',
        },
      ],
      lines: [
        { say: 'Your turn. Period four begins with potassium, atomic number nineteen, in group one. In which group is zinc, atomic number thirty? Pause the video and try it.', show: 'q', wait: 6 },
        { say: 'The answer is B, group twelve. Zinc is thirty minus nineteen: eleven places after potassium, so it is in group one plus eleven, which is twelve. Choice A forgets that potassium itself is in group one.', show: 'q.answer' },
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
            'Elements in the same group have the same number of outer electrons, so similar chemical properties.',
            'From period 4 on, the **transition metals** (groups 3 to 12) fit between groups 2 and 13.',
            'In a long period, count on from group 1: iron is $26 - 19 = 7$ places on, in group 8.',
          ],
        },
      ],
      lines: [
        { say: 'Let’s sum up. Elements in the same group have the same number of outer electrons, so they have similar chemical properties.', show: 'sum.0' },
        { say: 'From period four onwards, the transition metals, groups three to twelve, fit between groups two and thirteen.', show: 'sum.1' },
        { say: 'To find a group in a long period, count on from group one at the start of the period. In part three, you will sort the elements into metals and non-metals. See you there!', show: 'sum.2' },
      ],
    },
  ],
};

export default video;
