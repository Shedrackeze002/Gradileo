import type { Explainer } from '@/video/script.ts';
import { lewis, periodicTable } from '@/video/chem.ts';
import { figure } from '@/video/solids.ts';
import { arrow, tag } from './lib/c20-1a-figures.ts';

// Two hydrogen atoms, each with one valence electron, share them as a pair: a covalent bond.
const hydrogen = figure(
  'h',
  [
    lewis({ name: 'h1', atoms: [{ id: 'a', symbol: 'H', at: [0, 0], dots: [0, 1, 0, 0] }] }),
    lewis({ name: 'h2', atoms: [{ id: 'a', symbol: 'H', at: [1.9, 0], dots: [0, 0, 0, 1] }] }),
    arrow('join', [3.2, 0], [4.6, 0]),
    lewis({ name: 'hh', atoms: [{ id: 'a', symbol: 'H', at: [5.9, 0] }, { id: 'b', symbol: 'H', at: [7.3, 0] }], bonds: [{ from: 'a', to: 'b', dots: true }] }),
    tag('atoms', [0.95, -1.1], '\\text{two hydrogen atoms}', { tone: 'muted' }),
    tag('molecule', [6.6, -1.1], '\\text{a hydrogen molecule}', { tone: 'good' }),
  ],
  360,
);

// A water molecule: two hydrogen atoms each share a pair of electrons with one oxygen atom.
const water = figure(
  'w',
  [
    lewis({
      atoms: [
        { id: 'h1', symbol: 'H', at: [-1.6, 0] },
        { id: 'o', symbol: 'O', at: [0, 0], dots: [2, 0, 2, 0] },
        { id: 'h2', symbol: 'H', at: [1.6, 0] },
      ],
      bonds: [
        { from: 'h1', to: 'o', dots: true },
        { from: 'o', to: 'h2', dots: true },
      ],
    }),
    tag('name', [0, -1.3], '\\text{water, }\\ce{H2O}', { tone: 'muted' }),
  ],
  460,
);

// The seven diatomic elements: hydrogen, then the "7" from element 7 (N, O, F, then Cl, Br, I).
const diatomic = figure(
  'pt',
  [
    periodicTable({
      upTo: 54,
      numbers: true,
      highlights: [
        { id: 'h', cells: ['H'], tone: 'good' },
        { id: 'seven', cells: ['N', 'O', 'F', 'Cl', 'Br', 'I'], tone: 'good' },
        { id: 'ps', cells: ['P', 'S'], tone: 'theta' },
      ],
    }),
  ],
  520,
);

