import type { Explainer } from '@/video/script.ts';
import { figure } from '@/video/solids.ts';
import { arrow, curvedArrow, lattice, shellAtom, tag } from './lib/c10-3-figures.ts';

// Seven dots round a chlorine atom's outer shell, the single one at `single` degrees; with
// `gained`, a cross beside it.
const chlorine = (single: number, gained = false): [number, string][] =>
  [0, 90, 180, 270].map((a) => [a, a === single ? (gained ? 'ox' : 'o') : 'oo']);

// Sodium gives its one outer electron (a cross) to chlorine (seven dots): a sodium ion and a
// chloride ion.
const salt = figure(
  'dc',
  [
    shellAtom({ name: 'na', at: [0, 0], symbol: 'Na', spots: [[0, 'x']] }),
    shellAtom({ name: 'cl', at: [3.9, 0], symbol: 'Cl', spots: chlorine(180) }),
    curvedArrow('move', [1.45, 0.15], [2.45, 0.2], 0.9),
    arrow('react', [6.1, 0], [7.7, 0]),
    shellAtom({ name: 'nai', at: [9.2, 0], symbol: 'Na', r: 0.8, shell: false, charge: '+' }),
    shellAtom({ name: 'cli', at: [12.9, 0], symbol: 'Cl', spots: chlorine(180, true), charge: '-' }),
    tag('na-name', [0, -2.1], '\\text{2,8,1}', { tone: 'muted' }),
    tag('cl-name', [3.9, -2.1], '\\text{2,8,7}', { tone: 'muted' }),
    tag('nai-name', [9.2, -2.1], '\\text{2,8}', { tone: 'muted' }),
    tag('cli-name', [12.9, -2.1], '\\text{2,8,8}', { tone: 'muted' }),
  ],
  400,
);

// A slice of the sodium chloride lattice, with one sodium ion and its four neighbours ringed.
const crystal = figure('lat', [
  lattice({ cols: 5, rows: 5, ring: [2, 2] }),
  tag('key-na', [0.6, -1.25], '\\ce{Na+}', { tone: 'opp' }),
  tag('key-cl', [4.2, -1.25], '\\ce{Cl-}', { tone: 'adj' }),
]);

// Magnesium gives one electron to each of two chlorine atoms: Mg²⁺ and two Cl⁻.
const mgcl2 = figure(
  'mg',
  [
    shellAtom({ name: 'cla', at: [-4, 3], symbol: 'Cl', spots: chlorine(0) }),
    shellAtom({ name: 'mg', at: [0, 3], symbol: 'Mg', spots: [[180, 'x'], [0, 'x']] }),
    shellAtom({ name: 'clb', at: [4, 3], symbol: 'Cl', spots: chlorine(180) }),
    curvedArrow('to-a', [-1.45, 3.15], [-2.45, 3.2], -0.9),
    curvedArrow('to-b', [1.45, 3.15], [2.45, 3.2], 0.9),
    arrow('react', [0, 1.2], [0, 0]),
    shellAtom({ name: 'cli', at: [-4.6, -2], symbol: 'Cl', spots: chlorine(0, true), charge: '-' }),
    shellAtom({ name: 'mgi', at: [0, -2], symbol: 'Mg', r: 0.8, shell: false, charge: '2{+}' }),
    shellAtom({ name: 'clj', at: [4.3, -2], symbol: 'Cl', spots: chlorine(180, true), charge: '-' }),
  ],
  560,
);

