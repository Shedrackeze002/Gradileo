import type { Explainer } from '@/video/script.ts';
import { figure } from '@/video/solids.ts';
import { rowStructure, tag } from './lib/c30-3a-figures.ts';

// Alkyl groups: methane less one hydrogen is methyl, ethane less one hydrogen is ethyl. The open
// bond on the right is where each joins a chain.
const alkyl = figure('g', [
  rowStructure({ name: 'me', at: [0, 4.8], atoms: [{ symbol: 'C', up: 'H', down: 'H' }], left: 'H', right: 'open' }),
  tag('me-name', [2.2, 4.8], '\\text{methyl}', { place: 'right', tone: 'opp' }),
  rowStructure({ name: 'et', at: [0, 0], atoms: [{ symbol: 'C', up: 'H', down: 'H' }, { symbol: 'C', up: 'H', down: 'H' }], left: 'H', right: 'open' }),
  tag('et-name', [3.8, 0], '\\text{ethyl}', { place: 'right', tone: 'opp' }),
]);
const ME = ['g.me-a1', 'g.me-a1-up', 'g.me-a1-dn', 'g.me-left', 'g.me-bond-a1-a1-up', 'g.me-bond-a1-a1-dn', 'g.me-bond-left-a1', 'g.me-open', 'g.me-name'];
const ET = ['g.et-a1', 'g.et-a2', 'g.et-a1-up', 'g.et-a1-dn', 'g.et-a2-up', 'g.et-a2-dn', 'g.et-left', 'g.et-bond-a1-a2', 'g.et-bond-a1-a1-up', 'g.et-bond-a1-a1-dn', 'g.et-bond-a2-a2-up', 'g.et-bond-a2-a2-dn', 'g.et-bond-left-a1', 'g.et-open', 'g.et-name'];