const video: Explainer = {
  id: 'c20-1-3',
  lessonId: 'c20-1-3',
  title: 'Molecular Compounds and Acids, Part 1: Covalent Bonds and Molecules',
  thumbnailTitle: 'Covalent Bonds and Molecules',
  thumbnail: 'pt',
  summary:
    'Non-metal atoms cannot pull electrons off each other, so they share them: a covalent bond is a pair of electrons shared between two atoms, and a molecule is a group of atoms joined by covalent bonds, such as H2O. Seven elements exist as diatomic molecules (H2, N2, O2, F2, Cl2, Br2 and I2), found as hydrogen plus a "7" on the periodic table; phosphorus forms P4 and sulfur S8.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'The Diversity of Matter and Chemical Bonding · Part 1', title: 'Covalent Bonds and Molecules', subtitle: 'Atoms that share electrons' }],
      lines: [
        { say: 'The water you drink, the carbon dioxide you breathe out, and the sugar in your food contain no metal at all. All their atoms are non-metals, and non-metal atoms do not hand electrons over. They share them.', show: 'title' },
        { say: 'This lesson names these molecular compounds and acids. This first part shows how sharing makes molecules. The later parts name molecular compounds, write their formulas, and name acids.' },
      ],
    },
    {
      chapter: 'Sharing electrons',
      layout: 'center',
      main: [hydrogen, { kind: 'callout', id: 'def', tone: 'definition', title: 'Covalent bond', md: 'A pair of electrons **shared** between two atoms. Non-metal atoms bond to each other this way.' }],
      lines: [
        { say: 'Non-metal atoms all attract electrons strongly, so neither atom in a pair can pull an electron right off the other.' },
        { say: 'Instead, each shares some of its valence electrons. Two hydrogen atoms each bring one electron.', show: ['h.h1-a', 'h.h1-a-dots', 'h.h2-a', 'h.h2-a-dots', 'h.atoms'] },
        { say: 'The two electrons become a shared pair between the atoms, and the shared pair holds the two atoms together.', show: ['h.join', 'h.hh-a', 'h.hh-b', 'h.hh-bond-a-b', 'h.molecule'], focus: 'h.hh-bond-a-b' },
        { say: 'This is a covalent bond: a pair of electrons shared between two atoms. Non-metal atoms bond to each other this way.', show: 'def' },
      ],
    },
    {
      chapter: 'Molecules',
      layout: 'split',
      leftWidth: 520,
      left: [water],
      right: [
        { kind: 'callout', id: 'def', tone: 'definition', title: 'Molecule', md: 'A group of atoms joined by covalent bonds: the smallest particle of a molecular substance.' },
        { kind: 'table', id: 't', head: ['', 'Ionic', 'Molecular'], rows: [['Example', '$\\ce{NaCl}$', '$\\ce{CO2}$'], ['Elements', 'metal + non-metal', 'non-metals only'], ['Particles', 'a lattice of ions', 'separate molecules']] },
      ],
      lines: [
        { say: 'A group of atoms joined by covalent bonds is called a molecule. It is the smallest particle of a molecular substance.', show: 'def' },
        { say: 'A molecule of water is two hydrogen atoms, each sharing a pair of electrons with one oxygen atom.', show: ['w.h1', 'w.o', 'w.h2', 'w.o-dots', 'w.bond-h1-o', 'w.bond-o-h2', 'w.name'] },
        { say: 'So an ionic compound, such as sodium chloride, is made from a metal and a non-metal, and it is a lattice of ions.', show: 't', focus: ['t.0', 't.1', 't.2'] },
        { say: 'A molecular compound, such as carbon dioxide, is made of non-metals only, and its particles are separate molecules.' },
      ],
    },
    {
      chapter: 'Elements made of molecules',
      layout: 'split',
      leftWidth: 780,
      left: [diatomic],
      right: [{ kind: 'math', id: 'm', size: 'lg', align: 'left', lines: ['\\ce{H2}', '\\ce{N2},\\ \\ce{O2},\\ \\ce{F2}', '\\ce{Cl2},\\ \\ce{Br2},\\ \\ce{I2}', '\\ce{P4},\\ \\ce{S8}'] }],
      lines: [
        { say: 'Some elements are made of molecules too. Seven exist as pairs of atoms, called diatomic molecules.', show: 'pt.table' },
        { say: 'To find them, start with hydrogen.', show: ['pt.h', 'm.0'], focus: ['pt.h', 'm.0'] },
        { say: 'Then find the six elements that make a seven on the periodic table, starting at element seven: nitrogen, oxygen and fluorine across the top, then chlorine, bromine and iodine down group seventeen.', show: ['pt.seven', 'm.1', 'm.2'], focus: ['pt.seven', 'm.1', 'm.2'] },
        { say: 'Phosphorus also forms molecules of four atoms, and sulfur forms rings of eight atoms.', show: ['pt.ps', 'm.3'], focus: ['pt.ps', 'm.3'] },
        { say: 'When you write one of these elements on its own, write the molecule: oxygen gas is O two, not O.', caption: 'When you write one of these elements on its own, write the molecule: oxygen gas is O₂, not O.', focus: 'm' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q',
          prompt: 'Which formula shows the element bromine, as it exists on its own?',
          choices: ['$\\ce{Br2}$', '$\\ce{Br}$', '$\\ce{Br-}$', '$\\ce{Br4}$'],
          answer: 0,
          working: 'Bromine is one of the seven diatomic elements, so the element is made of $\\ce{Br2}$ molecules.',
        },
      ],
      lines: [
        { say: 'Your turn. Which formula shows the element bromine, as it exists on its own? Pause the video and try it.', show: 'q', wait: 6 },
        { say: 'The answer is A. Bromine is one of the seven diatomic elements, down group seventeen in the seven, so the element is made of molecules of two atoms. Choice C is the bromide ion, which forms only in a compound.', show: 'q.answer' },
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
            'A **covalent bond** is a pair of electrons shared between two atoms.',
            'A **molecule** is a group of atoms joined by covalent bonds.',
            'Molecular compounds: non-metals only, made of separate molecules.',
            'Diatomic elements: $\\ce{H2}$, $\\ce{N2}$, $\\ce{O2}$, $\\ce{F2}$, $\\ce{Cl2}$, $\\ce{Br2}$, $\\ce{I2}$; also $\\ce{P4}$ and $\\ce{S8}$.',
          ],
        },
      ],
      lines: [
        { say: 'Let’s sum up. A covalent bond is a pair of electrons shared between two atoms.', show: 'sum.0' },
        { say: 'A molecule is a group of atoms joined by covalent bonds.', show: 'sum.1' },
        { say: 'Molecular compounds are made of non-metals only, and their particles are separate molecules.', show: 'sum.2' },
        { say: 'And seven elements are diatomic: hydrogen, then the seven on the periodic table. In part two, you will name molecular compounds with prefixes. See you there!', show: 'sum.3' },
      ],
    },
  ],
};

export default video;