const video: Explainer = {
  id: 'c10-3-2',
  lessonId: 'c10-3-2',
  title: 'Ionic Compounds: Names and Formulas, Part 1: Electron Transfer and the Ionic Bond',
  thumbnailTitle: 'The Ionic Bond',
  thumbnail: 'dc',
  summary:
    'When a metal reacts with a non-metal, the metal atoms transfer electrons to the non-metal atoms, as a dot-and-cross diagram shows. The ions attract each other (an ionic bond) and pack into a lattice, so the formula NaCl gives the ratio of the ions, one formula unit. A magnesium atom gives one electron to each of two chlorine atoms, so magnesium chloride is MgCl2.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Bonding, Names and Formulas · Part 1', title: 'Electron Transfer and the Ionic Bond', subtitle: 'Dots, crosses and a crystal lattice' }],
      lines: [
        { say: 'Table salt, classroom chalk and the lime used to make cement are all built from ions. When a metal reacts with a non-metal, the electrons the metal atoms lose are the very ones the non-metal atoms gain.', show: 'title' },
        { say: 'This part shows that transfer, and how the ions hold together. The later parts write the formulas and names of ionic compounds.' },
      ],
    },
    {
      chapter: 'A dot-and-cross diagram',
      layout: 'center',
      main: [salt],
      lines: [
        { say: 'A dot-and-cross diagram shows where electrons go, with one atom’s electrons as crosses and the other’s as dots. The outer shell of sodium holds one cross, and the outer shell of chlorine holds seven dots.', show: ['dc.na-atom', 'dc.na-name', 'dc.cl-atom', 'dc.cl-name'] },
        { say: 'An arrow carries the cross from the outer shell of sodium into the outer shell of chlorine.', show: 'dc.move', focus: ['dc.move', 'dc.na-x0'] },
        { say: 'Sodium has lost its outer shell and is left as two, eight. We draw it in square brackets, with a plus at the top right.', show: ['dc.react', 'dc.nai-atom', 'dc.nai-bracket', 'dc.nai-name'], focus: 'dc.nai-bracket' },
        { say: 'The outer shell of chlorine now holds seven dots and one cross: eight electrons. It goes in square brackets, with a minus.', show: ['dc.cli-atom', 'dc.cli-bracket', 'dc.cli-name'], focus: ['dc.cli-x0', 'dc.cli-bracket'] },
      ],
    },
    {
      chapter: 'The ionic bond',
      layout: 'split',
      leftWidth: 500,
      left: [crystal],
      right: [
        { kind: 'callout', id: 'bond', tone: 'definition', title: 'Ionic bond', md: 'The strong attraction between oppositely charged ions. It forms when a metal atom transfers electrons to a non-metal atom.' },
        { kind: 'callout', id: 'unit', tone: 'definition', title: 'Formula unit', md: 'The smallest group of ions that shows the ratio in the formula: one $\\ce{Na+}$ and one $\\ce{Cl-}$ in $\\ce{NaCl}$.' },
      ],
      lines: [
        { say: 'The two ions attract each other, because opposite charges attract. This attraction is called an ionic bond. It forms when a metal atom transfers electrons to a non-metal atom.', show: 'bond' },
        { say: 'An ionic compound is made of positive and negative ions, held together by ionic bonds. The ions pack into a regular three-dimensional pattern called a lattice.', show: ['lat.cations', 'lat.anions', 'lat.key-na', 'lat.key-cl'] },
        { say: 'In this flat slice, each sodium ion touches four chloride ions. In the full crystal, with one more above and one below, each ion is surrounded by six of the other kind.', show: 'lat.ring' },
        { say: 'A crystal of salt is one huge lattice, so the formula N A C L is not a molecule. It gives the ratio of the ions: one sodium ion for every chloride ion.', caption: 'A crystal of salt is one huge lattice, so the formula NaCl is not a molecule. It gives the ratio of the ions: one sodium ion for every chloride ion.' },
        { say: 'The smallest group of ions that shows this ratio is called a formula unit.', show: 'unit' },
      ],
    },
    {
      chapter: 'Magnesium chloride',
      layout: 'split',
      leftWidth: 680,
      left: [mgcl2],
      right: [{ kind: 'math', id: 'm', size: 'md', align: 'left', lines: ['\\ce{Mg}\\text{: 2,8,2, loses 2}', '\\ce{Cl}\\text{: 2,8,7, gains 1}', '\\ce{Mg^2+} + 2\\,\\ce{Cl-}', '\\ce{MgCl2}'] }],
      lines: [
        { say: 'Now magnesium and chlorine. A magnesium atom, two, eight, two, must lose two outer electrons to reach two, eight.', show: ['mg.mg-atom', 'm.0'], focus: 'm.0' },
        { say: 'A chlorine atom, two, eight, seven, needs only one more electron. So one chlorine atom can take only one of them.', show: ['mg.cla-atom', 'mg.clb-atom', 'm.1'], focus: 'm.1' },
        { say: 'In the diagram, one cross goes to each of two chlorine atoms.', show: ['mg.to-a', 'mg.to-b'], focus: ['mg.to-a', 'mg.to-b'] },
        { say: 'The products are one magnesium ion, with a charge of two plus, and two chloride ions.', show: ['mg.react', 'mg.mgi-atom', 'mg.mgi-bracket', 'mg.cli-atom', 'mg.cli-bracket', 'mg.clj-atom', 'mg.clj-bracket', 'm.2'], focus: 'm.2' },
        { say: 'So the formula of magnesium chloride is M G C L two. One formula unit is one magnesium ion and two chloride ions.', caption: 'So the formula of magnesium chloride is MgCl₂. One formula unit is one magnesium ion and two chloride ions.', show: 'm.3', focus: 'm.3' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q',
          prompt: 'Magnesium (2,8,2) reacts with oxygen (2,6). What happens to the electrons?',
          choices: [
            'Each oxygen atom gives 2 electrons to a magnesium atom.',
            'Each magnesium atom gives 1 electron to each of two oxygen atoms.',
            'Magnesium and oxygen atoms share their electrons.',
            'Each magnesium atom gives 2 electrons to one oxygen atom.',
          ],
          answer: 3,
          working: 'Magnesium must lose $2$ electrons to reach 2,8, and oxygen needs exactly $2$ to reach 2,8, so one oxygen atom takes both: $\\ce{Mg^2+}$ and $\\ce{O^2-}$.',
        },
      ],
      lines: [
        { say: 'Your turn. Magnesium, two, eight, two, reacts with oxygen, two, six. What happens to the electrons? Pause the video and try it.', show: 'q', wait: 6 },
        { say: 'The answer is D. A magnesium atom must lose two electrons, and an oxygen atom needs exactly two more, so one oxygen atom takes both. Choice B is what happens with chlorine, which needs only one.', show: 'q.answer' },
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
            'A dot-and-cross diagram shows where each electron goes: one atom’s as dots, the other’s as crosses.',
            'An **ionic bond** is the attraction between oppositely charged ions, formed when a metal transfers electrons to a non-metal.',
            'An ionic compound is a **lattice** of ions. Its formula gives the ratio of the ions: one **formula unit**.',
            'Magnesium gives one electron to each of two chlorine atoms: $\\ce{MgCl2}$.',
          ],
        },
      ],
      lines: [
        { say: 'Let’s sum up. A dot-and-cross diagram shows where each electron goes.', show: 'sum.0' },
        { say: 'An ionic bond is the attraction between oppositely charged ions, formed when a metal transfers electrons to a non-metal.', show: 'sum.1' },
        { say: 'An ionic compound is a lattice of ions, and its formula gives the ratio of the ions.', show: 'sum.2' },
        { say: 'And magnesium gives one electron to each of two chlorine atoms. In part two, you will write formulas so the charges cancel. See you there!', show: 'sum.3' },
      ],
    },
  ],
};

export default video;
