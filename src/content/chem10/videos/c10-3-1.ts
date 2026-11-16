import type { Explainer } from '@/video/script.ts';
import { nobleGases, oneIon } from './lib/c10-atoms.ts';

const sodium = oneIon('na', { symbol: 'Na', protons: 11, name: 'sodium' }, 1, 340);
const chlorine = oneIon('cl', { symbol: 'Cl', protons: 17, name: 'chlorine' }, -1, 340);

const video: Explainer = {
  id: 'c10-3-1',
  lessonId: 'c10-3-1',
  title: 'Ions, Part 1: Why Atoms Form Ions',
  thumbnailTitle: 'Why Atoms Form Ions',
  thumbnail: 'na',
  summary:
    'Atoms gain or lose electrons to reach a full outer shell, like a noble gas. A sodium atom (2,8,1) loses one electron to become the sodium ion, Na+, and a chlorine atom (2,8,7) gains one to become the chloride ion, Cl-. An ion has a charge because its electrons no longer equal its protons, and the protons never change.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Bonding, Names and Formulas · Part 1', title: 'Why Atoms Form Ions', subtitle: 'Full outer shells and charged particles' }],
      lines: [
        { say: 'Sodium is a soft metal that fizzes on water, and chlorine is a choking green gas. Yet table salt is made of nothing but sodium and chlorine.', show: 'title' },
        { say: 'The difference is a few electrons. This video shows why atoms gain or lose electrons to form ions. The later parts predict the charge of an ion, write and name ions, and count their electrons.' },
      ],
    },
    {
      chapter: 'Full outer shells',
      layout: 'center',
      main: [nobleGases('ng', 360), { kind: 'text', id: 'rule', size: 'md', align: 'center', md: 'Shells hold up to **2** electrons, then **8**, then **8**.' }],
      lines: [
        { say: 'An atom has no overall charge: its positive protons and negative electrons are equal in number. The electrons sit in shells, up to two in the first, then eight, then eight.', show: 'rule' },
        { say: 'The noble gases, in group eighteen, hardly react at all. Helium has two electrons, neon has two, eight, and argon has two, eight, eight.', show: ['ng', 'ng.labels', 'ng.arrangement'] },
        { say: 'Each one has a full outer shell, a very stable arrangement. Atoms of many other elements reach one by gaining or losing electrons.', focus: ['ng.he', 'ng.ne', 'ng.ar'] },
      ],
    },
    {
      chapter: 'Sodium loses an electron',
      layout: 'center',
      main: [sodium, { kind: 'math', id: 'm', size: 'md', lines: ['11\\text{ protons}, \\ 10\\text{ electrons} \\;\\Rightarrow\\; \\text{charge } 1{+}', '\\text{the sodium ion: } \\ce{Na+}'] }],
      lines: [
        { say: 'A sodium atom has eleven protons, and eleven electrons arranged two, eight, one.', show: ['na', 'na.labels', 'na.arrangement'] },
        { say: 'To reach a full outer shell, it could gain seven electrons, or lose one. Losing one is far easier.', focus: 'na.a' },
        { say: 'Watch the outer electron leave. That leaves two, eight: a full outer shell, like neon.', play: 'na.ion' },
        { say: 'The nucleus has not changed: there are still eleven protons, but only ten electrons. One more positive charge than negative gives a charge of one plus.', show: ['m.0', 'na.charges'], focus: 'm.0' },
        { say: 'The sodium atom has become a sodium ion. We write it N A plus.', caption: 'The sodium atom has become a sodium ion. We write it Na⁺.', show: 'm.1', focus: 'm.1' },
      ],
    },
    {
      chapter: 'Chlorine gains an electron',
      layout: 'center',
      main: [chlorine, { kind: 'math', id: 'm', size: 'md', lines: ['17\\text{ protons}, \\ 18\\text{ electrons} \\;\\Rightarrow\\; \\text{charge } 1{-}', '\\text{the chloride ion: } \\ce{Cl-}'] }],
      lines: [
        { say: 'A chlorine atom has seventeen protons, and seventeen electrons arranged two, eight, seven.', show: ['cl', 'cl.labels', 'cl.arrangement'] },
        { say: 'It could lose seven electrons, or gain one. It takes the shorter route, and gains one. Watch it arrive.', play: 'cl.ion' },
        { say: 'Now it has two, eight, eight, like argon.', focus: 'cl.a' },
        { say: 'Seventeen protons and eighteen electrons give one more negative charge than positive: a charge of one minus.', show: ['m.0', 'cl.charges'], focus: 'm.0' },
        { say: 'This is the chloride ion, C L minus. Notice its name, chloride. Part three explains why.', caption: 'This is the chloride ion, Cl⁻. Notice its name, chloride. Part three explains why.', show: 'm.1', focus: 'm.1' },
      ],
    },
    {
      chapter: 'What an ion is',
      layout: 'center',
      main: [
        { kind: 'callout', id: 'def', tone: 'definition', title: 'Ion', md: 'An **ion** is an atom (or a group of atoms) that has gained or lost electrons, so it has an electric charge. Its number of electrons no longer equals its number of protons.' },
        { kind: 'callout', id: 'oops', tone: 'mistake', title: 'Only the electrons change', md: 'The nucleus stays exactly the same. A sodium ion still has $11$ protons, so it is still sodium.' },
      ],
      lines: [
        { say: 'So an ion is an atom, or a group of atoms, that has gained or lost electrons, so it has an electric charge.', show: 'def' },
        { say: 'Only the electrons change. A sodium ion still has eleven protons, so it is still sodium. Changing the protons would make a different element.', show: 'oops' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q',
          prompt: 'Why does an atom of magnesium (atomic number $12$, electron arrangement 2,8,2) form the ion $\\ce{Mg^2+}$?',
          choices: ['It gains 2 electrons, filling its outer shell.', 'It loses 2 electrons, leaving a full outer shell like neon’s.', 'It loses 2 protons from its nucleus.', 'It gains 2 protons in its nucleus.'],
          answer: 1,
          working: 'The outer shell holds 2 electrons. Losing both leaves 2,8, a full outer shell like neon’s, and a charge of 2+. The protons never change.',
        },
      ],
      lines: [
        { say: 'Your turn. Magnesium has atomic number twelve, and its electrons are arranged two, eight, two. Why does a magnesium atom form an ion with a charge of two plus? Pause the video and try it.', show: 'q', wait: 6 },
        { say: 'The answer is B. Losing its two outer electrons leaves two, eight, a full outer shell like neon’s, and a charge of two plus. Choices C and D are wrong, because the protons never change.', show: 'q.answer' },
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
            'An **ion** is an atom that has gained or lost electrons, so it has a charge.',
            'Atoms gain or lose electrons to reach a full outer shell, like a noble gas.',
            'Sodium (2,8,1) loses one electron: $\\ce{Na+}$, 2,8. Chlorine (2,8,7) gains one: $\\ce{Cl-}$, 2,8,8.',
            'Only the electrons change: the protons never do.',
          ],
        },
      ],
      lines: [
        { say: 'Let’s sum up. An ion is an atom that has gained or lost electrons, so it has a charge.', show: 'sum.0' },
        { say: 'Atoms gain or lose electrons to reach a full outer shell, like a noble gas.', show: 'sum.1' },
        { say: 'Sodium loses one electron to become the sodium ion, and chlorine gains one to become the chloride ion.', show: 'sum.2' },
        { say: 'The protons never change. In part two, you will predict the charge of an ion from the periodic table. See you there!', show: 'sum.3' },
      ],
    },
  ],
};

export default video;
