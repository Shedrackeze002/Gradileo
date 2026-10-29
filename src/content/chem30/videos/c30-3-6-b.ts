import type { Explainer } from '@/video/script.ts';
import { figure } from '@/video/solids.ts';
import { structure, tag } from './lib/c30-3b-figures.ts';

// Methyl propanoate, CH3–CH2–COO–CH3: the acid part (the C=O carbon and the carbons on its side) in
// blue, and the alcohol part (the chain joined through the other oxygen) in orange.
const parts = figure(
  'f',
  [
    structure({
      name: 'es',
      unit: 1.3,
      atoms: {
        H1: ['H', -1, 0, 'adj'], C3: ['C', 0, 0, 'adj'], H2: ['H', 0, 1, 'adj'], H3: ['H', 0, -1, 'adj'],
        C2: ['C', 1, 0, 'adj'], H4: ['H', 1, 1, 'adj'], H5: ['H', 1, -1, 'adj'],
        C1: ['C', 2, 0, 'adj'], Od: ['O', 2, 1, 'adj'], Os: ['O', 3, 0],
        Cm: ['C', 4, 0, 'opp'], H6: ['H', 4, 1, 'opp'], H7: ['H', 4, -1, 'opp'], H8: ['H', 5, 0, 'opp'],
      },
      bonds: 'H1-C3 C3-H2 C3-H3 C3-C2 C2-H4 C2-H5 C2-C1 C1=Od C1-Os Os-Cm Cm-H6 Cm-H7 Cm-H8',
    }),
    tag('acid', [1.3, -2.4], '\\text{propanoate}', { tone: 'adj' }),
    tag('alcohol', [5.2, -2.4], '\\text{methyl}', { tone: 'opp' }),
  ],
  330,
);

