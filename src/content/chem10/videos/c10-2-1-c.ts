import type { Explainer } from '@/video/script.ts';
import { atomShells } from '@/video/chem.ts';
import { figure } from '@/video/solids.ts';

const video: Explainer = {
  id: 'c10-2-1-c',
  lessonId: 'c10-2-1',
  title: 'Inside the Atom, Part 3: Atomic Number and Mass Number',
  thumbnailTitle: 'Atomic Number and Mass Number',
  thumbnail: 'na',
  summary:
    'The atomic number is the number of protons, and it decides the element; the mass number is the protons plus the neutrons. In a neutral atom, protons = electrons = atomic number, and neutrons = mass number − atomic number, as in sodium-23 (11 protons, 12 neutrons, 11 electrons). In nuclide notation the mass number is at the top left and the atomic number at the bottom left.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Atoms and the Periodic Table · Part 3', title: 'Atomic Number and Mass Number', subtitle: 'Counting the particles in an atom' }],
      lines: [
        { say: 'What makes an atom of carbon different from an atom of gold? Only the number of protons in its nucleus.', show: 'title' },
        { say: 'In this part, you will meet two numbers that describe every atom, and use them to count its protons, neutrons and electrons.' },
      ],
    },
    {
      chapter: 'Two numbers',
      layout: 'center',
      main: [
        { kind: 'callout', id: 'an', tone: 'definition', title: 'Atomic number', md: 'The number of **protons** in the nucleus of an atom. Every carbon atom has $6$ protons, and any atom with $6$ protons is carbon.' },
        { kind: 'callout', id: 'mn', tone: 'definition', title: 'Mass number', md: 'The number of **protons** plus the number of **neutrons** in the nucleus. It is always a whole number.' },
      ],
      lines: [
        { say: 'The atomic number is the number of protons in the nucleus of an atom.', show: 'an' },
        { say: 'Every atom of the same element has the same atomic number: every carbon atom has six protons, and any atom with six protons is carbon. The periodic table lists the elements in this order.' },
        { say: 'The mass number is the number of protons plus the number of neutrons. It is always a whole number, because it counts particles.', show: 'mn' },
      ],
    },
    {
      chapter: 'Counting the particles',
      layout: 'center',
      main: [
        { kind: 'text', id: 'lead', size: 'lg', align: 'center', md: 'In a **neutral** atom:' },
        { kind: 'bullets', id: 'r', items: ['**protons** = atomic number', '**electrons** = protons = atomic number', '**neutrons** = mass number − atomic number'] },
      ],
      lines: [
        { say: 'These two numbers are all you need to count the particles in a neutral atom.', show: 'lead' },
        { say: 'The protons are the atomic number.', show: 'r.0', focus: 'r.0' },
        { say: 'The electrons equal the protons, because the atom is neutral.', show: 'r.1', focus: 'r.1' },
        { say: 'And the neutrons are the rest of the mass number: the mass number minus the atomic number.', show: 'r.2', focus: 'r.2' },
      ],
    },
    {
      chapter: 'Sodium-23',
      layout: 'split',
      leftWidth: 560,
      left: [figure('na', [atomShells({ protons: 11, neutrons: 12, shells: [2, 8, 1] })], 520)],
      right: [
        { kind: 'text', id: 'q', size: 'md', md: 'How many protons, neutrons and electrons are in a neutral atom of **sodium-23**? (Atomic number of sodium: $11$.)' },
        { kind: 'math', id: 'm', size: 'lg', align: 'left', lines: ['\\text{protons} = 11', '\\text{electrons} = 11', '\\text{neutrons} = 23 - 11 = 12'] },
      ],
      lines: [
        { say: 'An atom can be named by its element and its mass number, such as sodium-23. How many protons, neutrons and electrons does it have? The atomic number of sodium is eleven.', show: 'q' },
        { say: 'The atomic number is eleven, so the atom has eleven protons.', show: ['m.0', 'na.nucleus'], focus: 'm.0' },
        { say: 'The atom is neutral, so it also has eleven electrons.', show: ['m.1', 'na.shell-1', 'na.shell-2', 'na.shell-3'], focus: 'm.1' },
        { say: 'The mass number is twenty-three, so the neutrons are twenty-three minus eleven: twelve.', show: 'm.2', focus: ['m.2', 'na.nucleus'] },
      ],
    },
    {
      chapter: 'Nuclide notation',
      layout: 'center',
      main: [
        { kind: 'math', id: 'n', size: 'xl', lines: ['{}^{\\opp{23}}_{\\adj{11}}\\text{Na} \\qquad \\begin{array}{l} \\opp{\\text{mass number } 23} \\\\ \\adj{\\text{atomic number } 11} \\end{array}'] },
        { kind: 'math', id: 'm', size: 'lg', lines: ['\\ce{^{31}_{15}P}: \\quad 15 \\text{ protons and } 15 \\text{ electrons}', '\\text{neutrons} = 31 - 15 = 16'] },
        { kind: 'callout', id: 'oops', tone: 'mistake', title: 'Which number is which?', md: 'The **larger** number is the mass number: it counts the protons and the neutrons together.' },
      ],
      lines: [
        { say: 'An atom can also be written in nuclide notation: the symbol of the element, with the mass number at the top left, and the atomic number at the bottom left.', show: 'n' },
        { say: 'Here is an atom of phosphorus. The bottom number is the atomic number, fifteen, so it has fifteen protons, and as a neutral atom, fifteen electrons.', show: 'm.0', focus: 'm.0' },
        { say: 'The top number is the mass number, thirty-one. The neutrons are thirty-one minus fifteen: sixteen.', show: 'm.1', focus: 'm.1' },
        { say: 'The larger number is always the mass number, because it counts the protons and the neutrons together. Do not read thirty-one as the protons.', show: 'oops' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q',
          prompt: 'How many protons, neutrons and electrons are in a neutral atom of $\\ce{^{39}_{19}K}$?',
          choices: ['$19$ protons, $20$ neutrons, $19$ electrons', '$39$ protons, $19$ neutrons, $39$ electrons', '$19$ protons, $39$ neutrons, $19$ electrons', '$20$ protons, $19$ neutrons, $20$ electrons'],
          answer: 0,
          working: 'The bottom number is the atomic number: $19$ protons, and $19$ electrons in the neutral atom. Neutrons $= 39 - 19 = 20$.',
        },
      ],
      lines: [
        { say: 'Your turn. How many protons, neutrons and electrons are in a neutral atom of potassium, with mass number thirty-nine and atomic number nineteen? Pause the video and try it.', show: 'q', wait: 6 },
        { say: 'The answer is A. The atomic number gives nineteen protons and nineteen electrons, and thirty-nine minus nineteen is twenty neutrons. Choice C forgets to subtract: the mass number counts the protons as well.', show: 'q.answer' },
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
            '**Atomic number** = number of protons; it decides the element.',
            '**Mass number** = protons + neutrons, so neutrons = mass number − atomic number.',
            'In $\\ce{^{23}_{11}Na}$, the mass number is at the top left and the atomic number at the bottom left.',
          ],
        },
      ],
      lines: [
        { say: 'Let’s sum up. The atomic number is the number of protons, and it decides the element.', show: 'sum.0' },
        { say: 'The mass number is protons plus neutrons, so the neutrons are the mass number minus the atomic number.', show: 'sum.1' },
        { say: 'In nuclide notation, the mass number is at the top left. In part four, you will use these numbers to work out which element an atom is. See you there!', show: 'sum.2' },
      ],
    },
  ],
};

export default video;
