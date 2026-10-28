import type { Explainer } from '@/video/script.ts';
import { atomShells } from '@/video/chem.ts';
import { figure } from '@/video/solids.ts';
import { tag } from './lib/c20-1a-figures.ts';

// A carbon-12 atom: 6 protons and 6 neutrons in the nucleus, 6 electrons arranged 2, 4.
const carbon = figure(
  'c',
  [
    atomShells({ protons: 6, neutrons: 6, shells: [2, 4], r: 1.5, gap: 1.2 }),
    tag('name', [0, -4.4], '\\text{a carbon atom}', { tone: 'muted' }),
  ],
  520,
);

// Chlorine-35 and chlorine-37: the same protons and electrons, different neutrons.
const chlorine = figure(
  'cl',
  [
    atomShells({ name: 'a', at: [0, 0], protons: 17, neutrons: 18, shells: [2, 8, 7], r: 1.8, gap: 0.85 }),
    tag('a-name', [0, 5.1], '\\text{chlorine-35, }\\ce{^{35}_{17}Cl}'),
    tag('a-n', [0, -5.1], '35 - 17 = 18 \\text{ neutrons}', { tone: 'opp' }),
    atomShells({ name: 'b', at: [13, 0], protons: 17, neutrons: 20, shells: [2, 8, 7], r: 1.8, gap: 0.85 }),
    tag('b-name', [13, 5.1], '\\text{chlorine-37, }\\ce{^{37}_{17}Cl}'),
    tag('b-n', [13, -5.1], '37 - 17 = 20 \\text{ neutrons}', { tone: 'opp' }),
  ],
  420,
);

