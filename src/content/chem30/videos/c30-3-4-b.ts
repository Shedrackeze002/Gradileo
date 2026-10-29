import type { Explainer } from '@/video/script.ts';
import { lewis } from '@/video/chem.ts';
import { figure } from '@/video/solids.ts';
import { grouped, rowStructure, tag } from './lib/c30-3a-figures.ts';

const CH2 = { symbol: 'C', up: 'H', down: 'H' } as const;
const CO = { symbol: 'C', up: '=O' } as const;
const O = { symbol: 'O', tone: 'bad' } as const;

// Propanal (C=O at the end of the chain) above propanone (C=O inside the chain).
const carbonyl = figure('k', [
  grouped(rowStructure({ name: 'al', at: [0, 5.6], atoms: [CH2, CH2, CO], left: 'H', right: 'H' }), 'al'),
  tag('al-name', [1.6, 3.05], '\\text{propanal: an aldehyde}', { tone: 'theta', group: 'al' }),
  grouped(rowStructure({ name: 'one', at: [0, 0], atoms: [CH2, CO, CH2], left: 'H', right: 'H' }), 'one'),
  tag('one-name', [1.6, -2.45], '\\text{propanone: a ketone}', { tone: 'theta', group: 'one' }),
]);

// Ethanoic acid (–COOH) above methyl ethanoate (–COO– with carbon on both sides).
const acidEster = figure('a', [
  grouped(rowStructure({ name: 'ac', at: [0, 5.6], atoms: [CH2, CO, O, { symbol: 'H', tone: 'bad' }], left: 'H' }), 'ac'),
  tag('ac-name', [2.4, 3.05], '\\text{ethanoic acid: a carboxylic acid}', { tone: 'theta', group: 'ac' }),
  grouped(rowStructure({ name: 'es', at: [0, 0], atoms: [CH2, CO, O, CH2], left: 'H', right: 'H' }), 'es'),
  tag('es-name', [2.4, -2.45], '\\text{methyl ethanoate: an ester}', { tone: 'theta', group: 'es' }),
]);

// Ethanol (an –OH covalently bonded to carbon) above the hydroxide ion (an ion, with its charge).
const notHydroxide = figure('h', [
  grouped(rowStructure({ name: 'ol', at: [0, 5.2], atoms: [CH2, CH2, O, { symbol: 'H', tone: 'bad' }], left: 'H' }), 'ol'),
  tag('ol-name', [2.4, 2.75], '\\text{ethanol: covalent C–O bond}', { tone: 'theta', group: 'ol' }),
  grouped(
    lewis({
      name: 'oh',
      atoms: [
        { id: 'O', symbol: 'O', at: [1.6, 0], tone: 'bad' },
        { id: 'H', symbol: 'H', at: [3.2, 0] },
      ],
      bonds: [{ from: 'O', to: 'H' }],
      charge: '-',
    }),
    'oh',
  ),
  tag('oh-name', [2.4, -1.6], '\\text{hydroxide ion, } \\ce{OH-}', { tone: 'theta', group: 'oh' }),
]);

