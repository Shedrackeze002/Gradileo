import type { Explainer } from '@/video/script.ts';
import { lewis } from '@/video/chem.ts';
import { figure } from '@/video/solids.ts';

// Phosphorus trichloride: phosphorus in the centre with one lone pair, single bonds to three
// chlorine atoms, each with three lone pairs.
const pcl3 = figure('m', [
  lewis({
    name: 'p',
    atoms: [
      { id: 'P', symbol: 'P', at: [0, 0], dots: [2, 0, 0, 0] },
      { id: 'Cl1', symbol: 'Cl', at: [-1.6, 0], dots: [2, 0, 2, 2] },
      { id: 'Cl2', symbol: 'Cl', at: [1.6, 0], dots: [2, 2, 2, 0] },
      { id: 'Cl3', symbol: 'Cl', at: [0, -1.6], dots: [0, 2, 2, 2] },
    ],
    bonds: [
      { from: 'P', to: 'Cl1' },
      { from: 'P', to: 'Cl2' },
      { from: 'P', to: 'Cl3' },
    ],
  }),
]);

// The ammonium ion (four N–H bonds) and the hydroxide ion (one O–H bond, three lone pairs on
// oxygen), each in square brackets with its charge.
const ions = figure('m', [
  lewis({
    name: 'a',
    atoms: [
      { id: 'N', symbol: 'N', at: [0, 0] },
      { id: 'H1', symbol: 'H', at: [0, 1.6] },
      { id: 'H2', symbol: 'H', at: [1.6, 0] },
      { id: 'H3', symbol: 'H', at: [0, -1.6] },
      { id: 'H4', symbol: 'H', at: [-1.6, 0] },
    ],
    bonds: [
      { from: 'N', to: 'H1' },
      { from: 'N', to: 'H2' },
      { from: 'N', to: 'H3' },
      { from: 'N', to: 'H4' },
    ],
    charge: '+',
  }),
  lewis({
    name: 'h',
    atoms: [
      { id: 'O', symbol: 'O', at: [-0.8, -4.4], dots: [2, 0, 2, 2] },
      { id: 'H', symbol: 'H', at: [0.8, -4.4] },
    ],
    bonds: [{ from: 'O', to: 'H' }],
    charge: '-',
  }),
]);

