import type { Explainer } from '@/video/script.ts';
import { lewis } from '@/video/chem.ts';
import { figure } from '@/video/solids.ts';
import { chainBonds, grouped, ringAt, rowStructure, skeleton, step, tag, zigzag } from './lib/c30-3a-figures.ts';

// Methane and ethanol (organic: carbon bonded to hydrogen) beside carbon dioxide (inorganic).
const three = figure(
  'm',
  [
    grouped(rowStructure({ name: 'ch4', atoms: [{ symbol: 'C', up: 'H', down: 'H' }], left: 'H', right: 'H' }), 'ch4'),
    tag('ch4-name', [0, -2.75], '\\text{methane: organic}', { tone: 'good' }),
    grouped(
      rowStructure({ name: 'eth', at: [4.8, 0], atoms: [{ symbol: 'C', up: 'H', down: 'H' }, { symbol: 'C', up: 'H', down: 'H' }, { symbol: 'O', tone: 'bad' }, { symbol: 'H' }], left: 'H' }),
      'eth',
    ),
    tag('eth-name', [7.2, -2.75], '\\text{ethanol: organic}', { tone: 'good' }),
    grouped(rowStructure({ name: 'co2', at: [12.4, 0], atoms: [{ symbol: 'O', tone: 'bad' }, { symbol: 'C' }, { symbol: 'O', tone: 'bad' }], bonds: [2, 2] }), 'co2'),
    tag('co2-name', [14, -2.75], '\\text{carbon dioxide: inorganic}', { tone: 'bad' }),
  ],
  360,
);

// Carbon's three talents: four bonds (methane), chains, branches and rings, and single, double
// and triple bonds between two carbons.
const chainC = zigzag('z', 5, { at: [-3.5, 2.4] });
const why = figure('w', [
  grouped(rowStructure({ name: 'me', at: [0, 6.2], atoms: [{ symbol: 'C', up: 'H', down: 'H' }], left: 'H', right: 'H' }), 'four'),
  skeleton({
    name: 'ch',
    carbons: { ...chainC, b1: step(chainC.z3, -90), ...ringAt('r', 6, [2.6, 2.9]) },
    bonds: [...chainBonds('z', 5, { group: 'chain' }), { from: 'z3', to: 'b1', group: 'chain' }, ...chainBonds('r', 6, { group: 'ring' }), { from: 'r6', to: 'r1', group: 'ring' }],
  }),
  lewis({
    name: 'cc',
    atoms: [
      { id: 's1', symbol: 'C', at: [-3.7, 0] },
      { id: 's2', symbol: 'C', at: [-2.1, 0] },
      { id: 'd1', symbol: 'C', at: [-0.8, 0] },
      { id: 'd2', symbol: 'C', at: [0.8, 0] },
      { id: 't1', symbol: 'C', at: [2.1, 0] },
      { id: 't2', symbol: 'C', at: [3.7, 0] },
    ],
    bonds: [
      { from: 's1', to: 's2' },
      { from: 'd1', to: 'd2', order: 2 },
      { from: 't1', to: 't2', order: 3 },
    ],
  }),
  tag('single', [-2.9, -0.95], '\\text{single}', { tone: 'muted', group: 'bonds' }),
  tag('double', [0, -0.95], '\\text{double}', { tone: 'muted', group: 'bonds' }),
  tag('triple', [2.9, -0.95], '\\text{triple}', { tone: 'muted', group: 'bonds' }),
]);
const CC = ['w.cc-s1', 'w.cc-s2', 'w.cc-d1', 'w.cc-d2', 'w.cc-t1', 'w.cc-t2', 'w.cc-bond-s1-s2', 'w.cc-bond-d1-d2', 'w.cc-bond-t1-t2', 'w.bonds'];

