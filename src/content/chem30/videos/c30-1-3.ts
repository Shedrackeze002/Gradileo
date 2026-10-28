import type { Explainer } from '@/video/script.ts';
import { figure } from '@/video/solids.ts';
import { flow } from './lib/c30-1a-figures.ts';

// The water in a calorimeter is the surroundings: when it warms, the system lost energy, and when
// it cools, the system gained it.
const signs = figure(
  'fl',
  [
    flow({ name: 'warm', out: true, title: '\\text{water warms}', note: '\\Delta H = -Q', surroundings: '\\text{water}' }),
    flow({ name: 'cool', at: [9.0, 0], out: false, title: '\\text{water cools}', note: '\\Delta H = +Q', surroundings: '\\text{water}' }),
  ],
  460,
);

const video: Explainer = {
  id: 'c30-1-3',
  lessonId: 'c30-1-3',
  title: 'Molar Enthalpy, Part 1: From Heat to Molar Enthalpy',
  thumbnailTitle: 'From Heat to Molar Enthalpy',
  thumbnail: 'fl',
  summary:
    'The water in a calorimeter is the surroundings: if it warms, the system released energy and ΔH = −Q; if it cools, ΔH = +Q. The molar enthalpy is the enthalpy change per mole of a stated substance, ΔH ÷ n, in kJ/mol. Dissolving 8.00 g of ammonium nitrate cools 100.0 g of water from 21.0 °C to 15.0 °C, so its molar enthalpy of solution is +25.2 kJ/mol.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Thermochemical Changes · Part 1', title: 'From Heat to Molar Enthalpy', subtitle: 'Energy per mole, with its sign' }],
      lines: [
        { say: 'An instant cold pack holds ammonium nitrate and a pouch of water. To design one, you need to know how much energy each mole of salt absorbs as it dissolves.', show: 'title' },
        { say: 'That number is a molar enthalpy. In this lesson, you will find molar enthalpies from calorimetry, and then use them.' },
      ],
    },
    {
      chapter: 'The water is the surroundings',
      layout: 'split',
      leftWidth: 600,
      left: [signs],
      right: [{ kind: 'callout', id: 'def', tone: 'definition', title: 'Enthalpy change', md: '$\\Delta H$ is the energy the chemical system gains (positive) or loses (negative) as a change takes place, in kilojoules.' }],
      lines: [
        {
          say: 'Q equals m c delta t gives the heat gained or lost by the water in a calorimeter. But the water is the surroundings, so the system changes by the same energy, in the opposite direction.',
          caption: 'Q = mcΔt gives the heat gained or lost by the water in a calorimeter. But the water is the surroundings, so the system changes by the same energy, in the opposite direction.',
        },
        {
          say: 'If the water warms up, the system released that energy: delta H equals negative Q, and the change is exothermic.',
          caption: 'If the water warms up, the system released that energy: ΔH = −Q, and the change is exothermic.',
          show: ['fl.warm-box', 'fl.warm-arrows', 'fl.warm-title', 'fl.warm-note'],
        },
        {
          say: 'If the water cools down, the system absorbed it: delta H equals positive Q, and the change is endothermic.',
          caption: 'If the water cools down, the system absorbed it: ΔH = +Q, and the change is endothermic.',
          show: ['fl.cool-box', 'fl.cool-arrows', 'fl.cool-title', 'fl.cool-note'],
        },
        { say: 'So the enthalpy change, delta H, is the energy the chemical system gains or loses, in kilojoules.', caption: 'So the enthalpy change, ΔH, is the energy the chemical system gains or loses, in kilojoules.', show: 'def' },
      ],
    },
    {
      chapter: 'Molar enthalpy',
      layout: 'center',
      main: [
        { kind: 'callout', id: 'def', tone: 'definition', title: 'Molar enthalpy', md: 'The enthalpy change per mole of a stated substance, in $\\text{kJ/mol}$: $\\quad \\Delta_r H_m = \\dfrac{\\Delta H}{n} \\quad$ and so $\\quad \\Delta H = n\\,\\Delta_r H_m$' },
        { kind: 'text', id: 'names', size: 'md', align: 'center', md: 'Molar enthalpies of **combustion** (per mole of fuel), of **solution** (per mole of solute), of **neutralisation**, of **fusion** and of **vaporisation**: negative when energy is released, positive when it is absorbed.' },
      ],
      lines: [
        {
          say: 'Different amounts give different enthalpy changes, so chemists compare them per mole. The molar enthalpy is the enthalpy change per mole of a stated substance: delta H divided by n, in kilojoules per mole.',
          caption: 'Different amounts give different enthalpy changes, so chemists compare them per mole. The molar enthalpy is the enthalpy change per mole of a stated substance: ΔH ÷ n, in kJ/mol.',
          show: 'def',
        },
        { say: 'It is named after its change. The molar enthalpy of combustion is per mole of fuel burned, and the molar enthalpy of solution is per mole of solute dissolved.', show: 'names' },
        { say: 'There are molar enthalpies of neutralisation, and of fusion and vaporisation too. Each one carries a sign: negative when energy is released, positive when it is absorbed.' },
      ],
    },
    {
      chapter: 'Dissolving ammonium nitrate',
      layout: 'center',
      main: [
        {
          kind: 'text',
          id: 'q',
          size: 'md',
          align: 'center',
          md: '$8.00\\ \\text{g}$ of $\\ce{NH4NO3}$ ($M = 80.06\\ \\text{g/mol}$) dissolves in $100.0\\ \\text{g}$ of water, which cools from $21.0^\\circ\\text{C}$ to $15.0^\\circ\\text{C}$. Find the molar enthalpy of solution. $c = 4.19\\ \\text{J/(g·°C)}$.',
        },
        {
          kind: 'math',
          id: 'm',
          size: 'md',
          lines: [
            '\\textbf{Heat: } Q = 100.0 \\times 4.19 \\times 6.0 = 2514\\ \\text{J} = 2.514\\ \\text{kJ}',
            '\\textbf{Amount: } n = \\dfrac{8.00}{80.06} = 0.09993\\ \\text{mol}',
            '\\textbf{Sign: } \\text{the water cooled, so } \\Delta H = +2.514\\ \\text{kJ}',
            '\\textbf{Divide: } \\Delta_r H_m = \\dfrac{+2.514\\ \\text{kJ}}{0.09993\\ \\text{mol}} = +25.2\\ \\text{kJ/mol}',
          ],
        },
      ],
      lines: [
        {
          say: 'Four steps turn calorimetry data into a molar enthalpy: heat, amount, sign, divide. Here is the cold pack. Eight point zero zero grams of ammonium nitrate dissolves in one hundred point zero grams of water, which cools from twenty-one point zero to fifteen point zero degrees Celsius.',
          show: 'q',
        },
        {
          say: 'Heat: one hundred point zero, times four point one nine, times six point zero, is two thousand five hundred fourteen joules, or two point five one four kilojoules.',
          caption: 'Heat: 100.0 × 4.19 × 6.0 = 2514 J, or 2.514 kJ.',
          show: 'm.0',
          focus: 'm.0',
        },
        {
          say: 'Amount: eight point zero zero grams, over the molar mass, eighty point zero six grams per mole, is zero point zero nine nine nine three moles.',
          show: 'm.1',
          focus: 'm.1',
        },
        { say: 'Sign: the water cooled, so the dissolving absorbed energy. Delta H is positive.', caption: 'Sign: the water cooled, so the dissolving absorbed energy. ΔH is positive.', show: 'm.2', focus: 'm.2' },
        { say: 'Divide: the molar enthalpy of solution is positive twenty-five point two kilojoules per mole. Endothermic, just right for a cold pack.', show: 'm.3', focus: 'm.3' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q',
          prompt: 'When $0.0500\\ \\text{mol}$ of sodium hydroxide, $\\ce{NaOH}$, dissolves in the water of a calorimeter, the water gains $2.22\\ \\text{kJ}$ of heat. What is the molar enthalpy of solution of sodium hydroxide?',
          choices: ['$+44.4\\ \\text{kJ/mol}$', '$-0.111\\ \\text{kJ/mol}$', '$-44.4\\ \\text{kJ/mol}$', '$+0.111\\ \\text{kJ/mol}$'],
          answer: 2,
          working: 'The water gained heat, so the system lost it: $\\Delta H = -2.22\\ \\text{kJ}$. $\\Delta_r H_m = \\dfrac{-2.22\\ \\text{kJ}}{0.0500\\ \\text{mol}} = -44.4\\ \\text{kJ/mol}$.',
        },
      ],
      lines: [
        {
          say: 'Your turn. When zero point zero five zero zero moles of sodium hydroxide dissolves in the water of a calorimeter, the water gains two point two two kilojoules. What is the molar enthalpy of solution? Pause the video and try it.',
          show: 'q',
          wait: 6,
        },
        {
          say: 'The answer is C, negative forty-four point four kilojoules per mole. The water gained heat, so the system lost it, and delta H is negative. Divide by zero point zero five zero zero moles. Choice A has the wrong sign.',
          caption: 'The answer is C, −44.4 kJ/mol. The water gained heat, so the system lost it, and ΔH is negative. Divide by 0.0500 mol. Choice A has the wrong sign.',
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
            'The water is the surroundings: if it warms, $\\Delta H = -Q$; if it cools, $\\Delta H = +Q$.',
            'Molar enthalpy: $\\Delta_r H_m = \\dfrac{\\Delta H}{n}$, in kJ/mol, per mole of a stated substance.',
            'From calorimetry: heat, amount, sign, divide.',
          ],
        },
      ],
      lines: [
        { say: 'Let’s sum up. The water is the surroundings. If it warms, delta H is negative Q; if it cools, delta H is positive Q.', caption: 'Let’s sum up. The water is the surroundings. If it warms, ΔH = −Q; if it cools, ΔH = +Q.', show: 'sum.0' },
        { say: 'The molar enthalpy is delta H divided by the amount in moles, for a stated substance.', caption: 'The molar enthalpy is ΔH divided by the amount in moles, for a stated substance.', show: 'sum.1' },
        { say: 'And from calorimetry data: heat, amount, sign, divide. In part two, you will find the molar enthalpy of a neutralisation. See you there!', show: 'sum.2' },
      ],
    },
  ],
};

export default video;
