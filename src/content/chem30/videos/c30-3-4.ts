import type { Explainer } from '@/video/script.ts';
import { figure } from '@/video/solids.ts';
import { grouped, rowStructure, tag } from './lib/c30-3a-figures.ts';

const CH2 = { symbol: 'C', up: 'H', down: 'H' } as const;

// Ethane and ethanol: the same two-carbon chain, with and without an –OH group.
const pair = figure(
  'e',
  [
    grouped(rowStructure({ name: 'an', atoms: [CH2, CH2], left: 'H', right: 'H' }), 'ethane'),
    tag('an-name', [0.8, -2.5], '\\text{ethane: a gas}', { group: 'ethane' }),
    grouped(rowStructure({ name: 'ol', at: [7.4, 0], atoms: [CH2, CH2, { symbol: 'O', tone: 'bad' }, { symbol: 'H', tone: 'bad' }], left: 'H' }), 'ethanol'),
    tag('ol-name', [9.8, -2.5], '\\text{ethanol: a liquid that mixes with water}', { group: 'ethanol' }),
  ],
  330,
);

// The hydroxyl group of ethanol (above) and the carboxyl group of ethanoic acid (below).
const groups = figure('g', [
  rowStructure({ name: 'ol', at: [0, 5.6], atoms: [CH2, CH2, { symbol: 'O', tone: 'bad' }, { symbol: 'H', tone: 'bad' }], left: 'H' }),
  tag('ol-name', [2.4, 3.05], '\\text{ethanol: a hydroxyl group}', { tone: 'theta', group: 'ol-label' }),
  rowStructure({ name: 'ac', at: [0, 0], atoms: [CH2, { symbol: 'C', up: '=O' }, { symbol: 'O', tone: 'bad' }, { symbol: 'H', tone: 'bad' }], left: 'H' }),
  tag('ac-name', [2.4, -2.45], '\\text{ethanoic acid: a carboxyl group}', { tone: 'theta', group: 'ac-label' }),
]);
const ETHANOL = ['g.ol-a1', 'g.ol-a2', 'g.ol-a3', 'g.ol-a4', 'g.ol-a1-up', 'g.ol-a1-dn', 'g.ol-a2-up', 'g.ol-a2-dn', 'g.ol-left', 'g.ol-bond-a1-a2', 'g.ol-bond-a2-a3', 'g.ol-bond-a3-a4', 'g.ol-bond-a1-a1-up', 'g.ol-bond-a1-a1-dn', 'g.ol-bond-a2-a2-up', 'g.ol-bond-a2-a2-dn', 'g.ol-bond-left-a1', 'g.ol-label'];
const ACID = ['g.ac-a1', 'g.ac-a2', 'g.ac-a3', 'g.ac-a4', 'g.ac-a1-up', 'g.ac-a1-dn', 'g.ac-a2-up', 'g.ac-left', 'g.ac-bond-a1-a2', 'g.ac-bond-a2-a3', 'g.ac-bond-a3-a4', 'g.ac-bond-a1-a1-up', 'g.ac-bond-a1-a1-dn', 'g.ac-bond-a2-a2-up', 'g.ac-bond-left-a1', 'g.ac-label'];

