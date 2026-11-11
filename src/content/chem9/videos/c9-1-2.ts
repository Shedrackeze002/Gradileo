import type { Explainer } from '@/video/script.ts';

const video: Explainer = {
  id: 'c9-1-2',
  lessonId: 'c9-1-2',
  title: 'Atomic Number, Mass Number and Isotopes',
  thumbnail: 'iso',
  summary:
    'The atomic number is the number of protons, and in an atom it also gives the number of electrons. The mass number is protons plus neutrons, so neutrons are mass number minus atomic number. Isotopes have the same number of protons but different numbers of neutrons, and react in the same way.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Atomic Structure', title: 'Atomic Number, Mass Number and Isotopes', subtitle: 'Two numbers that tell you what is inside an atom' }],
      lines: [
        { say: 'Every carbon atom has six protons, but not every carbon atom has the same mass.', show: 'title' },
        { say: 'In this video, you will use two numbers to count the protons, neutrons and electrons in any atom, and find out why some atoms of the same element are heavier than others.' },
      ],
    },
    {
      chapter: 'Two numbers',
      layout: 'center',
      main: [
        { kind: 'math', id: 'na', size: 'xl', lines: ['^{23}_{11}\\text{Na}'] },
        {
          kind: 'table',
          id: 'rules',
          head: ['To find', 'Use'],
          rows: [
            ['protons', 'atomic number'],
            ['electrons (in an atom)', 'atomic number'],
            ['neutrons', 'mass number − atomic number'],
          ],
        },
      ],
      lines: [
        { say: 'The atomic number is the number of protons. It decides which element an atom is: every atom with eleven protons is sodium.', show: 'na' },
        { say: 'The mass number is the number of protons plus neutrons. Electrons are so light that they are left out. The mass number is written on top, and the atomic number below.' },
        { say: 'So to find the protons, read the atomic number. This sodium atom has eleven.', show: ['rules', 'rules.0'], focus: 'rules.0' },
        { say: 'In an atom, electrons equal protons, so there are eleven electrons too.', show: 'rules.1', focus: 'rules.1' },
        { say: 'And neutrons are the mass number take away the atomic number: twenty-three take away eleven is twelve neutrons.', show: 'rules.2', focus: 'rules.2' },
      ],
    },
    {
      chapter: 'Isotopes',
      layout: 'center',
      main: [
        { kind: 'callout', id: 'def', tone: 'definition', title: 'Isotopes', md: 'Atoms of the same element with the **same number of protons** but **different numbers of neutrons**.' },
        {
          kind: 'table',
          id: 'iso',
          head: ['Isotope', 'Protons', 'Neutrons', 'Mass number'],
          rows: [
            ['carbon-12', '6', '6', '12'],
            ['carbon-14', '6', '8', '14'],
            ['chlorine-35', '17', '18', '35'],
            ['chlorine-37', '17', '20', '37'],
          ],
        },
      ],
      lines: [
        { say: 'Isotopes are atoms of the same element with the same number of protons, but different numbers of neutrons. So they have different mass numbers.', show: 'def' },
        { say: 'Carbon-twelve has six protons and six neutrons. Carbon-fourteen has six protons but eight neutrons.', show: ['iso', 'iso.0', 'iso.1'], focus: 'iso.1' },
        { say: 'Chlorine has two common isotopes too: chlorine-thirty-five with eighteen neutrons, and chlorine-thirty-seven with twenty.', show: ['iso.2', 'iso.3'], focus: 'iso.3' },
        { say: 'Isotopes have the same number of electrons, and reactions involve electrons, so isotopes react in exactly the same way. Only their masses differ. Carbon-fourteen is slightly radioactive, which lets scientists date ancient wood and bone.' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q',
          prompt: 'Potassium has atomic number 19 and mass number 39. How many neutrons are in the atom?',
          choices: ['19', '39', '58', '20'],
          answer: 3,
          working: 'Neutrons = mass number − atomic number = 39 − 19 = 20.',
        },
      ],
      lines: [
        { say: 'Your turn. Potassium has atomic number nineteen and mass number thirty-nine. How many neutrons are in the atom? Pause the video and try it.', show: 'q', wait: 6 },
        { say: 'The answer is D. Neutrons are the mass number take away the atomic number: thirty-nine take away nineteen is twenty.', show: 'q.answer' },
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
            '**Atomic number** = protons; in an atom, electrons = protons.',
            '**Mass number** = protons + neutrons.',
            'Neutrons = mass number − atomic number.',
            '**Isotopes**: same protons, different neutrons; they react alike.',
          ],
        },
      ],
      lines: [
        { say: 'Let’s sum up. The atomic number is the number of protons, and in an atom it is also the number of electrons.', show: 'sum.0' },
        { say: 'The mass number is protons plus neutrons.', show: 'sum.1' },
        { say: 'So neutrons are the mass number take away the atomic number.', show: 'sum.2' },
        { say: 'And isotopes have the same number of protons but different numbers of neutrons, so they react in the same way. Next, you will see how electrons are arranged in shells.', show: 'sum.3' },
      ],
    },
  ],
};

export default video;