const video: Explainer = {
  id: 'c20-1-1',
  lessonId: 'c20-1-1',
  title: 'Atoms, Ions and the Periodic Table, Part 1: Inside an Atom',
  thumbnailTitle: 'Inside an Atom',
  thumbnail: 'c',
  summary:
    'An atom has a nucleus of protons and neutrons, with electrons around it. The atomic number is the number of protons, a neutral atom has as many electrons as protons, and neutrons = mass number − atomic number, so iron-56 has 26 protons, 30 neutrons and 26 electrons. Isotopes, such as chlorine-35 and chlorine-37, have the same number of protons but different numbers of neutrons.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'The Diversity of Matter and Chemical Bonding · Part 1', title: 'Inside an Atom', subtitle: 'Protons, neutrons, electrons and isotopes' }],
      lines: [
        { say: 'Everything around you, the air, the water you drink and your own body, is built from atoms, of more than a hundred kinds called elements.', show: 'title' },
        { say: 'This lesson looks inside an atom. This first part counts its protons, neutrons and electrons. The later parts find valence electrons, and show how atoms become ions.' },
      ],
    },
    {
      chapter: 'Three particles',
      layout: 'split',
      leftWidth: 480,
      left: [carbon],
      right: [
        {
          kind: 'table',
          id: 't',
          head: ['Particle', 'Charge', 'Relative mass', 'Where'],
          rows: [
            ['proton', '$+1$', '$1$', 'nucleus'],
            ['neutron', '$0$', '$1$', 'nucleus'],
            ['electron', '$-1$', 'about $\\tfrac{1}{1836}$', 'around the nucleus'],
          ],
        },
      ],
      lines: [
        { say: 'An atom has a tiny, dense nucleus at its centre, surrounded by electrons. Here is a carbon atom.', show: ['c.nucleus', 'c.shell-1', 'c.shell-2', 'c.name'] },
        { say: 'A proton has a charge of plus one and a relative mass of one. It sits in the nucleus.', show: 't.0', focus: ['t.0', 'c.nucleus'] },
        { say: 'A neutron has no charge, and also a relative mass of one. It is in the nucleus too.', show: 't.1', focus: ['t.1', 'c.nucleus'] },
        { say: 'An electron has a charge of minus one, and moves around the nucleus in energy levels.', show: 't.2', focus: ['t.2', 'c.shell-1', 'c.shell-2'] },
        { say: 'Electrons are so light that we leave them out when we count mass. Protons and neutrons carry almost all of it.', focus: 't' },
      ],
    },
    {
      chapter: 'Atomic number and mass number',
      layout: 'center',
      main: [
        { kind: 'callout', id: 'an', tone: 'definition', title: 'Atomic number', md: 'The number of **protons** in the nucleus. It identifies the element: every carbon atom has $6$ protons, and any atom with $6$ protons is carbon.' },
        { kind: 'callout', id: 'mn', tone: 'definition', title: 'Mass number', md: 'The number of **protons** plus the number of **neutrons** in the nucleus.' },
        { kind: 'math', id: 'm', size: 'md', lines: ['\\text{neutral atom: electrons} = \\text{protons} = \\text{atomic number}', '\\text{neutrons} = \\text{mass number} - \\text{atomic number}'] },
      ],
      lines: [
        { say: 'The atomic number is the number of protons in the nucleus, and it identifies the element. Every carbon atom has six protons, and any atom with six protons is carbon.', show: 'an' },
        { say: 'A neutral atom has no overall charge, so its electrons balance its protons. The electrons equal the protons, which equal the atomic number.', show: 'm.0', focus: 'm.0' },
        { say: 'The mass number is the protons plus the neutrons. So the neutrons are the mass number minus the atomic number.', show: ['mn', 'm.1'], focus: 'm.1' },
      ],
    },
    {
      chapter: 'Isotopes',
      layout: 'center',
      main: [
        { kind: 'callout', id: 'def', tone: 'definition', title: 'Isotopes', md: 'Atoms of the same element (the same number of protons) with different numbers of neutrons, and so different mass numbers.' },
        chlorine,
      ],
      lines: [
        { say: 'Isotopes are atoms of the same element, with the same number of protons, but different numbers of neutrons, and so different mass numbers.', show: 'def' },
        { say: 'An isotope is written as its name and mass number, such as chlorine-35, or as its symbol, with the mass number at the top left and the atomic number at the bottom left.', show: ['cl.a-name', 'cl.b-name'] },
        { say: 'Chlorine-35 has thirty-five minus seventeen, which is eighteen neutrons. Chlorine-37 has twenty.', show: ['cl.a-nucleus', 'cl.b-nucleus', 'cl.a-n', 'cl.b-n'], focus: ['cl.a-nucleus', 'cl.b-nucleus', 'cl.a-n', 'cl.b-n'] },
        { say: 'Both have seventeen protons and seventeen electrons, so both are chlorine, and both react in the same way.', show: ['cl.a-shell-1', 'cl.a-shell-2', 'cl.a-shell-3', 'cl.b-shell-1', 'cl.b-shell-2', 'cl.b-shell-3'], focus: 'cl' },
      ],
    },
    {
      chapter: 'Counting particles',
      layout: 'center',
      main: [
        { kind: 'text', id: 'q', size: 'md', align: 'center', md: 'How many protons, neutrons and electrons are in a neutral atom of $\\ce{^{56}_{26}Fe}$?' },
        { kind: 'math', id: 'm', size: 'lg', lines: ['\\text{protons} = 26', '\\text{neutrons} = 56 - 26 = 30', '\\text{electrons} = \\text{protons} = 26'] },
        { kind: 'callout', id: 'oops', tone: 'mistake', title: 'Mass number is not the atomic mass', md: 'The table’s atomic mass (about $35.5$ for chlorine) is an average over all the isotopes. To count neutrons, use the **mass number** of the isotope in the question.' },
      ],
      lines: [
        { say: 'How many protons, neutrons and electrons are in a neutral atom of iron, with mass number fifty-six and atomic number twenty-six?', show: 'q' },
        { say: 'The bottom number, the atomic number, gives twenty-six protons.', show: 'm.0', focus: 'm.0' },
        { say: 'The top number is the mass number. The neutrons are fifty-six minus twenty-six: thirty.', show: 'm.1', focus: 'm.1' },
        { say: 'The atom is neutral, so it has twenty-six electrons.', show: 'm.2', focus: 'm.2' },
        { say: 'Watch out: the periodic table also gives an atomic mass, about thirty-five point five for chlorine. It is an average over the isotopes, so to count neutrons, use the mass number.', show: 'oops' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q',
          prompt: 'How many neutrons are in an atom of $\\ce{^{63}_{29}Cu}$?',
          choices: ['$29$', '$34$', '$63$', '$92$'],
          answer: 1,
          working: 'Neutrons $=$ mass number $-$ atomic number $= 63 - 29 = 34$.',
        },
      ],
      lines: [
        { say: 'Your turn. How many neutrons are in an atom of copper, with mass number sixty-three and atomic number twenty-nine? Pause the video and try it.', show: 'q', wait: 6 },
        { say: 'The answer is B, thirty-four. The neutrons are the mass number minus the atomic number: sixty-three minus twenty-nine is thirty-four. Choice A, twenty-nine, is the number of protons.', show: 'q.answer' },
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
            'Protons ($+1$) and neutrons ($0$) are in the nucleus; electrons ($-1$) move around it.',
            '**Atomic number** = protons; in a neutral atom, electrons = protons.',
            'Neutrons = **mass number** − atomic number.',
            '**Isotopes** have the same number of protons but different numbers of neutrons.',
          ],
        },
      ],
      lines: [
        { say: 'Let’s sum up. Protons and neutrons are in the nucleus, and electrons move around it.', show: 'sum.0' },
        { say: 'The atomic number is the number of protons, and a neutral atom has as many electrons as protons.', show: 'sum.1' },
        { say: 'The neutrons are the mass number minus the atomic number.', show: 'sum.2' },
        { say: 'Isotopes have the same protons but different neutrons. In part two, you will find an atom’s valence electrons from the periodic table. See you there!', show: 'sum.3' },
      ],
    },
  ],
};

export default video;