const video: Explainer = {
  id: 'c30-3-6-b',
  lessonId: 'c30-3-6',
  title: 'Esterification and Polymerisation, Part 2: Naming Esters',
  thumbnailTitle: 'Naming Esters',
  thumbnail: 'f',
  summary:
    'An ester’s name has two words: the first comes from the alcohol, named as an alkyl group (methanol gives methyl), and the second from the acid, with -oic acid changed to -oate (propanoic acid gives propanoate). So propanoic acid and methanol make methyl propanoate, and ethyl methanoate comes from methanoic acid and ethanol.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Chemical Changes of Organic Compounds · Part 2', title: 'Naming Esters', subtitle: 'Alcohol first, acid second' }],
      lines: [
        { say: 'Pentyl etha-no-ate smells of bananas, ethyl buta-no-ate of pineapples, and methyl buta-no-ate of apples. Every ester has a two-word name like these.', caption: 'Pentyl ethanoate smells of bananas, ethyl butanoate of pineapples, and methyl butanoate of apples. Every ester has a two-word name like these.', show: 'title' },
        { say: 'In this part, you will name the ester that an acid and an alcohol make, and work back from an ester’s name to its acid and alcohol.' },
      ],
    },
    {
      chapter: 'Two words',
      layout: 'split',
      leftWidth: 520,
      left: [
        { kind: 'callout', id: 'def', tone: 'definition', title: 'Naming an ester', md: 'The **first word** comes from the **alcohol**, named as an alkyl group. The **second word** comes from the **acid**, with -oic acid changed to **-oate**.' },
      ],
      right: [
        { kind: 'table', id: 'a', head: ['Alcohol', 'First word'], rows: [['methanol', 'methyl'], ['ethanol', 'ethyl'], ['propan-1-ol', 'propyl']] },
        { kind: 'table', id: 'b', head: ['Acid', 'Second word'], rows: [['methanoic acid', 'methanoate'], ['ethanoic acid', 'ethanoate'], ['propanoic acid', 'propanoate']] },
      ],
      lines: [
        { say: 'An ester’s name has two words. The first comes from the alcohol, named as an alkyl group.', show: 'def' },
        { say: 'Methanol gives methyl, ethanol gives ethyl, and propan-one-ol gives propyl.', caption: 'Methanol gives methyl, ethanol gives ethyl, and propan-1-ol gives propyl.', show: 'a' },
        { say: 'The second word comes from the acid, with its ending changed. Methanoic acid gives metha-no-ate, ethanoic acid gives etha-no-ate, and propanoic acid gives propa-no-ate.', caption: 'The second word comes from the acid, with its ending changed. Methanoic acid gives methanoate, ethanoic acid gives ethanoate, and propanoic acid gives propanoate.', show: 'b' },
        { say: 'So ethanoic acid and ethanol make ethyl etha-no-ate.', caption: 'So ethanoic acid and ethanol make ethyl ethanoate.', focus: ['a.1', 'b.1'] },
      ],
    },
    {
      chapter: 'Methyl propanoate',
      layout: 'center',
      main: [
        { kind: 'text', id: 'q', size: 'md', md: 'Propanoic acid reacts with methanol. Name the ester, and write the equation.' },
        {
          kind: 'math',
          id: 'm',
          size: 'md',
          lines: [
            '\\text{alcohol: methanol} \\ \\Rightarrow\\ \\text{methyl}',
            '\\text{acid: propanoic acid} \\ \\Rightarrow\\ \\text{propanoate}',
            '\\ce{CH3-CH2-COOH + CH3-OH}',
            '\\ce{<=>[H2SO4] CH3-CH2-COO-CH3 + H2O}',
            '\\text{methyl propanoate}',
          ],
        },
      ],
      lines: [
        { say: 'Propanoic acid reacts with methanol. Name the ester, and write the equation.', show: 'q' },
        { say: 'The alcohol, methanol, gives the first word: methyl.', show: 'm.0', focus: 'm.0' },
        { say: 'The acid, propanoic acid, gives the second word: propa-no-ate.', caption: 'The acid, propanoic acid, gives the second word: propanoate.', show: 'm.1', focus: 'm.1' },
        { say: 'In the equation, the O H of the acid and the H of methanol leave as water, and the two parts join through an oxygen atom.', caption: 'In the equation, the OH of the acid and the H of methanol leave as water, and the two parts join through an oxygen atom.', show: ['m.2', 'm.3'], focus: ['m.2', 'm.3'] },
        { say: 'The ester is methyl propa-no-ate.', caption: 'The ester is methyl propanoate.', show: 'm.4', focus: 'm.4' },
      ],
    },
    {
      chapter: 'The order of the words',
      layout: 'center',
      main: [
        parts,
        { kind: 'callout', id: 'oops', tone: 'mistake', title: 'The order of the words', md: 'In $\\ce{CH3-CH2-COO-CH3}$ the acid part is written first, but in the name the alcohol part comes first: **methyl propanoate**, not propyl methanoate.' },
      ],
      lines: [
        { say: 'Careful with the order. In the condensed formula, the acid part is written first. But in the name, the alcohol part comes first.', show: 'oops' },
        { say: 'To tell the parts apart, find the carbon with the double-bonded oxygen. It, and the carbons on its side, came from the acid: three carbons, so propa-no-ate.', caption: 'To tell the parts apart, find the carbon with the double-bonded oxygen. It, and the carbons on its side, came from the acid: three carbons, so propanoate.', show: ['f.es', 'f.acid'], focus: ['f.es-C1', 'f.es-Od', 'f.acid'] },
        { say: 'The chain joined through the other oxygen came from the alcohol: one carbon, so methyl. The name is methyl propa-no-ate, not propyl metha-no-ate.', caption: 'The chain joined through the other oxygen came from the alcohol: one carbon, so methyl. The name is methyl propanoate, not propyl methanoate.', show: 'f.alcohol', focus: ['f.es-Cm', 'f.alcohol'] },
        { say: 'Some books write the alcohol part first, with O O C in place of C O O. It is the same ester.', caption: 'Some books write the alcohol part first, as CH₃–OOC–CH₂–CH₃. It is the same ester.' },
      ],
    },
    {
      chapter: 'Back to the acid and alcohol',
      layout: 'center',
      main: [
        { kind: 'text', id: 'q', size: 'md', md: 'Which acid and which alcohol make ethyl methanoate, $\\ce{HCOO-CH2-CH3}$?' },
        {
          kind: 'math',
          id: 'm',
          size: 'md',
          lines: ['\\text{methanoate} \\ \\Rightarrow\\ \\text{methanoic acid, } \\ce{HCOOH}', '\\text{ethyl} \\ \\Rightarrow\\ \\text{ethanol, } \\ce{CH3-CH2-OH}'],
        },
        { kind: 'text', id: 'fat', size: 'md', md: 'Fats and vegetable oils are esters too, of long-chain carboxylic acids and the alcohol **glycerol**.' },
      ],
      lines: [
        { say: 'To find the acid and alcohol that made an ester, split its name. The word that ends like etha-no-ate gives the acid, and the alkyl word gives the alcohol.', caption: 'To find the acid and alcohol that made an ester, split its name. The word that ends like ethanoate gives the acid, and the alkyl word gives the alcohol.' },
        { say: 'Which acid and which alcohol make ethyl metha-no-ate? Metha-no-ate comes from methanoic acid.', caption: 'Which acid and which alcohol make ethyl methanoate? Methanoate comes from methanoic acid.', show: ['q', 'm.0'], focus: 'm.0' },
        { say: 'Ethyl comes from ethanol. So the ester is made from methanoic acid and ethanol.', show: 'm.1', focus: 'm.1' },
        { say: 'Esters are not only in fruits and perfumes. Fats and vegetable oils are esters too, made from long-chain carboxylic acids and an alcohol called glycerol.', show: 'fat' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q',
          prompt: 'Which carboxylic acid and which alcohol react to make propyl ethanoate?',
          choices: ['Ethanoic acid and propan‑1‑ol', 'Propanoic acid and ethanol', 'Propanoic acid and propan‑1‑ol', 'Ethanoic acid and ethanol'],
          answer: 0,
          working: 'The -oate word, ethanoate, comes from ethanoic acid. The alkyl word, propyl, comes from propan-1-ol. The ester is $\\ce{CH3-COO-CH2-CH2-CH3}$.',
        },
      ],
      lines: [
        { say: 'Your turn. Which carboxylic acid and which alcohol react to make propyl etha-no-ate? Pause the video and try it.', caption: 'Your turn. Which carboxylic acid and which alcohol react to make propyl ethanoate? Pause the video and try it.', show: 'q', wait: 6 },
        { say: 'The answer is A. Etha-no-ate comes from ethanoic acid, and propyl comes from propan-one-ol. Choice B swaps the two parts: propanoic acid and ethanol make ethyl propa-no-ate.', caption: 'The answer is A. Ethanoate comes from ethanoic acid, and propyl comes from propan-1-ol. Choice B swaps the two parts: propanoic acid and ethanol make ethyl propanoate.', show: 'q.answer' },
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
            'The first word comes from the **alcohol**, as an alkyl group: methanol gives methyl.',
            'The second comes from the **acid**, with -oic acid changed to -oate: propanoic acid gives propanoate.',
            'The $\\ce{C=O}$ carbon and the carbons on its side came from the acid; the chain on the other oxygen, from the alcohol.',
            'Split a name to find the acid and alcohol: ethyl methanoate comes from methanoic acid and ethanol.',
          ],
        },
      ],
      lines: [
        { say: 'Let’s sum up. The first word of an ester’s name comes from the alcohol, as an alkyl group.', show: 'sum.0' },
        { say: 'The second comes from the acid, with its ending changed: propanoic acid gives propa-no-ate.', caption: 'The second comes from the acid, with its ending changed: propanoic acid gives propanoate.', show: 'sum.1' },
        { say: 'In a formula, the carbon with the double-bonded oxygen and the carbons on its side came from the acid.', show: 'sum.2' },
        { say: 'And splitting a name gives the acid and the alcohol. In part three, you will join many small molecules into polymers. See you there!', show: 'sum.3' },
      ],
    },
  ],
};

export default video;
