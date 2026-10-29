import type { Explainer } from '@/video/script.ts';
import { lewis } from '@/video/chem.ts';
import { figure, type Part } from '@/video/solids.ts';
import { grouped, rowStructure, tag } from './lib/c30-3a-figures.ts';

const CH2 = { symbol: 'C', up: 'H', down: 'H' } as const;

// A hydrogen bond (dashed) from the –OH hydrogen of ethanol to the oxygen of a water molecule.
const hbond: Part = {
  points: { 'hb-a': [5.25, 0], 'hb-b': [7.95, 0] },
  items: [{ kind: 'line', id: 'hb', from: 'hb-a', to: 'hb-b', dashed: true, tone: 'theta', weight: 3, label: '\\begin{gathered}\\text{hydrogen}\\\\ \\text{bond}\\end{gathered}', labelSide: 'left' }],
};
const water = figure(
  'w',
  [
  grouped(rowStructure({ name: 'et', atoms: [CH2, CH2, { symbol: 'O', tone: 'bad' }, { symbol: 'H' }], left: 'H' }), 'ethanol'),
  tag('et-name', [1.6, -2.5], '\\text{ethanol}', { group: 'ethanol' }),
  grouped(
    lewis({
      name: 'wa',
      atoms: [
        { id: 'O', symbol: 'O', at: [8.4, 0], tone: 'adj' },
        { id: 'H1', symbol: 'H', at: [9.2, 1.39] },
        { id: 'H2', symbol: 'H', at: [9.2, -1.39] },
      ],
      bonds: [
        { from: 'O', to: 'H1' },
        { from: 'O', to: 'H2' },
      ],
    }),
    'water',
  ),
  tag('wa-name', [8.8, -2.5], '\\text{water}', { group: 'water' }),
  hbond,
  ],
  290,
);

