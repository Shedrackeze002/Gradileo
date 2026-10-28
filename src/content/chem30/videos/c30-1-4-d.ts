import type { Explainer } from '@/video/script.ts';
import { energyDiagram } from '@/video/chem.ts';
import { figure } from '@/video/solids.ts';
import { twoLevels } from './lib/c30-1a-figures.ts';

// The decomposition of water: +571.6 kJ for 2 mol of water.
const water = figure('wat', [twoLevels({ reactants: '\\ce{2H2O(l)}', products: '\\ce{2H2(g) + O2(g)}', exo: false, label: '\\Delta H = +571.6\\ \\text{kJ}' })]);

// Photosynthesis: the products 2802.5 kJ above the reactants.
const photo = figure('ph', [twoLevels({ reactants: '\\ce{6CO2(g) + 6H2O(l)}', products: '\\ce{C6H12O6(s) + 6O2(g)}', exo: false, label: '\\Delta H = +2802.5\\ \\text{kJ}' })]);

// A potential energy diagram, with its hump: not an enthalpy diagram.
const hump = figure('pe', [energyDiagram({ reactants: 2, products: 4, peak: 5.4, labels: { y: '\\text{Potential energy}' } })]);

const video: Explainer = {
  id: 'c30-1-4-d',
  lessonId: 'c30-1-4',
  title: 'Communicating Enthalpy Changes, Part 4: Diagrams, Masses and All Four Ways',
  thumbnailTitle: 'All Four Ways',
  thumbnail: 'ph',
  summary:
    'A diagram, like an equation, gives ΔH for the amounts written on it: for 2H₂O(l) → 2H₂(g) + O₂(g), +571.6 kJ is +285.8 kJ/mol of water, so 9.00 g of water decomposing takes +143 kJ. Photosynthesis, ΔrH = +2802.5 kJ, is written as an energy term with the reactants, as +2802.5 kJ/mol of glucose or +467.1 kJ/mol of carbon dioxide, and as a diagram with the arrow pointing up. A diagram with a hump is a potential energy diagram, not an enthalpy diagram.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Thermochemical Changes · Part 4', title: 'Diagrams, Masses and All Four Ways', subtitle: 'One energy change, every way' }],
      lines: [
        { say: 'Plants store the energy of sunlight in glucose. How would you write that energy change, every way you know?', show: 'title' },
        { say: 'In this part, you will use an enthalpy diagram with a mass, write photosynthesis all four ways, and tell an enthalpy diagram from a potential energy diagram.' },
      ],
    },
    {
      chapter: 'A diagram and a mass',
      layout: 'split',
      leftWidth: 520,
      left: [water],
      right: [
        { kind: 'text', id: 'q', size: 'md', md: 'Using the diagram, find $\\Delta H$ when $9.00\\ \\text{g}$ of water decomposes. $M(\\ce{H2O}) = 18.02\\ \\text{g/mol}$.' },
        {
          kind: 'math',
          id: 'm',
          size: 'md',
          align: 'left',
          lines: ['\\Delta_r H_m = \\dfrac{+571.6\\ \\text{kJ}}{2\\ \\text{mol}}', '\\Delta_r H_m = +285.8\\ \\text{kJ/mol}', 'n = \\dfrac{9.00}{18.02} = 0.4994\\ \\text{mol}', '\\Delta H = 0.4994 \\times (+285.8)', '\\Delta H = +142.7 \\approx +143\\ \\text{kJ}'],
        },
      ],
      lines: [
        {
          say: 'A diagram, like an equation, gives delta H for the amounts written on it. Here, positive five hundred seventy-one point six kilojoules is for two moles of water.',
          caption: 'A diagram, like an equation, gives ΔH for the amounts written on it. Here, +571.6 kJ is for two moles of water.',
          show: ['wat.axis', 'wat.r', 'wat.p', 'wat.dh'],
        },
        { say: 'What is the enthalpy change when nine point zero zero grams of water decomposes? Find the molar enthalpy first.', show: 'q' },
        {
          say: 'Divide by the coefficient, two: positive two hundred eighty-five point eight kilojoules per mole of water.',
          caption: 'Divide by the coefficient, 2: +285.8 kJ per mole of water.',
          show: ['m.0', 'm.1'],
          focus: 'm.1',
        },
        { say: 'Nine point zero zero grams, over eighteen point zero two grams per mole, is zero point four nine nine four moles.', show: 'm.2', focus: 'm.2' },
        {
          say: 'Multiply: delta H is positive one hundred forty-three kilojoules, to three significant figures.',
          caption: 'Multiply: ΔH = +143 kJ, to three significant figures.',
          show: ['m.3', 'm.4'],
          focus: 'm.4',
        },
      ],
    },
    {
      chapter: 'Photosynthesis, every way',
      layout: 'center',
      main: [
        { kind: 'math', id: 'eq', size: 'md', lines: ['\\ce{6CO2(g) + 6H2O(l) -> C6H12O6(s) + 6O2(g)}', '\\Delta_r H = +2802.5\\ \\text{kJ}'] },
        {
          kind: 'math',
          id: 'm',
          size: 'md',
          lines: [
            '\\ce{6CO2(g) + 6H2O(l)} + 2802.5\\ \\text{kJ} \\mathrel{\\ce{->}} \\ce{C6H12O6(s) + 6O2(g)}',
            '\\text{per mole of glucose: } \\dfrac{+2802.5}{1} = +2802.5\\ \\text{kJ/mol}',
            '\\text{per mole of carbon dioxide: } \\dfrac{+2802.5}{6} = +467.1\\ \\text{kJ/mol}',
          ],
        },
      ],
      lines: [
        {
          say: 'In a leaf, photosynthesis stores the energy of sunlight. Six moles of carbon dioxide and six of water form one mole of glucose and six of oxygen, with delta r H equals positive two thousand eight hundred two point five kilojoules.',
          caption: 'In a leaf, photosynthesis stores the energy of sunlight: 6CO₂(g) + 6H₂O(l) → C₆H₁₂O₆(s) + 6O₂(g), ΔrH = +2802.5 kJ.',
          show: 'eq',
        },
        {
          say: 'As an energy term: delta r H is positive, so the energy is absorbed, and it goes with the reactants.',
          caption: 'As an energy term: ΔrH is positive, so the energy is absorbed, and it goes with the reactants.',
          show: 'm.0',
          focus: 'm.0',
        },
        { say: 'As molar enthalpies: one mole of glucose forms, so per mole of glucose, it is positive two thousand eight hundred two point five kilojoules per mole.', caption: 'As molar enthalpies: one mole of glucose forms, so per mole of glucose, it is +2802.5 kJ/mol.', show: 'm.1', focus: 'm.1' },
        {
          say: 'Six moles of carbon dioxide are used, so per mole of carbon dioxide, divide by six: positive four hundred sixty-seven point one kilojoules per mole.',
          caption: 'Six moles of carbon dioxide are used, so per mole of carbon dioxide, divide by 6: +467.1 kJ/mol.',
          show: 'm.2',
          focus: 'm.2',
        },
      ],
    },
    {
      chapter: 'And as a diagram',
      layout: 'split',
      leftWidth: 620,
      left: [photo],
      right: [{ kind: 'text', id: 't', size: 'md', md: 'The reactants, $\\ce{6CO2(g) + 6H2O(l)}$, on the **lower** line; glucose and oxygen on the **upper** line; the arrow points **up**.' }],
      lines: [
        { say: 'And as an enthalpy diagram: carbon dioxide and water go on the lower line, and glucose and oxygen on the upper line.', show: ['ph.axis', 'ph.r', 'ph.p', 't'] },
        {
          say: 'The arrow points up, from the reactants to the products, labelled delta H equals positive two thousand eight hundred two point five kilojoules.',
          caption: 'The arrow points up, from the reactants to the products, labelled ΔH = +2802.5 kJ.',
          show: 'ph.dh',
          focus: 'ph.dh',
        },
      ],
    },
    {
      chapter: 'An enthalpy diagram has no hump',
      layout: 'split',
      leftWidth: 620,
      left: [hump],
      right: [
        {
          kind: 'callout',
          id: 'mis',
          tone: 'mistake',
          title: 'An enthalpy diagram has no hump',
          md: 'An enthalpy diagram shows only the starting and finishing enthalpies. A curve with a **hump**, against the progress of the reaction, is a **potential energy diagram**, which also shows the activation energy.',
        },
      ],
      lines: [
        { say: 'One last warning. An enthalpy diagram shows only the starting and finishing enthalpies.', show: 'mis' },
        { say: 'A diagram with a hump between the reactants and the products, plotted against the progress of the reaction, is a potential energy diagram.', show: ['pe.axes', 'pe.curve', 'pe.reactants', 'pe.products'] },
        { say: 'It also shows the activation energy, the barrier the reaction must climb. You will use it later in this unit.', show: 'pe.ea', focus: 'pe.ea' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q',
          prompt: 'The enthalpy diagram for $\\ce{N2(g) + 3H2(g) -> 2NH3(g)}$ has the arrow pointing down, labelled $\\Delta H = -91.8\\ \\text{kJ}$. What is the enthalpy change when $6.00\\ \\text{g}$ of ammonia forms? $M(\\ce{NH3}) = 17.04\\ \\text{g/mol}$.',
          choices: ['$-32.3\\ \\text{kJ}$', '$-16.2\\ \\text{kJ}$', '$+16.2\\ \\text{kJ}$', '$-551\\ \\text{kJ}$'],
          answer: 1,
          working: 'Per mole of ammonia: $\\dfrac{-91.8}{2} = -45.9\\ \\text{kJ/mol}$. $n = \\dfrac{6.00}{17.04} = 0.3521\\ \\text{mol}$, so $\\Delta H = 0.3521 \\times (-45.9) = -16.2\\ \\text{kJ}$.',
        },
      ],
      lines: [
        {
          say: 'Your turn. The enthalpy diagram for nitrogen and hydrogen forming two moles of ammonia has the arrow pointing down, labelled negative ninety-one point eight kilojoules. What is the enthalpy change when six point zero zero grams of ammonia forms? Pause the video and try it.',
          caption: 'Your turn. The enthalpy diagram for N₂(g) + 3H₂(g) → 2NH₃(g) has the arrow pointing down, labelled ΔH = −91.8 kJ. What is the enthalpy change when 6.00 g of ammonia forms? Pause the video and try it.',
          show: 'q',
          wait: 6,
        },
        {
          say: 'The answer is B. The diagram is for two moles of ammonia, so per mole it is negative forty-five point nine kilojoules. Six point zero zero grams is zero point three five two one moles, which gives negative sixteen point two. Choice A forgets to divide by two.',
          caption: 'The answer is B. The diagram is for two moles of ammonia, so per mole it is −45.9 kJ/mol. 6.00 g is 0.3521 mol, which gives −16.2 kJ. Choice A forgets to divide by two.',
          show: 'q.answer',
        },
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
            'A diagram gives $\\Delta H$ for the amounts on it: divide by the coefficient for the molar enthalpy.',
            'Water: $\\dfrac{+571.6}{2} = +285.8\\ \\text{kJ/mol}$, so $9.00\\ \\text{g}$ takes $+143\\ \\text{kJ}$.',
            'Photosynthesis: energy term with the reactants, $+467.1\\ \\text{kJ/mol}$ of $\\ce{CO2}$, arrow up.',
            'A diagram with a hump is a potential energy diagram.',
          ],
        },
      ],
      lines: [
        { say: 'Let’s sum up. A diagram gives delta H for the amounts on it, so divide by the coefficient for a molar enthalpy.', caption: 'Let’s sum up. A diagram gives ΔH for the amounts on it, so divide by the coefficient for a molar enthalpy.', show: 'sum.0' },
        { say: 'Then use the amount in moles, as for nine point zero zero grams of water.', show: 'sum.1' },
        { say: 'One reaction, like photosynthesis, can be written all four ways.', show: 'sum.2' },
        { say: 'And a diagram with a hump is a potential energy diagram. That completes this lesson: you can now read and write an energy change in all four ways.', show: 'sum.3' },
      ],
    },
  ],
};

export default video;
