import type { Explainer } from '@/video/script.ts';
import { figure } from '@/video/solids.ts';
import { arrow, ionRows, molecule, tag } from './lib/c20-3a-figures.ts';

// The ions in one formula unit of aluminium sulfate: two aluminium ions and three sulfate ions.
const ions = figure(
  'f',
  [
    ionRows({
      rows: [
        { id: 'al', count: 2, tex: '\\ce{Al^3+}', tone: 'opp' },
        { id: 'so4', count: 3, tex: '\\ce{SO4^2-}', tone: 'adj' },
      ],
    }),
  ],
  380,
);

// Hydrogen chloride gives a hydrogen ion (yellow) to a water molecule: a hydronium ion and a
// chloride ion.
const r = 0.62;
const ionising = figure(
  'hcl',
  [
    molecule('acid', [
      { sym: 'H', at: [0, 0], r: 0.34, tone: 'theta', shade: 0.5 },
      { sym: 'Cl', at: [0.86, 0], r, tone: 'good' },
    ]),
    tag('plus1', [2.35, 0], '+'),
    molecule('water', [
      { sym: 'H', at: [3.41, -0.28], r: 0.34, tone: 'ink', shade: 0.35 },
      { sym: 'H', at: [4.39, -0.28], r: 0.34, tone: 'ink', shade: 0.35 },
      { sym: 'O', at: [3.9, 0.1], r: 0.55, tone: 'bad' },
    ]),
    arrow('arrow', [5.4, 0], [6.9, 0]),
    molecule(
      'h3o',
      [
        { sym: 'H', at: [8.4, 0.76], r: 0.34, tone: 'theta', shade: 0.5 },
        { sym: 'H', at: [7.83, -0.28], r: 0.34, tone: 'ink', shade: 0.35 },
        { sym: 'H', at: [8.97, -0.28], r: 0.34, tone: 'ink', shade: 0.35 },
        { sym: 'O', at: [8.4, 0.1], r: 0.55, tone: 'bad' },
      ],
      '+',
    ),
    tag('plus2', [10.05, 0], '+'),
    molecule('cl', [{ sym: 'Cl', at: [11.4, 0], r, tone: 'good' }], '-'),
    tag('n-acid', [0.43, -1.3], '\\text{hydrogen chloride}', { tone: 'muted', group: 'acid' }),
    tag('n-water', [3.9, -1.3], '\\text{water}', { tone: 'muted', group: 'water' }),
    tag('n-h3o', [8.4, -1.3], '\\text{hydronium ion}', { tone: 'muted', group: 'h3o' }),
    tag('n-cl', [11.4, -1.3], '\\text{chloride ion}', { tone: 'muted', group: 'cl' }),
  ],
  300,
);