const video: Explainer = {
  id: 'c30-3-4-d',
  lessonId: 'c30-3-4',
  title: 'Functional Groups, Part 4: Boiling Points and Solubility',
  thumbnailTitle: 'Boiling Points and Solubility',
  thumbnail: 'w',
  summary:
    'For molecules of similar size, boiling points rise from alkanes (dispersion forces only), to polar ethers, aldehydes and ketones (dipole–dipole forces), to alcohols and carboxylic acids, which hydrogen bond. Small alcohols and acids dissolve in water because they hydrogen bond with it; hydrocarbons and haloalkanes do not, and a longer chain makes a compound less soluble.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Chemical Changes of Organic Compounds · Part 4', title: 'Boiling Points and Solubility', subtitle: 'What the functional group does' }],
      lines: [
        { say: 'Butane is a gas at room temperature, but propan-one-ol, a molecule of about the same size, is a liquid that boils at about ninety-seven degrees Celsius.', caption: 'Butane is a gas at room temperature, but propan-1-ol, a molecule of about the same size, is a liquid that boils at about 97 °C.', show: 'title' },
        { say: 'In this part, you will use functional groups to explain boiling points and solubility in water.' },
      ],
    },
    {
      chapter: 'Forces between molecules',
      layout: 'center',
      main: [
        {
          kind: 'bullets',
          id: 'f',
          items: [
            '**London dispersion forces** act between all molecules, and are stronger for larger molecules.',
            '**Dipole–dipole forces** act between polar molecules, such as those with a $\\ce{C=O}$ group or a halogen atom.',
            '**Hydrogen bonds** form when an H bonded to O or N is attracted to an O or N of another molecule: alcohols, carboxylic acids and amines.',
          ],
        },
      ],
      lines: [
        { say: 'Boiling points and solubility depend on the forces between molecules, which you met in Grade eleven. London dispersion forces act between all molecules, and are stronger for larger molecules.', caption: 'Boiling points and solubility depend on the forces between molecules, which you met in Grade 11. London dispersion forces act between all molecules, and are stronger for larger molecules.', show: 'f.0' },
        { say: 'Dipole-dipole forces act between polar molecules, such as those with a carbon-oxygen double bond or a halogen atom.', show: 'f.1' },
        { say: 'And hydrogen bonds form when a hydrogen atom bonded to oxygen or nitrogen is attracted to an oxygen or nitrogen atom of another molecule. Alcohols, carboxylic acids and amines can hydrogen bond to each other.', show: 'f.2' },
      ],
    },
    {
      chapter: 'Same size, different groups',
      layout: 'center',
      main: [
        {
          kind: 'table',
          id: 't',
          head: ['Compound', 'Family', 'Molar mass (g/mol)', 'Boiling point'],
          rows: [
            ['butane', 'alkane', '58.14', 'about $-1^\\circ\\text{C}$'],
            ['methoxyethane', 'ether', '60.11', 'about $7^\\circ\\text{C}$'],
            ['propanal', 'aldehyde', '58.09', 'about $49^\\circ\\text{C}$'],
            ['propanone', 'ketone', '58.09', 'about $56^\\circ\\text{C}$'],
            ['propan-1-ol', 'alcohol', '60.11', 'about $97^\\circ\\text{C}$'],
            ['ethanoic acid', 'carboxylic acid', '60.06', 'about $118^\\circ\\text{C}$'],
          ],
        },
      ],
      lines: [
        { say: 'To see the effect of the functional group alone, compare molecules of about the same size, so that their dispersion forces are about the same. These six all have molar masses near sixty grams per mole.', show: 't.0' },
        { say: 'The alkane, butane, has only dispersion forces. It boils at about minus one degree Celsius.', caption: 'The alkane, butane, has only dispersion forces. It boils at about −1 °C.', focus: 't.0' },
        { say: 'The ether, aldehyde and ketone are polar, so dipole-dipole forces raise their boiling points, to between seven and fifty-six degrees.', caption: 'The ether, aldehyde and ketone are polar, so dipole–dipole forces raise their boiling points, to between 7 and 56 °C.', show: ['t.1', 't.2', 't.3'], focus: ['t.1', 't.2', 't.3'] },
        { say: 'The alcohol and the acid can hydrogen bond, so they boil highest. The acid boils at about one hundred eighteen degrees: pairs of acid molecules hold together by two hydrogen bonds.', caption: 'The alcohol and the acid can hydrogen bond, so they boil highest. The acid boils at about 118 °C: pairs of acid molecules hold together by two hydrogen bonds.', show: ['t.4', 't.5'], focus: ['t.4', 't.5'] },
      ],
    },
    {
      chapter: 'Solubility in water',
      layout: 'center',
      main: [
        water,
        {
          kind: 'bullets',
          id: 's',
          items: [
            '**Like dissolves like.**',
            'Methanol, ethanol and ethanoic acid hydrogen bond with water: they mix in any proportion.',
            'Hydrocarbons and haloalkanes cannot, and hardly dissolve.',
            'A longer chain, less soluble: butan-1-ol dissolves only partly, hexan-1-ol barely.',
          ],
        },
      ],
      lines: [
        { say: 'Solubility in water follows the same idea: like dissolves like.', show: ['s.0', 'w.ethanol', 'w.water'] },
        { say: 'Small molecules that can hydrogen bond with water, such as methanol, ethanol and ethanoic acid, mix with water in any proportion.', show: ['s.1', 'w.hb'], focus: 'w.hb' },
        { say: 'Hydrocarbons and haloalkanes cannot hydrogen bond with water, and hardly dissolve.', show: 's.2' },
        { say: 'Along a family, a longer hydrocarbon chain makes a compound less soluble. Butan-one-ol dissolves only partly, and hexan-one-ol barely at all.', caption: 'Along a family, a longer hydrocarbon chain makes a compound less soluble. Butan-1-ol dissolves only partly, and hexan-1-ol barely at all.', show: 's.3' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q',
          prompt: 'These compounds have similar molar masses: pentane $72.17\\ \\text{g/mol}$, butanal $72.12\\ \\text{g/mol}$, butan-1-ol $74.14\\ \\text{g/mol}$ and propanoic acid $74.09\\ \\text{g/mol}$. Which has the **lowest** boiling point?',
          choices: ['Pentane', 'Butanal', 'Butan-1-ol', 'Propanoic acid'],
          answer: 0,
          working: 'With similar molar masses, the dispersion forces are similar. Pentane, an alkane, has only dispersion forces; butanal adds dipole–dipole forces, and butan-1-ol and propanoic acid hydrogen bond. So pentane boils lowest.',
        },
      ],
      lines: [
        { say: 'Your turn. These four compounds have similar molar masses. Which has the lowest boiling point? Pause the video and try it.', show: 'q', wait: 6 },
        { say: 'The answer is A, pentane. It is an alkane, with only dispersion forces between its molecules. Butanal adds dipole-dipole forces, and the alcohol and the acid hydrogen bond, so they boil higher.', caption: 'The answer is A, pentane. It is an alkane, with only dispersion forces between its molecules. Butanal adds dipole–dipole forces, and the alcohol and the acid hydrogen bond, so they boil higher.', show: 'q.answer' },
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
            'Compare boiling points for molecules of similar size.',
            'Alkanes lowest; polar ethers, aldehydes and ketones higher; alcohols and carboxylic acids, which hydrogen bond, highest.',
            'Small alcohols and acids dissolve in water; hydrocarbons and haloalkanes do not.',
            'A longer carbon chain makes a compound less soluble.',
          ],
        },
      ],
      lines: [
        { say: 'Let’s sum up. To see what a functional group does, compare molecules of similar size.', show: 'sum.0' },
        { say: 'Alkanes boil lowest, the polar ethers, aldehydes and ketones higher, and alcohols and carboxylic acids, which hydrogen bond, highest.', show: 'sum.1' },
        { say: 'Small alcohols and acids dissolve in water because they hydrogen bond with it. Hydrocarbons and haloalkanes do not.', show: 'sum.2' },
        { say: 'And a longer carbon chain makes a compound less soluble. That completes this lesson on functional groups.', show: 'sum.3' },
      ],
    },
  ],
};

export default video;
