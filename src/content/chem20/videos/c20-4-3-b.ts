import type { Explainer } from '@/video/script.ts';
import { figure } from '@/video/solids.ts';
import { heating, massBar, room } from './lib/c20-4a-figures.ts';

// Blue copper(II) sulfate pentahydrate heated to white anhydrous copper(II) sulfate.
const heat = figure('h', [heating({ labels: ['\\ce{CuSO4*5H2O}\\text{, blue}', '\\ce{CuSO4}\\text{, white}'], steam: '\\ce{5H2O(g)}' }), room('pad', [-2.2, -1.0], [9.2, 3.4])], 360);

// The molar mass of the hydrate as a bar: CuSO₄ and five water molecules.
const bar = figure(
  'b',
  [
    massBar({
      pieces: [
        { id: 'salt', top: '\\ce{CuSO4}', bottom: '159.61', value: 159.61, tone: 'muted' },
        { id: 'water', top: '\\ce{5H2O}', bottom: '5(18.02) = 90.10', value: 90.1, tone: 'adj' },
      ],
      total: '249.71\\ \\text{g/mol}',
    }),
    room('pad', [16.6, 0], [16.6, 1.1]),
  ],
  200,
);

const video: Explainer = {
  id: 'c20-4-3-b',
  lessonId: 'c20-4-3',
  title: 'The Mole and Molar Mass, Part 2: Hydrates',
  thumbnailTitle: 'Hydrates',
  thumbnail: 'h',
  summary:
    'A hydrate holds a fixed number of water molecules in its crystals for each formula unit, shown after a dot: CuSO₄·5H₂O. Heating drives the water off and leaves the anhydrous compound. The water counts in the molar mass, so add it: M(CuSO₄·5H₂O) = 159.61 + 5(18.02) = 249.71 g/mol, and washing soda, Na₂CO₃·10H₂O, is 286.19 g/mol.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Quantitative Relationships in Chemical Changes · Part 2', title: 'Hydrates', subtitle: 'Water built into a crystal' }],
      lines: [
        { say: 'Blue crystals of copper two sulfate turn into a white powder when they are heated, and steam rises from them. The crystals were holding water.', show: 'title' },
        { say: 'In this part, you will meet hydrates, and find their molar masses, water included.' },
      ],
    },
    {
      chapter: 'What a hydrate is',
      layout: 'center',
      main: [
        heat,
        { kind: 'callout', id: 'def', tone: 'definition', title: 'Hydrate', md: 'An ionic compound with a fixed number of water molecules built into its crystals for each formula unit. The formula shows the water after a raised dot: $\\ce{CuSO4*5H2O}$.' },
      ],
      lines: [
        { say: 'A hydrate is an ionic compound with a fixed number of water molecules built into its crystals, for each formula unit.', show: 'def' },
        { say: 'Its formula shows the water after a raised dot. Copper two sulfate pentahydrate has five water molecules for each copper two sulfate.', caption: 'Its formula shows the water after a raised dot. Copper(II) sulfate pentahydrate, CuSO₄·5H₂O, has five water molecules for each CuSO₄.', show: 'h.before', focus: 'h.before' },
        { say: 'Heat the blue crystals, and the water is driven off as steam. A white powder of anhydrous copper two sulfate is left. Anhydrous means without water.', caption: 'Heat the blue crystals, and the water is driven off as steam. A white powder of anhydrous copper(II) sulfate, CuSO₄, is left. Anhydrous means without water.', show: ['h.heat', 'h.after', 'h.steam'], focus: ['h.after', 'h.steam'] },
        { say: 'The water is part of the hydrate, so it counts in the hydrate’s molar mass.', focus: 'h' },
      ],
    },
    {
      chapter: 'Copper(II) sulfate pentahydrate',
      layout: 'center',
      main: [
        { kind: 'text', id: 'q', size: 'md', align: 'center', md: 'What is the molar mass of $\\ce{CuSO4*5H2O}$? Use Cu $63.55$, S $32.06$, O $16.00$ and H $1.01\\ \\text{g/mol}$.' },
        bar,
        {
          kind: 'math',
          id: 'm',
          size: 'md',
          lines: ['M(\\ce{CuSO4}) = 63.55 + 32.06 + 4(16.00) = 159.61\\ \\text{g/mol}', 'M(\\ce{H2O}) = 2(1.01) + 16.00 = 18.02\\ \\text{g/mol}', 'M = 159.61 + 5(18.02) = \\good{249.71\\ \\text{g/mol}}'],
        },
      ],
      lines: [
        { say: 'What is the molar mass of copper two sulfate pentahydrate? Use the molar masses on the screen.', caption: 'What is the molar mass of CuSO₄·5H₂O? Use the molar masses on the screen.', show: 'q' },
        { say: 'First, copper two sulfate: sixty-three point five five, plus thirty-two point zero six, plus four times sixteen, is one hundred fifty-nine point six one grams per mole.', caption: 'First, CuSO₄: 63.55 + 32.06 + 4(16.00) is 159.61 g/mol.', show: ['m.0', 'b.salt'], focus: ['m.0', 'b.salt'] },
        { say: 'Water is eighteen point zero two grams per mole, and there are five of them: five times eighteen point zero two is ninety point one zero.', caption: 'Water is 18.02 g/mol, and there are five of them: 5 × 18.02 = 90.10.', show: ['m.1', 'b.water'], focus: ['m.1', 'b.water'] },
        { say: 'Add them: two hundred forty-nine point seven one grams per mole. Counting every atom gives the same: one copper, one sulfur, nine oxygen and ten hydrogen atoms.', show: ['m.2', 'b.total'], focus: ['m.2', 'b.total'] },
      ],
    },
    {
      chapter: 'Washing soda',
      layout: 'center',
      main: [
        { kind: 'text', id: 'q', size: 'md', align: 'center', md: 'Washing soda is sodium carbonate decahydrate, $\\ce{Na2CO3*10H2O}$. Use Na $22.99$, C $12.01$, O $16.00$ and H $1.01\\ \\text{g/mol}$.' },
        {
          kind: 'math',
          id: 'm',
          size: 'lg',
          lines: ['M(\\ce{Na2CO3}) = 2(22.99) + 12.01 + 3(16.00) = 105.99', '10(18.02) = 180.20', 'M = 105.99 + 180.20 = \\good{286.19\\ \\text{g/mol}}'],
        },
      ],
      lines: [
        { say: 'Washing soda is sodium carbonate decahydrate: ten water molecules for each sodium carbonate.', show: 'q' },
        { say: 'Sodium carbonate: two times twenty-two point nine nine, plus twelve point zero one, plus three times sixteen, is one hundred five point nine nine.', show: 'm.0', focus: 'm.0' },
        { say: 'Ten water molecules add ten times eighteen point zero two, or one hundred eighty point two zero. In all, two hundred eighty-six point one nine grams per mole.', show: ['m.1', 'm.2'], focus: 'm.2' },
      ],
    },
    {
      chapter: 'The dot means add',
      layout: 'center',
      main: [
        { kind: 'callout', id: 'oops', tone: 'mistake', title: 'The dot means add', md: 'The dot in $\\ce{CuSO4*5H2O}$ is not a multiplication sign. The 5 counts only the water molecules: **add** $5(18.02)$ to the molar mass of $\\ce{CuSO4}$. Multiplying $159.61$ by anything would be wrong.' },
      ],
      lines: [
        { say: 'Be careful with the dot. It is not a multiplication sign. The five counts only the water molecules, so add five times eighteen point zero two to the molar mass of copper two sulfate. Never multiply one hundred fifty-nine point six one by anything.', caption: 'Be careful with the dot. It is not a multiplication sign. The 5 counts only the water molecules, so add 5 × 18.02 to the molar mass of CuSO₄. Never multiply 159.61 by anything.', show: 'oops' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q',
          prompt: 'What is the molar mass of magnesium sulfate heptahydrate, $\\ce{MgSO4*7H2O}$, to the nearest hundredth? Use these molar masses: Mg $24.31$, S $32.06$, O $16.00$, H $1.01\\ \\text{g/mol}$.',
          choices: ['$138.39\\ \\text{g/mol}$', '$246.51\\ \\text{g/mol}$', '$968.73\\ \\text{g/mol}$', '$120.37\\ \\text{g/mol}$'],
          answer: 1,
          working: '$M(\\ce{MgSO4}) = 24.31 + 32.06 + 4(16.00) = 120.37$ and $7(18.02) = 126.14$, so $M = 120.37 + 126.14 = 246.51\\ \\text{g/mol}$.',
        },
      ],
      lines: [
        { say: 'Your turn. What is the molar mass of magnesium sulfate heptahydrate, to the nearest hundredth? Pause the video and try it.', caption: 'Your turn. What is the molar mass of magnesium sulfate heptahydrate, MgSO₄·7H₂O, to the nearest hundredth? Pause the video and try it.', show: 'q', wait: 6 },
        { say: 'The answer is B. Magnesium sulfate is one hundred twenty point three seven, and seven water molecules add one hundred twenty-six point one four: two hundred forty-six point five one grams per mole. Choice A adds only one water molecule, choice C multiplies by seven, and choice D leaves the water out.', show: 'q.answer' },
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
            'A **hydrate** has water built into its crystals, shown after a dot: $\\ce{CuSO4*5H2O}$.',
            'Heating drives off the water and leaves the **anhydrous** compound.',
            'The dot means **add**: $M = 159.61 + 5(18.02) = 249.71\\ \\text{g/mol}$.',
          ],
        },
      ],
      lines: [
        { say: 'Let’s sum up. A hydrate has water built into its crystals, shown after a dot.', show: 'sum.0' },
        { say: 'Heating drives off the water, and leaves the anhydrous compound.', show: 'sum.1' },
        { say: 'And the dot means add: the water counts in the molar mass. In part three, you will use molar masses to turn grams into moles, and back. See you there!', show: 'sum.2' },
      ],
    },
  ],
};

export default video;
