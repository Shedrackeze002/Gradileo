import type { Explainer } from '@/video/script.ts';
import { lewis } from '@/video/chem.ts';
import { figure } from '@/video/solids.ts';
import { pick } from './lib/pick.ts';
import { tag } from '@/content/chem20/videos/lib/c20-1b-figures.ts';
import counting from '@/content/chem20/videos/c20-1-5.ts';
import multiple from '@/content/chem20/videos/c20-1-5-d.ts';

// Exam question for Chemistry 20 lesson 1.5 (Lewis structures): draw carbon tetrachloride and
// phosgene. The question is OpenStax Chemistry 2e's own, word for word (end-of-chapter exercise 37,
// section 7.3, CC BY-NC-SA 4.0). The book's answer: CCl4 has carbon in the centre with four single
// bonds and three lone pairs on each chlorine; Cl2CO has carbon in the centre, single bonds to two
// chlorines (three lone pairs each) and a double bond to oxygen (two lone pairs).
//
// The pictures: the lessons' own carbon atom sharing a pair with each of four hydrogen atoms and two
// oxygen atoms sharing two pairs (src/video/atoms.ts), then the two Lewis structures built one part
// at a time, phosgene first with single bonds (carbon short of an octet) and then with C=O.

const QUESTION =
  'Carbon tetrachloride was formerly used in fire extinguishers for electrical fires. It is no longer used for this purpose because of the formation of the toxic gas phosgene, Cl2CO. Write the Lewis structures for carbon tetrachloride and phosgene.';

// Carbon tetrachloride: carbon in the centre, four single bonds, three lone pairs on each chlorine.
const ccl4 = figure(
  'm',
  [
    lewis({
      name: 'c',
      atoms: [
        { id: 'C', symbol: 'C', at: [0, 0] },
        { id: 'Cl1', symbol: 'Cl', at: [0, 1.6], dots: [2, 2, 0, 2] },
        { id: 'Cl2', symbol: 'Cl', at: [1.6, 0], dots: [2, 2, 2, 0] },
        { id: 'Cl3', symbol: 'Cl', at: [0, -1.6], dots: [0, 2, 2, 2] },
        { id: 'Cl4', symbol: 'Cl', at: [-1.6, 0], dots: [2, 0, 2, 2] },
      ],
      bonds: [
        { from: 'C', to: 'Cl1' },
        { from: 'C', to: 'Cl2' },
        { from: 'C', to: 'Cl3' },
        { from: 'C', to: 'Cl4' },
      ],
    }),
  ],
  460,
);

// Phosgene twice, side by side: single bonds only (carbon has 6 electrons), then with C=O.
const cocl2 = figure(
  'm',
  [
    lewis({
      name: 's',
      atoms: [
        { id: 'C', symbol: 'C', at: [-3.2, 0] },
        { id: 'O', symbol: 'O', at: [-3.2, 1.6], dots: [2, 2, 0, 2] },
        { id: 'Cl1', symbol: 'Cl', at: [-4.8, 0], dots: [2, 0, 2, 2] },
        { id: 'Cl2', symbol: 'Cl', at: [-1.6, 0], dots: [2, 2, 2, 0] },
      ],
      bonds: [
        { from: 'C', to: 'O' },
        { from: 'C', to: 'Cl1' },
        { from: 'C', to: 'Cl2' },
      ],
    }),
    tag({ id: 's-note', at: [-3.2, -1.3], tex: '\\text{C has only 6 electrons}', tone: 'bad' }),
    lewis({
      name: 'd',
      atoms: [
        { id: 'C', symbol: 'C', at: [3.2, 0] },
        { id: 'O', symbol: 'O', at: [3.2, 1.6], dots: [2, 2, 0, 0] },
        { id: 'Cl1', symbol: 'Cl', at: [1.6, 0], dots: [2, 0, 2, 2] },
        { id: 'Cl2', symbol: 'Cl', at: [4.8, 0], dots: [2, 2, 2, 0] },
      ],
      bonds: [
        { from: 'C', to: 'O', order: 2 },
        { from: 'C', to: 'Cl1' },
        { from: 'C', to: 'Cl2' },
      ],
    }),
    tag({ id: 'd-note', at: [3.2, -1.3], tex: '\\text{C has 8 electrons}', tone: 'good' }),
  ],
  420,
);

