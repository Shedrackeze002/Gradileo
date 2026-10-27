import type { Explainer } from '@/video/script.ts';
import { figure } from '@/video/solids.ts';
import { beaker } from './lib/c20-3a-figures.ts';

const ion = (id: string, at: [number, number], plus: boolean) => ({ id, at, tex: plus ? '\\ce{Ca^2+}' : '\\ce{Cl-}', tone: plus ? ('opp' as const) : ('adj' as const), group: plus ? 'ca' : 'cl' });

// Calcium chloride solution: two chloride ions for every calcium ion.
const solution = figure(
  'b',
  [
    beaker({
      w: 3.8,
      h: 4.4,
      level: 3.6,
      label: '\\ce{CaCl2(aq)}',
      ions: [ion('ca1', [0.8, 3.0], true), ion('cl1', [1.95, 3.05], false), ion('cl2', [3.05, 2.95], false), ion('cl3', [0.75, 2.0], false), ion('ca2', [1.9, 2.05], true), ion('cl4', [3.0, 1.95], false), ion('cl5', [0.85, 1.0], false), ion('cl6', [1.95, 0.95], false), ion('ca3', [3.05, 1.0], true)],
    }),
  ],
  460,
);

const video: Explainer = {
  id: 'c20-3-4-d',
  lessonId: 'c20-3-4',
  title: 'Molar Concentration, Part 4: Concentrations of Ions',
  thumbnailTitle: 'Concentrations of Ions',
  thumbnail: false,
  summary:
    'The concentration of each ion is its coefficient in the dissociation equation times the concentration of the compound: 0.35 mol/L calcium chloride has 0.35 mol/L of calcium ions and 0.70 mol/L of chloride ions. Divide by the coefficient to go from an ion back to the compound, and from a mass find the compound’s concentration first.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Matter as Solutions, Acids and Bases · Part 4', title: 'Concentrations of Ions', subtitle: 'Using the dissociation equation' }],
      lines: [
        { say: 'A solution of calcium chloride holds no calcium chloride units at all. It holds calcium ions and chloride ions.', show: 'title' },
        { say: 'In this part, you will find the concentration of each ion, and go back from an ion to the compound.' },
      ],
    },
    {
      chapter: 'Each ion’s concentration',
      layout: 'split',
      leftWidth: 440,
      left: [solution],
      right: [
        { kind: 'callout', id: 'def', tone: 'definition', title: 'Concentration of an ion', md: 'Its **coefficient** in the dissociation equation times the concentration of the compound.' },
        { kind: 'math', id: 'm', size: 'md', align: 'left', lines: ['\\ce{CaCl2(s) -> Ca^2+(aq) + 2Cl-(aq)}', '[\\ce{Ca^2+}] = 1 \\times 0.35 = 0.35\\ \\text{mol/L}', '[\\ce{Cl-}] = 2 \\times 0.35 = 0.70\\ \\text{mol/L}'] },
      ],
      lines: [
        { say: 'An ionic compound dissociates when it dissolves, and the concentrations of its ions follow the ratio in its dissociation equation.', show: ['b.glass', 'b.liquid', 'b.label', 'b.ca', 'b.cl'] },
        { say: 'So the concentration of each ion is its coefficient in the equation, times the concentration of the compound.', show: 'def' },
        { say: 'Take a zero point three five moles per litre solution of calcium chloride. Each formula unit releases one calcium ion and two chloride ions.', show: 'm.0', focus: ['m.0', 'b'] },
        { say: 'So the calcium ion concentration is zero point three five moles per litre, and the chloride ion concentration is two times that: zero point seven zero moles per litre.', show: ['m.1', 'm.2'], focus: ['m.1', 'm.2'] },
      ],
    },
    {
      chapter: 'Aluminium sulfate',
      layout: 'center',
      main: [
        { kind: 'text', id: 'q', size: 'md', align: 'center', md: 'What is the concentration of each ion in a $0.15\\ \\text{mol/L}$ solution of aluminium sulfate, $\\ce{Al2(SO4)3}$?' },
        { kind: 'math', id: 'm', size: 'lg', lines: ['\\ce{Al2(SO4)3(s) -> 2Al^3+(aq) + 3SO4^2-(aq)}', '[\\ce{Al^3+}] = 2 \\times 0.15 = 0.30\\ \\text{mol/L}', '[\\ce{SO4^2-}] = 3 \\times 0.15 = 0.45\\ \\text{mol/L}'] },
        { kind: 'callout', id: 'mis', tone: 'mistake', title: 'A polyatomic ion stays together', md: 'The 4 inside $\\ce{SO4^2-}$ counts oxygen atoms, not ions. The 3 outside the brackets counts the sulfate ions.' },
      ],
      lines: [
        { say: 'Now a zero point one five moles per litre solution of aluminium sulfate. Each formula unit releases two aluminium ions and three sulfate ions.', show: ['q', 'm.0'], focus: 'm.0' },
        { say: 'The aluminium ion concentration is two times zero point one five: zero point three zero moles per litre.', show: 'm.1', focus: 'm.1' },
        { say: 'The sulfate ion concentration is three times zero point one five: zero point four five moles per litre.', show: 'm.2', focus: 'm.2' },
        { say: 'The four inside the sulfate ion counts oxygen atoms, not ions. The three outside the brackets counts the sulfate ions.', show: 'mis' },
      ],
    },
    {
      chapter: 'From an ion to the compound',
      layout: 'center',
      main: [
        { kind: 'text', id: 'q', size: 'md', align: 'center', md: 'A solution of sodium phosphate, $\\ce{Na3PO4}$, has $[\\ce{Na+}] = 0.84\\ \\text{mol/L}$. What is the concentration of $\\ce{Na3PO4}$, to the nearest thousandth?' },
        { kind: 'math', id: 'm', size: 'lg', lines: ['\\ce{Na3PO4(s) -> 3Na+(aq) + PO4^3-(aq)}', 'c = \\dfrac{0.84}{3} = 0.280\\ \\text{mol/L}'] },
        { kind: 'callout', id: 'tip', tone: 'tip', title: 'Multiply or divide?', md: 'An ion’s concentration is never smaller than the compound’s. Multiply to go from the compound to an ion; divide to go back.' },
      ],
      lines: [
        { say: 'To go the other way, from one ion to the compound, divide by that ion’s coefficient.' },
        { say: 'A solution of sodium phosphate has a sodium ion concentration of zero point eight four moles per litre. What is the concentration of sodium phosphate?', show: 'q' },
        { say: 'Each formula unit releases three sodium ions, so the compound’s concentration is a third of that: zero point eight four over three, or zero point two eight zero moles per litre.', show: ['m.0', 'm.1'], focus: ['m.0', 'm.1'] },
        { say: 'Multiply to go from the compound to an ion, and divide to go back. An ion’s concentration is never smaller than the compound’s.', show: 'tip' },
      ],
    },
    {
      chapter: 'Starting from a mass',
      layout: 'center',
      main: [
        { kind: 'text', id: 'q', size: 'md', align: 'center', md: '$5.00\\ \\text{g}$ of magnesium nitrate, $\\ce{Mg(NO3)2}$, is dissolved to make $200\\ \\text{mL}$ of solution. What is $[\\ce{NO3-}]$, to the nearest thousandth? Use these molar masses: Mg $24.31\\ \\text{g/mol}$, N $14.01\\ \\text{g/mol}$, O $16.00\\ \\text{g/mol}$.' },
        {
          kind: 'math',
          id: 'm',
          size: 'md',
          lines: [
            'M = 24.31 + 2 \\times (14.01 + 3 \\times 16.00) = 148.33\\ \\text{g/mol}',
            'c = \\dfrac{5.00 / 148.33}{0.200} = 0.1685\\ \\text{mol/L}',
            '\\ce{Mg(NO3)2(s) -> Mg^2+(aq) + 2NO3-(aq)}',
            '[\\ce{NO3-}] = 2 \\times 0.1685 = 0.337\\ \\text{mol/L}',
          ],
        },
      ],
      lines: [
        { say: 'When the solution is made from a weighed solid, find the concentration of the compound first.' },
        { say: 'Five point zero zero grams of magnesium nitrate is dissolved to make two hundred millilitres of solution. What is the nitrate ion concentration, to the nearest thousandth?', show: 'q' },
        { say: 'The molar mass, adding up every atom, is one hundred forty-eight point three three grams per mole.', caption: 'The molar mass, adding up every atom, is 24.31 + 2 × (14.01 + 3 × 16.00) = 148.33 g/mol.', show: 'm.0', focus: 'm.0' },
        { say: 'Its amount over the volume in litres gives the compound’s concentration: zero point one six eight five moles per litre.', show: 'm.1', focus: 'm.1' },
        { say: 'Each formula unit releases two nitrate ions, so the nitrate ion concentration is twice that: zero point three three seven moles per litre.', show: ['m.2', 'm.3'], focus: ['m.2', 'm.3'] },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q',
          prompt: 'What is the concentration of $\\ce{K+}$ ions in a $0.40\\ \\text{mol/L}$ solution of potassium phosphate, $\\ce{K3PO4}$?',
          choices: ['$0.13\\ \\text{mol/L}$', '$0.40\\ \\text{mol/L}$', '$0.80\\ \\text{mol/L}$', '$1.20\\ \\text{mol/L}$'],
          answer: 3,
          working: '$\\ce{K3PO4(s) -> 3K+(aq) + PO4^3-(aq)}$, so $[\\ce{K+}] = 3 \\times 0.40 = 1.20\\ \\text{mol/L}$.',
        },
      ],
      lines: [
        { say: 'Your turn. What is the concentration of potassium ions in a zero point four zero moles per litre solution of potassium phosphate? Pause the video and try it.', show: 'q', wait: 6 },
        { say: 'The answer is D. Each formula unit releases three potassium ions, so the concentration is three times zero point four zero: one point two zero moles per litre. Choice A divides by three, when it should multiply.', show: 'q.answer' },
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
            'The concentration of an ion is its **coefficient** in the dissociation equation times the concentration of the compound.',
            'Polyatomic ions stay whole: $\\ce{Al2(SO4)3}$ releases $3\\ \\ce{SO4^2-}$ ions.',
            'Divide by the coefficient to go from an ion back to the compound.',
            'From a mass, find the compound’s concentration first.',
          ],
        },
      ],
      lines: [
        { say: 'Let’s sum up. The concentration of an ion is its coefficient in the dissociation equation, times the concentration of the compound.', show: 'sum.0' },
        { say: 'Polyatomic ions stay whole: aluminium sulfate releases three sulfate ions.', show: 'sum.1' },
        { say: 'Divide by the coefficient to go from an ion back to the compound.', show: 'sum.2' },
        { say: 'And from a mass, find the compound’s concentration first. That completes this lesson. Next, you will dilute solutions.', show: 'sum.3' },
      ],
    },
  ],
};

export default video;
