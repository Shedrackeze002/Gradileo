import type { Explainer } from '@/video/script.ts';
import { particles } from '@/video/chem.ts';
import { figure } from '@/video/solids.ts';
import { tag } from './lib/c10-1-figures.ts';

// Helium atoms, oxygen molecules and the molecules of a compound, as gases.
const kinds = figure(
  'pm',
  [
    particles({ name: 'he', state: 'gas', at: [0, 0], size: 5, seed: 2, kinds: [{ id: 'p', tone: 'theta', count: 7 }] }),
    tag('he-l', [2.5, -0.2], '\\text{element: helium}', { place: 'below', group: 'he-p' }),
    particles({ name: 'ox', state: 'gas', at: [7, 0], size: 5, seed: 3, kinds: [{ id: 'p', tone: 'bad', count: 5, atoms: 2 }] }),
    tag('ox-l', [9.5, -0.2], '\\text{element: oxygen}', { place: 'below', group: 'ox-p' }),
    particles({ name: 'cp', state: 'gas', at: [14, 0], size: 5, seed: 4, kinds: [{ id: 'p', tone: 'adj', second: 'bad', count: 5, atoms: 2 }] }),
    tag('cp-l', [16.5, -0.2], '\\text{compound}', { place: 'below', group: 'cp-p' }),
  ],
  360,
);

