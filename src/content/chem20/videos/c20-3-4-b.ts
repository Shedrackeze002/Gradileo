import type { Explainer } from '@/video/script.ts';

const video: Explainer = {
  id: 'c20-3-4-b',
  lessonId: 'c20-3-4',
  title: 'Molar Concentration, Part 2: From a Mass to a Concentration',
  thumbnailTitle: 'From a Mass to a Concentration',
  thumbnail: false,
  summary:
    'A weighed mass becomes an amount with the molar mass, n = m/M, and then a concentration, c = n/V: 8.50 g of sodium chloride in 250 mL of solution is 0.582 mol/L. To make a solution, the mass needed is m = cVM: 250 mL of 0.120 mol/L sodium carbonate needs 3.18 g.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Matter as Solutions, Acids and Bases · Part 2', title: 'From a Mass to a Concentration', subtitle: 'Using the molar mass' }],
      lines: [
        { say: 'In the laboratory, you weigh a solid on a balance. You cannot count its moles.', show: 'title' },
        { say: 'In this part, you will turn a mass into a concentration, and work out the mass of solid needed to make a solution.' },
      ],
    },
    {
      chapter: 'From mass to concentration',
      layout: 'split',
      leftWidth: 440,
      left: [
        { kind: 'math', id: 'flow', size: 'lg', lines: ['m \\xrightarrow{\\ \\div M\\ } n \\xrightarrow{\\ \\div V\\ } c'] },
        { kind: 'text', id: 'q', size: 'md', md: '$8.50\\ \\text{g}$ of sodium chloride, $\\ce{NaCl}$, is dissolved to make $250\\ \\text{mL}$ of solution. What is the molar concentration, to the nearest thousandth? Use these molar masses: Na $22.99\\ \\text{g/mol}$, Cl $35.45\\ \\text{g/mol}$.' },
      ],
      right: [
        {
          kind: 'math',
          id: 'm',
          size: 'md',
          align: 'left',
          lines: [
            'M = 22.99 + 35.45 = 58.44\\ \\text{g/mol}',
            'n = \\dfrac{m}{M} = \\dfrac{8.50}{58.44} = 0.1454\\ \\text{mol}',
            'c = \\dfrac{0.1454\\ \\text{mol}}{0.250\\ \\text{L}} = 0.5818\\ \\text{mol/L}',
            '\\approx 0.582\\ \\text{mol/L}',
          ],
        },
      ],
      lines: [
        { say: 'Change the mass to an amount with the molar mass: n equals m over capital M, as in an earlier lesson. Then divide by the volume, in litres.', show: 'flow', focus: 'flow' },
        { say: 'Example. Eight point five zero grams of sodium chloride is dissolved to make two hundred fifty millilitres of solution. What is the molar concentration, to the nearest thousandth?', show: 'q' },
        { say: 'The molar mass of sodium chloride is twenty-two point nine nine plus thirty-five point four five: fifty-eight point four four grams per mole.', show: 'm.0', focus: 'm.0' },
        { say: 'The amount is eight point five zero over fifty-eight point four four: zero point one four five four moles.', show: 'm.1', focus: 'm.1' },
        { say: 'The volume is zero point two five zero litres. Keeping every digit in the calculator, the concentration is zero point five eight one eight moles per litre.', show: 'm.2', focus: 'm.2' },
        { say: 'Rounded, zero point five eight two moles per litre.', show: 'm.3', focus: 'm.3' },
      ],
    },
    {
      chapter: 'The mass needed',
      layout: 'split',
      leftWidth: 440,
      left: [
        { kind: 'math', id: 'f', size: 'md', lines: ['n = cV \\qquad m = nM', 'm = cVM'] },
        { kind: 'text', id: 'q', size: 'md', md: 'What mass of sodium carbonate, $\\ce{Na2CO3}$, is needed to make $250\\ \\text{mL}$ of a $0.120\\ \\text{mol/L}$ solution, to the nearest hundredth? Use these molar masses: Na $22.99\\ \\text{g/mol}$, C $12.01\\ \\text{g/mol}$, O $16.00\\ \\text{g/mol}$.' },
      ],
      right: [
        {
          kind: 'math',
          id: 'm',
          size: 'md',
          align: 'left',
          lines: [
            'M = 2 \\times 22.99 + 12.01 + 3 \\times 16.00',
            '\\phantom{M} = 105.99\\ \\text{g/mol}',
            'n = 0.120 \\times 0.250 = 0.0300\\ \\text{mol}',
            'm = 0.0300 \\times 105.99 = 3.1797\\ \\text{g}',
            '\\approx 3.18\\ \\text{g}',
          ],
        },
      ],
      lines: [
        { say: 'Many experiments need a solution whose concentration is known precisely. To make one from a solid, first find the mass you need.' },
        { say: 'Combine n equals c times V with m equals n times capital M. The mass is the concentration, times the volume, times the molar mass.', show: 'f', focus: 'f.1' },
        { say: 'Example. What mass of sodium carbonate is needed to make two hundred fifty millilitres of a zero point one two zero moles per litre solution, to the nearest hundredth?', show: 'q' },
        { say: 'The molar mass is two times twenty-two point nine nine, plus twelve point zero one, plus three times sixteen point zero zero: one hundred five point nine nine grams per mole.', show: ['m.0', 'm.1'], focus: ['m.0', 'm.1'] },
        { say: 'The amount needed is zero point one two zero times zero point two five zero: zero point zero three zero zero moles.', show: 'm.2', focus: 'm.2' },
        { say: 'So the mass is zero point zero three zero zero times one hundred five point nine nine: three point one seven nine seven, or three point one eight grams.', show: ['m.3', 'm.4'], focus: ['m.3', 'm.4'] },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q',
          prompt: 'What mass of potassium chloride, $\\ce{KCl}$, is needed to make $500\\ \\text{mL}$ of a $0.200\\ \\text{mol/L}$ solution? Use these molar masses: K $39.10\\ \\text{g/mol}$, Cl $35.45\\ \\text{g/mol}$.',
          choices: ['$29.8\\ \\text{g}$', '$7\\,455\\ \\text{g}$', '$7.46\\ \\text{g}$', '$0.00134\\ \\text{g}$'],
          answer: 2,
          working: '$M = 39.10 + 35.45 = 74.55\\ \\text{g/mol}$, $n = 0.200 \\times 0.500 = 0.100\\ \\text{mol}$, so $m = 0.100 \\times 74.55 = 7.455 \\approx 7.46\\ \\text{g}$.',
        },
      ],
      lines: [
        { say: 'Your turn. What mass of potassium chloride is needed to make five hundred millilitres of a zero point two zero zero moles per litre solution? The molar masses are on the screen. Pause the video and try it.', show: 'q', wait: 6 },
        { say: 'The answer is C. The molar mass is seventy-four point five five grams per mole, and the amount is zero point one zero zero moles, so the mass is seven point four six grams. Choice B uses millilitres instead of litres.', show: 'q.answer' },
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
            'From a mass: $n = \\dfrac{m}{M}$, then $c = \\dfrac{n}{V}$.',
            'The mass needed for a solution: $m = cVM$, with $V$ in litres.',
            'Add up the molar mass from the formula, counting every atom.',
            'Keep every digit until the last step, then round.',
          ],
        },
      ],
      lines: [
        { say: 'Let’s sum up. From a mass, find the amount first with the molar mass, then divide by the volume.', show: 'sum.0' },
        { say: 'The mass needed for a solution is the concentration, times the volume in litres, times the molar mass.', show: 'sum.1' },
        { say: 'Add up the molar mass from the formula, counting every atom.', show: 'sum.2' },
        { say: 'And keep every digit until the last step, then round. In part three, you will make up a standard solution in a volumetric flask. See you there!', show: 'sum.3' },
      ],
    },
  ],
};

export default video;
