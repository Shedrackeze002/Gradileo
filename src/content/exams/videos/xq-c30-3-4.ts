import type { Explainer } from '@/video/script.ts';
import { figure } from '@/video/solids.ts';
import { pick } from './lib/pick.ts';
import groups from '@/content/chem30/videos/c30-3-4.ts';
import notBases from '@/content/chem30/videos/c30-3-4-b.ts';
import { grouped, rowStructure, tag } from '@/content/chem30/videos/lib/c30-3a-figures.ts';

// Exam question for Chemistry 30 lesson 3.4 (functional groups): the condensed structures of both
// isomers of C2H6O, with the functional group of each. The question is OpenStax Chemistry 2e's own,
// word for word (end-of-chapter exercise 34, section 20.2, CC BY-NC-SA 4.0). The answer:
// CH3CH2OH, ethanol, an alcohol (hydroxyl group, -OH), and CH3OCH3, methoxymethane (dimethyl
// ether), an ether (-O- between two carbons).
//
// The pictures are atoms drawn as balls (src/video/molecules.ts): the lesson's ethane gaining an OH
// group to become ethanol, and sodium hydroxide coming apart in water while ethanol stays whole; and
// both isomers as structural formulas with every bond drawn (src/video/solids.ts).

const QUESTION = 'Write the condensed structures of both isomers with the formula C2H6O. Label the functional group of each isomer.';

const CH2 = { symbol: 'C', up: 'H', down: 'H' } as const;
const ethanol = figure('e', [grouped(rowStructure({ name: 'a', atoms: [CH2, CH2, { symbol: 'O', tone: 'bad' }], left: 'H', right: 'H' }), 'mol'), tag('e-name', [1.6, -2.7], '\\ce{CH3CH2OH}\\text{: an alcohol}', { tone: 'good' })], 330);
const ether = figure('d', [grouped(rowStructure({ name: 'b', atoms: [CH2, { symbol: 'O', tone: 'bad' }, CH2], left: 'H', right: 'H' }), 'mol'), tag('d-name', [1.6, -2.7], '\\ce{CH3OCH3}\\text{: an ether}', { tone: 'good' })], 330);