const video: Explainer = {
  id: 'c30-3-4-b',
  lessonId: 'c30-3-4',
  title: 'Functional Groups, Part 2: Families With Oxygen',
  thumbnailTitle: 'Families With Oxygen',
  thumbnail: 'a',
  summary:
    'A condensed formula writes C=O as CO. –CHO at the end of a chain is an aldehyde, –CO– inside a chain a ketone, –COOH a carboxylic acid and –COO– with carbon on both sides an ester; an –O– with no C=O is an ether. The –OH of an alcohol is covalently bonded: it is not a hydroxide ion, and alcohols are not bases.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Chemical Changes of Organic Compounds · Part 2', title: 'Families With Oxygen', subtitle: 'Where is the oxygen, and how is it joined?' }],
      lines: [
        { say: 'Six of the eight families contain oxygen, and their condensed formulas can look almost alike. One extra letter can change the family.', show: 'title' },
        { say: 'In this part, you will look closely at how the oxygen is joined, and tell these families apart.' },
      ],
    },
    {
      chapter: 'Aldehydes and ketones',
      layout: 'split',
      leftWidth: 560,
      left: [carbonyl],
      right: [{ kind: 'math', id: 'm', size: 'md', align: 'left', lines: ['\\ce{C=O} \\text{ is written } \\ce{CO}', '\\ce{CH3-CH2-CHO}\\text{: aldehyde}', '\\ce{CH3-CO-CH3}\\text{: ketone}'] }],
      lines: [
        { say: 'A condensed formula writes a carbon-oxygen double bond as just C O. Where it sits decides the family.', caption: 'A condensed formula writes a carbon–oxygen double bond as just CO. Where it sits decides the family.', show: 'm.0' },
        { say: 'In propanal, the C O double bond is at the end of the chain. The end carbon carries the oxygen and a hydrogen, written C H O. That makes an aldehyde.', caption: 'In propanal, the C=O is at the end of the chain. The end carbon carries the oxygen and a hydrogen, written CHO. That makes an aldehyde.', show: ['k.al', 'm.1'], focus: ['k.al-a3', 'k.al-a3-up', 'k.al-right'] },
        { say: 'In propa-nohn, the C O double bond is inside the chain, with carbon on both sides, written C O. That makes a ketone.', caption: 'In propanone, the C=O is inside the chain, with carbon on both sides, written CO. That makes a ketone.', show: ['k.one', 'm.2'], focus: ['k.one-a2', 'k.one-a2-up'] },
      ],
    },
    {
      chapter: 'Acids, esters and ethers',
      layout: 'split',
      leftWidth: 560,
      left: [acidEster],
      right: [{ kind: 'math', id: 'm', size: 'md', align: 'left', lines: ['\\ce{CH3-COOH}\\text{: acid}', '\\ce{CH3-COO-CH3}\\text{: ester}', '\\ce{CH3-O-CH3}\\text{: ether}'] }],
      lines: [
        { say: 'In ethanoic acid, one carbon carries the C O double bond and an O H group, written C O O H. That makes a carboxylic acid.', caption: 'In ethanoic acid, one carbon carries the C=O and an –OH group, written COOH. That makes a carboxylic acid.', show: ['a.ac', 'm.0'], focus: ['a.ac-a2', 'a.ac-a2-up', 'a.ac-a3', 'a.ac-a4'] },
        { say: 'In methyl ethanoate, the same C O O has carbon on both sides. That makes an ester.', caption: 'In methyl ethanoate, the same COO has carbon on both sides. That makes an ester.', show: ['a.es', 'm.1'], focus: ['a.es-a2', 'a.es-a2-up', 'a.es-a3', 'a.es-a4'] },
        { say: 'And an oxygen between two carbons, with no C O double bond at all, as in methoxy-methane, makes an ether.', caption: 'And an oxygen between two carbons, with no C=O at all, as in methoxymethane, makes an ether.', show: 'm.2', focus: 'm.2' },
      ],
    },
    {
      chapter: 'Spotting the family',
      layout: 'center',
      main: [
        { kind: 'text', id: 'q', size: 'md', align: 'center', md: 'Name the family of $\\ce{CH3-CH2-CHO}$, $\\ce{CH3-CO-CH2-CH3}$ and $\\ce{CH3-CH2-COO-CH3}$.' },
        {
          kind: 'math',
          id: 'm',
          size: 'md',
          lines: ['\\ce{CH3-CH2-CHO}\\text{: } \\ce{C=O} \\text{ at the end, an aldehyde (propanal)}', '\\ce{CH3-CO-CH2-CH3}\\text{: carbon on both sides, a ketone (butanone)}', '\\ce{CH3-CH2-COO-CH3}\\text{: } \\ce{-COO-{}} \\text{ between chains, an ester}'],
        },
      ],
      lines: [
        { say: 'Let’s practise. Name the family of each of these three compounds.', show: 'q' },
        { say: 'The first ends in C H O: a C O double bond at the end of the chain. It is an aldehyde, propanal.', caption: 'The first ends in CHO: a C=O at the end of the chain. It is an aldehyde, propanal.', show: 'm.0', focus: 'm.0' },
        { say: 'The second has C O with carbon on both sides. It is a ketone, bute-a-nohn.', caption: 'The second has CO with carbon on both sides. It is a ketone, butanone.', show: 'm.1', focus: 'm.1' },
        { say: 'The third has C O O with carbon on both sides. It is an ester, methyl propanoate.', caption: 'The third has COO with carbon on both sides. It is an ester, methyl propanoate.', show: 'm.2', focus: 'm.2' },
      ],
    },
    {
      chapter: 'Not a hydroxide',
      layout: 'split',
      leftWidth: 520,
      left: [notHydroxide],
      right: [{ kind: 'callout', id: 'oops', tone: 'mistake', title: 'An alcohol is not a hydroxide', md: 'The $\\ce{-OH}$ of an alcohol is covalently bonded to carbon. It is not a hydroxide ion, $\\ce{OH-}$: alcohols are not bases, and a solution of ethanol is neutral.' }],
      lines: [
        { say: 'One more trap. The O H of an alcohol is joined to carbon by a covalent bond.', caption: 'One more trap. The –OH of an alcohol is joined to carbon by a covalent bond.', show: 'h.ol', focus: ['h.ol-a2', 'h.ol-a3'] },
        { say: 'It is not a hydroxide ion, O H minus, so alcohols are not bases. A solution of ethanol is neutral.', caption: 'It is not a hydroxide ion, OH⁻, so alcohols are not bases. A solution of ethanol is neutral.', show: ['h.oh', 'oops'] },
        { say: 'Compare a carboxylic acid. Its C O O H group can give away a hydrogen ion, which makes it a weak acid.', caption: 'Compare a carboxylic acid. Its –COOH group can give away a hydrogen ion, which makes it a weak acid.' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q',
          prompt: 'Which compound is an ester?',
          choices: ['$\\ce{CH3-COO-CH2-CH3}$', '$\\ce{CH3-CH2-COOH}$', '$\\ce{CH3-CO-CH2-CH3}$', '$\\ce{CH3-CH2-CHO}$'],
          answer: 0,
          working: '$\\ce{CH3-COO-CH2-CH3}$ has $\\ce{-COO-{}}$ with carbon on both sides: an ester (ethyl ethanoate). The others are a carboxylic acid, a ketone and an aldehyde.',
        },
      ],
      lines: [
        { say: 'Your turn. Which of these compounds is an ester? Pause the video and try it.', show: 'q', wait: 6 },
        { say: 'The answer is A. Its C O O group has carbon on both sides, so it is an ester, ethyl ethanoate. Choice B also has C O O, but it ends in a hydrogen, C O O H: a carboxylic acid.', caption: 'The answer is A. Its COO group has carbon on both sides, so it is an ester, ethyl ethanoate. Choice B also has COO, but it ends in a hydrogen, COOH: a carboxylic acid.', show: 'q.answer' },
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
            '$\\ce{-CHO}$ at the end of a chain: **aldehyde**. $\\ce{-CO-{}}$ inside a chain: **ketone**.',
            '$\\ce{-COOH}$: **carboxylic acid**. $\\ce{-COO-{}}$ with carbon on both sides: **ester**.',
            '$\\ce{-O-{}}$ with no $\\ce{C=O}$: **ether**.',
            'An alcohol’s $\\ce{-OH}$ is covalent: alcohols are not bases.',
          ],
        },
      ],
      lines: [
        { say: 'Let’s sum up. C H O at the end of a chain is an aldehyde, and C O inside a chain is a ketone.', caption: 'Let’s sum up. CHO at the end of a chain is an aldehyde, and CO inside a chain is a ketone.', show: 'sum.0' },
        { say: 'C O O H is a carboxylic acid, and C O O with carbon on both sides is an ester.', caption: 'COOH is a carboxylic acid, and COO with carbon on both sides is an ester.', show: 'sum.1' },
        { say: 'An oxygen with no C O double bond, between two chains, is an ether.', caption: 'An oxygen with no C=O, between two chains, is an ether.', show: 'sum.2' },
        { say: 'And the O H of an alcohol is covalent, so alcohols are not bases. In part three, you will name alcohols, haloalkanes and acids. See you there!', caption: 'And the –OH of an alcohol is covalent, so alcohols are not bases. In part three, you will name alcohols, haloalkanes and acids. See you there!', show: 'sum.3' },
      ],
    },
  ],
};

export default video;
