import type { Explainer } from '@/video/script.ts';
import { periodicTable } from '@/video/chem.ts';
import { figure } from '@/video/solids.ts';

// The main groups of periods 1 to 4, with their atomic numbers.
const table = () =>
  figure(
    'pt',
    [
      periodicTable({
        upTo: 36,
        numbers: true,
        highlights: [
          { id: 'g17', cells: ['F', 'Cl', 'Br'], tone: 'opp' },
          { id: 'p4', cells: ['K', 'Ca', 'Ga', 'Ge', 'As', 'Se', 'Br', 'Kr'], tone: 'adj' },
          { id: 'br', cells: ['Br'], tone: 'opp' },
          { id: 'p', cells: ['P'], tone: 'good' },
          { id: 'ca', cells: ['Ca'], tone: 'adj' },
        ],
      }),
    ],
    500,
  );

const video: Explainer = {
  id: 'c10-2-4',
  lessonId: 'c10-2-4',
  title: 'The Periodic Table, Part 1: Groups and Periods',
  thumbnailTitle: 'Groups and Periods',
  thumbnail: 'pt',
  summary:
    'The periodic table lists the elements in order of atomic number. A group is a column, numbered 1 to 18, and a period is a row, numbered 1 to 7: bromine is in group 17 and period 4, and phosphorus in group 15, period 3.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Atoms and the Periodic Table · Part 1', title: 'Groups and Periods', subtitle: 'Reading the periodic table' }],
      lines: [
        {
          say: 'In eighteen sixty-nine, the chemist Dmitri Mendeleev wrote the known elements on cards, and laid them out in rows, with similar elements under one another.',
          caption: 'In 1869, the chemist Dmitri Mendeleev wrote the known elements on cards, and laid them out in rows, with similar elements under one another.',
          show: 'title',
        },
        {
          say: 'He left gaps for elements nobody had found. When germanium was discovered in eighteen eighty-six, it matched his predictions remarkably well.',
          caption: 'He left gaps for elements nobody had found. When germanium was discovered in 1886, it matched his predictions remarkably well.',
        },
        { say: 'His arrangement grew into the modern periodic table. In this part, you will learn to read it. Then you will see why it works, and sort the elements into metals, non-metals and metalloids.' },
      ],
    },
    {
      chapter: 'Groups and periods',
      layout: 'split',
      leftWidth: 640,
      left: [table()],
      right: [
        { kind: 'callout', id: 'g', tone: 'definition', title: 'Group', md: 'A vertical **column**, numbered from $1$ on the left to $18$ on the right.' },
        { kind: 'callout', id: 'p', tone: 'definition', title: 'Period', md: 'A horizontal **row**, numbered from $1$ at the top to $7$ at the bottom.' },
      ],
      lines: [
        { say: 'The modern periodic table lists the elements in order of atomic number: hydrogen is one, helium is two, and so on.', show: 'pt.table' },
        { say: 'The order runs across each row from left to right, then on to the start of the next row, like the words on a page.' },
        { say: 'A group is a vertical column. The groups are numbered from one on the left to eighteen on the right.', show: ['g', 'pt.g17'] },
        { say: 'A period is a horizontal row, numbered from one at the top to seven at the bottom. This table shows only the main groups of the first four periods.', show: ['p', 'pt.p4'] },
      ],
    },
    {
      chapter: 'Reading the table',
      layout: 'split',
      leftWidth: 640,
      left: [table()],
      right: [
        {
          kind: 'bullets',
          id: 'b',
          items: ['Bromine, $\\ce{Br}$: group $17$, period $4$', 'Phosphorus, $\\ce{P}$: group $15$, period $3$', 'Group $2$, period $4$: calcium, $\\ce{Ca}$'],
        },
      ],
      lines: [
        { say: 'To find an element’s group, read the number at the top of its column. To find its period, read the number at the start of its row.', show: 'pt.table' },
        { say: 'Bromine is in group seventeen and period four.', show: ['pt.br', 'b.0'], focus: 'b.0' },
        { say: 'Phosphorus is in the column headed fifteen, and the row for period three: group fifteen, period three.', show: ['pt.p', 'b.1'], focus: 'b.1' },
        { say: 'Which element is in group two, period four? Go down the column for group two to the row for period four: calcium.', show: ['pt.ca', 'b.2'], focus: 'b.2' },
      ],
    },
    {
      chapter: 'Groups go down, periods go across',
      layout: 'center',
      main: [
        { kind: 'callout', id: 'oops', tone: 'mistake', title: 'Groups go down, periods go across', md: 'A **period** runs across like a line of writing; a **group** goes down like a column. Sodium is in group $1$, period $3$: the first column and the third row.' },
      ],
      lines: [
        { say: 'It is easy to mix the two up. A period runs across the page like a line of writing, while a group goes down like a column.', show: 'oops' },
        { say: 'Sodium is in group one and period three: the first column and the third row. Swap the numbers and you would look in group three, period one, where there is no element at all.' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q',
          prompt: 'An element is in the same period as sodium (group $1$, period $3$) and in the same group as fluorine (group $17$, period $2$). Which element is it?',
          choices: ['Chlorine', 'Lithium', 'Argon', 'Sulfur'],
          answer: 0,
          working: 'The same period as sodium is period $3$, and the same group as fluorine is group $17$. Group $17$, period $3$ is chlorine.',
        },
      ],
      lines: [
        { say: 'Your turn. An element is in the same period as sodium, and in the same group as fluorine. The screen shows where those two are. Which element is it? Pause the video and try it.', show: 'q', wait: 6 },
        { say: 'The answer is A, chlorine. The same period as sodium is period three, and the same group as fluorine is group seventeen. Group seventeen, period three is chlorine. Choice B, lithium, takes the group and the period the wrong way round.', show: 'q.answer' },
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
            'The periodic table lists the elements in order of **atomic number**.',
            'A **group** is a column, numbered $1$ to $18$; a **period** is a row, numbered $1$ to $7$.',
            'Read the group at the top of the column and the period at the start of the row.',
          ],
        },
      ],
      lines: [
        { say: 'Let’s sum up. The periodic table lists the elements in order of atomic number.', show: 'sum.0' },
        { say: 'A group is a column, numbered one to eighteen, and a period is a row, numbered one to seven.', show: 'sum.1' },
        { say: 'Read the group at the top of the column, and the period at the start of the row. In part two, you will see why elements in a group are alike. See you there!', show: 'sum.2' },
      ],
    },
  ],
};

export default video;