const video: Explainer = {
  id: 'xq-c30-3-4',
  lessonId: '',
  exam: {
    lesson: 'c30-3-4',
    source: 'OpenStax, Chemistry 2e, end-of-chapter exercise 34, section 20.2, Alcohols and Ethers',
    licence: 'CC BY-NC-SA 4.0, access for free at openstax.org',
    url: 'https://openstax.org/books/chemistry-2e/pages/20-exercises',
    question: QUESTION,
  },
  title: 'Exam Question: One Formula, Two Families. Functional Groups',
  thumbnailTitle: 'One Formula, Two Families',
  thumbnail: 'sg',
  summary:
    'A real test question, solved one small step at a time: C₂H₆O has two isomers. The oxygen atom can sit at the end of the chain, bonded to a hydrogen, which gives ethanol, CH₃CH₂OH, an alcohol; or between the two carbons, which gives CH₃OCH₃, an ether. Same atoms, different functional groups, different families.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Exam Question', title: 'One Formula, Two Families', subtitle: 'The two isomers of C₂H₆O and their functional groups' }],
      lines: [
        { say: 'In this video, we solve a real test question about functional groups. We will take it one small step at a time, so that every step makes sense.', show: 'title' },
        { say: 'The question comes from the free OpenStax Chemistry textbook. You will see where it comes from at the bottom of the screen the whole way through.' },
      ],
    },
    {
      chapter: 'The question',
      layout: 'center',
      main: [{ kind: 'try', id: 'q', kicker: 'The question', prompt: 'Write the condensed structures of both isomers with the formula $\\ce{C2H6O}$. Label the functional group of each isomer.', answer: 'CH₃CH₂OH, an alcohol (–OH); CH₃OCH₃, an ether (–O–)' }],
      lines: [
        { say: 'Here is the question, exactly as it was printed. Write the condensed structures of both isomers with the formula C two H six O. Label the functional group of each isomer.', show: 'q', caption: 'Here is the question, exactly as it was printed. Write the condensed structures of both isomers with the formula C₂H₆O. Label the functional group of each isomer.' },
        { say: 'If you would like to try it first, pause the video now.', wait: 5 },
      ],
    },
    {
      chapter: 'What is it asking?',
      layout: 'center',
      main: [{ kind: 'text', id: 'plain', size: 'lg', md: 'Where can the **one oxygen** go? Each place gives a different **family**' }],
      lines: [
        { say: 'Two carbons, six hydrogens and one oxygen. The only real choice is where the oxygen sits, and each place gives a different functional group, so a different family of compounds.', show: 'plain' },
      ],
    },
    {
      chapter: 'What you need to know',
      layout: 'center',
      main: [pick(groups, 'sg'), { kind: 'math', id: 'k', size: 'md', lines: ['\\ce{C}: 4 \\text{ bonds} \\qquad \\ce{O}: 2 \\text{ bonds} \\qquad \\ce{H}: 1 \\text{ bond}'] }],
      lines: [
        { say: 'Here is what we need. Start with ethane, an alkane.', show: 'sg' },
        { say: 'Replace one hydrogen atom with an O H group, and the molecule becomes ethanol, an alcohol. The group decides the family.', play: 'sg.oh' },
        { say: 'Carbon makes four bonds, oxygen makes two, and hydrogen makes one. An oxygen with two bonds can sit at the end of a chain with a hydrogen, or inside the chain between two carbons.', show: 'k.0' },
      ],
    },
    {
      chapter: 'The plan',
      layout: 'center',
      main: [{ kind: 'bullets', id: 'plan', items: ['Put the oxygen at the **end**, bonded to an H', 'Put the oxygen **between** the two carbons', 'Fill with H, write it **condensed**, and name the **group**'] }],
      lines: [
        { say: 'Here is the plan. First, put the oxygen at the end of the chain, bonded to a hydrogen.', show: 'plan.0' },
        { say: 'Then put the oxygen between the two carbons.', show: 'plan.1' },
        { say: 'Each time, fill the rest with hydrogens, write the condensed structure, and name the functional group.', show: 'plan.2' },
      ],
    },
    {
      chapter: 'Step 1: Oxygen at the end',
      layout: 'center',
      main: [ethanol],
      lines: [
        { say: 'Step one. Here the two carbons are bonded to each other, and the oxygen is on the end, with a hydrogen on its other side. Each carbon is filled up with hydrogens: three on the first, two on the second, one on the oxygen. Six in all.', show: 'e.mol' },
        { say: 'Its condensed structure is C H three C H two O H. The O H is a hydroxyl group, so this is an alcohol: ethanol.', show: 'e.e-name', caption: 'Its condensed structure is CH₃CH₂OH. The –OH is a hydroxyl group, so this is an alcohol: ethanol.' },
      ],
    },
    {
      chapter: 'Step 2: Oxygen in the middle',
      layout: 'center',
      main: [ether],
      lines: [
        { say: 'Step two. Now the oxygen sits between the two carbons, using both of its bonds on them. Each carbon has three hydrogens, six in all, and the oxygen has none.', show: 'd.mol' },
        { say: 'Its condensed structure is C H three O C H three. An oxygen between two carbon chains is an ether, so this is an ether: methoxymethane, also called dimethyl ether.', show: 'd.d-name', caption: 'Its condensed structure is CH₃OCH₃. An oxygen between two carbon chains is an ether, so this is an ether: methoxymethane, also called dimethyl ether.' },
      ],
    },
    {
      chapter: 'Step 3: Why the label matters',
      layout: 'center',
      main: [pick(notBases, 'nh'), { kind: 'math', id: 'g', size: 'md', lines: ['\\text{alcohol: } \\ce{-OH} \\text{ on a carbon} \\qquad \\text{ether: } \\ce{C-O-C}'] }],
      lines: [
        { say: 'Step three. A functional group label is about how the atoms are bonded. Here are sodium hydroxide and ethanol in water.', show: 'nh' },
        { say: 'Sodium hydroxide comes apart into ions. Ethanol\'s O H stays bonded to its carbon, so it is a hydroxyl group, not a hydroxide ion.', play: 'nh.water' },
        { say: 'So the alcohol is defined by an O H on a carbon, and the ether by an oxygen joining two carbons, with no hydrogen on it.', show: 'g.0' },
      ],
    },
    {
      chapter: 'Check the answer',
      layout: 'center',
      main: [
        { kind: 'math', id: 'x', size: 'md', lines: ['\\ce{CH3CH2OH}: 2\\ce{C},\\ 6\\ce{H},\\ 1\\ce{O} \\qquad \\ce{CH3OCH3}: 2\\ce{C},\\ 6\\ce{H},\\ 1\\ce{O}'] },
        { kind: 'callout', id: 'ans', tone: 'key', title: 'The answer', md: '$\\ce{CH3CH2OH}$, ethanol: an **alcohol** (hydroxyl group, $\\ce{-OH}$). $\\ce{CH3OCH3}$, methoxymethane: an **ether** ($\\ce{-O-}$ between two carbons).' },
      ],
      lines: [
        { say: 'Does it make sense? Count the atoms. Both structures have two carbons, six hydrogens and one oxygen, so both are C two H six O, and their bonds are different, so they are isomers.', show: 'x.0', caption: 'Does it make sense? Both structures have 2 C, 6 H and 1 O, so both are C₂H₆O, and their bonds are different, so they are isomers.' },
        { say: 'So the two isomers are ethanol, C H three C H two O H, an alcohol, and methoxymethane, C H three O C H three, an ether.', show: 'ans', caption: 'So the two isomers are ethanol, CH₃CH₂OH, an alcohol, and methoxymethane, CH₃OCH₃, an ether.' },
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
            ['$\\ce{CH3CH2OH}$ and $\\ce{HOCH2CH3}$', 'The **same** molecule, written backwards'],
            ['$\\ce{CH3OCH3}$ is an alcohol', 'It has no $\\ce{O-H}$; its oxygen joins **two carbons**'],
            ['Ethanol contains hydroxide', 'The $\\ce{-OH}$ is **bonded** to carbon; it is not an **ion**'],
          ],
        },
      ],
      lines: [
        { say: 'Here are the traps that catch people on this one.', show: 'traps' },
        { say: 'C H three C H two O H and H O C H two C H three are the same molecule read from opposite ends. Every atom has the same neighbours.', focus: 'traps.0', caption: 'CH₃CH₂OH and HOCH₂CH₃ are the same molecule read from opposite ends. Every atom has the same neighbours.' },
        { say: 'Calling the second isomer an alcohol misses that its oxygen has no hydrogen. An oxygen between two carbons is an ether.', focus: 'traps.1' },
        { say: 'And an alcohol\'s O H group is not a hydroxide ion. It stays bonded to the carbon, so alcohols are not bases.', focus: 'traps.2' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q2',
          prompt: 'Which compound is an **isomer** of propan-1-ol, $\\ce{CH3CH2CH2OH}$?',
          choices: ['$\\ce{CH3CH2CHO}$', '$\\ce{CH3CH2COOH}$', '$\\ce{CH3CH2CH2Cl}$', '$\\ce{CH3OCH2CH3}$'],
          answer: 3,
          working: 'Propan-1-ol is $\\ce{C3H8O}$. Only $\\ce{CH3OCH2CH3}$, methoxyethane, is also $\\ce{C3H8O}$.',
        },
      ],
      lines: [
        { say: 'Your turn. Which compound is an isomer of propan one ol, C H three C H two C H two O H? Pause the video and try it.', show: 'q2', wait: 6, caption: 'Your turn. Which compound is an isomer of propan-1-ol, CH₃CH₂CH₂OH? Pause the video and try it.' },
        { say: 'Propan one ol is C three H eight O. Count each choice: only C H three O C H two C H three, methoxyethane, is also C three H eight O, so it is the isomer: choice D.', show: 'q2.answer', caption: 'Propan-1-ol is C₃H₈O. Only CH₃OCH₂CH₃, methoxyethane, is also C₃H₈O, so it is the isomer: choice D.' },
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
          items: ['Isomers: same **formula**, different **bonds**', 'Alcohol: $\\ce{-OH}$ on a carbon; ether: $\\ce{C-O-C}$', 'Check by **counting** atoms in each structure'],
        },
      ],
      lines: [
        { say: 'Here is what to remember. Isomers have the same formula but their atoms are bonded differently.', show: 'sum.0' },
        { say: 'An alcohol has an O H group on a carbon, and an ether has an oxygen joining two carbons.', show: 'sum.1' },
        { say: 'And check each structure by counting its atoms. For more on functional groups, watch this lesson\'s explainer videos on Gradileo.', show: 'sum.2' },
      ],
    },
  ],
};

export default video;
