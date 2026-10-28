import type { Explainer } from '@/video/script.ts';
import { atomShells } from '@/video/chem.ts';
import { figure } from '@/video/solids.ts';

const video: Explainer = {
  id: 'c10-2-3',
  lessonId: 'c10-2-3',
  title: 'Electron Shells, Part 1: Filling the Shells',
  thumbnailTitle: 'Filling the Shells',
  thumbnail: 'cl',
  summary:
    'Electrons occupy shells, or energy levels, around the nucleus, filling from the inside out. For the first 20 elements the shells hold 2, 8, 8 and then 2 electrons. The electron arrangement lists the electrons in each shell: sodium is 2,8,1 and chlorine is 2,8,7.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Atoms and the Periodic Table · Part 1', title: 'Filling the Shells', subtitle: 'Where the electrons go' }],
      lines: [
        { say: 'Fireworks get their colours from compounds of metals: strontium gives red, sodium gives yellow-orange, and copper gives blue-green.', show: 'title' },
        { say: 'The heat pushes electrons out to higher energy levels. As they drop back, they give out the extra energy as light, and each element gives its own colours.' },
        { say: 'In this lesson, you will see how electrons fill these levels, called shells. This part fills the shells. Part two writes the arrangements of the first twenty elements, and part three links them to the periodic table.' },
      ],
    },
    {
      chapter: 'Electron shells',
      layout: 'split',
      leftWidth: 560,
      left: [figure('ca', [atomShells({ nucleus: '\\text{Ca}', shells: [2, 8, 8, 2] })], 540)],
      right: [
        { kind: 'callout', id: 'def', tone: 'definition', title: 'Electron shell', md: 'An **electron shell**, or **energy level**, is a region at a particular distance from the nucleus where electrons are found.' },
        { kind: 'bullets', id: 'b', items: ['first shell: up to **2** electrons', 'second shell: up to **8**', 'third shell: **8**, then the fourth shell takes the next **2**'] },
      ],
      lines: [
        { say: 'An electron shell, or energy level, is a region at a particular distance from the nucleus where electrons are found.', show: ['def', 'ca.nucleus'] },
        { say: 'The shell closest to the nucleus has the lowest energy, and it fills first.' },
        { say: 'Each shell holds only a limited number of electrons. For the first twenty elements, the first shell holds up to two,', show: ['b.0', 'ca.shell-1'], focus: ['b.0', 'ca.shell-1'] },
        { say: 'the second shell holds up to eight,', show: ['b.1', 'ca.shell-2'], focus: ['b.1', 'ca.shell-2'] },
        { say: 'and the third shell holds eight. Then the nineteenth and twentieth electrons go into the fourth shell.', show: ['b.2', 'ca.shell-3', 'ca.shell-4'], focus: ['b.2', 'ca.shell-3', 'ca.shell-4'] },
        { say: 'Electrons fill the shells from the inside out: a new shell starts only when the one inside it is full.', focus: 'ca' },
      ],
    },
    {
      chapter: 'Electron arrangement',
      layout: 'split',
      leftWidth: 560,
      left: [figure('na', [atomShells({ nucleus: '\\text{Na}', shells: [2, 8, 1] })], 520)],
      right: [
        { kind: 'callout', id: 'def', tone: 'definition', title: 'Electron arrangement', md: 'The number of electrons in each shell, from the innermost shell outwards, separated by commas.' },
        { kind: 'text', id: 'arr', size: 'xl', md: 'Sodium: **2,8,1**' },
      ],
      lines: [
        { say: 'The electron arrangement of an atom lists the number of electrons in each shell, from the innermost shell outwards, separated by commas.', show: 'def' },
        { say: 'Sodium has eleven electrons, arranged two, eight, one: two in the first shell,', show: ['arr', 'na.nucleus', 'na.shell-1'], focus: 'na.shell-1' },
        { say: 'eight in the second,', show: 'na.shell-2', focus: 'na.shell-2' },
        { say: 'and one in the third.', show: 'na.shell-3', focus: 'na.shell-3' },
        { say: 'A shell diagram like this one shows the same thing as a picture: the nucleus at the centre, each shell as a ring, and each electron as a dot on its ring.', focus: 'na' },
      ],
    },
    {
      chapter: 'Chlorine, step by step',
      layout: 'split',
      leftWidth: 560,
      left: [figure('cl', [atomShells({ nucleus: '\\text{Cl}', shells: [2, 8, 7] })], 520)],
      right: [
        {
          kind: 'math',
          id: 'm',
          size: 'md',
          align: 'left',
          lines: ['17 \\text{ electrons}', '\\text{first shell: } 2, \\quad 17 - 2 = 15', '\\text{second shell: } 8, \\quad 15 - 8 = 7', '\\text{third shell: } 7', '\\text{Cl: } \\text{2,8,7}'],
        },
      ],
      lines: [
        { say: 'Write the electron arrangement of chlorine, atomic number seventeen. A neutral chlorine atom has seventeen electrons.', show: ['m.0', 'cl.nucleus'], focus: 'm.0' },
        { say: 'The first shell takes two, leaving seventeen minus two: fifteen.', show: ['m.1', 'cl.shell-1'], focus: ['m.1', 'cl.shell-1'] },
        { say: 'The second shell takes eight, leaving fifteen minus eight: seven.', show: ['m.2', 'cl.shell-2'], focus: ['m.2', 'cl.shell-2'] },
        { say: 'The third shell takes the last seven. So chlorine is two, eight, seven.', show: ['m.3', 'm.4', 'cl.shell-3'], focus: ['m.4', 'cl.shell-3'] },
        { say: 'Check: two plus eight plus seven is seventeen, and no shell holds more than it should.' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q',
          prompt: 'Which is the electron arrangement of a neutral atom of aluminium, atomic number $13$?',
          choices: ['2,8,3', '2,11', '3,8,2', '8,5'],
          answer: 0,
          working: 'The first shell takes $2$, leaving $11$. The second shell takes $8$, leaving $3$. The third shell takes the last $3$: 2,8,3.',
        },
      ],
      lines: [
        { say: 'Your turn. Which is the electron arrangement of a neutral atom of aluminium, atomic number thirteen? Pause the video and try it.', show: 'q', wait: 6 },
        { say: 'The answer is A: two, eight, three. The first shell takes two and the second takes eight, which leaves three for the third. Choice B puts eleven in the second shell, which holds only eight, and choice C writes the shells backwards.', show: 'q.answer' },
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
            'Electrons fill **shells** (energy levels) from the inside out.',
            'For the first $20$ elements, the shells hold **2, 8, 8, 2**.',
            'An **electron arrangement**, such as 2,8,7 for chlorine, lists the electrons in each shell from the inside out.',
          ],
        },
      ],
      lines: [
        { say: 'Let’s sum up. Electrons fill shells, or energy levels, from the inside out.', show: 'sum.0' },
        { say: 'For the first twenty elements, the shells hold two, then eight, then eight, then two.', show: 'sum.1' },
        { say: 'And an electron arrangement lists the electrons in each shell, from the inside out: chlorine is two, eight, seven. In part two, you will write the arrangements of all of the first twenty elements. See you there!', show: 'sum.2' },
      ],
    },
  ],
};

export default video;
