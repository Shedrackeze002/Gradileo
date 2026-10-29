import type { Explainer } from '@/video/script.ts';
import { figure } from '@/video/solids.ts';
import { chainBonds, numberLabels, skeleton, step, zigzag } from './lib/c30-3a-figures.ts';

// Butan-2-ol, drawn as CH3–CH2–CH(OH)–CH3 is written, numbered from the right, nearer the –OH.
const z = zigzag('c', 4);
const butanol = figure('b', [
  skeleton({
    carbons: { ...z, o: step(z.c3, -90) },
    bonds: [...chainBonds('c', 4, { group: 'chain' }), { from: 'c3', to: 'o', group: 'oh' }],
    atoms: { o: { symbol: 'OH', tone: 'bad', group: 'oh' } },
    labels: numberLabels(['c4', 'c3', 'c2', 'c1'], ['above', 'below left', 'above', 'below']),
  }),
]);

const video: Explainer = {
  id: 'c30-3-4-c',
  lessonId: 'c30-3-4',
  title: 'Functional Groups, Part 3: Naming Alcohols, Haloalkanes and Acids',
  thumbnailTitle: 'Naming Alcohols, Haloalkanes and Acids',
  thumbnail: 'b',
  summary:
    'An alcohol takes the alkane name with -e replaced by -ol and the number of the –OH carbon (butan-2-ol). A halogen is a prefix, listed alphabetically with alkyl groups (1,2-dichloroethane, 2-bromo-2-methylpropane). A carboxylic acid ends in -oic acid, and the carbon of –COOH is always carbon 1 (3-methylbutanoic acid).',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Chemical Changes of Organic Compounds · Part 3', title: 'Naming Alcohols, Haloalkanes and Acids', subtitle: 'The functional group in the name' }],
      lines: [
        { say: 'Rubbing alcohol is often propan-two-ol, and the acid in vinegar is ethanoic acid. Each name tells you the family and where its group sits.', caption: 'Rubbing alcohol is often propan-2-ol, and the acid in vinegar is ethanoic acid. Each name tells you the family and where its group sits.', show: 'title' },
        { say: 'In this part, you will name alcohols, haloalkanes and carboxylic acids, using the rules you know for alkanes.' },
      ],
    },
    {
      chapter: 'Alcohols',
      layout: 'split',
      left: [butanol],
      right: [
        { kind: 'callout', id: 'rule', tone: 'key', title: 'Naming an alcohol', md: 'Replace the final **-e** of the alkane with **-ol**, and give the number of the carbon with the $\\ce{-OH}$: propan-1-ol, propan-2-ol.' },
        { kind: 'math', id: 'm', size: 'md', align: 'left', lines: ['\\ce{CH3-CH2-CH(OH)-CH3}', '\\text{butan-2-ol (or 2-butanol)}'] },
      ],
      lines: [
        { say: 'To name an alcohol, take the name of the alkane with the same chain, drop the final e, and add ol. Propane becomes propanol.', caption: 'To name an alcohol, take the name of the alkane with the same chain, drop the final -e, and add -ol. Propane becomes propanol.', show: 'rule' },
        { say: 'Then give the number of the carbon that carries the O H group: propan-one-ol or propan-two-ol. Methanol and ethanol need no number.', caption: 'Then give the number of the carbon that carries the –OH group: propan-1-ol or propan-2-ol. Methanol and ethanol need no number.' },
        { say: 'Name this alcohol. The chain holding the carbon with the O H group has four carbons, so butane becomes butanol.', caption: 'Name this alcohol. The chain holding the carbon with the –OH group has four carbons, so butane becomes butanol.', show: ['m.0', 'b.chain', 'b.oh'] },
        { say: 'Number from the right, nearer the O H group: it is on carbon two. The name is butan-two-ol, or in the older style, two-butanol.', caption: 'Number from the right, nearer the –OH group: it is on carbon 2. The name is butan-2-ol, or in the older style, 2-butanol.', show: ['b.n', 'm.1'], focus: ['b.n2', 'm.1'] },
      ],
    },
    {
      chapter: 'Haloalkanes',
      layout: 'center',
      main: [
        { kind: 'callout', id: 'rule', tone: 'key', title: 'Naming a haloalkane', md: 'A halogen is a prefix: **fluoro, chloro, bromo, iodo**. Number from the end nearer the first substituent, and list all the prefixes in alphabetical order.' },
        { kind: 'math', id: 'm', size: 'md', lines: ['\\ce{CH2Cl-CH2Cl}\\text{: 1,2-dichloroethane}', '\\ce{CH3-CBr(CH3)-CH3}\\text{: 2-bromo-2-methylpropane}'] },
      ],
      lines: [
        { say: 'In a haloalkane, a halogen atom is a substituent, named as a prefix like an alkyl group: fluoro, chloro, bromo or iodo.', show: 'rule' },
        { say: 'Number from the end nearer the first substituent, and list all the prefixes, halogens and alkyl groups together, in alphabetical order.' },
        { say: 'This compound is a two-carbon chain with a chlorine atom on each carbon: one, two-dye-chloroethane.', caption: 'This compound is a two-carbon chain with a chlorine atom on each carbon: 1,2-dichloroethane.', show: 'm.0', focus: 'm.0' },
        { say: 'This one has a bromine atom and a methyl group, both on carbon two of a three-carbon chain. Bromo comes before methyl in the alphabet: two-bromo-two-methylpropane.', caption: 'This one has a bromine atom and a methyl group, both on carbon 2 of a three-carbon chain. Bromo comes before methyl in the alphabet: 2-bromo-2-methylpropane.', show: 'm.1', focus: 'm.1' },
      ],
    },
    {
      chapter: 'Carboxylic acids',
      layout: 'center',
      main: [
        { kind: 'callout', id: 'rule', tone: 'key', title: 'Naming a carboxylic acid', md: 'Replace the **-e** of the alkane with **-oic acid**. The carbon of $\\ce{-COOH}$ is in the chain, and is always **carbon 1**.' },
        {
          kind: 'math',
          id: 'm',
          size: 'md',
          lines: ['\\ce{CH3-CH2-COOH}\\text{: propanoic acid}', '\\ce{\\overset{4}{CH3}-\\overset{3}{CH}(CH3)-\\overset{2}{CH2}-\\overset{1}{C}OOH}\\text{: 3-methylbutanoic acid}', '\\ce{CH3-CH(CH3)-COOH}\\text{: 2-methylpropanoic acid}'],
        },
      ],
      lines: [
        { say: 'To name a carboxylic acid, change the ending of the alkane: propane becomes propanoic acid.', caption: 'To name a carboxylic acid, change the ending of the alkane to -oic acid: propane becomes propanoic acid.', show: 'rule' },
        { say: 'The carbon of the C O O H group is part of the chain, and it is always carbon one, so it needs no number. This acid has three carbons in all: it is propanoic acid, not ethanoic acid.', caption: 'The carbon of the –COOH group is part of the chain, and it is always carbon 1, so it needs no number. This acid has three carbons in all: it is propanoic acid, not ethanoic acid.', show: 'm.0', focus: 'm.0' },
        { say: 'Now name this one. Count from the carboxyl carbon, carbon one: four carbons, so butanoic acid. The methyl branch is on carbon three: three-methylbutanoic acid.', caption: 'Now name this one. Count from the carboxyl carbon, carbon 1: four carbons, so butanoic acid. The methyl branch is on carbon 3: 3-methylbutanoic acid.', show: 'm.1', focus: 'm.1' },
        { say: 'In the same way, the branch here is on carbon two, next to the carboxyl carbon: two-methylpropanoic acid.', caption: 'In the same way, the branch here is on carbon 2, next to the carboxyl carbon: 2-methylpropanoic acid.', show: 'm.2', focus: 'm.2' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q',
          prompt: 'What is the IUPAC name of $\\ce{CH3-CH2-CH2-CH(OH)-CH3}$?',
          choices: ['pentan-4-ol', 'butan-2-ol', 'pentan-3-ol', 'pentan-2-ol'],
          answer: 3,
          working: 'The chain holding the $\\ce{-OH}$ carbon has 5 carbons: pentanol. Numbered from the right, nearer the $\\ce{-OH}$ group, it is on carbon 2: pentan-2-ol.',
        },
      ],
      lines: [
        { say: 'Your turn. What is the name of the alcohol on the screen? Pause the video and try it.', show: 'q', wait: 6 },
        { say: 'The answer is D, pentan-two-ol. The chain has five carbons, and numbering from the right, nearer the O H group, puts it on carbon two. Choice A numbers from the wrong end.', caption: 'The answer is D, pentan-2-ol. The chain has five carbons, and numbering from the right, nearer the –OH group, puts it on carbon 2. Choice A numbers from the wrong end.', show: 'q.answer' },
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
            'Alcohols: **-ol**, with the number of the $\\ce{-OH}$ carbon: butan-2-ol.',
            'Haloalkanes: **fluoro, chloro, bromo, iodo** prefixes, in alphabetical order: 2-bromo-2-methylpropane.',
            'Acids: **-oic acid**; the $\\ce{-COOH}$ carbon is carbon 1: 3-methylbutanoic acid.',
          ],
        },
      ],
      lines: [
        { say: 'Let’s sum up. An alcohol’s name ends in ol, with the number of the carbon that carries the O H group.', caption: 'Let’s sum up. An alcohol’s name ends in -ol, with the number of the carbon that carries the –OH group.', show: 'sum.0' },
        { say: 'Halogens are prefixes, listed in alphabetical order with the alkyl groups.', show: 'sum.1' },
        { say: 'And in a carboxylic acid, the carbon of the carboxyl group is always carbon one. In part four, you will see how these groups change boiling points and solubility. See you there!', caption: 'And in a carboxylic acid, the carbon of the carboxyl group is always carbon 1. In part four, you will see how these groups change boiling points and solubility. See you there!', show: 'sum.2' },
      ],
    },
  ],
};

export default video;