const video: Explainer = {
  id: 'c20-3-1-d',
  lessonId: 'c20-3-1',
  title: 'Solutions, Electrolytes and Dissociation, Part 4: Moles of Ions and Ionisation',
  thumbnailTitle: 'Moles of Ions and Ionisation',
  thumbnail: 'hcl',
  summary:
    'A dissociation equation counts ions in moles as well as in formula units: 0.40 mol of aluminium sulfate releases 2.00 mol of ions. Acids are molecular, but they ionise in water: hydrogen chloride gives a hydrogen ion to a water molecule, forming a hydronium ion and a chloride ion.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Matter as Solutions, Acids and Bases · Part 4', title: 'Moles of Ions and Ionisation', subtitle: 'Counting ions, and acids that make them' }],
      lines: [
        { say: 'One formula unit of aluminium sulfate holds seventeen atoms. How many ions does it release in water?', show: 'title' },
        { say: 'In this part, you will count the ions a compound releases, mole by mole, and see how an acid, with no ions of its own, forms ions in water.' },
      ],
    },
    {
      chapter: 'Count ions, not atoms',
      layout: 'split',
      leftWidth: 400,
      left: [ions],
      right: [
        { kind: 'math', id: 'm', size: 'md', align: 'left', lines: ['\\ce{Al2(SO4)3}\\text{: } 2 + 3 + 12 = 17 \\text{ atoms}', '\\ce{Al2(SO4)3(s)}', '\\qquad \\ce{-> 2Al^3+(aq) + 3SO4^2-(aq)}', '2 + 3 = 5 \\text{ ions}'] },
        { kind: 'callout', id: 'tip', tone: 'tip', title: 'Count ions, not atoms', md: 'Read the number of ions from the **coefficients** of the dissociation equation, never from the total number of atoms.' },
      ],
      lines: [
        { say: 'Count the atoms in aluminium sulfate: two aluminium, three sulfur, and twelve oxygen. That is seventeen atoms.', show: 'm.0', focus: 'm.0' },
        { say: 'But in water it releases only five ions: two aluminium ions, and three sulfate ions. Each sulfate ion stays whole.', show: ['m.1', 'm.2', 'm.3', 'f.al', 'f.so4'], focus: ['m.1', 'm.2', 'm.3'] },
        { say: 'So read the number of ions from the coefficients of the dissociation equation, never from the total number of atoms.', show: 'tip' },
      ],
    },
    {
      chapter: 'Moles of ions',
      layout: 'center',
      main: [
        { kind: 'text', id: 'q', size: 'md', align: 'center', md: '$0.40\\ \\text{mol}$ of aluminium sulfate, $\\ce{Al2(SO4)3}$, dissolves completely in water. How many moles of ions does it release in total?' },
        {
          kind: 'math',
          id: 'm',
          size: 'md',
          lines: [
            '\\ce{Al2(SO4)3(s) -> 2Al^3+(aq) + 3SO4^2-(aq)}',
            '2 + 3 = 5\\ \\text{mol of ions per mole}',
            '0.40 \\times 5 = 2.00\\ \\text{mol of ions}',
            '\\ce{Al^3+}\\text{: } 0.40 \\times 2 = 0.80\\ \\text{mol} \\qquad \\ce{SO4^2-}\\text{: } 0.40 \\times 3 = 1.20\\ \\text{mol}',
          ],
        },
      ],
      lines: [
        { say: 'A dissociation equation works for moles as well. One mole of calcium chloride releases one mole of calcium ions and two moles of chloride ions.' },
        { say: 'Zero point four zero moles of aluminium sulfate dissolves completely in water. How many moles of ions does it release in total?', show: 'q' },
        { say: 'Write the dissociation equation first.', show: 'm.0', focus: 'm.0' },
        { say: 'Each mole of the compound releases two plus three, or five moles of ions.', show: 'm.1', focus: 'm.1' },
        { say: 'So zero point four zero times five gives two point zero zero moles of ions.', show: 'm.2', focus: 'm.2' },
        { say: 'That is zero point eight zero moles of aluminium ions, and one point two zero moles of sulfate ions.', show: 'm.3', focus: 'm.3' },
      ],
    },
    {
      chapter: 'Acids ionise',
      layout: 'center',
      main: [
        ionising,
        { kind: 'math', id: 'm', size: 'lg', lines: ['\\ce{HCl(aq) + H2O(l) -> H3O+(aq) + Cl-(aq)}'] },
        { kind: 'callout', id: 'def', tone: 'definition', title: 'Ionisation', md: 'The formation of ions from a molecular substance. An acid **ionises** when its molecules react with water.' },
      ],
      lines: [
        { say: 'An acid is a molecular compound, yet its solution conducts. Pure hydrogen chloride is a gas made of molecules, with no ions at all.', show: 'hcl.acid' },
        { say: 'When it dissolves, each molecule reacts with a water molecule. It gives a hydrogen ion to the water molecule, forming a hydronium ion, and a chloride ion.', show: ['hcl.plus1', 'hcl.water', 'hcl.arrow', 'hcl.h3o', 'hcl.plus2', 'hcl.cl'], focus: ['hcl.h3o', 'hcl.cl'] },
        { say: 'In symbols: H C L plus H two O gives H three O plus, and the chloride ion.', caption: 'In symbols: HCl(aq) + H₂O(l) → H₃O⁺(aq) + Cl⁻(aq).', show: 'm', focus: 'm' },
        { say: 'The hydronium ions are what make the solution acidic; a later lesson looks at them in depth. This formation of ions from a molecular substance is called ionisation.', show: 'def' },
      ],
    },
    {
      chapter: 'Dissociation or ionisation?',
      layout: 'center',
      main: [
        {
          kind: 'table',
          id: 't',
          head: ['', 'Dissociation', 'Ionisation'],
          rows: [
            ['Happens to', 'ionic compounds, including hydroxide bases', 'acids, which are molecular'],
            ['Before dissolving', 'ions held in a crystal lattice', 'neutral molecules, with no ions'],
            ['In water', 'the existing ions separate', 'molecules react with water to form new ions'],
          ],
        },
        { kind: 'math', id: 'm', size: 'md', lines: ['\\text{Dissociation: } \\ce{NaOH(s) -> Na+(aq) + OH-(aq)}', '\\text{Ionisation: } \\ce{HNO3(aq) + H2O(l) -> H3O+(aq) + NO3-(aq)}'] },
      ],
      lines: [
        { say: 'Dissociation and ionisation both give a solution full of ions, but the ions come from different places.' },
        { say: 'Dissociation happens to ionic compounds, including hydroxide bases. Their ions already exist, held in a crystal lattice, and in water they simply separate.', show: ['t.0', 't.1', 't.2'] },
        { say: 'Ionisation happens to acids. They start as neutral molecules with no ions, and in water the molecules react to form new ions.' },
        { say: 'So sodium hydroxide dissociates into sodium ions and hydroxide ions, while nitric acid ionises, forming hydronium ions and nitrate ions.', show: 'm', focus: 'm' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q',
          prompt: '$0.25\\ \\text{mol}$ of potassium phosphate, $\\ce{K3PO4}$, dissolves completely in water. How many moles of ions does it release in total?',
          choices: ['$0.25\\ \\text{mol}$', '$0.75\\ \\text{mol}$', '$1.00\\ \\text{mol}$', '$2.00\\ \\text{mol}$'],
          answer: 2,
          working: '$\\ce{K3PO4(s) -> 3K+(aq) + PO4^3-(aq)}$, so each mole releases $3 + 1 = 4$ moles of ions: $0.25 \\times 4 = 1.00\\ \\text{mol}$.',
        },
      ],
      lines: [
        { say: 'Your turn. Zero point two five moles of potassium phosphate dissolves completely in water. How many moles of ions does it release in total? Pause the video and try it.', show: 'q', wait: 6 },
        { say: 'The answer is C. Each formula unit releases three potassium ions and one phosphate ion, so zero point two five times four is one point zero zero moles. Choice D counts the eight atoms instead of the ions.', show: 'q.answer' },
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
            'Count ions from the dissociation equation, never from the atoms: $\\ce{Al2(SO4)3}$ releases 5 ions.',
            'Moles of ions $=$ moles of compound $\\times$ ions per formula unit.',
            'Acids are molecular, but they **ionise** in water, forming $\\ce{H3O+}$ ions.',
            'Dissociation separates ions that already exist; ionisation forms new ones.',
          ],
        },
      ],
      lines: [
        { say: 'Let’s sum up. Count ions from the dissociation equation, never from the atoms.', show: 'sum.0' },
        { say: 'Moles of ions equals moles of compound, times the number of ions per formula unit.', show: 'sum.1' },
        { say: 'Acids are molecular, but they ionise in water, forming hydronium ions.', show: 'sum.2' },
        { say: 'And dissociation separates ions that already exist, while ionisation forms new ones. That completes this lesson. Next, you will find out how much of a compound can dissolve.', show: 'sum.3' },
      ],
    },
  ],
};

export default video;