const video: Explainer = {
  id: 'c30-3-1',
  lessonId: 'c30-3-1',
  title: 'Organic Compounds and How They Are Drawn, Part 1: What Makes a Compound Organic',
  thumbnailTitle: 'What Makes a Compound Organic',
  thumbnail: 'm',
  summary:
    'An organic compound is a compound of carbon in which carbon is nearly always bonded to hydrogen. A few carbon compounds are inorganic: the oxides of carbon, carbonates, hydrogen carbonates, cyanides and carbides. Carbon forms so many compounds because it makes four bonds, bonds to itself in chains, branches and rings, and forms single, double and triple bonds.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Chemical Changes of Organic Compounds · Part 1', title: 'What Makes a Compound Organic', subtitle: 'Why carbon builds so many compounds' }],
      lines: [
        { say: 'Read the ingredients on a bottle of shampoo, and almost every one is a compound of carbon. So are the gas in a camping stove and the sugar in fruit.', show: 'title' },
        { say: 'This part shows what makes a compound organic. Part two sorts hydrocarbons into families, part three draws molecules four ways, and part four uses general formulas.' },
      ],
    },
    {
      chapter: 'Organic compounds',
      layout: 'center',
      main: [
        three,
        { kind: 'callout', id: 'def', tone: 'definition', title: 'Organic compound', md: 'A compound of carbon in which carbon atoms are nearly always bonded to **hydrogen** atoms, and often to oxygen, nitrogen or a halogen as well.' },
      ],
      lines: [
        { say: 'Chemists know of many millions of carbon compounds. An organic compound is a compound of carbon in which the carbon atoms are nearly always bonded to hydrogen atoms.', show: 'def' },
        { say: 'Methane, the main gas in natural gas, is the simplest: one carbon atom bonded to four hydrogen atoms.', show: ['m.ch4', 'm.ch4-name'] },
        { say: 'Many also contain oxygen, nitrogen or a halogen, like the oxygen atom in ethanol.', show: ['m.eth', 'm.eth-name'] },
        { say: 'Carbon dioxide contains carbon too, but it is one of a few simple carbon compounds classed as inorganic.', show: ['m.co2', 'm.co2-name'], focus: 'm.co2' },
      ],
    },
    {
      chapter: 'The inorganic exceptions',
      layout: 'center',
      main: [
        {
          kind: 'table',
          id: 't',
          head: ['Inorganic carbon compounds', 'Examples'],
          rows: [
            ['oxides of carbon', '$\\ce{CO}$, $\\ce{CO2}$'],
            ['carbonates', '$\\ce{CaCO3}$, $\\ce{Na2CO3}$'],
            ['hydrogen carbonates', '$\\ce{NaHCO3}$'],
            ['cyanides', '$\\ce{KCN}$'],
            ['carbides', '$\\ce{CaC2}$'],
          ],
        },
        { kind: 'callout', id: 'note', tone: 'tip', title: 'Made in a laboratory', md: 'In 1828 a chemist made urea, $\\ce{CO(NH2)2}$, by heating ammonium cyanate, an inorganic salt. Today *organic* simply means "a compound of carbon".' },
      ],
      lines: [
        { say: 'Here are all the exceptions. The oxides of carbon, carbon monoxide and carbon dioxide, are inorganic.', show: 't.0', focus: 't.0' },
        { say: 'So are carbonates, such as calcium carbonate, and hydrogen carbonates, such as sodium hydrogen carbonate.', show: ['t.1', 't.2'], focus: ['t.1', 't.2'] },
        { say: 'Cyanides and carbides complete the list.', show: ['t.3', 't.4'], focus: ['t.3', 't.4'] },
        { say: 'Why the word organic? Chemists once thought these compounds could only be made by living things. But in eighteen twenty-eight, a chemist made urea from an inorganic salt. Today, organic simply means a compound of carbon.', show: 'note', focus: 't' },
      ],
    },
    {
      chapter: 'Why carbon?',
      layout: 'split',
      left: [why],
      right: [
        {
          kind: 'bullets',
          id: 'b',
          items: ['Four valence electrons: **four covalent bonds**.', 'Carbon bonds to **itself**: chains, branches and rings.', 'Two carbons can share one, two or three pairs: **single, double and triple** bonds.'],
        },
      ],
      lines: [
        { say: 'Why does carbon form so many compounds? Three facts about the carbon atom explain it.' },
        { say: 'First, carbon has four valence electrons, so it forms four covalent bonds, as in methane.', show: ['b.0', 'w.four'], focus: 'w.four' },
        { say: 'Second, carbon atoms bond strongly to each other, in chains of any length, branched chains and rings. Here, each corner is a carbon atom.', show: ['b.1', 'w.ch-chain', 'w.ch-ring'], focus: ['w.ch-chain', 'w.ch-ring'] },
        { say: 'Third, two carbon atoms can share one, two or three pairs of electrons, making single, double and triple bonds.', show: ['b.2', ...CC], focus: ['w.cc-bond-s1-s2', 'w.cc-bond-d1-d2', 'w.cc-bond-t1-t2'] },
      ],
    },
    {
      chapter: 'Organic or inorganic?',
      layout: 'center',
      main: [
        { kind: 'text', id: 'q', size: 'md', align: 'center', md: 'Which of these compounds are organic?' },
        {
          kind: 'table',
          id: 't',
          head: ['Compound', 'Why', 'Class'],
          rows: [
            ['methane, $\\ce{CH4}$', 'carbon bonded to hydrogen', '[[good:organic]]'],
            ['carbon dioxide, $\\ce{CO2}$', 'an oxide of carbon', '[[bad:inorganic]]'],
            ['ethanol, $\\ce{C2H5OH}$', 'carbon bonded to hydrogen', '[[good:organic]]'],
            ['sodium carbonate, $\\ce{Na2CO3}$', 'a carbonate', '[[bad:inorganic]]'],
          ],
        },
      ],
      lines: [
        { say: 'Which of these are organic: methane, carbon dioxide, ethanol and sodium carbonate?', show: 'q' },
        { say: 'Methane and ethanol contain carbon bonded to hydrogen, so they are organic.', show: ['t.0', 't.2'], focus: ['t.0', 't.2'] },
        { say: 'Carbon dioxide is an oxide of carbon, and sodium carbonate is a carbonate. Both contain carbon, but they are classed as inorganic.', show: ['t.1', 't.3'], focus: ['t.1', 't.3'] },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q',
          prompt: 'Which of these carbon compounds is **inorganic**?',
          choices: ['Propane, $\\ce{C3H8}$', 'Potassium cyanide, $\\ce{KCN}$', 'Glucose, $\\ce{C6H12O6}$', 'Chloromethane, $\\ce{CH3Cl}$'],
          answer: 1,
          working: 'Potassium cyanide contains carbon, but cyanides are classed as inorganic. Propane, glucose and chloromethane have carbon bonded to hydrogen: they are organic.',
        },
      ],
      lines: [
        { say: 'Your turn. Which of these carbon compounds is inorganic: propane, potassium cyanide, glucose or chloromethane? Pause the video and try it.', show: 'q', wait: 6 },
        { say: 'The answer is B, potassium cyanide. It contains carbon, but cyanides are one of the exceptions classed as inorganic. Choice D, chloromethane, contains chlorine, but its carbon is bonded to hydrogen, so it is organic.', show: 'q.answer' },
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
            'An **organic compound** is a compound of carbon, nearly always bonded to hydrogen.',
            'Oxides of carbon, carbonates, hydrogen carbonates, cyanides and carbides are **inorganic**.',
            'Carbon forms four bonds, bonds to itself in chains, branches and rings, and makes single, double and triple bonds.',
          ],
        },
      ],
      lines: [
        { say: 'Let’s sum up. An organic compound is a compound of carbon, nearly always bonded to hydrogen.', show: 'sum.0' },
        { say: 'Oxides of carbon, carbonates, hydrogen carbonates, cyanides and carbides are inorganic.', show: 'sum.1' },
        { say: 'Carbon forms four bonds, bonds to itself in chains, branches and rings, and makes single, double and triple bonds. In part two, you will sort hydrocarbons into families. See you there!', show: 'sum.2' },
      ],
    },
  ],
};

export default video;