const video: Explainer = {
  id: 'c20-1-5-c',
  lessonId: 'c20-1-5',
  title: 'Lewis Structures, Part 3: Drawing a Lewis Structure',
  thumbnailTitle: 'Drawing a Lewis Structure',
  thumbnail: 'm',
  summary:
    'To draw a Lewis structure, count the valence electrons, choose the central atom (never hydrogen), join the outer atoms with single bonds, complete their octets with lone pairs and put any leftover pairs on the central atom. Phosphorus trichloride has 26 electrons: 3 bonding pairs and 10 lone pairs, and bonding pairs plus lone pairs always equal half the electrons.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'The Diversity of Matter and Chemical Bonding · Part 3', title: 'Drawing a Lewis Structure', subtitle: 'Six steps for any molecule or ion' }],
      lines: [
        { say: 'You can count valence electrons, and you know what bonding pairs and lone pairs are. Now put them together.', show: 'title' },
        { say: 'In this part, you will draw Lewis structures in six steps, and check them with one simple sum.' },
      ],
    },
    {
      chapter: 'Six steps',
      layout: 'center',
      main: [
        {
          kind: 'bullets',
          id: 'steps',
          items: [
            '1. **Count** the valence electrons, and halve the count to find the pairs.',
            '2. **Choose the central atom**: usually the least electronegative. Never hydrogen.',
            '3. **Join** each outer atom to the central atom with a single bond.',
            '4. **Complete the octets of the outer atoms** with lone pairs (none on hydrogen).',
            '5. **Put any remaining pairs on the central atom** as lone pairs.',
            '6. If the central atom **still lacks an octet**, make double or triple bonds.',
          ],
        },
      ],
      lines: [
        { say: 'Here are the steps for any molecule or polyatomic ion. First, count the valence electrons, and halve the count to find the pairs.', show: 'steps.0' },
        { say: 'Second, choose the central atom: usually the least electronegative, often the one there is only one of. Hydrogen is never central, because it forms only one bond.', show: 'steps.1' },
        { say: 'Third, join each outer atom to it with a single bond. Fourth, complete the octets of the outer atoms with lone pairs. Hydrogen gets none.', show: ['steps.2', 'steps.3'] },
        { say: 'Fifth, put any remaining pairs on the central atom. Sixth, if it still lacks an octet, make double or triple bonds, as you will see in part four.', show: ['steps.4', 'steps.5'] },
      ],
    },
    {
      chapter: 'Phosphorus trichloride',
      layout: 'split',
      leftWidth: 560,
      left: [pcl3],
      right: [
        {
          kind: 'math',
          id: 's',
          size: 'md',
          align: 'left',
          lines: [
            '5 + 3 \\times 7 = 26\\text{: } 13 \\text{ pairs}',
            '\\text{3 bonds: } 3 \\text{ pairs}',
            '\\text{Cl lone pairs: } 3 \\times 3 = 9',
            '3 + 9 = 12 \\text{ pairs so far}',
            '\\text{1 pair left: on P}',
            '\\text{Check: } 3 + 10 = 13',
          ],
        },
      ],
      lines: [
        { say: 'Let’s draw phosphorus trichloride, P C L three. Five plus three times seven is twenty-six electrons, or thirteen pairs.', caption: 'Let’s draw phosphorus trichloride, PCl₃. Five plus three times seven is twenty-six electrons, or thirteen pairs.', show: 's.0', focus: 's.0' },
        { say: 'Phosphorus is less electronegative than chlorine, so it goes in the centre. Three single bonds use three pairs.', show: ['m.p-P', 'm.p-Cl1', 'm.p-Cl2', 'm.p-Cl3', 'm.p-bond-P-Cl1', 'm.p-bond-P-Cl2', 'm.p-bond-P-Cl3', 's.1'], focus: 's.1' },
        { say: 'Each chlorine needs three lone pairs to complete its octet. That is nine lone pairs, and twelve pairs so far.', show: ['m.p-Cl1-dots', 'm.p-Cl2-dots', 'm.p-Cl3-dots', 's.2', 's.3'], focus: ['m.p-Cl1-dots', 'm.p-Cl2-dots', 'm.p-Cl3-dots', 's.2', 's.3'] },
        { say: 'One pair is left. It goes on phosphorus, which then has its octet: three bonds and one lone pair. In all, there are three bonding pairs and ten lone pairs.', show: ['m.p-P-dots', 's.4'], focus: ['m.p-P-dots', 's.4'] },
        { say: 'Now check. Bonding pairs plus lone pairs must equal half the valence electrons. Three plus ten is thirteen, half of twenty-six. If the numbers disagree, an electron is missing or counted twice.', show: 's.5', focus: 's.5' },
      ],
    },
    {
      chapter: 'More molecules',
      layout: 'center',
      main: [
        {
          kind: 'table',
          id: 't',
          head: ['Molecule', 'Electrons', 'Bonding pairs', 'Lone pairs', 'On the central atom'],
          rows: [
            ['$\\ce{CH4}$', '8', '4', '0', '0'],
            ['$\\ce{NH3}$', '8', '3', '1', '1'],
            ['$\\ce{H2O}$', '8', '2', '2', '2'],
            ['$\\ce{CH3Cl}$', '14', '4', '3', '0'],
            ['$\\ce{OF2}$', '20', '2', '8', '2'],
            ['$\\ce{PCl3}$', '26', '3', '10', '1'],
            ['$\\ce{CCl4}$', '32', '4', '12', '0'],
          ],
        },
      ],
      lines: [
        { say: 'The same steps give these molecules, which all have single bonds only.', show: 't' },
        { say: 'Oxygen difluoride, for example, has twenty electrons, or ten pairs: two bonds and eight lone pairs.', focus: 't.4' },
        { say: 'Look at the last column. Carbon keeps no lone pairs, nitrogen and phosphorus keep one, and oxygen keeps two. Each central atom ends with an octet.', focus: 't' },
      ],
    },
    {
      chapter: 'Ions in brackets',
      layout: 'split',
      leftWidth: 560,
      left: [ions],
      right: [
        {
          kind: 'math',
          id: 's',
          size: 'md',
          align: 'left',
          lines: ['\\ce{[NH4]+}\\text{: } 5 + 4 - 1 = 8', '\\text{4 bonds, 0 lone pairs}', '\\ce{[OH]-}\\text{: } 6 + 1 + 1 = 8', '\\text{1 bond, 3 lone pairs}'],
        },
      ],
      lines: [
        { say: 'Ions follow the same steps. Then draw the finished ion in square brackets, with its charge outside.' },
        { say: 'The ammonium ion, N H four plus, has eight electrons: four nitrogen–hydrogen bonds, and no lone pairs.', caption: 'The ammonium ion, NH₄⁺, has eight electrons: four nitrogen–hydrogen bonds, and no lone pairs.', show: ['m.a-N', 'm.a-H1', 'm.a-H2', 'm.a-H3', 'm.a-H4', 'm.a-bond-N-H1', 'm.a-bond-N-H2', 'm.a-bond-N-H3', 'm.a-bond-N-H4', 'm.a-bracket', 's.0', 's.1'], focus: ['s.0', 's.1'] },
        { say: 'The hydroxide ion, O H minus, also has eight: one oxygen–hydrogen bond, and three lone pairs on the oxygen.', caption: 'The hydroxide ion, OH⁻, also has eight: one oxygen–hydrogen bond, and three lone pairs on the oxygen.', show: ['m.h-O', 'm.h-H', 'm.h-bond-O-H', 'm.h-O-dots', 'm.h-bracket', 's.2', 's.3'], focus: ['s.2', 's.3'] },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q',
          prompt: 'Chloroform, $\\ce{CHCl3}$, has carbon as its central atom, with single bonds only. (Valence electrons: C 4, H 1, Cl 7.) How many lone pairs are in its Lewis structure, in all?',
          choices: ['$12$', '$13$', '$10$', '$9$'],
          answer: 3,
          working: '$4 + 1 + 3 \\times 7 = 26$ electrons, or 13 pairs. Four bonds use 4 pairs; each Cl takes 3 lone pairs, $3 \\times 3 = 9$. That uses all 13, and carbon has its octet. Check: $4 + 9 = 13$.',
        },
      ],
      lines: [
        { say: 'Your turn. Chloroform, C H C L three, has carbon as its central atom, with single bonds only. How many lone pairs are in its Lewis structure, in all? Pause the video and try it.', caption: 'Your turn. Chloroform, CHCl₃, has carbon as its central atom, with single bonds only. How many lone pairs are in its Lewis structure, in all? Pause the video and try it.', show: 'q', wait: 6 },
        { say: 'The answer is D, nine. Chloroform has twenty-six electrons, or thirteen pairs. Four bonds use four, and three lone pairs on each chlorine use the other nine. Choice B, thirteen, counts the bonds as well.', show: 'q.answer' },
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
            'Count the electrons, choose the central atom (never H) and join the outer atoms with single bonds.',
            'Complete the outer octets with lone pairs, then put any leftover pairs on the central atom.',
            'Check: bonding pairs + lone pairs = total valence electrons ÷ 2.',
            'Draw an ion in square brackets with its charge: $\\ce{[NH4]+}$, $\\ce{[OH]-}$.',
          ],
        },
      ],
      lines: [
        { say: 'Let’s sum up. Count the electrons, choose the central atom, never hydrogen, and join the outer atoms with single bonds.', show: 'sum.0' },
        { say: 'Complete the outer octets, then put any leftover pairs on the central atom.', show: 'sum.1' },
        { say: 'Check that bonding pairs plus lone pairs equal half the electrons.', show: 'sum.2' },
        { say: 'And draw an ion in brackets, with its charge. In part four, you will fix a central atom that is still short of an octet. See you there!', show: 'sum.3' },
      ],
    },
  ],
};

export default video;
