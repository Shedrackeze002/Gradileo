import type { Explainer } from '@/video/script.ts';
import { figure } from '@/video/solids.ts';
import { chainBonds, grouped, ringAt, rowStructure, skeleton, tag, zigzag } from './lib/c30-3a-figures.ts';

// Propane (saturated) and propene (unsaturated) as structural formulas, side by side.
const sat = figure(
  'f',
  [
    grouped(rowStructure({ name: 'pa', atoms: [{ symbol: 'C', up: 'H', down: 'H' }, { symbol: 'C', up: 'H', down: 'H' }, { symbol: 'C', up: 'H', down: 'H' }], left: 'H', right: 'H' }), 'propane'),
    tag('pa-name', [1.6, -2.7], '\\text{propane: saturated}', { tone: 'good' }),
    grouped(rowStructure({ name: 'pe', at: [9.6, 0], atoms: [{ symbol: 'C', up: 'H', down: 'H' }, { symbol: 'C', up: 'H' }, { symbol: 'C', up: 'H', down: 'H' }], bonds: [2, 1], right: 'H' }), 'propene'),
    tag('pe-name', [11.2, -2.7], '\\text{propene: unsaturated}', { tone: 'opp' }),
  ],
  340,
);

// Three six-carbon rings as line formulas: cyclohexane, cyclohexene and benzene.
const rings = figure(
  'r',
  [
    skeleton({ name: 'ca', carbons: ringAt('k', 6, [0, 0]), bonds: [...chainBonds('k', 6), { from: 'k6', to: 'k1' }] }),
    tag('ca-name', [0, -1.75], '\\text{cyclohexane}'),
    skeleton({ name: 'ce', carbons: ringAt('k', 6, [3.6, 0]), bonds: [...chainBonds('k', 6, { multiple: { 1: 2 } }), { from: 'k6', to: 'k1' }] }),
    tag('ce-name', [3.6, -1.75], '\\text{cyclohexene}'),
    skeleton({ name: 'bz', carbons: ringAt('k', 6, [7.2, 0]), bonds: [...chainBonds('k', 6), { from: 'k6', to: 'k1' }], circles: [{ id: 'ring', c: [7.2, 0], r: 0.55, tone: 'theta' }] }),
    tag('bz-name', [7.2, -1.75], '\\text{benzene}'),
  ],
  320,
);
const CA = ['r.ca-k1-k2', 'r.ca-k2-k3', 'r.ca-k3-k4', 'r.ca-k4-k5', 'r.ca-k5-k6', 'r.ca-k6-k1', 'r.ca-name'];
const CE = ['r.ce-k1-k2', 'r.ce-k2-k3', 'r.ce-k3-k4', 'r.ce-k4-k5', 'r.ce-k5-k6', 'r.ce-k6-k1', 'r.ce-name'];
const BZ = ['r.bz-k1-k2', 'r.bz-k2-k3', 'r.bz-k3-k4', 'r.bz-k4-k5', 'r.bz-k5-k6', 'r.bz-k6-k1', 'r.bz-name'];

// Hex-1-ene and cyclohexane: both C6H12.
const hex = zigzag('h', 6, { at: [-2.2, 0] });
const c6 = figure(
  'c',
  [
    skeleton({ name: 'he', carbons: hex, bonds: chainBonds('h', 6, { multiple: { 1: 2 }, group: 'all' }) }),
    tag('he-name', [0, -1.15], '\\text{hex-1-ene: an alkene}', { tone: 'opp' }),
    skeleton({ name: 'cy', carbons: ringAt('k', 6, [6, 0.25]), bonds: [...chainBonds('k', 6, { group: 'all' }), { from: 'k6', to: 'k1', group: 'all' }] }),
    tag('cy-name', [6, -1.15], '\\text{cyclohexane: a ring}', { tone: 'adj' }),
  ],
  300,
);

