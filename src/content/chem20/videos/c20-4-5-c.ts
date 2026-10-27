import type { Explainer } from '@/video/script.ts';
import { figure } from '@/video/solids.ts';
import { flow } from './lib/c20-4b-figures.ts';

const two = (top: string, bottom: string) => `\\begin{gathered}${top}\\\\ ${bottom}\\end{gathered}`;

// The path with the ideal gas law as its last step.
const route = figure(
  'f',
  [
    flow({
      nodes: [
        { id: 'm1', tex: two('\\text{mass}', '\\text{given}'), tone: 'opp' },
        { id: 'n1', tex: two('\\text{moles}', '\\text{given}') },
        { id: 'n2', tex: two('\\text{moles}', '\\text{of gas}') },
        { id: 'v2', tex: two('\\text{volume}', '\\text{of gas}'), tone: 'adj' },
      ],
      arrows: [
        { id: 'a1', from: 'm1', to: 'n1', tex: '\\div M', tone: 'good' },
        { id: 'a2', from: 'n1', to: 'n2', tex: '\\times\\ \\text{ratio}', tone: 'theta' },
        { id: 'a3', from: 'n2', to: 'v2', tex: '\\times \\dfrac{RT}{P}', tone: 'good' },
      ],
      width: 3.2,
      height: 1.9,
      gap: 3.4,
    }),
  ],
  250,
);

