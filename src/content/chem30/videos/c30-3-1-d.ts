import type { Explainer } from '@/video/script.ts';
import { figure } from '@/video/solids.ts';
import { rowStructure } from './lib/c30-3a-figures.ts';

// Butane: two hydrogens on every carbon (above and below), and one more on each end carbon.
const butane = figure('b', [
  rowStructure({ name: 'bu', atoms: [{ symbol: 'C', up: 'H', down: 'H' }, { symbol: 'C', up: 'H', down: 'H' }, { symbol: 'C', up: 'H', down: 'H' }, { symbol: 'C', up: 'H', down: 'H' }], left: 'H', right: 'H' }),
]);
const PAIRS = [1, 2, 3, 4].flatMap((i) => [`b.bu-a${i}-up`, `b.bu-a${i}-dn`]);
const ENDS = ['b.bu-left', 'b.bu-right'];
const ALL = ['b.bu-a1', 'b.bu-a2', 'b.bu-a3', 'b.bu-a4', ...PAIRS, ...ENDS, 'b.bu-bond-a1-a2', 'b.bu-bond-a2-a3', 'b.bu-bond-a3-a4', 'b.bu-bond-left-a1', 'b.bu-bond-a4-right', ...[1, 2, 3, 4].flatMap((i) => [`b.bu-bond-a${i}-a${i}-up`, `b.bu-bond-a${i}-a${i}-dn`])];