const video: Explainer = {
  id: 'c10-1-2',
  lessonId: 'c10-1-2',
  title: 'Pure Substances and Mixtures, Part 1: Elements and Compounds',
  thumbnailTitle: 'Elements and Compounds',
  thumbnail: 'pm',
  summary:
    'A pure substance is one substance only. An element contains one kind of atom, sometimes joined in molecules such as O₂; a compound contains two or more elements chemically joined in a fixed ratio, such as H₂O, and has properties of its own. A formula with one element symbol is an element; with two or more different symbols, a compound.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Matter and the Particle Model · Part 1', title: 'Elements and Compounds', subtitle: 'What a chemist means by pure' }],
      lines: [
        { say: 'A bottle of spring water may say pure on its label. To a chemist, it is far from pure: it contains dissolved minerals, a little dissolved air, and traces of many other substances.', show: 'title' },
        { say: 'In this lesson, you will sort all matter into elements, compounds and mixtures. This part covers elements and compounds. Later parts cover mixtures and solutions.' },
      ],
    },
    {
      chapter: 'Pure substances',
      layout: 'center',
      main: [
        { kind: 'callout', id: 'def', tone: 'definition', title: 'Pure substance', md: 'A **pure substance** contains only one substance. Every sample has the same composition and the same properties, and it melts and boils at **fixed** temperatures.' },
        { kind: 'text', id: 'two', size: 'lg', md: 'Elements and compounds are pure substances.' },
      ],
      lines: [
        { say: 'In chemistry, pure means one substance and nothing else. Every sample of a pure substance has the same composition and properties, and it melts and boils at fixed temperatures.', show: 'def' },
        { say: 'There are two kinds of pure substance: elements and compounds.', show: 'two' },
      ],
    },
    {
      chapter: 'Elements and compounds',
      layout: 'center',
      main: [kinds],
      lines: [
        { say: 'An element is a pure substance made of only one kind of atom. In helium, every particle is a helium atom.', show: ['pm.he-box', 'pm.he-p'], focus: 'pm.he-p' },
        { say: 'The atoms of some elements are joined in small groups called molecules. Oxygen gas is made of O two molecules: two oxygen atoms joined together. Oxygen is still an element, because every atom is the same kind.', caption: 'The atoms of some elements are joined in small groups called molecules. Oxygen gas is made of O₂ molecules: two oxygen atoms joined together. Oxygen is still an element, because every atom is the same kind.', show: ['pm.ox-box', 'pm.ox-p'], focus: 'pm.ox-p' },
        { say: 'A compound is a pure substance made of two or more elements, chemically joined in a fixed ratio. Here, every molecule has two different kinds of atom, joined together.', show: ['pm.cp-box', 'pm.cp-p'], focus: 'pm.cp-p' },
      ],
    },
    {
      chapter: 'Breaking them down',
      layout: 'center',
      main: [
        { kind: 'callout', id: 'el', tone: 'definition', title: 'Element', md: 'Only one kind of atom. It **cannot be broken down** into simpler substances by any chemical reaction. Each has a symbol: $\\ce{C}$ carbon, $\\ce{Fe}$ iron, $\\ce{Na}$ sodium.' },
        { kind: 'callout', id: 'cp', tone: 'definition', title: 'Compound', md: 'Two or more elements **chemically joined** in a **fixed ratio**: water, $\\ce{H2O}$, always has two hydrogen atoms for each oxygen atom. Only a chemical reaction can break it down.' },
      ],
      lines: [
        { say: 'An element cannot be broken down into simpler substances by any chemical reaction. There are more than a hundred elements, each with its own symbol, such as C for carbon, and F e for iron.', caption: 'An element cannot be broken down into simpler substances by any chemical reaction. There are more than a hundred elements, each with its own symbol, such as C for carbon, and Fe for iron.', show: 'el' },
        { say: 'Water, H two O, is a compound. It always has two hydrogen atoms for every oxygen atom, and it can be broken down only by a chemical reaction.', caption: 'Water, H₂O, is a compound. It always has two hydrogen atoms for every oxygen atom, and it can be broken down only by a chemical reaction.', show: 'cp' },
        { say: 'A compound has its own properties, usually very different from its elements. Sodium is a metal that reacts violently with water, and chlorine is a poisonous gas. Joined, they make sodium chloride: table salt.' },
      ],
    },
    {
      chapter: 'Reading a formula',
      layout: 'center',
      main: [
        { kind: 'bullets', id: 'rule', items: ['One element symbol, with or without a number ($\\ce{Fe}$, $\\ce{O2}$, $\\ce{S8}$): an **element**.', 'Two or more different symbols ($\\ce{H2O}$, $\\ce{CO2}$, $\\ce{CaCO3}$): a **compound**.'] },
        {
          kind: 'table',
          id: 't',
          head: ['Substance', 'Contains', 'Kind'],
          rows: [
            ['chlorine, $\\ce{Cl2}$', 'only chlorine atoms, in pairs', 'element'],
            ['methane, $\\ce{CH4}$', 'carbon and hydrogen, joined', 'compound'],
            ['helium, $\\ce{He}$', 'only helium atoms', 'element'],
            ['carbon dioxide, $\\ce{CO2}$', 'carbon and oxygen, joined', 'compound'],
          ],
        },
      ],
      lines: [
        { say: 'A formula tells you which kind of substance you have. One element symbol, with or without a number after it, means an element, such as iron, oxygen or sulfur.', show: 'rule.0' },
        { say: 'Two or more different symbols mean a compound, such as water, carbon dioxide or calcium carbonate.', show: 'rule.1' },
        { say: 'So chlorine, C L two, is an element: it contains only chlorine atoms, in pairs. Methane, C H four, is a compound of carbon and hydrogen.', caption: 'So chlorine, Cl₂, is an element: it contains only chlorine atoms, in pairs. Methane, CH₄, is a compound of carbon and hydrogen.', show: ['t.0', 't.1'] },
        { say: 'Helium is an element, and carbon dioxide is a compound of carbon and oxygen.', show: ['t.2', 't.3'] },
      ],
    },
    {
      chapter: 'Molecules and compounds',
      layout: 'center',
      main: [{ kind: 'callout', id: 'oops', tone: 'mistake', title: 'A molecule is not always a compound', md: '$\\ce{O2}$, $\\ce{N2}$ and $\\ce{Cl2}$ are molecules, but they are **elements**: each contains only one kind of atom. A compound needs at least two different elements.' }],
      lines: [
        { say: 'Watch out: a molecule is not always a compound. Oxygen, nitrogen and chlorine are made of molecules, but each contains only one kind of atom, so they are elements. A compound needs at least two different elements.', show: 'oops' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q',
          prompt: 'Which of these substances is a **compound**?',
          choices: ['nitrogen, $\\ce{N2}$', 'helium, $\\ce{He}$', 'ammonia, $\\ce{NH3}$', 'sulfur, $\\ce{S8}$'],
          answer: 2,
          working: '$\\ce{NH3}$ has two different symbols: nitrogen and hydrogen chemically joined. $\\ce{N2}$, $\\ce{He}$ and $\\ce{S8}$ each contain only one kind of atom, so they are elements.',
        },
      ],
      lines: [
        { say: 'Your turn. Which of these substances is a compound? Pause the video and try it.', show: 'q', wait: 6 },
        { say: 'The answer is C, ammonia. Its formula has two different symbols: nitrogen and hydrogen, chemically joined. Choice A, nitrogen, is made of molecules, but every atom in them is nitrogen, so it is an element.', show: 'q.answer' },
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
            'A **pure substance** is one substance only, with fixed melting and boiling points.',
            'An **element** contains one kind of atom: $\\ce{Fe}$, $\\ce{O2}$.',
            'A **compound** has two or more elements chemically joined in a fixed ratio: $\\ce{H2O}$, $\\ce{NaCl}$.',
          ],
        },
      ],
      lines: [
        { say: 'Let’s sum up. A pure substance is one substance only, with fixed melting and boiling points.', show: 'sum.0' },
        { say: 'An element contains only one kind of atom, alone or joined in molecules.', show: 'sum.1' },
        { say: 'A compound has two or more elements chemically joined in a fixed ratio. In part two, you will meet mixtures, where substances are not joined at all. See you there!', show: 'sum.2' },
      ],
    },
  ],
};

export default video;