const video: Explainer = {
  id: 'xq-c20-1-5',
  lessonId: '',
  exam: {
    lesson: 'c20-1-5',
    source: 'OpenStax, Chemistry 2e, end-of-chapter exercise 37, section 7.3, Lewis Symbols and Structures',
    licence: 'CC BY-NC-SA 4.0, access for free at openstax.org',
    url: 'https://openstax.org/books/chemistry-2e/pages/7-exercises',
    question: QUESTION,
  },
  title: 'Exam Question: Lewis Structures of Carbon Tetrachloride and Phosgene. Lewis Structures',
  thumbnailTitle: 'Draw Two Lewis Structures',
  thumbnail: 'm',
  summary:
    'A real test question, solved one small step at a time: we draw the Lewis structures of carbon tetrachloride, CCl4, and the toxic gas phosgene, Cl2CO. We count the valence electrons, join the atoms with single bonds, complete the octets, and turn a lone pair into a C=O double bond when carbon is left short, after watching atoms share one and two pairs of electrons.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Exam Question', title: 'Draw Two Lewis Structures', subtitle: 'Counting and placing electrons, step by step' }],
      lines: [
        { say: 'In this video, we solve a real test question that asks for two Lewis structures. We will take it one small step at a time, so that every step makes sense.', show: 'title' },
        { say: 'The question comes from the free OpenStax Chemistry textbook. You will see where it comes from at the bottom of the screen the whole way through.' },
      ],
    },
    {
      chapter: 'The question',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q',
          kicker: 'The question',
          prompt: 'Carbon tetrachloride was formerly used in fire extinguishers for electrical fires. It is no longer used for this purpose because of the formation of the toxic gas phosgene, $\\ce{Cl2CO}$. Write the Lewis structures for carbon tetrachloride and phosgene.',
          answer: 'Drawn in the steps below',
        },
      ],
      lines: [
        { say: 'Here is the question, exactly as it was printed.', show: 'q' },
        {
          say: 'Carbon tetrachloride was formerly used in fire extinguishers for electrical fires. It is no longer used for this purpose because of the formation of the toxic gas phosgene, C l two C O. Write the Lewis structures for carbon tetrachloride and phosgene.',
          caption: 'Carbon tetrachloride was formerly used in fire extinguishers for electrical fires. It is no longer used for this purpose because of the formation of the toxic gas phosgene, Cl₂CO. Write the Lewis structures for carbon tetrachloride and phosgene.',
        },
        { say: 'If you would like to try it first, pause the video now.', wait: 5 },
      ],
    },
    {
      chapter: 'What is it asking?',
      layout: 'center',
      main: [{ kind: 'text', id: 'plain', size: 'lg', md: 'Draw $\\ce{CCl4}$ and $\\ce{Cl2CO}$ with every **valence electron** in place' }],
      lines: [
        { say: 'We must draw two molecules, showing every valence electron, either in a bond or as a lone pair.', show: 'plain' },
        { say: 'Carbon tetrachloride is C C l four: one carbon and four chlorines. Phosgene is one carbon, two chlorines and one oxygen.', caption: 'Carbon tetrachloride is CCl₄: one carbon and four chlorines. Phosgene is one carbon, two chlorines and one oxygen.' },
      ],
    },
    {
      chapter: 'What you need to know',
      layout: 'center',
      main: [pick(counting, 'ch4')],
      lines: [
        { say: 'Here is what we need. A carbon atom has four valence electrons, in its outer level.', show: 'ch4' },
        { say: 'Watch it share one pair with each of four other atoms. Now its outer level holds eight, an octet. Each shared pair is one bond, drawn as a line.', play: 'ch4.share' },
      ],
    },
    {
      chapter: 'Sharing two pairs',
      layout: 'center',
      main: [pick(multiple, 'o2')],
      lines: [
        { say: 'Sometimes one pair is not enough. Two oxygen atoms have six outer electrons each.', show: 'o2' },
        { say: 'They share two pairs, a double bond, and each ends up with eight. We will need that for phosgene.', play: 'o2.share' },
      ],
    },
    {
      chapter: 'The plan',
      layout: 'center',
      main: [
        {
          kind: 'bullets',
          id: 'plan',
          items: ['Count the **valence electrons**, and halve for pairs', 'Carbon in the **centre**, single bonds to the others', 'Complete the outer **octets** with lone pairs', 'Carbon short? Make a **double bond**'],
        },
      ],
      lines: [
        { say: 'Here is the plan, for each molecule. First, count the valence electrons, and halve the total to get the number of pairs.', show: 'plan.0' },
        { say: 'Second, put carbon in the centre, the atom that forms the most bonds, and join the other atoms to it with single bonds.', show: 'plan.1' },
        { say: 'Third, give each outer atom lone pairs until it has eight electrons.', show: 'plan.2' },
        { say: 'Fourth, if carbon still has fewer than eight, turn a lone pair into a second bond.', show: 'plan.3' },
      ],
    },
    {
      chapter: 'Step 1: Carbon tetrachloride',
      layout: 'split',
      leftWidth: 560,
      left: [ccl4],
      right: [
        {
          kind: 'math',
          id: 'c',
          size: 'md',
          align: 'left',
          lines: ['4 + 4 \\times 7 = 32\\text{: } 16 \\text{ pairs}', '4 \\text{ bonds} + 12 \\text{ lone pairs} = 16', '\\text{C: } 4 \\times 2 = 8 \\;\\good{\\checkmark}'],
        },
      ],
      lines: [
        { say: 'Step one: carbon tetrachloride. Carbon is in group 14 and brings 4 valence electrons, and each chlorine, in group 17, brings 7. 4 plus 4 times 7 is 32 electrons, which is 16 pairs.', show: 'c.0', focus: 'c.0' },
        { say: 'Carbon goes in the centre, with a single bond to each chlorine. That uses 4 pairs.', show: ['m.c-C', 'm.c-Cl1', 'm.c-Cl2', 'm.c-Cl3', 'm.c-Cl4', 'm.c-bond-C-Cl1', 'm.c-bond-C-Cl2', 'm.c-bond-C-Cl3', 'm.c-bond-C-Cl4'] },
        { say: 'Each chlorine needs three lone pairs to reach eight. That is 12 lone pairs, and 4 plus 12 is all 16 pairs.', show: ['m.c-Cl1-dots', 'm.c-Cl2-dots', 'm.c-Cl3-dots', 'm.c-Cl4-dots', 'c.1'], focus: 'c.1' },
        { say: 'Carbon has four bonds, which is eight electrons. Every atom has an octet, so carbon tetrachloride is done.', show: 'c.2', focus: 'c.2' },
      ],
    },
    {
      chapter: 'Step 2: Phosgene',
      layout: 'center',
      main: [
        cocl2,
        { kind: 'math', id: 'p', size: 'md', lines: ['4 + 2 \\times 7 + 6 = 24\\text{: } 12 \\text{ pairs}', '3 \\text{ bonds} + 9 \\text{ lone pairs} = 12'] },
      ],
      lines: [
        { say: 'Step two: phosgene. Carbon brings 4, the two chlorines 7 each, and oxygen, in group 16, brings 6. 4 plus 14 plus 6 is 24 electrons, which is 12 pairs.', show: 'p.0', focus: 'p.0' },
        { say: 'Carbon goes in the centre, with single bonds to oxygen and to both chlorines. That uses 3 pairs.', show: ['m.s-C', 'm.s-O', 'm.s-Cl1', 'm.s-Cl2', 'm.s-bond-C-O', 'm.s-bond-C-Cl1', 'm.s-bond-C-Cl2'] },
        { say: 'Three lone pairs on each outer atom complete their octets. That is 9 lone pairs, so all 12 pairs are placed.', show: ['m.s-O-dots', 'm.s-Cl1-dots', 'm.s-Cl2-dots', 'p.1'], focus: 'p.1' },
        { say: 'But carbon has only three bonds, which is six electrons. It is short of an octet.', show: 'm.s-note', focus: 'm.s-note' },
      ],
    },
    {
      chapter: 'Step 3: The double bond',
      layout: 'center',
      main: [cocl2, { kind: 'math', id: 'p2', size: 'md', lines: ['\\text{C: } 2 + 2 + 4 = 8 \\;\\good{\\checkmark}', '4 \\text{ bonding pairs} + 8 \\text{ lone pairs} = 12'] }],
      lines: [
        { say: 'Step three. Oxygen moves one of its lone pairs into its bond with carbon, so they now share two pairs: a double bond.', show: ['m.s-C', 'm.s-O', 'm.s-Cl1', 'm.s-Cl2', 'm.s-bond-C-O', 'm.s-bond-C-Cl1', 'm.s-bond-C-Cl2', 'm.s-O-dots', 'm.s-Cl1-dots', 'm.s-Cl2-dots', 'm.s-note', 'm.d-C', 'm.d-O', 'm.d-Cl1', 'm.d-Cl2', 'm.d-bond-C-O', 'm.d-bond-C-Cl1', 'm.d-bond-C-Cl2', 'm.d-O-dots', 'm.d-Cl1-dots', 'm.d-Cl2-dots'], focus: 'm.d-bond-C-O' },
        { say: 'Now carbon has two single bonds and one double bond, which is eight electrons. Oxygen still has eight too: two lone pairs and two bonding pairs.', show: ['m.d-note', 'p2.0'], focus: ['m.d-note', 'p2.0'] },
        { say: 'Check the count: 4 bonding pairs and 8 lone pairs make 12, the same as before. We moved electrons; we did not add any.', show: 'p2.1', focus: 'p2.1' },
      ],
    },
    {
      chapter: 'Check the answer',
      layout: 'center',
      main: [
        {
          kind: 'table',
          id: 'ans',
          head: ['Molecule', 'Electrons', 'Bonds', 'Lone pairs'],
          rows: [
            ['$\\ce{CCl4}$', '32', 'four $\\ce{C-Cl}$', '3 on each Cl'],
            ['$\\ce{Cl2CO}$', '24', 'two $\\ce{C-Cl}$, one $\\ce{C=O}$', '3 on each Cl, 2 on O'],
          ],
        },
      ],
      lines: [
        { say: 'Here is the whole answer. Carbon tetrachloride has four carbon to chlorine single bonds, and three lone pairs on each chlorine.', show: 'ans', focus: 'ans.0' },
        { say: 'Phosgene has two carbon to chlorine single bonds and a carbon to oxygen double bond, with three lone pairs on each chlorine and two on oxygen. That matches the book.', focus: 'ans.1' },
        { say: 'A quick check: in both, every atom has eight electrons, and the pairs drawn add up to half the electron count.' },
      ],
    },
    {
      chapter: 'The traps',
      layout: 'center',
      main: [
        {
          kind: 'table',
          id: 'traps',
          head: ['Wrong answer', 'Where it comes from'],
          rows: [
            ['Bonds with no **lone pairs**', 'Only 8 of the 32 electrons drawn'],
            ['Phosgene with three **single** bonds', 'Stopped with carbon at **6** electrons'],
            ['A lone pair added to carbon', 'Gives **26** electrons, two too many'],
          ],
        },
      ],
      lines: [
        { say: 'Here are the traps that catch people on this one.', show: 'traps' },
        { say: 'Drawing the bonds and forgetting the lone pairs. For carbon tetrachloride, that shows only 8 of the 32 valence electrons.', focus: 'traps.0' },
        { say: 'Stopping phosgene at three single bonds. Always check the central atom: with six electrons, carbon needs a double bond.', focus: 'traps.1' },
        { say: 'And fixing carbon by adding an extra lone pair to it. That makes 26 electrons, but phosgene only has 24. Move a pair; do not add one.', focus: 'traps.2' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q2',
          prompt: 'Formaldehyde, $\\ce{H2CO}$, has carbon in the centre and a $\\ce{C=O}$ double bond. How many **lone pairs** are on the oxygen atom?',
          choices: ['2', '1', '3', '0'],
          answer: 0,
          working: '12 electrons, 6 pairs: 4 bonding pairs (two C–H, one C=O), so 2 lone pairs, both on oxygen.',
        },
      ],
      lines: [
        { say: 'Your turn. Formaldehyde, H two C O, has carbon in the centre and a carbon to oxygen double bond. How many lone pairs are on the oxygen atom? Pause the video and try it.', show: 'q2', wait: 6, caption: 'Your turn. Formaldehyde, H₂CO, has carbon in the centre and a C=O double bond. How many lone pairs are on the oxygen atom? Pause the video and try it.' },
        { say: 'There are 2 plus 4 plus 6, which is 12 electrons, or 6 pairs. Two carbon to hydrogen bonds and the double bond use 4 pairs, so 2 lone pairs are left, both on oxygen: choice A.', show: 'q2.answer', caption: 'There are 2 + 4 + 6 = 12 electrons, or 6 pairs. Two C–H bonds and the double bond use 4 pairs, so 2 lone pairs are left, both on oxygen: choice A.' },
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
          items: ['Count the **valence electrons** first', 'Single bonds, then **lone pairs** for every octet', 'Central atom short? Move a lone pair into a **double bond**'],
        },
      ],
      lines: [
        { say: 'Here is what to remember. Every Lewis structure starts with a count of the valence electrons.', show: 'sum.0' },
        { say: 'Join the atoms with single bonds, then add lone pairs until each outer atom has eight.', show: 'sum.1' },
        { say: 'And if the central atom is still short, move a lone pair into a double bond. For more on Lewis structures, watch this lesson\'s explainer videos on Gradileo.', show: 'sum.2' },
      ],
    },
  ],
};

export default video;