const video: Explainer = {
  id: 'c30-3-1-d',
  lessonId: 'c30-3-1',
  title: 'Organic Compounds and How They Are Drawn, Part 4: General Formulas',
  thumbnailTitle: 'General Formulas',
  thumbnail: 'b',
  summary:
    'An alkane with n carbons has 2n + 2 hydrogens, CnH2n+2, however it is branched. Each double bond or ring takes away two hydrogens and a triple bond four, so alkenes and cycloalkanes are CnH2n and alkynes CnH2n−2. A general formula also works backwards: an alkene of molar mass 70.15 g/mol is C5H10.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Chemical Changes of Organic Compounds · Part 4', title: 'General Formulas', subtitle: 'Counting hydrogens without drawing' }],
      lines: [
        { say: 'An alkane with twenty carbon atoms has forty-two hydrogen atoms. You can work that out without drawing a single bond.', show: 'title' },
        { say: 'In this part, you will find the general formula of each family of hydrocarbons, and use it both ways.' },
      ],
    },
    {
      chapter: 'Alkanes',
      layout: 'split',
      leftWidth: 560,
      left: [butane],
      right: [
        {
          kind: 'math',
          id: 'm',
          size: 'md',
          align: 'left',
          lines: ['n \\text{ carbons: } 2n \\text{ hydrogens}', '\\text{two ends: } {+}\\,2', '\\text{C}_n\\text{H}_{2n+2}', 'n = 4\\text{: } \\ce{C4H10}'],
        },
      ],
      lines: [
        { say: 'Look at an unbranched alkane, butane. Every carbon carries two hydrogen atoms, one above it and one below.', show: ALL, focus: PAIRS },
        { say: 'So n carbons carry two n hydrogens, and the two ends carry one more each.', show: ['m.0', 'm.1'], focus: ENDS },
        { say: 'That makes two n plus two hydrogens. The general formula of the alkanes is C n H two n plus two.', caption: 'That makes 2n + 2 hydrogens. The general formula of the alkanes is CₙH₂ₙ₊₂.', show: 'm.2', focus: 'm.2' },
        { say: 'For butane, n is four. Two times four, plus two, is ten: C four H ten.', caption: 'For butane, n is 4. 2 × 4 + 2 = 10: C₄H₁₀.', show: 'm.3', focus: 'm.3' },
        { say: 'Branching does not change the count: pentane and two-methylbutane are both C five H twelve.', caption: 'Branching does not change the count: pentane and 2-methylbutane are both C₅H₁₂.', focus: 'b' },
      ],
    },
    {
      chapter: 'Double bonds, rings and triple bonds',
      layout: 'center',
      main: [
        { kind: 'callout', id: 'key', tone: 'key', title: 'Fewer hydrogens', md: 'Each **double bond** or **ring** takes away 2 hydrogen atoms; a **triple bond** takes away 4.' },
        {
          kind: 'table',
          id: 't',
          head: ['Family', 'General formula', 'With four carbons'],
          rows: [
            ['alkanes', '$\\text{C}_n\\text{H}_{2n+2}$', 'butane, $\\ce{C4H10}$'],
            ['alkenes', '$\\text{C}_n\\text{H}_{2n}$', 'but-1-ene, $\\ce{C4H8}$'],
            ['cycloalkanes', '$\\text{C}_n\\text{H}_{2n}$', 'cyclobutane, $\\ce{C4H8}$'],
            ['alkynes', '$\\text{C}_n\\text{H}_{2n-2}$', 'but-1-yne, $\\ce{C4H6}$'],
          ],
        },
      ],
      lines: [
        { say: 'Each double bond or ring takes away two hydrogen atoms, and a triple bond takes away four.', show: ['key', 't.0'] },
        { say: 'So alkenes, with one double bond, are C n H two n. Cycloalkanes, with one ring, are C n H two n as well.', caption: 'So alkenes, with one double bond, are CₙH₂ₙ. Cycloalkanes, with one ring, are CₙH₂ₙ as well.', show: ['t.1', 't.2'], focus: ['t.1', 't.2'] },
        { say: 'Alkynes, with one triple bond, are C n H two n minus two.', caption: 'Alkynes, with one triple bond, are CₙH₂ₙ₋₂.', show: 't.3', focus: 't.3' },
        { say: 'So an alkyne with seven carbons has two times seven, minus two, which is twelve hydrogens: C seven H twelve.', caption: 'So an alkyne with seven carbons has 2 × 7 − 2 = 12 hydrogens: C₇H₁₂.', focus: 't' },
      ],
    },
    {
      chapter: 'Count the branch',
      layout: 'center',
      main: [
        { kind: 'callout', id: 'oops', tone: 'mistake', title: 'Forgetting the hydrogens of a branch', md: 'In $\\ce{CH3-CH(CH3)-CH2-CH3}$ the chain has $3 + 1 + 2 + 3 = 9$ hydrogens, but the methyl branch carries 3 more.' },
        { kind: 'math', id: 'm', lines: ['\\bad{3 + 1 + 2 + 3 = 9} \\quad \\good{9 + 3 = 12}', '\\text{Check: } 2(5) + 2 = 12 \\quad \\ce{C5H12}'] },
      ],
      lines: [
        { say: 'Watch out for branches. Counting only the chain of this alkane gives three, plus one, plus two, plus three, which is nine.', show: ['oops', 'm.0'], focus: 'm.0' },
        { say: 'But the methyl branch carries three more hydrogens, so the molecule has twelve.' },
        { say: 'Check with the general formula. Five carbons need two times five, plus two, which is twelve hydrogens. It is C five H twelve.', caption: 'Check with the general formula. Five carbons need 2 × 5 + 2 = 12 hydrogens. It is C₅H₁₂.', show: 'm.1', focus: 'm.1' },
      ],
    },
    {
      chapter: 'From a molar mass',
      layout: 'center',
      main: [
        { kind: 'text', id: 'q', size: 'md', align: 'center', md: 'An alkene with one double bond has a molar mass of $70.15\\ \\text{g/mol}$. What is its molecular formula? (C $12.01\\ \\text{g/mol}$, H $1.01\\ \\text{g/mol}$)' },
        { kind: 'math', id: 'm', lines: ['\\text{C}_n\\text{H}_{2n}\\text{: } M = 12.01n + 1.01(2n) = 14.03n', 'n = \\dfrac{70.15}{14.03} = 5', '\\ce{C5H10}\\text{, a pentene}'] },
      ],
      lines: [
        { say: 'A general formula also works backwards. An alkene with one double bond has a molar mass of seventy point one five grams per mole. What is its molecular formula? Use the molar masses of carbon and hydrogen on the screen.', show: 'q' },
        { say: 'An alkene is C n H two n. So its molar mass is twelve point zero one n, plus one point zero one times two n, which is fourteen point zero three n.', caption: 'An alkene is CₙH₂ₙ. So its molar mass is 12.01n + 1.01(2n), which is 14.03n.', show: 'm.0', focus: 'm.0' },
        { say: 'Divide seventy point one five by fourteen point zero three, and n is five.', show: 'm.1', focus: 'm.1' },
        { say: 'Five carbons and ten hydrogens: C five H ten, a pentene.', caption: 'Five carbons and ten hydrogens: C₅H₁₀, a pentene.', show: 'm.2', focus: 'm.2' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q',
          prompt: 'An alkane has a molar mass of $100.23\\ \\text{g/mol}$. What is its molecular formula? Use C $12.01\\ \\text{g/mol}$ and H $1.01\\ \\text{g/mol}$.',
          choices: ['$\\ce{C7H14}$', '$\\ce{C8H18}$', '$\\ce{C7H16}$', '$\\ce{C6H14}$'],
          answer: 2,
          working: 'Alkanes are $\\text{C}_n\\text{H}_{2n+2}$, so $M = 12.01n + 1.01(2n + 2) = 14.03n + 2.02$. Then $n = \\dfrac{100.23 - 2.02}{14.03} = 7$: $\\ce{C7H16}$.',
        },
      ],
      lines: [
        { say: 'Your turn. An alkane has a molar mass of one hundred point two three grams per mole. What is its molecular formula? Use the molar masses on the screen. Pause the video and try it.', show: 'q', wait: 6 },
        { say: 'The answer is C, C seven H sixteen. An alkane’s molar mass is fourteen point zero three n, plus two point zero two for the two extra hydrogens. Take away two point zero two, divide by fourteen point zero three, and n is seven. Choice A is an alkene.', caption: 'The answer is C, C₇H₁₆. An alkane’s molar mass is 14.03n + 2.02 for the two extra hydrogens. Take away 2.02, divide by 14.03, and n is 7. Choice A is an alkene.', show: 'q.answer' },
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
            'Alkanes: $\\text{C}_n\\text{H}_{2n+2}$, branched or not.',
            'Alkenes and cycloalkanes: $\\text{C}_n\\text{H}_{2n}$. Alkynes: $\\text{C}_n\\text{H}_{2n-2}$.',
            'Count the hydrogens of every branch, and check with the general formula.',
            'Backwards: write the molar mass in terms of $n$, and solve for $n$.',
          ],
        },
      ],
      lines: [
        { say: 'Let’s sum up. Alkanes are C n H two n plus two, branched or not.', caption: 'Let’s sum up. Alkanes are CₙH₂ₙ₊₂, branched or not.', show: 'sum.0' },
        { say: 'Alkenes and cycloalkanes are C n H two n, and alkynes are C n H two n minus two.', caption: 'Alkenes and cycloalkanes are CₙH₂ₙ, and alkynes are CₙH₂ₙ₋₂.', show: 'sum.1' },
        { say: 'Count the hydrogens of every branch, and check with the general formula.', show: 'sum.2' },
        { say: 'And to work backwards from a molar mass, write it in terms of n and solve. In the next lesson, you will learn to name these compounds.', show: 'sum.3' },
      ],
    },
  ],
};

export default video;
