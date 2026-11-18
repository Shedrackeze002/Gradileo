import type { Explainer } from '@/video/script.ts';

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
      left: [{
          kind: 'atoms',
          id: 'ca',
          span: [6.8, 6.8],
          atoms: [{ id: 'a', symbol: 'Ca', protons: 20, electrons: 0, at: [3.4, 3.4], tone: 'good', name: 'calcium' }],
          clips: { s1: { phases: [{ dur: 1.2, fill: { a: 2 } }, { dur: 0.4 }] }, s2: { phases: [{ dur: 2.8, fill: { a: 10 } }, { dur: 0.4 }] }, s3: { phases: [{ dur: 2.8, fill: { a: 18 } }, { dur: 0.4 }] }, s4: { phases: [{ dur: 3.4, fill: { a: 20 } }, { dur: 0.4 }] } },
          poster: 's4',
          height: 540,
        }],
      right: [
        { kind: 'callout', id: 'def', tone: 'definition', title: 'Electron shell', md: 'An **electron shell**, or **energy level**, is a region at a particular distance from the nucleus where electrons are found.' },
        { kind: 'bullets', id: 'b', items: ['first shell: up to **2** electrons', 'second shell: up to **8**', 'third shell: **8**, then the fourth shell takes the next **2**'] },
      ],
      lines: [
        { say: 'An electron shell, or energy level, is a region at a particular distance from the nucleus where electrons are found.', show: ['def', 'ca', 'ca.labels'] },
        { say: 'The shell closest to the nucleus has the lowest energy, and it fills first.' },
        { say: 'Each shell holds only a limited number of electrons. For the first twenty elements, the first shell holds up to two,', show: ['b.0', 'ca.arrangement'], play: 'ca.s1', focus: 'b.0' },
        { say: 'the second shell holds up to eight,', show: 'b.1', play: 'ca.s2', focus: 'b.1' },
        { say: 'and the third shell holds eight. Then the nineteenth and twentieth electrons go into the fourth shell.', show: 'b.2', play: 'ca.s4', focus: 'b.2' },
        { say: 'Electrons fill the shells from the inside out: a new shell starts only when the one inside it is full.', focus: 'ca' },
      ],
    },
    {
      chapter: 'Electron arrangement',
      layout: 'split',
      leftWidth: 560,
      left: [{
          kind: 'atoms',
          id: 'na',
          span: [5.6, 5.6],
          atoms: [{ id: 'a', symbol: 'Na', protons: 11, electrons: 0, at: [2.8, 2.8], tone: 'opp', name: 'sodium' }],
          clips: { s1: { phases: [{ dur: 1.2, fill: { a: 2 } }, { dur: 0.4 }] }, s2: { phases: [{ dur: 2.8, fill: { a: 10 } }, { dur: 0.4 }] }, s3: { phases: [{ dur: 0.9, fill: { a: 11 } }, { dur: 0.4 }] } },
          poster: 's3',
          height: 520,
        }],
      right: [
        { kind: 'callout', id: 'def', tone: 'definition', title: 'Electron arrangement', md: 'The number of electrons in each shell, from the innermost shell outwards, separated by commas.' },
        { kind: 'text', id: 'arr', size: 'xl', md: 'Sodium: **2,8,1**' },
      ],
      lines: [
        { say: 'The electron arrangement of an atom lists the number of electrons in each shell, from the innermost shell outwards, separated by commas.', show: 'def' },
        { say: 'Sodium has eleven electrons, arranged two, eight, one: two in the first shell,', show: ['arr', 'na', 'na.labels', 'na.arrangement'], play: 'na.s1', focus: 'na' },
        { say: 'eight in the second,', play: 'na.s2', focus: 'na' },
        { say: 'and one in the third.', play: 'na.s3', focus: 'na' },
        { say: 'A shell diagram like this one shows the same thing as a picture: the nucleus at the centre, each shell as a ring, and each electron as a dot on its ring.', focus: 'na' },
      ],
    },
    {
      chapter: 'Chlorine, step by step',
      layout: 'split',
      leftWidth: 560,
      left: [{
          kind: 'atoms',
          id: 'cl',
          span: [5.6, 5.6],
          atoms: [{ id: 'a', symbol: 'Cl', protons: 17, electrons: 0, at: [2.8, 2.8], tone: 'good', name: 'chlorine' }],
          clips: { s1: { phases: [{ dur: 1.2, fill: { a: 2 } }, { dur: 0.4 }] }, s2: { phases: [{ dur: 2.8, fill: { a: 10 } }, { dur: 0.4 }] }, s3: { phases: [{ dur: 2.6, fill: { a: 17 } }, { dur: 0.4 }] } },
          poster: 's3',
          height: 520,
        }],
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
        { say: 'Write the electron arrangement of chlorine, atomic number seventeen. A neutral chlorine atom has seventeen electrons.', show: ['m.0', 'cl', 'cl.labels'], focus: 'm.0' },
        { say: 'The first shell takes two, leaving seventeen minus two: fifteen.', show: ['m.1', 'cl.arrangement'], play: 'cl.s1', focus: 'm.1' },
        { say: 'The second shell takes eight, leaving fifteen minus eight: seven.', show: 'm.2', play: 'cl.s2', focus: 'm.2' },
        { say: 'The third shell takes the last seven. So chlorine is two, eight, seven.', show: ['m.3', 'm.4'], play: 'cl.s3', focus: 'm.4' },
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