const video: Explainer = {
  id: 'c30-3-2',
  lessonId: 'c30-3-2',
  title: 'Naming Hydrocarbons, Part 1: Straight-Chain Alkanes',
  thumbnailTitle: 'Straight-Chain Alkanes',
  thumbnail: 'g',
  summary:
    'The name of an alkane is a stem for the number of carbons in the chain (meth, eth, prop, but, pent, hex, hept, oct, non, dec) and the ending -ane. CH3–(CH2)4–CH3 is a chain of six carbons, hexane. An alkyl group is an alkane less one hydrogen, named with -yl: methyl, ethyl, propyl.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Chemical Changes of Organic Compounds · Part 1', title: 'Straight-Chain Alkanes', subtitle: 'A stem for the chain, and an ending for the family' }],
      lines: [
        { say: 'Two bottles are both labelled C six H fourteen. One holds a liquid that boils at sixty-nine degrees Celsius, the other one that boils at fifty degrees Celsius. They are different compounds with the same formula.', caption: 'Two bottles are both labelled C₆H₁₄. One holds a liquid that boils at 69 °C, the other one that boils at 50 °C. They are different compounds with the same formula.', show: 'title' },
        { say: 'So chemists everywhere use one set of naming rules, agreed by eye-you-pack. This part names straight chains. Part two names branched alkanes, part three draws a structure from its name, and part four names alkenes and alkynes.', caption: 'So chemists everywhere use one set of naming rules, agreed by IUPAC. This part names straight chains. Part two names branched alkanes, part three draws a structure from its name, and part four names alkenes and alkynes.' },
      ],
    },
    {
      chapter: 'Stem and ending',
      layout: 'split',
      left: [
        { kind: 'callout', id: 'key', tone: 'key', title: 'Naming an alkane', md: 'A **stem** for the number of carbons in the chain, and the ending **-ane**.' },
        {
          kind: 'table',
          id: 'a',
          head: ['C', 'Stem', 'Alkane', 'Formula'],
          rows: [
            ['1', 'meth-', 'methane', '$\\ce{CH4}$'],
            ['2', 'eth-', 'ethane', '$\\ce{C2H6}$'],
            ['3', 'prop-', 'propane', '$\\ce{C3H8}$'],
            ['4', 'but-', 'butane', '$\\ce{C4H10}$'],
          ],
        },
      ],
      right: [
        {
          kind: 'table',
          id: 'b',
          head: ['C', 'Stem', 'Alkane', 'Formula'],
          rows: [
            ['5', 'pent-', 'pentane', '$\\ce{C5H12}$'],
            ['6', 'hex-', 'hexane', '$\\ce{C6H14}$'],
            ['7', 'hept-', 'heptane', '$\\ce{C7H16}$'],
            ['8', 'oct-', 'octane', '$\\ce{C8H18}$'],
            ['9', 'non-', 'nonane', '$\\ce{C9H20}$'],
            ['10', 'dec-', 'decane', '$\\ce{C10H22}$'],
          ],
        },
      ],
      lines: [
        { say: 'The name of an alkane has two parts: a stem that gives the number of carbon atoms in the chain, and the ending ane.', caption: 'The name of an alkane has two parts: a stem that gives the number of carbon atoms in the chain, and the ending -ane.', show: 'key' },
        { say: 'One carbon is meth, so methane. Two is eth, ethane. Three is prop, propane. And four is bute, butane.', caption: 'One carbon is meth-, so methane. Two is eth-, ethane. Three is prop-, propane. And four is but-, butane.', show: ['a.0', 'a.1', 'a.2', 'a.3'] },
        { say: 'From five on, the stems are the Greek number words. Pent means five, so pentane.', show: 'b.0', focus: 'b.0' },
        { say: 'Then hex for six, hept for seven, oct for eight, non for nine and dec for ten.', show: ['b.1', 'b.2', 'b.3', 'b.4', 'b.5'], focus: ['b.1', 'b.2', 'b.3', 'b.4', 'b.5'] },
        { say: 'Every one of these formulas fits the general formula of the alkanes, C n H two n plus two.', caption: 'Every one of these formulas fits the general formula of the alkanes, CₙH₂ₙ₊₂.', focus: ['a', 'b'] },
      ],
    },
    {
      chapter: 'A run of CH₂ groups',
      layout: 'center',
      main: [
        {
          kind: 'math',
          id: 'm',
          lines: ['\\ce{CH3-CH2-CH2-CH2-CH2-CH3}', '= \\ce{CH3-(CH2)4-CH3}', '1 + 4 + 1 = 6 \\text{ carbons: hexane}'],
        },
      ],
      lines: [
        { say: 'In a condensed formula, a long chain has a run of C H two groups in a row.', caption: 'In a condensed formula, a long chain has a run of CH₂ groups in a row.', show: 'm.0' },
        { say: 'The run can be shortened. C H two in brackets, with a four after it, means four C H two groups in a row.', caption: 'The run can be shortened. (CH₂)₄ means four CH₂ groups in a row.', show: 'm.1', focus: 'm.1' },
        { say: 'So this chain has one carbon at each end and four in the middle: six carbons. It is hexane.', show: 'm.2', focus: 'm.2' },
      ],
    },
    {
      chapter: 'Alkyl groups',
      layout: 'split',
      left: [alkyl],
      right: [
        { kind: 'callout', id: 'def', tone: 'definition', title: 'Alkyl group', md: 'An alkane with one hydrogen atom removed, so it can join to a chain. The ending -ane becomes **-yl**.' },
        {
          kind: 'table',
          id: 't',
          head: ['Alkyl group', 'Formula'],
          rows: [
            ['methyl', '$\\ce{-CH3}$'],
            ['ethyl', '$\\ce{-CH2CH3}$'],
            ['propyl', '$\\ce{-CH2CH2CH3}$'],
          ],
        },
      ],
      lines: [
        { say: 'Branches on a chain are named after alkanes too. An alkyl group is an alkane with one hydrogen atom removed, so it can join to a chain.', show: 'def' },
        { say: 'Take a hydrogen from methane, and you have a methyl group, C H three. The open bond is where it joins a chain.', caption: 'Take a hydrogen from methane, and you have a methyl group, CH₃. The open bond is where it joins a chain.', show: [...ME, 't.0'], focus: 'g.me-open' },
        { say: 'The ending ane becomes yl. Ethane gives the ethyl group, and propane, the propyl group.', caption: 'The ending -ane becomes -yl. Ethane gives the ethyl group, and propane, the propyl group.', show: [...ET, 't.1', 't.2'], focus: ['t.1', 't.2'] },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q',
          prompt: 'What is the IUPAC name of $\\ce{CH3-(CH2)5-CH3}$?',
          choices: ['pentane', 'octane', 'heptane', 'hexane'],
          answer: 2,
          working: 'One carbon at each end and five $\\ce{CH2}$ groups between them: $1 + 5 + 1 = 7$ carbons. Seven is hept-, so the alkane is heptane.',
        },
      ],
      lines: [
        { say: 'Your turn. What is the name of the alkane on the screen? Pause the video and try it.', show: 'q', wait: 6 },
        { say: 'The answer is C, heptane. One carbon at each end, plus five in the brackets, makes seven, and seven is hept. Choice A, pentane, counts only the carbons in the brackets.', caption: 'The answer is C, heptane. One carbon at each end, plus five in the brackets, makes seven, and seven is hept-. Choice A, pentane, counts only the carbons in the brackets.', show: 'q.answer' },
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
            'An alkane is named by a **stem** and **-ane**: meth 1, eth 2, prop 3, but 4, pent 5, hex 6, hept 7, oct 8, non 9, dec 10.',
            '$\\ce{CH3-(CH2)4-CH3}$ means four $\\ce{CH2}$ groups in a row: hexane.',
            'An **alkyl group** is an alkane less one hydrogen: methyl, ethyl, propyl.',
          ],
        },
      ],
      lines: [
        { say: 'Let’s sum up. An alkane is named by a stem for the number of carbons, and the ending ane.', caption: 'Let’s sum up. An alkane is named by a stem for the number of carbons, and the ending -ane.', show: 'sum.0' },
        { say: 'A run of C H two groups can be written in brackets, with the number after it.', caption: 'A run of CH₂ groups can be written in brackets, with the number after it.', show: 'sum.1' },
        { say: 'And an alkyl group is an alkane less one hydrogen: methyl, ethyl and propyl. In part two, you will use them to name branched alkanes. See you there!', show: 'sum.2' },
      ],
    },
  ],
};

export default video;
