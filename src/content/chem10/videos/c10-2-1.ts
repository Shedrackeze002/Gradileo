import type { Explainer } from '@/video/script.ts';
import { figure } from '@/video/solids.ts';
import { ballAtom, pointer } from './lib/c10-2-figures.ts';

// A lithium atom: 3 protons and 4 neutrons in the nucleus, and electrons arranged 2,1, with
// pointers naming a proton, a neutron, the nucleus and an electron.
const lithium = () =>
  figure(
    'atom',
    [
      ballAtom({ protons: 3, neutrons: 4, shells: [2, 1] }),
      pointer({ id: 'proton', from: [-0.52, 0.3], to: [-3.3, 1.9], tex: '\\text{proton}', place: 'above', tone: 'opp' }),
      pointer({ id: 'neutron', from: [-0.52, -0.3], to: [-3.3, -1.9], tex: '\\text{neutron}', place: 'below' }),
      pointer({ id: 'nucleus', from: [0.75, 0.45], to: [3.3, 1.9], tex: '\\text{nucleus}', place: 'above' }),
      pointer({ id: 'electron', from: [1.2, -2.6], to: [2.9, -3.3], tex: '\\text{electron}', place: 'below', tone: 'adj' }),
    ],
    520,
  );

const video: Explainer = {
  id: 'c10-2-1',
  lessonId: 'c10-2-1',
  title: 'Inside the Atom, Part 1: Three Particles',
  thumbnailTitle: 'Three Particles',
  thumbnail: 'atom',
  summary:
    'Atoms are made of protons, neutrons and electrons. Protons (charge +1, mass 1) and neutrons (no charge, mass 1) sit in the tiny nucleus, while electrons (charge −1, mass about 1/1836) move in shells around it, so almost all the mass of an atom is in its nucleus.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Atoms and the Periodic Table · Part 1', title: 'Three Particles', subtitle: 'What an atom is made of' }],
      lines: [
        { say: 'Everything you can touch, from the water in a glass to the air in your lungs, is made of atoms, and atoms are built from even smaller particles.', show: 'title' },
        { say: 'In this lesson, you will meet those particles. This part shows what each one is like. Then you will see how an atom is arranged, count its particles, and use them to name an element.' },
      ],
    },
    {
      chapter: 'Protons, neutrons and electrons',
      layout: 'split',
      leftWidth: 600,
      left: [lithium()],
      right: [
        { kind: 'callout', id: 'def', tone: 'definition', title: 'Atom', md: 'The smallest particle of an element that still has the chemical properties of that element.' },
        { kind: 'callout', id: 'nuc', tone: 'definition', title: 'Nucleus', md: 'The tiny, dense centre of an atom. It holds the **protons** and the **neutrons**.' },
      ],
      lines: [
        { say: 'An atom is the smallest particle of an element that still has the chemical properties of that element.', show: 'def' },
        { say: 'Atoms are made of three kinds of smaller particle: protons, neutrons and electrons. Here is an atom of lithium.', show: ['atom.protons', 'atom.neutrons', 'atom.shell-1', 'atom.shell-2'] },
        { say: 'At the centre is the nucleus. It holds the protons, in orange, and the neutrons, in grey.', show: ['nuc', 'atom.nucleus', 'atom.proton', 'atom.neutron'], focus: ['atom.protons', 'atom.neutrons'] },
        { say: 'The electrons, the blue dots, move around the nucleus in regions called shells.', show: 'atom.electron', focus: ['atom.shell-1', 'atom.shell-2'] },
        { say: 'This atom has three protons, four neutrons and three electrons. Only the commonest kind of hydrogen atom has no neutron.', focus: 'atom' },
      ],
    },
    {
      chapter: 'Charge and mass',
      layout: 'center',
      main: [
        {
          kind: 'table',
          id: 't',
          head: ['Particle', 'Relative charge', 'Relative mass', 'Where it is found'],
          rows: [
            ['[[opp:proton]]', '$+1$', '$1$', 'in the nucleus'],
            ['neutron', '$0$ (no charge)', '$1$', 'in the nucleus'],
            ['[[adj:electron]]', '$-1$', 'about $\\tfrac{1}{1836}$', 'in shells around the nucleus'],
          ],
        },
        { kind: 'callout', id: 'tip', tone: 'tip', title: 'Remembering the charges', md: '**P**rotons are **p**ositive, **n**eutrons are **n**eutral, and electrons are negative.' },
      ],
      lines: [
        { say: 'These particles are far too small to weigh in grams, so chemists compare them with one another.' },
        { say: 'A proton is given a relative mass of one, and its charge is called plus one. Protons are found in the nucleus.', show: 't.0', focus: 't.0' },
        { say: 'A neutron also has a relative mass of one, but no charge at all. Neutrons are in the nucleus too.', show: 't.1', focus: 't.1' },
        { say: 'An electron has a charge of minus one, and a relative mass of only about one over 1,836. Electrons move in shells around the nucleus.', show: 't.2', focus: 't.2' },
        { say: 'To remember them: protons are positive, neutrons are neutral, and electrons are negative.', show: 'tip', focus: 't' },
      ],
    },
    {
      chapter: 'Where the mass is',
      layout: 'split',
      leftWidth: 600,
      left: [lithium()],
      right: [
        {
          kind: 'bullets',
          id: 'b',
          items: ['Protons and neutrons have almost the same mass.', 'An electron is about $1836$ times lighter.', 'So almost all the mass of an atom is in its **nucleus**.'],
        },
        { kind: 'math', id: 'm', size: 'md', align: 'left', lines: ['17 + 18 = 35', '17 \\times \\tfrac{1}{1836} \\approx 0.009'] },
      ],
      lines: [
        { say: 'Protons and neutrons have almost the same mass, and an electron is about 1,836 times lighter.', show: ['atom.protons', 'atom.neutrons', 'atom.shell-1', 'atom.shell-2', 'b.0', 'b.1'] },
        { say: 'Both heavy particles are in the nucleus, so almost all the mass of an atom is there, even though the nucleus is tiny.', show: ['b.2', 'atom.nucleus'], focus: ['atom.protons', 'atom.neutrons', 'b.2'] },
        { say: 'An electron’s mass is tiny, but not zero. An atom with seventeen protons, eighteen neutrons and seventeen electrons has a relative mass of seventeen plus eighteen: thirty-five.', show: 'm.0', focus: 'm.0' },
        { say: 'Its electrons add only about zero point zero zero nine, so we usually leave them out.', show: 'm.1', focus: 'm.1' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q',
          prompt: 'A particle in an atom has a relative mass of $1$ and no charge. Which particle is it, and where is it found?',
          choices: ['A proton, in the nucleus', 'An electron, in a shell around the nucleus', 'A neutron, in a shell around the nucleus', 'A neutron, in the nucleus'],
          answer: 3,
          working: 'Protons and neutrons both have a relative mass of $1$, but only the neutron has no charge. Neutrons are found in the nucleus, with the protons.',
        },
      ],
      lines: [
        { say: 'Your turn. A particle in an atom has a relative mass of one, and no charge. Which particle is it, and where is it found? Pause the video and try it.', show: 'q', wait: 6 },
        { say: 'The answer is D: a neutron, in the nucleus. Protons and neutrons both have a mass of one, but only the neutron has no charge. Choice C puts it in the wrong place.', show: 'q.answer' },
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
            'An atom has a tiny, dense **nucleus** holding **protons** and **neutrons**; **electrons** move in shells around it.',
            'Proton: charge $+1$, mass $1$. Neutron: no charge, mass $1$. Electron: charge $-1$, mass about $\\tfrac{1}{1836}$.',
            'Almost all the mass of an atom is in its nucleus.',
          ],
        },
      ],
      lines: [
        { say: 'Let’s sum up. A tiny, dense nucleus holds the protons and neutrons, and electrons move in shells around it.', show: 'sum.0' },
        { say: 'A proton has a charge of plus one, a neutron has no charge, and both have a mass of one. An electron has a charge of minus one, and almost no mass.', show: 'sum.1' },
        { say: 'So almost all the mass is in the nucleus. In part two, you will see how we know the nucleus is tiny, and why an atom has no overall charge. See you there!', show: 'sum.2' },
      ],
    },
  ],
};

export default video;
