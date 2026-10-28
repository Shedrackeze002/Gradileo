import type { Explainer } from '@/video/script.ts';
import { atomShells } from '@/video/chem.ts';
import { figure } from '@/video/solids.ts';

/** A cell of the table of arrangements: the symbol in bold and the arrangement. */
const cell = (sym: string, arr: string) => `**${sym}**\u00a0${arr}`;

const video: Explainer = {
  id: 'c10-2-3-b',
  lessonId: 'c10-2-3',
  title: 'Electron Shells, Part 2: The First 20 Elements',
  thumbnailTitle: 'The First 20 Elements',
  thumbnail: 'ca',
  summary:
    'Calcium, with 20 electrons, is 2,8,8,2: the 19th and 20th electrons start the fourth shell, so potassium is 2,8,8,1, not 2,8,9. The arrangements of the first 20 elements follow the pattern of the periodic table. Working backwards, the electrons of 2,8,5 add up to 15, so the element is phosphorus.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Atoms and the Periodic Table · Part 2', title: 'The First 20 Elements', subtitle: 'Arrangements, forwards and backwards' }],
      lines: [
        { say: 'In part one, you filled the shells of sodium and chlorine. Now for the fourth shell, and all of the first twenty elements.', show: 'title' },
        { say: 'In this part, you will also learn to work backwards, from an arrangement to the element.' },
      ],
    },
    {
      chapter: 'The fourth shell',
      layout: 'split',
      leftWidth: 560,
      left: [figure('ca', [atomShells({ nucleus: '\\text{Ca}', shells: [2, 8, 8, 2] })], 540)],
      right: [
        {
          kind: 'math',
          id: 'm',
          size: 'md',
          align: 'left',
          lines: ['20 \\text{ electrons}', '\\text{first shell: } 2, \\quad 20 - 2 = 18', '\\text{second shell: } 8, \\quad 18 - 8 = 10', '\\text{third shell: } 8, \\quad 10 - 8 = 2', '\\text{fourth shell: } 2', '\\text{Ca: } \\text{2,8,8,2}'],
        },
      ],
      lines: [
        { say: 'Write the electron arrangement of calcium, atomic number twenty. A neutral calcium atom has twenty electrons.', show: ['m.0', 'ca.nucleus'], focus: 'm.0' },
        { say: 'The first shell takes two, leaving eighteen.', show: ['m.1', 'ca.shell-1'], focus: ['m.1', 'ca.shell-1'] },
        { say: 'The second shell takes eight, leaving ten.', show: ['m.2', 'ca.shell-2'], focus: ['m.2', 'ca.shell-2'] },
        { say: 'The third shell takes eight, leaving two.', show: ['m.3', 'ca.shell-3'], focus: ['m.3', 'ca.shell-3'] },
        { say: 'The last two go into the fourth shell. Calcium is two, eight, eight, two.', show: ['m.4', 'm.5', 'ca.shell-4'], focus: ['m.5', 'ca.shell-4'] },
      ],
    },
    {
      chapter: 'Potassium is 2,8,8,1',
      layout: 'center',
      main: [
        { kind: 'math', id: 'm', size: 'xl', lines: ['\\text{K: } \\bad{\\text{2,8,9}} \\qquad \\good{\\text{2,8,8,1}}'] },
        { kind: 'callout', id: 'oops', tone: 'mistake', title: 'The third shell stops at 8', md: 'For the first $20$ elements, the 19th electron starts the fourth shell. Check that no shell holds too many, and that the numbers add up to the atomic number.' },
      ],
      lines: [
        { say: 'For the first twenty elements, the third shell stops at eight. Potassium’s nineteenth electron starts the fourth shell, so potassium is two, eight, eight, one, not two, eight, nine.', show: 'm' },
        { say: 'Check two things in every arrangement: no shell holds more than it should, and the numbers add up to the atomic number.', show: 'oops' },
      ],
    },
    {
      chapter: 'The first 20 elements',
      layout: 'center',
      main: [
        {
          kind: 'table',
          id: 't',
          head: ['Period', 'Group 1', 'Group 2', 'Group 13', 'Group 14', 'Group 15', 'Group 16', 'Group 17', 'Group 18'],
          rows: [
            ['1', cell('H', '1'), '', '', '', '', '', '', cell('He', '2')],
            ['2', cell('Li', '2,1'), cell('Be', '2,2'), cell('B', '2,3'), cell('C', '2,4'), cell('N', '2,5'), cell('O', '2,6'), cell('F', '2,7'), cell('Ne', '2,8')],
            ['3', cell('Na', '2,8,1'), cell('Mg', '2,8,2'), cell('Al', '2,8,3'), cell('Si', '2,8,4'), cell('P', '2,8,5'), cell('S', '2,8,6'), cell('Cl', '2,8,7'), cell('Ar', '2,8,8')],
            ['4', cell('K', '2,8,8,1'), cell('Ca', '2,8,8,2'), '', '', '', '', '', ''],
          ],
        },
      ],
      lines: [
        { say: 'Here are the electron arrangements of the first twenty elements, laid out in the same pattern as the periodic table.', show: 't' },
        { say: 'Across each row, every element has one more electron than the one before it. And each new row starts a new shell.', focus: ['t.1', 't.2'] },
      ],
    },
    {
      chapter: 'From an arrangement to an element',
      layout: 'center',
      main: [
        { kind: 'text', id: 'q', size: 'md', align: 'center', md: 'A neutral atom has the electron arrangement **2,8,5**. Which element is it?' },
        { kind: 'math', id: 'm', size: 'lg', lines: ['2 + 8 + 5 = 15 \\text{ electrons}', '15 \\text{ protons: atomic number } 15, \\text{ phosphorus}'] },
        { kind: 'callout', id: 'mg', tone: 'tip', title: 'Starting from the nucleus', md: 'Mass number $24$ and $12$ neutrons: $24 - 12 = 12$ protons, so $12$ electrons, arranged 2,8,2. It is magnesium.' },
      ],
      lines: [
        { say: 'The arrangement also works backwards. A neutral atom has the arrangement two, eight, five. Which element is it?', show: 'q' },
        { say: 'Add up the electrons: two plus eight plus five is fifteen.', show: 'm.0', focus: 'm.0' },
        { say: 'A neutral atom has as many protons as electrons, so the atomic number is fifteen: phosphorus.', show: 'm.1', focus: 'm.1' },
        { say: 'A question may give the nucleus instead. An atom with a mass number of twenty-four and twelve neutrons has twelve protons. As a neutral atom it has twelve electrons, arranged two, eight, two. It is magnesium.', show: 'mg' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q',
          prompt: 'A neutral atom has the electron arrangement 2,8,8. Which element is it? Use these atomic numbers: neon $10$, chlorine $17$, argon $18$, potassium $19$.',
          choices: ['Neon', 'Chlorine', 'Argon', 'Potassium'],
          answer: 2,
          working: 'Electrons: $2 + 8 + 8 = 18$. A neutral atom has as many protons as electrons, so the atomic number is $18$: argon.',
        },
      ],
      lines: [
        { say: 'Your turn. A neutral atom has the electron arrangement two, eight, eight. Which element is it? Pause the video and try it.', show: 'q', wait: 6 },
        { say: 'The answer is C, argon. Two plus eight plus eight is eighteen electrons, so eighteen protons, and atomic number eighteen is argon. Choice A, neon, has only two shells: two, eight.', show: 'q.answer' },
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
            'Calcium is 2,8,8,2: the 19th and 20th electrons start the **fourth shell**.',
            'Check: no shell holds too many, and the numbers add up to the atomic number.',
            'Backwards: add up the electrons to get the atomic number, and so the element.',
          ],
        },
      ],
      lines: [
        { say: 'Let’s sum up. Calcium is two, eight, eight, two: the nineteenth and twentieth electrons start the fourth shell.', show: 'sum.0' },
        { say: 'In every arrangement, no shell holds too many, and the numbers add up to the atomic number.', show: 'sum.1' },
        { say: 'To work backwards, add up the electrons to get the atomic number, and so the element. In part three, you will link the arrangement to the periodic table. See you there!', show: 'sum.2' },
      ],
    },
  ],
};

export default video;
