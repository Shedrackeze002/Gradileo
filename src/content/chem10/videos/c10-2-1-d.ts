import type { Explainer } from '@/video/script.ts';

const video: Explainer = {
  id: 'c10-2-1-d',
  lessonId: 'c10-2-1',
  title: 'Inside the Atom, Part 4: Identifying an Element',
  thumbnailTitle: 'Identifying an Element',
  thumbnail: false,
  summary:
    'The number of protons decides the element. A neutral atom has as many protons as electrons, and the protons are the mass number minus the neutrons; the element is the one with that atomic number. An atom with mass number 27 and 14 neutrons has 13 protons, so it is aluminium.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Atoms and the Periodic Table · Part 4', title: 'Identifying an Element', subtitle: 'Count on the protons' }],
      lines: [
        { say: 'Every atom carries its identity in its nucleus. Change the number of protons, and you have a different element.', show: 'title' },
        { say: 'In this part, you will work out which element an atom is, whatever numbers a question gives you.' },
      ],
    },
    {
      chapter: 'Protons decide the element',
      layout: 'center',
      main: [
        { kind: 'callout', id: 'key', tone: 'key', title: 'Count on the protons', md: 'The number of **protons** decides the element. Find the protons first, then look up the element with that **atomic number**.' },
        {
          kind: 'bullets',
          id: 'r',
          items: ['From the **electrons**: a neutral atom has as many protons as electrons.', 'From the **mass number** and the **neutrons**: protons = mass number − neutrons.'],
        },
      ],
      lines: [
        { say: 'Because the number of protons decides the element, you can always work out which element an atom is once you know its protons.', show: 'key' },
        { say: 'Sometimes a question gives you the protons directly. Sometimes you have to find them first.' },
        { say: 'From the electrons: a neutral atom has as many protons as electrons.', show: 'r.0', focus: 'r.0' },
        { say: 'From the mass number and the neutrons: the protons are the mass number minus the neutrons. Then look up the element with that atomic number.', show: 'r.1', focus: 'r.1' },
      ],
    },
    {
      chapter: 'From the electrons',
      layout: 'split',
      leftWidth: 460,
      left: [
        {
          kind: 'table',
          id: 't',
          head: ['Element', 'Atomic number'],
          rows: [
            ['sulfur', '$16$'],
            ['chlorine', '$17$'],
            ['argon', '$18$'],
          ],
        },
      ],
      right: [
        { kind: 'text', id: 'q', size: 'md', md: 'A neutral atom has $17$ electrons and $18$ neutrons. Which element is it?' },
        { kind: 'math', id: 'm', size: 'md', align: 'left', lines: ['\\text{protons} = \\text{electrons} = 17', '\\text{atomic number } 17 \\text{ is chlorine}'] },
      ],
      lines: [
        { say: 'A neutral atom has seventeen electrons and eighteen neutrons. Which element is it? The atomic numbers you need are in the table.', show: ['q', 't'] },
        { say: 'The atom is neutral, so it has as many protons as electrons: seventeen protons.', show: 'm.0', focus: 'm.0' },
        { say: 'The element with atomic number seventeen is chlorine.', show: 'm.1', focus: ['m.1', 't.1'] },
        { say: 'Argon has atomic number eighteen, the same as the number of neutrons. But neutrons do not decide the element, so argon is a trap.', focus: 't.2' },
      ],
    },
    {
      chapter: 'From the mass number',
      layout: 'split',
      leftWidth: 460,
      left: [
        {
          kind: 'table',
          id: 't',
          head: ['Element', 'Atomic number'],
          rows: [
            ['aluminium', '$13$'],
            ['silicon', '$14$'],
            ['cobalt', '$27$'],
          ],
        },
      ],
      right: [
        { kind: 'text', id: 'q', size: 'md', md: 'An atom has a mass number of $27$ and contains $14$ neutrons. Which element is it?' },
        { kind: 'math', id: 'm', size: 'md', align: 'left', lines: ['\\text{protons} = 27 - 14 = 13', '\\text{atomic number } 13 \\text{ is aluminium}', '\\ce{^{27}_{13}Al}'] },
      ],
      lines: [
        { say: 'An atom has a mass number of twenty-seven and contains fourteen neutrons. Which element is it?', show: ['q', 't'] },
        { say: 'First, the protons: twenty-seven minus fourteen is thirteen.', show: 'm.0', focus: 'm.0' },
        { say: 'The element with atomic number thirteen is aluminium. In nuclide notation, it has twenty-seven at the top and thirteen at the bottom.', show: ['m.1', 'm.2'], focus: ['m.1', 'm.2', 't.0'] },
        { say: 'Silicon would need fourteen protons, and cobalt twenty-seven. Neither the neutrons nor the mass number tells you the element.', focus: ['t.1', 't.2'] },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q',
          prompt: 'An atom has a mass number of $40$ and contains $22$ neutrons. Which element is it? Use these atomic numbers: argon $18$, calcium $20$, titanium $22$, zirconium $40$.',
          choices: ['Titanium', 'Argon', 'Calcium', 'Zirconium'],
          answer: 1,
          working: 'Protons $= 40 - 22 = 18$. The element with atomic number $18$ is argon.',
        },
      ],
      lines: [
        { say: 'Your turn. An atom has a mass number of forty and contains twenty-two neutrons. Which element is it? Pause the video and try it.', show: 'q', wait: 6 },
        { say: 'The answer is B, argon. Forty minus twenty-two is eighteen protons, and atomic number eighteen is argon. Choice A, titanium, matches the neutrons, and choice D, zirconium, matches the mass number. Neither decides the element.', show: 'q.answer' },
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
            'The number of **protons** decides the element: find it first.',
            'In a neutral atom, protons = electrons.',
            'Protons = mass number − neutrons. Then look up that atomic number.',
          ],
        },
      ],
      lines: [
        { say: 'Let’s sum up. The number of protons decides the element, so always aim for the protons first.', show: 'sum.0' },
        { say: 'In a neutral atom, the protons equal the electrons.', show: 'sum.1' },
        { say: 'And the protons are the mass number minus the neutrons. Then look up the element with that atomic number.', show: 'sum.2' },
        { say: 'That completes this lesson. Next, you will meet atoms of the same element with different numbers of neutrons, called isotopes.' },
      ],
    },
  ],
};

export default video;
