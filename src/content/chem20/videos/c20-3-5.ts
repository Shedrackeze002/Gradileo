import type { Explainer } from '@/video/script.ts';
import { figure } from '@/video/solids.ts';
import { arrow, dotBeaker } from './lib/c20-3b-figures.ts';

// 25.0 mL of solution diluted to 100.0 mL: the same solute particles spread through four times the volume.
const dilute = figure(
  'd',
  [
    dotBeaker({ name: 'b1', at: [0, 0], w: 2.6, h: 5, level: 1.1, dots: 10, seed: 4, label: '25.0\\ \\text{mL}' }),
    arrow('add', [3.2, 2.6], [4.8, 2.6], { label: '\\text{water}', tone: 'adj' }),
    dotBeaker({ name: 'b2', at: [5.4, 0], w: 2.6, h: 5, level: 4.4, dots: 10, seed: 9, label: '100.0\\ \\text{mL}' }),
  ],
  440,
);

const video: Explainer = {
  id: 'c20-3-5',
  lessonId: 'c20-3-5',
  title: 'Dilution, Part 1: What Stays the Same',
  thumbnailTitle: 'What Stays the Same',
  thumbnail: 'd',
  summary:
    'Diluting a solution adds solvent: the volume rises and the concentration falls, but the amount of solute in moles stays the same. Since n = cV, this gives the dilution equation, c₁V₁ = c₂V₂, which finds the new concentration, c₂ = c₁V₁/V₂, with both volumes in the same unit.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Matter as Solutions, Acids and Bases · Part 1', title: 'What Stays the Same', subtitle: 'The dilution equation' }],
      lines: [
        { say: 'A bottle of fruit-juice concentrate says: mix one part with four parts water. The water makes the drink weaker, but it does not change how much fruit juice is in the glass.', show: 'title' },
        { say: 'Chemists work the same way. Acids are kept as concentrated stock solutions, and a small portion is diluted whenever a weaker solution is needed.' },
        { say: 'In this part, you will see what stays the same in a dilution. Later parts find the volumes to use, and show how to dilute in the lab.' },
      ],
    },
    {
      chapter: 'Adding solvent',
      layout: 'split',
      leftWidth: 560,
      left: [dilute],
      right: [{ kind: 'callout', id: 'def', tone: 'definition', title: 'Dilution', md: '**Dilution** is adding more solvent to a solution to lower its concentration. A **stock solution** is a concentrated solution that is kept in store and diluted as needed.' }],
      lines: [
        { say: 'Dilution is adding more solvent to a solution, to lower its concentration.', show: 'def' },
        { say: 'Here are twenty-five point zero millilitres of a solution. Each dot stands for some solute particles.', caption: 'Here are 25.0 mL of a solution. Each dot stands for some solute particles.', show: ['d.b1-glass', 'd.b1-liquid', 'd.b1-solute', 'd.b1-label'] },
        { say: 'Add water, up to one hundred point zero millilitres. The volume is four times larger, but nothing is added to the solute or taken from it.', caption: 'Add water, up to 100.0 mL. The volume is four times larger, but nothing is added to the solute or taken from it.', show: ['d.add', 'd.b2-glass', 'd.b2-liquid', 'd.b2-label'] },
        { say: 'The same particles are spread through more solution, so the concentration is lower.', show: 'd.b2-solute', focus: 'd.b2-solute' },
      ],
    },
    {
      chapter: 'The dilution equation',
      layout: 'center',
      main: [
        {
          kind: 'table',
          id: 't',
          head: ['', 'Before dilution', 'After dilution'],
          rows: [
            ['Volume', '$25.0\\ \\text{mL}$', '$100.0\\ \\text{mL}$'],
            ['Amount of solute', '$2.00 \\times 0.0250 = 0.0500\\ \\text{mol}$', '$0.0500\\ \\text{mol}$'],
            ['Concentration', '$2.00\\ \\text{mol/L}$', '$\\dfrac{0.0500\\ \\text{mol}}{0.1000\\ \\text{L}} = 0.500\\ \\text{mol/L}$'],
          ],
        },
        { kind: 'math', id: 'm', size: 'lg', lines: ['n = cV \\quad \\Longrightarrow \\quad \\good{c_1V_1 = c_2V_2}'] },
      ],
      lines: [
        { say: 'Say the solution started at two point zero zero moles per litre. The amount of solute is the concentration times the volume in litres: zero point zero five zero zero moles.', caption: 'Say the solution started at 2.00 mol/L. The amount of solute is the concentration times the volume in litres: 0.0500 mol.', show: ['t.0', 't.1'], focus: 't.1' },
        { say: 'After the dilution, the same amount is in zero point one litres, so the concentration is zero point five zero zero moles per litre. Four times the volume, one quarter of the concentration.', caption: 'After the dilution, the same amount is in 0.1000 L, so the concentration is 0.500 mol/L. Four times the volume, one quarter of the concentration.', show: 't.2', focus: 't.2' },
        { say: 'The amount, n equals c V, stays the same. So c one V one before the dilution equals c two V two after it: the dilution equation.', caption: 'The amount, n = cV, stays the same. So c₁V₁ before the dilution equals c₂V₂ after it: the dilution equation.', show: 'm', focus: 'm' },
        { say: 'Here, c one and V one belong to the solution you start with, and c two and V two to the diluted solution.', caption: 'Here, c₁ and V₁ belong to the solution you start with, and c₂ and V₂ to the diluted solution.' },
      ],
    },
    {
      chapter: 'Finding the new concentration',
      layout: 'center',
      main: [
        { kind: 'text', id: 'q', size: 'md', align: 'center', md: '$40\\ \\text{mL}$ of a $1.85\\ \\text{mol/L}$ solution is diluted with water to $200\\ \\text{mL}$. What is the new concentration, to the nearest thousandth?' },
        { kind: 'math', id: 'm', size: 'lg', lines: ['c_1V_1 = c_2V_2 \\quad \\Longrightarrow \\quad c_2 = \\dfrac{c_1V_1}{V_2}', 'c_2 = \\dfrac{1.85 \\times 40}{200} = \\good{0.370\\ \\text{mol/L}}'] },
      ],
      lines: [
        { say: 'Forty millilitres of a one point eight five moles per litre solution is diluted with water to two hundred millilitres. What is the new concentration?', caption: '40 mL of a 1.85 mol/L solution is diluted with water to 200 mL. What is the new concentration?', show: 'q' },
        { say: 'Divide both sides by V two: c two equals c one V one, over V two.', caption: 'Divide both sides by V₂: c₂ = c₁V₁/V₂.', show: 'm.0', focus: 'm.0' },
        { say: 'One point eight five times forty, over two hundred, is zero point three seven zero moles per litre.', caption: '1.85 × 40, over 200, is 0.370 mol/L.', show: 'm.1', focus: 'm.1' },
        { say: 'The volume was multiplied by five, so the concentration was divided by five. And the volumes can stay in millilitres, because their unit cancels.' },
      ],
    },
    {
      chapter: 'Both volumes in one unit',
      layout: 'center',
      main: [
        { kind: 'callout', id: 'oops', tone: 'mistake', title: 'Mixing millilitres and litres', md: 'Both volumes must be in the same unit. Writing $V_1 = 40\\ \\text{mL}$ but $V_2 = 0.200\\ \\text{L}$ gives $\\dfrac{1.85 \\times 40}{0.200} = 370\\ \\text{mol/L}$, a thousand times too large.' },
      ],
      lines: [
        { say: 'But both volumes must be in the same unit. Forty millilitres over zero point two zero zero litres gives three hundred seventy moles per litre: a thousand times too large.', caption: 'But both volumes must be in the same unit. 40 mL over 0.200 L gives 370 mol/L: a thousand times too large.', show: 'oops' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q',
          prompt: '$15.0\\ \\text{mL}$ of a $3.00\\ \\text{mol/L}$ solution is diluted with water to $75.0\\ \\text{mL}$. What is the new concentration? When a solution is diluted, $c_1V_1 = c_2V_2$.',
          choices: ['$15.0\\ \\text{mol/L}$', '$0.600\\ \\text{mol/L}$', '$600\\ \\text{mol/L}$', '$0.200\\ \\text{mol/L}$'],
          answer: 1,
          working: '$c_2 = \\dfrac{c_1V_1}{V_2} = \\dfrac{3.00 \\times 15.0}{75.0} = 0.600\\ \\text{mol/L}$. The volume grew five times, so the concentration fell to one fifth.',
        },
      ],
      lines: [
        { say: 'Your turn. Fifteen point zero millilitres of a three point zero zero moles per litre solution is diluted with water to seventy-five point zero millilitres. What is the new concentration? Pause the video and try it.', caption: 'Your turn. 15.0 mL of a 3.00 mol/L solution is diluted with water to 75.0 mL. What is the new concentration? Pause the video and try it.', show: 'q', wait: 6 },
        { say: 'The answer is B, zero point six zero zero moles per litre: three times fifteen, over seventy-five. Choice A is upside down: a dilution never raises the concentration.', caption: 'The answer is B, 0.600 mol/L: 3.00 × 15.0, over 75.0. Choice A is upside down: a dilution never raises the concentration.', show: 'q.answer' },
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
            'Dilution adds solvent: the volume rises, the concentration falls, and the amount of solute stays the same.',
            'When a solution is diluted, $c_1V_1 = c_2V_2$.',
            'New concentration: $c_2 = \\dfrac{c_1V_1}{V_2}$, with both volumes in the same unit.',
          ],
        },
      ],
      lines: [
        { say: 'Let’s sum up. Dilution adds solvent. The concentration falls, but the amount of solute stays the same.', show: 'sum.0' },
        { say: 'So when a solution is diluted, c one V one equals c two V two.', caption: 'So when a solution is diluted, c₁V₁ = c₂V₂.', show: 'sum.1' },
        { say: 'The new concentration is c one V one over V two, with both volumes in the same unit. In part two, you will find how much stock solution and water to use. See you there!', caption: 'The new concentration is c₁V₁/V₂, with both volumes in the same unit. In part two, you will find how much stock solution and water to use. See you there!', show: 'sum.2' },
      ],
    },
  ],
};

export default video;