const video: Explainer = {
  id: 'c20-4-5-c',
  lessonId: 'c20-4-5',
  title: 'Gas and Solution Stoichiometry, Part 3: Gases at Other Conditions',
  thumbnailTitle: 'Gases at Other Conditions',
  thumbnail: 'f',
  summary:
    'At a temperature and pressure other than STP or SATP, use the ideal gas law, PV = nRT with R = 8.314 kPa·L/(mol·K) and the temperature in kelvins, for the gas step; the stoichiometry before it does not change. 3.50 g of zinc gives 1.34 L of hydrogen at 22 °C and 98 kPa, and 10.0 g of propane needs 27.2 L of oxygen at 18 °C and 101 kPa.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Quantitative Relationships in Chemical Changes · Part 3', title: 'Gases at Other Conditions', subtitle: 'The ideal gas law for the gas step' }],
      lines: [
        { say: 'Real reactions rarely happen at exactly S T P or S A T P. A lab might be at twenty-two degrees Celsius, with the air at ninety-eight kilopascals.', show: 'title' },
        { say: 'In this part, you will use the ideal gas law for the gas step. The stoichiometry before it does not change.' },
      ],
    },
    {
      chapter: 'The ideal gas law',
      layout: 'center',
      main: [
        { kind: 'math', id: 'm', size: 'lg', lines: ['PV = nRT \\qquad V = \\dfrac{nRT}{P}', 'R = 8.314\\ \\text{kPa·L/(mol·K)}', 'T(\\text{K}) = T(^\\circ\\text{C}) + 273.15'] },
        route,
      ],
      lines: [
        { say: 'At any temperature and pressure, use the ideal gas law: P V equals n R T. Solved for the volume, V equals n R T over P.', show: 'm.0', focus: 'm.0' },
        { say: 'R is eight point three one four kilopascal litres per mole kelvin, and the temperature must be in kelvins: add two hundred seventy-three point one five to the Celsius temperature.', show: ['m.1', 'm.2'], focus: ['m.1', 'm.2'] },
        { say: 'So the path is the same as before, into moles and through the mole ratio. Only the last step uses the ideal gas law.', show: 'f', focus: 'f.a3' },
      ],
    },
    {
      chapter: 'Hydrogen on a cool day',
      layout: 'center',
      main: [
        { kind: 'text', id: 'q', size: 'md', align: 'center', md: '$\\ce{Zn + 2HCl -> ZnCl2 + H2}$. What volume of $\\ce{H2}$ at $22^\\circ\\text{C}$ and $98\\ \\text{kPa}$ forms from $3.50\\ \\text{g}$ of $\\ce{Zn}$, to the nearest hundredth? Use Zn $65.38\\ \\text{g/mol}$.' },
        {
          kind: 'math',
          id: 'm',
          size: 'md',
          lines: [
            'n(\\ce{Zn}) = \\dfrac{3.50}{65.38} = 0.05353\\ \\text{mol}',
            'n(\\ce{H2}) = 0.05353 \\times \\dfrac{1}{1} = 0.05353\\ \\text{mol}',
            'T = 22 + 273.15 = 295.15\\ \\text{K}',
            'V = \\dfrac{nRT}{P} = \\dfrac{0.05353 \\times 8.314 \\times 295.15}{98} = 1.340\\ \\text{L} \\approx \\good{1.34\\ \\text{L}}',
          ],
        },
      ],
      lines: [
        { say: 'Zinc reacts with excess hydrochloric acid. What volume of hydrogen at twenty-two degrees Celsius and ninety-eight kilopascals forms from three point five zero grams of zinc?', show: 'q' },
        { say: 'Three point five zero over sixty-five point three eight is zero point zero five three five three moles of zinc, and the ratio is one to one, so the same amount of hydrogen.', show: ['m.0', 'm.1'], focus: ['m.0', 'm.1'] },
        { say: 'The temperature in kelvins is two hundred ninety-five point one five.', show: 'm.2', focus: 'm.2' },
        { say: 'So the volume is n R T over P, which is one point three four litres of hydrogen.', show: 'm.3', focus: 'm.3' },
      ],
    },
    {
      chapter: 'Kelvins, not Celsius',
      layout: 'center',
      main: [
        { kind: 'callout', id: 'oops', tone: 'mistake', title: 'Celsius in the ideal gas law', md: 'Using $22$ instead of $295.15$ in the zinc example gives $0.0999\\ \\text{L}$, more than ten times too small. Add 273.15 before you substitute.' },
      ],
      lines: [
        { say: 'A common slip is to put the Celsius temperature into the law. Using twenty-two instead of two hundred ninety-five point one five gives about zero point one litres, more than ten times too small.', show: 'oops' },
        { say: 'Always add two hundred seventy-three point one five before you substitute.' },
      ],
    },
    {
      chapter: 'Burning propane',
      layout: 'center',
      main: [
        { kind: 'text', id: 'q', size: 'md', align: 'center', md: '$\\ce{C3H8 + 5O2 -> 3CO2 + 4H2O}$. What volume of $\\ce{O2}$ at $18^\\circ\\text{C}$ and $101\\ \\text{kPa}$ burns $10.0\\ \\text{g}$ of $\\ce{C3H8}$? Use C $12.01$ and H $1.01\\ \\text{g/mol}$.' },
        {
          kind: 'math',
          id: 'm',
          size: 'md',
          lines: [
            'M(\\ce{C3H8}) = 3(12.01) + 8(1.01) = 44.11\\ \\text{g/mol}',
            'n(\\ce{C3H8}) = \\dfrac{10.0}{44.11} = 0.2267\\ \\text{mol}',
            'n(\\ce{O2}) = 0.2267 \\times \\dfrac{5}{1} = 1.134\\ \\text{mol}',
            'T = 18 + 273.15 = 291.15\\ \\text{K}',
            'V = \\dfrac{1.134 \\times 8.314 \\times 291.15}{101} = 27.18\\ \\text{L} \\approx \\good{27.2\\ \\text{L}}',
          ],
        },
      ],
      lines: [
        { say: 'What volume of oxygen, at eighteen degrees Celsius and one hundred one kilopascals, is needed to burn ten point zero grams of propane in a barbecue?', show: 'q' },
        { say: 'Propane is forty-four point one one grams per mole, so ten point zero grams is zero point two two six seven moles.', show: ['m.0', 'm.1'], focus: 'm.1' },
        { say: 'Five oxygen molecules for each propane: one point one three four moles of oxygen.', show: 'm.2', focus: 'm.2' },
        { say: 'At two hundred ninety-one point one five kelvins, n R T over P gives twenty-seven point two litres of oxygen.', show: ['m.3', 'm.4'], focus: 'm.4' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q',
          prompt: 'Limestone breaks down: $\\ce{CaCO3 -> CaO + CO2}$. What volume of $\\ce{CO2}$ at $25^\\circ\\text{C}$ and $105\\ \\text{kPa}$ forms from $12.0\\ \\text{g}$ of $\\ce{CaCO3}$, to the nearest hundredth? Use $PV = nRT$, $R = 8.314\\ \\text{kPa·L/(mol·K)}$, $T(\\text{K}) = T(^\\circ\\text{C}) + 273.15$ and $M(\\ce{CaCO3}) = 100.09\\ \\text{g/mol}$.',
          choices: ['$0.24\\ \\text{L}$', '$2.97\\ \\text{L}$', '$2.69\\ \\text{L}$', '$2.83\\ \\text{L}$'],
          answer: 3,
          working: '$n = 12.0 \\div 100.09 = 0.1199\\ \\text{mol}$ of each, $T = 298.15\\ \\text{K}$, and $V = 0.1199 \\times 8.314 \\times 298.15 \\div 105 = 2.83\\ \\text{L}$.',
        },
      ],
      lines: [
        { say: 'Your turn. What volume of carbon dioxide, at twenty-five degrees Celsius and one hundred five kilopascals, forms from twelve point zero grams of calcium carbonate? Pause the video and try it.', show: 'q', wait: 6 },
        { say: 'The answer is D, two point eight three litres. Twelve point zero grams is zero point one one nine nine moles, and so is the carbon dioxide. At two hundred ninety-eight point one five kelvins, n R T over P is two point eight three. Choice A uses the Celsius temperature, and choice B uses the molar volume at S A T P, but the pressure here is not one hundred kilopascals.', show: 'q.answer' },
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
          items: ['At other conditions, use $PV = nRT$ for the gas step.', '$R = 8.314\\ \\text{kPa·L/(mol·K)}$, with $T$ in **kelvins**.', 'The stoichiometry before the gas step does not change.'],
        },
      ],
      lines: [
        { say: 'Let’s sum up. At other conditions, use the ideal gas law for the gas step.', show: 'sum.0' },
        { say: 'R is eight point three one four, and the temperature is always in kelvins.', show: 'sum.1' },
        { say: 'And the stoichiometry before the gas step does not change. In part four, you will use solutions in stoichiometry. See you there!', show: 'sum.2' },
      ],
    },
  ],
};

export default video;