const video: Explainer = {
  id: 'c30-3-4',
  lessonId: 'c30-3-4',
  title: 'Functional Groups, Part 1: Eight Families',
  thumbnailTitle: 'Eight Families',
  thumbnail: 'g',
  summary:
    'A functional group is an atom or group of atoms that gives an organic compound its typical properties and reactions, and compounds with the same group form a family: alcohols (–OH), haloalkanes (a halogen), carboxylic acids (–COOH), esters (–COO–), aldehydes (–CHO), ketones (–CO–), ethers (–O–) and amines (–NH2).',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Chemical Changes of Organic Compounds · Part 1', title: 'Eight Families', subtitle: 'A small group of atoms that changes everything' }],
      lines: [
        { say: 'Hand sanitiser, vinegar and nail-polish remover are all small organic molecules: ethanol, ethanoic acid and propa-nohn. Each is a short carbon chain with a small group of atoms attached.', caption: 'Hand sanitiser, vinegar and nail-polish remover are all small organic molecules: ethanol, ethanoic acid and propanone. Each is a short carbon chain with a small group of atoms attached.', show: 'title' },
        { say: 'In this lesson, you will meet these groups. This part shows the eight families. Part two tells the families with oxygen apart, part three names alcohols, haloalkanes and acids, and part four explains boiling points and solubility.' },
      ],
    },
    {
      chapter: 'Functional groups',
      layout: 'center',
      main: [
        pair,
        { kind: 'callout', id: 'def', tone: 'definition', title: 'Functional group', md: 'An atom or group of atoms that gives an organic molecule its typical **properties and reactions**. The same group means the same **family**.' },
      ],
      lines: [
        { say: 'Ethane and ethanol both have a chain of two carbon atoms. But ethane is a gas, while ethanol is a liquid that mixes with water.', show: ['e.ethane', 'e.ethanol'] },
        { say: 'The difference is one small group of atoms: the O H group of ethanol.', caption: 'The difference is one small group of atoms: the OH group of ethanol.', focus: ['e.ol-a3', 'e.ol-a4'] },
        { say: 'A group like this is called a functional group: an atom or group of atoms that gives an organic molecule its typical properties and reactions.', show: 'def' },
        { say: 'Compounds with the same functional group belong to the same family, and behave alike.' },
      ],
    },
    {
      chapter: 'Eight families',
      layout: 'center',
      main: [
        {
          kind: 'table',
          id: 't',
          head: ['Family', 'Functional group', 'Example', 'Name'],
          rows: [
            ['alcohol', 'hydroxyl, $\\ce{-OH}$', 'ethanol', '-ol'],
            ['haloalkane', '$\\ce{-F}$, $\\ce{-Cl}$, $\\ce{-Br}$ or $\\ce{-I}$', 'chloroethane', 'chloro- …'],
            ['carboxylic acid', 'carboxyl, $\\ce{-COOH}$', 'ethanoic acid', '-oic acid'],
            ['ester', '$\\ce{-COO-{}}$ between chains', 'methyl ethanoate', '-oate'],
            ['aldehyde', '$\\ce{-CHO}$ at the chain end', 'ethanal', '-al'],
            ['ketone', '$\\ce{-CO-{}}$ inside the chain', 'propanone', '-one'],
            ['ether', '$\\ce{-O-{}}$ between chains', 'methoxymethane', 'methoxy- …'],
            ['amine', 'amino, $\\ce{-NH2}$', 'methanamine', '-amine'],
          ],
        },
      ],
      lines: [
        { say: 'Here are the eight families. Alcohols have a hydroxyl group, O H, as in ethanol. Haloalkanes have a halogen atom, named with a prefix such as chloro, as in chloroethane.', caption: 'Here are the eight families. Alcohols have a hydroxyl group, –OH, as in ethanol. Haloalkanes have a halogen atom, named with a prefix such as chloro-, as in chloroethane.', show: ['t.0', 't.1'], focus: ['t.0', 't.1'] },
        { say: 'Carboxylic acids have a carboxyl group, C O O H, as in ethanoic acid, the acid in vinegar. Esters have a C O O link between two carbon chains, as in methyl ethanoate.', caption: 'Carboxylic acids have a carboxyl group, –COOH, as in ethanoic acid, the acid in vinegar. Esters have a –COO– link between two carbon chains, as in methyl ethanoate.', show: ['t.2', 't.3'], focus: ['t.2', 't.3'] },
        { say: 'Aldehydes have a C H O group at the end of the chain, as in ethanal. Ketones have a carbon-oxygen double bond inside the chain, as in propa-nohn.', caption: 'Aldehydes have a –CHO group at the end of the chain, as in ethanal. Ketones have a C=O inside the chain, as in propanone.', show: ['t.4', 't.5'], focus: ['t.4', 't.5'] },
        { say: 'Ethers have an oxygen atom between two carbon chains, as in methoxy-methane. And amines have an amino group, N H two, as in methanamine.', caption: 'Ethers have an oxygen atom between two carbon chains, as in methoxymethane. And amines have an amino group, –NH₂, as in methanamine.', show: ['t.6', 't.7'], focus: ['t.6', 't.7'] },
      ],
    },
    {
      chapter: 'Hydroxyl and carboxyl groups',
      layout: 'split',
      leftWidth: 560,
      left: [groups],
      right: [
        { kind: 'callout', id: 'oh', tone: 'definition', title: 'Hydroxyl group', md: '$\\ce{-OH}$: an oxygen bonded to a hydrogen and to a carbon of the chain. It makes an **alcohol**.' },
        { kind: 'callout', id: 'cooh', tone: 'definition', title: 'Carboxyl group', md: '$\\ce{-COOH}$: a carbon with a double bond to one oxygen and a single bond to an $\\ce{-OH}$. It makes a **carboxylic acid**.' },
      ],
      lines: [
        { say: 'Two groups deserve a closer look. The hydroxyl group is an oxygen atom bonded to a hydrogen atom, and to a carbon of the chain. It makes a compound an alcohol.', show: [...ETHANOL, 'oh'], focus: ['g.ol-a3', 'g.ol-a4'] },
        { say: 'The carboxyl group is a carbon atom with a double bond to one oxygen, and a single bond to an O H group.', caption: 'The carboxyl group is a carbon atom with a double bond to one oxygen, and a single bond to an –OH group.', show: [...ACID, 'cooh'], focus: ['g.ac-a2', 'g.ac-a2-up', 'g.ac-a3', 'g.ac-a4'] },
        { say: 'It makes a compound a carboxylic acid. The hydrogen of its O H can be given away, which makes the compound acidic.', caption: 'It makes a compound a carboxylic acid. The hydrogen of its –OH can be given away, which makes the compound acidic.', focus: 'g.ac-a4' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q',
          prompt: 'Which family does $\\ce{CH3-CH2-NH2}$ belong to?',
          choices: ['Alcohol', 'Amine', 'Ether', 'Haloalkane'],
          answer: 1,
          working: 'It has an amino group, $\\ce{-NH2}$: an amine (ethanamine). An alcohol would have $\\ce{-OH}$, an ether $\\ce{-O-{}}$ between two chains, and a haloalkane a halogen atom.',
        },
      ],
      lines: [
        { say: 'Your turn. Which family does the compound on the screen belong to? Pause the video and try it.', show: 'q', wait: 6 },
        { say: 'The answer is B, an amine. Its functional group is the amino group, N H two. There is no oxygen, so it cannot be an alcohol or an ether, and no halogen atom.', caption: 'The answer is B, an amine. Its functional group is the amino group, –NH₂. There is no oxygen, so it cannot be an alcohol or an ether, and no halogen atom.', show: 'q.answer' },
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
            'A **functional group** gives a family its properties and reactions.',
            'Alcohol $\\ce{-OH}$, haloalkane (a halogen), carboxylic acid $\\ce{-COOH}$, ester $\\ce{-COO-{}}$.',
            'Aldehyde $\\ce{-CHO}$, ketone $\\ce{-CO-{}}$, ether $\\ce{-O-{}}$, amine $\\ce{-NH2}$.',
          ],
        },
      ],
      lines: [
        { say: 'Let’s sum up. A functional group gives a family of compounds its properties and reactions.', show: 'sum.0' },
        { say: 'Alcohols have a hydroxyl group, haloalkanes a halogen atom, carboxylic acids a carboxyl group, and esters a C O O link.', caption: 'Alcohols have a hydroxyl group, haloalkanes a halogen atom, carboxylic acids a carboxyl group, and esters a –COO– link.', show: 'sum.1' },
        { say: 'Aldehydes and ketones have a carbon-oxygen double bond, ethers an oxygen between two chains, and amines an amino group. In part two, you will tell the families with oxygen apart. See you there!', show: 'sum.2' },
      ],
    },
  ],
};

export default video;
