import type { Explainer } from '@/video/script.ts';
import { figure } from '@/video/solids.ts';
import { molecular, network } from './lib/c10-3-figures.ts';

// Iodine: small I₂ molecules, strong bonds inside each, weak forces (dashed) between them.
const iodine = figure('mol', [molecular({ cols: 3, rows: 4 })], 460);

// Diamond: carbon atoms, each joined by covalent bonds to four others, in one network.
const diamond = figure('net', [network({ cols: 4, rows: 4, symbol: 'C' })], 460);

const video: Explainer = {
  id: 'c10-3-4-b',
  lessonId: 'c10-3-4',
  title: 'Bonding and Properties, Part 2: Molecules and Giant Networks',
  thumbnailTitle: 'Molecules and Giant Networks',
  thumbnail: 'net',
  summary:
    'A simple molecular substance, such as water, methane or iodine, is made of small molecules with strong covalent bonds inside them but weak forces between them, so it has a low melting point and never conducts. A giant covalent structure, such as diamond or silicon dioxide, is one network of covalent bonds, so it has a very high melting point, is hard, does not conduct and does not dissolve.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Bonding, Names and Formulas · Part 2', title: 'Molecules and Giant Networks', subtitle: 'Two kinds of covalent substance' }],
      lines: [
        { say: 'Candle wax melts in the gentle heat of its own flame, yet diamond can cut glass. Both are held together by covalent bonds, so why are they so different?', show: 'title' },
        { say: 'In this part, you will compare simple molecular substances with giant covalent structures.' },
      ],
    },
    {
      chapter: 'Simple molecular substances',
      layout: 'split',
      leftWidth: 560,
      left: [iodine],
      right: [{ kind: 'callout', id: 'def', tone: 'definition', title: 'Simple molecular substance', md: 'Made of small, separate molecules, such as $\\ce{H2O}$, $\\ce{CO2}$, $\\ce{CH4}$ or $\\ce{I2}$. The atoms inside each molecule are held by **strong** covalent bonds, but the forces **between** the molecules are **weak**.' }],
      lines: [
        { say: 'A simple molecular substance is made of small, separate molecules, such as water, carbon dioxide, methane or iodine.', show: ['def', 'mol.molecules'] },
        { say: 'The atoms inside each molecule are held by strong covalent bonds. But the forces between the molecules, shown dashed, are weak.', show: 'mol.weak', focus: 'mol.weak' },
      ],
    },
    {
      chapter: 'Low melting points',
      layout: 'split',
      leftWidth: 600,
      left: [
        {
          kind: 'table',
          id: 't',
          head: ['Substance', 'At room temperature'],
          rows: [
            ['oxygen, methane', 'gases'],
            ['water', 'liquid'],
            ['iodine', 'solid; melts at 114\u00a0°C'],
            ['sulfur', 'solid; melts at about 115\u00a0°C'],
          ],
        },
      ],
      right: [{ kind: 'callout', id: 'oops', tone: 'mistake', title: 'Melting does not break covalent bonds', md: 'When ice melts or water boils, the molecules move apart, but each one is still $\\ce{H2O}$: no O–H bond breaks.' }],
      lines: [
        { say: 'Melting and boiling only separate the molecules from each other. The covalent bonds inside the molecules do not break.' },
        { say: 'The weak forces between molecules are easily overcome, so many simple molecular substances are gases or liquids at room temperature: oxygen, methane, water.', show: ['t.0', 't.1'], focus: ['t.0', 't.1'] },
        { say: 'Solid ones melt at fairly low temperatures: iodine at one hundred and fourteen degrees Celsius, and sulfur at about one hundred and fifteen.', show: ['t.2', 't.3'], focus: ['t.2', 't.3'] },
        { say: 'So when ice melts or water boils, the water molecules move apart, but each one is still H two O. No bond between oxygen and hydrogen breaks.', caption: 'So when ice melts or water boils, the water molecules move apart, but each one is still H₂O. No O–H bond breaks.', show: 'oops', focus: 't' },
      ],
    },
    {
      chapter: 'Conducting and dissolving',
      layout: 'center',
      main: [
        {
          kind: 'bullets',
          id: 'b',
          items: [
            '**Do not conduct**, as a solid, a liquid or dissolved: the molecules have no overall charge, and their electrons are held in bonds.',
            '**Solubility varies:** sugar and ethanol dissolve in water; wax does not, and iodine hardly at all.',
            'A sugar solution **does not conduct**: the sugar stays as neutral molecules.',
          ],
        },
      ],
      lines: [
        { say: 'Simple molecular substances do not conduct. The molecules have no overall charge, and their electrons are held in bonds, so nothing can carry a current, whether the substance is solid, liquid or dissolved.', show: 'b.0' },
        { say: 'Their solubility varies. Sugar and ethanol dissolve in water, while wax does not, and iodine hardly at all.', show: 'b.1' },
        { say: 'And a sugar solution still does not conduct, because the sugar stays as neutral molecules.', show: 'b.2' },
      ],
    },
    {
      chapter: 'Giant covalent structures',
      layout: 'split',
      leftWidth: 520,
      left: [diamond],
      right: [
        { kind: 'callout', id: 'def', tone: 'definition', title: 'Giant covalent structure', md: 'A huge network of atoms, every one joined to its neighbours by covalent bonds, with no separate molecules: diamond, silicon dioxide.' },
        { kind: 'bullets', id: 'b', items: ['very high melting point', 'hard', 'does not conduct', 'insoluble in water'] },
      ],
      lines: [
        { say: 'A giant covalent structure is a huge network of atoms, every one joined to its neighbours by covalent bonds, with no separate molecules.', show: ['def', 'net.bonds', 'net.atoms'] },
        { say: 'Diamond is a network of carbon atoms, each bonded to four others. Silicon dioxide, found as quartz and in sand, is a network of silicon and oxygen atoms.', focus: 'net.bonds' },
        { say: 'To melt one, many strong covalent bonds must break, not just weak forces between molecules. So diamond and quartz stay solid far above one thousand degrees Celsius.', show: 'b.0' },
        { say: 'They are hard. Diamond is the hardest natural substance, which is why diamond-tipped blades can cut glass and rock.', show: 'b.1' },
        { say: 'They do not conduct, because every outer electron is held in a bond between two atoms. And they do not dissolve: water cannot break the network apart.', show: ['b.2', 'b.3'] },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q',
          prompt: 'Why does diamond have a much higher melting point than iodine?',
          choices: [
            'Diamond has ionic bonds, which are stronger.',
            'Melting iodine breaks its covalent bonds; diamond’s are too strong to break.',
            'Diamond has free electrons that hold its atoms together.',
            'Melting diamond breaks strong covalent bonds; melting iodine only separates molecules.',
          ],
          answer: 3,
          working: 'Diamond is a giant covalent structure and iodine is simple molecular.',
        },
      ],
      lines: [
        { say: 'Your turn. Why does diamond have a much higher melting point than iodine? Pause the video and try it.', show: 'q', wait: 6 },
        { say: 'The answer is D. Diamond is a giant covalent network, so melting it breaks many strong covalent bonds. Iodine is simple molecular, so melting it only separates molecules held by weak forces. Choice B is the common mistake: melting iodine does not break its covalent bonds.', show: 'q.answer' },
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
            'Simple molecular: small molecules, with strong bonds inside but weak forces between them.',
            'So a low melting point, and it never conducts. Melting does not break covalent bonds.',
            'Giant covalent (diamond, silicon dioxide): one network of covalent bonds.',
            'So a very high melting point; hard, does not conduct, insoluble.',
          ],
        },
      ],
      lines: [
        { say: 'Let’s sum up. A simple molecular substance is made of small molecules, with strong bonds inside them but weak forces between them.', show: 'sum.0' },
        { say: 'So it has a low melting point, and it never conducts.', show: 'sum.1' },
        { say: 'A giant covalent structure, such as diamond, is one network of covalent bonds.', show: 'sum.2' },
        { say: 'So it has a very high melting point, it is hard, and it does not conduct or dissolve. In part three, you will meet graphite and the metals. See you there!', show: 'sum.3' },
      ],
    },
  ],
};

export default video;
