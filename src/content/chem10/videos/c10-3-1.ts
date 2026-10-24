import type { Explainer } from '@/video/script.ts';
import { atomShells } from '@/video/chem.ts';
import { figure } from '@/video/solids.ts';
import { arrow, bracket, tag } from './lib/c10-3-figures.ts';

/** A Bohr diagram with room for its nucleus label ("11p⁺"). */
const shells = (name: string, at: [number, number], protons: number, list: number[]) => atomShells({ name, at, nucleus: `${protons}\\text{p}^{+}`, shells: list, r: 1.7, gap: 1 });
const twoLines = (a: string, b: string) => `\\begin{gathered}\\text{${a}}\\\\[-2pt] \\text{${b}}\\end{gathered}`;

// The noble gases helium, neon and argon, each with a full outer shell.
const noble = figure(
  'ng',
  [
    shells('he', [0, 0], 2, [2]),
    shells('ne', [8.5, 0], 10, [2, 8]),
    shells('ar', [19, 0], 18, [2, 8, 8]),
    tag('he-name', [0, -5.6], '\\text{helium: 2}'),
    tag('ne-name', [8.5, -5.6], '\\text{neon: 2,8}'),
    tag('ar-name', [19, -5.6], '\\text{argon: 2,8,8}'),
  ],
  420,
);

// A sodium atom (2,8,1) loses its outer electron and becomes a sodium ion (2,8).
const sodium = figure(
  'na',
  [
    shells('atom', [0, 0], 11, [2, 8, 1]),
    arrow('move', [5.5, 0], [12.4, 0], { label: twoLines('loses', '1 electron') }),
    shells('ion', [17.5, 0], 11, [2, 8]),
    bracket({ name: 'ion', c: [17.5, 0], half: [4.1, 4.1], charge: '+' }),
    tag('atom-name', [0, -5.6], '\\text{sodium atom: 2,8,1}'),
    tag('ion-name', [17.5, -5.6], '\\text{sodium ion: 2,8}'),
  ],
  430,
);

// A chlorine atom (2,8,7) gains an electron and becomes a chloride ion (2,8,8).
const chlorine = figure(
  'cl',
  [
    shells('atom', [0, 0], 17, [2, 8, 7]),
    arrow('move', [5.5, 0], [11.6, 0], { label: twoLines('gains', '1 electron') }),
    shells('ion', [17.5, 0], 17, [2, 8, 8]),
    bracket({ name: 'ion', c: [17.5, 0], half: [5.2, 5.2], charge: '-' }),
    tag('atom-name', [0, -6.3], '\\text{chlorine atom: 2,8,7}'),
    tag('ion-name', [17.5, -6.3], '\\text{chloride ion: 2,8,8}'),
  ],
  430,
);

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
      main: [noble, { kind: 'text', id: 'rule', size: 'md', align: 'center', md: 'Shells hold up to **2** electrons, then **8**, then **8**.' }],
      lines: [
        { say: 'An atom has no overall charge: its positive protons and negative electrons are equal in number. The electrons sit in shells, up to two in the first, then eight, then eight.', show: 'rule' },
        { say: 'The noble gases, in group eighteen, hardly react at all. Helium has two electrons, neon has two, eight, and argon has two, eight, eight.', show: ['ng.he-nucleus', 'ng.he-shell-1', 'ng.he-name', 'ng.ne-nucleus', 'ng.ne-shell-1', 'ng.ne-shell-2', 'ng.ne-name', 'ng.ar-nucleus', 'ng.ar-shell-1', 'ng.ar-shell-2', 'ng.ar-shell-3', 'ng.ar-name'] },
        { say: 'Each one has a full outer shell, a very stable arrangement. Atoms of many other elements reach one by gaining or losing electrons.', focus: ['ng.he-shell-1', 'ng.ne-shell-2', 'ng.ar-shell-3'] },
      ],
    },
    {
      chapter: 'Sodium loses an electron',
      layout: 'center',
      main: [sodium, { kind: 'math', id: 'm', size: 'md', lines: ['11\\text{ protons}, \\ 10\\text{ electrons} \\;\\Rightarrow\\; \\text{charge } 1{+}', '\\text{the sodium ion: } \\ce{Na+}'] }],
      lines: [
        { say: 'A sodium atom has eleven protons, and eleven electrons arranged two, eight, one.', show: ['na.atom-nucleus', 'na.atom-shell-1', 'na.atom-shell-2', 'na.atom-shell-3', 'na.atom-name'] },
        { say: 'To reach a full outer shell, it could gain seven electrons, or lose one. Losing one is far easier.', show: 'na.move', focus: ['na.atom-shell-3', 'na.move'] },
        { say: 'That leaves two, eight: a full outer shell, like neon.', show: ['na.ion-nucleus', 'na.ion-shell-1', 'na.ion-shell-2', 'na.ion-name'], focus: 'na.ion-shell-2' },
        { say: 'The nucleus has not changed: there are still eleven protons, but only ten electrons. One more positive charge than negative gives a charge of one plus.', show: 'm.0', focus: ['na.ion-nucleus', 'm.0'] },
        { say: 'The sodium atom has become a sodium ion. We draw it in square brackets with its charge, and write it N A plus.', caption: 'The sodium atom has become a sodium ion. We draw it in square brackets with its charge, and write it Na⁺.', show: ['na.ion-bracket', 'm.1'], focus: ['na.ion-bracket', 'm.1'] },
      ],
    },
    {
      chapter: 'Chlorine gains an electron',
      layout: 'center',
      main: [chlorine, { kind: 'math', id: 'm', size: 'md', lines: ['17\\text{ protons}, \\ 18\\text{ electrons} \\;\\Rightarrow\\; \\text{charge } 1{-}', '\\text{the chloride ion: } \\ce{Cl-}'] }],
      lines: [
        { say: 'A chlorine atom has seventeen protons, and seventeen electrons arranged two, eight, seven.', show: ['cl.atom-nucleus', 'cl.atom-shell-1', 'cl.atom-shell-2', 'cl.atom-shell-3', 'cl.atom-name'] },
        { say: 'It could lose seven electrons, or gain one. It takes the shorter route, and gains one.', show: 'cl.move', focus: ['cl.atom-shell-3', 'cl.move'] },
        { say: 'Now it has two, eight, eight, like argon.', show: ['cl.ion-nucleus', 'cl.ion-shell-1', 'cl.ion-shell-2', 'cl.ion-shell-3', 'cl.ion-name'], focus: 'cl.ion-shell-3' },
        { say: 'Seventeen protons and eighteen electrons give one more negative charge than positive: a charge of one minus.', show: 'm.0', focus: 'm.0' },
        { say: 'This is the chloride ion, C L minus. Notice its name, chloride. Part three explains why.', caption: 'This is the chloride ion, Cl⁻. Notice its name, chloride. Part three explains why.', show: ['cl.ion-bracket', 'm.1'], focus: ['cl.ion-bracket', 'm.1'] },
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