const video: Explainer = {
  id: 'c30-3-1-b',
  lessonId: 'c30-3-1',
  title: 'Organic Compounds and How They Are Drawn, Part 2: Families of Hydrocarbons',
  thumbnailTitle: 'Families of Hydrocarbons',
  thumbnail: 'r',
  summary:
    'Hydrocarbons contain only carbon and hydrogen. Alkanes have single bonds only, alkenes a double bond and alkynes a triple bond; cycloalkanes and cycloalkenes are rings, and aromatic hydrocarbons have a benzene ring. Saturated hydrocarbons have only single bonds between carbons; unsaturated ones have at least one double or triple bond.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Chemical Changes of Organic Compounds · Part 2', title: 'Families of Hydrocarbons', subtitle: 'Single, double and triple bonds, chains and rings' }],
      lines: [
        { say: 'Crude oil and natural gas are mixtures of hydrocarbons: compounds made of just two elements, carbon and hydrogen.', show: 'title' },
        { say: 'In this part, you will sort hydrocarbons into families, and tell saturated hydrocarbons from unsaturated ones.' },
      ],
    },
    {
      chapter: 'Five families',
      layout: 'center',
      main: [
        { kind: 'callout', id: 'def', tone: 'definition', title: 'Hydrocarbon', md: 'A compound of **carbon and hydrogen only**.' },
        {
          kind: 'table',
          id: 't',
          head: ['Family', 'Carbon–carbon bonds', 'Example'],
          rows: [
            ['alkanes', 'single bonds only, in a chain', 'propane, $\\ce{CH3-CH2-CH3}$'],
            ['alkenes', 'a double bond', 'propene, $\\ce{CH2=CH-CH3}$'],
            ['alkynes', 'a triple bond', 'propyne, $\\ce{CH#C-CH3}$'],
            ['cycloalkanes', 'single bonds, in a ring', 'cyclohexane, $\\ce{C6H12}$'],
            ['aromatic hydrocarbons', 'a benzene ring', 'benzene, $\\ce{C6H6}$'],
          ],
        },
      ],
      lines: [
        { say: 'A hydrocarbon is a compound of carbon and hydrogen only. Hydrocarbons are sorted into families by the bonds between their carbon atoms, and by whether the carbons form a chain or a ring.', show: 'def' },
        { say: 'Alkanes have only single bonds, in a chain, like propane.', show: 't.0', focus: 't.0' },
        { say: 'Alkenes have a double bond, like propene. Alkynes have a triple bond, like pro-pine.', caption: 'Alkenes have a double bond, like propene. Alkynes have a triple bond, like propyne.', show: ['t.1', 't.2'], focus: ['t.1', 't.2'] },
        { say: 'Cycloalkanes have single bonds in a ring, like cyclohexane. Aromatic hydrocarbons have a benzene ring.', show: ['t.3', 't.4'], focus: ['t.3', 't.4'] },
      ],
    },
    {
      chapter: 'Saturated and unsaturated',
      layout: 'center',
      main: [
        sat,
        { kind: 'callout', id: 'def', tone: 'definition', title: 'Saturated and unsaturated', md: '**Saturated**: only single bonds between carbons. **Unsaturated**: at least one carbon–carbon double or triple bond.' },
      ],
      lines: [
        { say: 'Compare propane and propene. Propane has only single bonds between its three carbons. It holds as many hydrogen atoms as its carbons can, eight, so it is saturated.', show: ['f.propane', 'f.pa-name'] },
        { say: 'Propene has a double bond, and only six hydrogen atoms. It could hold two more, so it is unsaturated.', show: ['f.propene', 'f.pe-name'], focus: ['f.pe-bond-a1-a2-0', 'f.pe-bond-a1-a2-1'] },
        { say: 'So saturated hydrocarbons, the alkanes and cycloalkanes, have only single bonds between carbons. Unsaturated ones, the alkenes, alkynes and cycloalkenes, have at least one double or triple bond.', show: 'def', focus: 'f' },
      ],
    },
    {
      chapter: 'Rings',
      layout: 'center',
      main: [rings, { kind: 'text', id: 'note', size: 'md', align: 'center', md: '**Aromatic**: a benzene ring, with six electrons shared around the ring.' }],
      lines: [
        { say: 'Carbon atoms can also join into a ring. In these line formulas, each corner is a carbon atom, and the hydrogens are left out.', show: CA },
        { say: 'A ring with only single bonds is a cycloalkane, like cyclohexane. A ring with a double bond is a cycloalkene, like cyclohexene.', show: CE, focus: 'r.ce-k1-k2' },
        { say: 'Benzene, C six H six, is a special ring. Instead of three separate double bonds, its six carbons share six electrons evenly around the whole ring, drawn as a circle.', caption: 'Benzene, C₆H₆, is a special ring. Instead of three separate double bonds, its six carbons share six electrons evenly around the whole ring, drawn as a circle.', show: [...BZ, 'r.bz-ring'], focus: 'r.bz-ring' },
        { say: 'Compounds with a benzene ring are called aromatic, because many of the first ones found had strong smells. The ring is very stable, and does not react the way an alkene does.', show: 'note' },
      ],
    },
    {
      chapter: 'One formula, two families',
      layout: 'center',
      main: [
        c6,
        { kind: 'callout', id: 'oops', tone: 'mistake', title: 'One formula, two families', md: '$\\ce{C6H12}$ fits an unsaturated alkene and a saturated ring. Look at the structure. Bromine water tells them apart: an alkene turns it from orange to colourless.' },
      ],
      lines: [
        { say: 'Be careful with molecular formulas. C six H twelve fits hex-one-ene, an unsaturated alkene, and also cyclohexane, a saturated ring.', caption: 'Be careful with molecular formulas. C₆H₁₂ fits hex-1-ene, an unsaturated alkene, and also cyclohexane, a saturated ring.', show: ['c.he-all', 'c.he-name', 'c.cy-all', 'c.cy-name'] },
        { say: 'So a molecular formula does not always tell you the family. Look at the structure.', show: 'oops' },
        { say: 'In the laboratory, bromine water tells them apart. An alkene quickly turns orange bromine water colourless, while an alkane or a cycloalkane leaves it orange.', focus: ['c.he-h1-h2', 'c.he-h1-h2-ii'] },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q',
          prompt: 'Which describes the hydrocarbon $\\ce{CH2=CH-CH2-CH3}$?',
          choices: ['An alkane: saturated', 'An alkyne: unsaturated', 'A cycloalkene: unsaturated', 'An alkene: unsaturated'],
          answer: 3,
          working: 'The chain has a carbon–carbon double bond, shown by $=$: an alkene. A multiple bond means it could hold more hydrogen, so it is unsaturated.',
        },
      ],
      lines: [
        { say: 'Your turn. Which choice describes the hydrocarbon on the screen? Pause the video and try it.', show: 'q', wait: 6 },
        { say: 'The answer is D: an alkene, and unsaturated. The equals sign is a double bond between two carbons in a chain. Choice C is tempting, but there is no ring: the four carbons form a chain.', show: 'q.answer' },
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
            'A **hydrocarbon** contains only carbon and hydrogen.',
            'Alkanes: single bonds. Alkenes: a double bond. Alkynes: a triple bond. Cycloalkanes and cycloalkenes: rings. Aromatic: a benzene ring.',
            '**Saturated**: single bonds only. **Unsaturated**: at least one double or triple bond.',
            'One molecular formula, such as $\\ce{C6H12}$, can fit two families.',
          ],
        },
      ],
      lines: [
        { say: 'Let’s sum up. A hydrocarbon contains only carbon and hydrogen.', show: 'sum.0' },
        { say: 'Alkanes have single bonds, alkenes a double bond and alkynes a triple bond. Cycloalkanes and cycloalkenes are rings, and aromatics have a benzene ring.', show: 'sum.1' },
        { say: 'Saturated means single bonds only; unsaturated, at least one double or triple bond.', show: 'sum.2' },
        { say: 'And one molecular formula can fit two families, so look at the structure. In part three, you will see four ways to show a molecule. See you there!', show: 'sum.3' },
      ],
    },
  ],
};

export default video;
