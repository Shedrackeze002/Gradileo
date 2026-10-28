import type { Explainer } from '@/video/script.ts';
import { figure } from '@/video/solids.ts';
import { flow } from './lib/c20-4b-figures.ts';

const two = (top: string, bottom: string) => `\\begin{gathered}${top}\\\\ ${bottom}\\end{gathered}`;

// 10.0 L of carbon dioxide at SATP, back to the mass of calcium carbonate that makes it.
const limestone = figure(
  'w',
  [
    flow({
      nodes: [
        { id: 'v1', tex: two('\\text{volume}', '\\ce{CO2}'), tone: 'adj', value: '10.0\\ \\text{L}' },
        { id: 'n1', tex: two('\\text{moles}', '\\ce{CO2}'), value: '0.4032\\ \\text{mol}' },
        { id: 'n2', tex: two('\\text{moles}', '\\ce{CaCO3}'), value: '0.4032\\ \\text{mol}' },
        { id: 'm2', tex: two('\\text{mass}', '\\ce{CaCO3}'), tone: 'opp', value: '40.36\\ \\text{g}' },
      ],
      arrows: [
        { id: 'a1', from: 'v1', to: 'n1', tex: '\\div 24.8', tone: 'good' },
        { id: 'a2', from: 'n1', to: 'n2', tex: '\\times \\dfrac{1}{1}', tone: 'theta' },
        { id: 'a3', from: 'n2', to: 'm2', tex: '\\times 100.09', tone: 'good' },
      ],
      width: 3.2,
      height: 1.9,
      gap: 3.4,
    }),
  ],
  250,
);

const video: Explainer = {
  id: 'c20-4-5-b',
  lessonId: 'c20-4-5',
  title: 'Gas and Solution Stoichiometry, Part 2: From a Gas Back to a Mass',
  thumbnailTitle: 'From a Gas Back to a Mass',
  thumbnail: 'w',
  summary:
    'To find the mass of a solid that makes a volume of gas, divide the volume by the molar volume first, then use the mole ratio and m = nM: 10.0 L of carbon dioxide at SATP needs 40.4 g of calcium carbonate, and 5.00 L of oxygen at STP needs 18.2 g of potassium chlorate. The molar volume is for gases only, and gases at the same temperature and pressure have volumes in the ratio of their coefficients.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Quantitative Relationships in Chemical Changes · Part 2', title: 'From a Gas Back to a Mass', subtitle: 'Running the path backwards' }],
      lines: [
        { say: 'Heating limestone gives off carbon dioxide. How much limestone does it take to make a given volume of the gas?', show: 'title' },
        { say: 'In this part, the path runs backwards, from a volume of gas to a mass of solid. You will also compare the volumes of two gases.' },
      ],
    },
    {
      chapter: 'Carbon dioxide from limestone',
      layout: 'center',
      main: [
        { kind: 'text', id: 'q', size: 'md', align: 'center', md: '$\\ce{CaCO3 -> CaO + CO2}$. What mass of $\\ce{CaCO3}$ is needed to make $10.0\\ \\text{L}$ of $\\ce{CO2}$ at SATP, to the nearest tenth? At SATP, $V_m = 24.8\\ \\text{L/mol}$. Use Ca $40.08$, C $12.01$ and O $16.00\\ \\text{g/mol}$.' },
        limestone,
        { kind: 'math', id: 'm', size: 'md', lines: ['M(\\ce{CaCO3}) = 40.08 + 12.01 + 3(16.00) = 100.09\\ \\text{g/mol}', 'm = 40.36\\ \\text{g} \\approx \\good{40.4\\ \\text{g}}'] },
      ],
      lines: [
        { say: 'Calcium carbonate breaks down into calcium oxide and carbon dioxide. What mass of calcium carbonate is needed to make ten point zero litres of carbon dioxide at S A T P?', show: ['q', 'w.v1', 'w.v1-value'] },
        { say: 'Start with the gas. Ten point zero over twenty-four point eight is zero point four zero three two moles of carbon dioxide.', show: ['w.a1', 'w.n1', 'w.n1-value'], focus: 'w.a1' },
        { say: 'The ratio is one to one, so the same amount of calcium carbonate.', show: ['w.a2', 'w.n2', 'w.n2-value'], focus: 'w.a2' },
        { say: 'Calcium carbonate is one hundred point zero nine grams per mole. That gives forty point three six, or forty point four grams.', show: ['m.0', 'w.a3', 'w.m2', 'w.m2-value', 'm.1'], focus: ['w.a3', 'm.1'] },
      ],
    },
    {
      chapter: 'Oxygen from potassium chlorate',
      layout: 'center',
      main: [
        { kind: 'text', id: 'q', size: 'md', align: 'center', md: '$\\ce{2KClO3 -> 2KCl + 3O2}$. What mass of $\\ce{KClO3}$ is needed to make $5.00\\ \\text{L}$ of $\\ce{O2}$ at STP, to the nearest tenth? At STP, $V_m = 22.4\\ \\text{L/mol}$. Use K $39.10$, Cl $35.45$ and O $16.00\\ \\text{g/mol}$.' },
        {
          kind: 'math',
          id: 'm',
          size: 'md',
          lines: [
            'n(\\ce{O2}) = \\dfrac{5.00}{22.4} = 0.2232\\ \\text{mol}',
            'n(\\ce{KClO3}) = 0.2232 \\times \\dfrac{2}{3} = 0.1488\\ \\text{mol}',
            'M(\\ce{KClO3}) = 39.10 + 35.45 + 3(16.00) = 122.55\\ \\text{g/mol}',
            'm = 0.1488 \\times 122.55 = 18.24\\ \\text{g} \\approx \\good{18.2\\ \\text{g}}',
          ],
        },
      ],
      lines: [
        { say: 'Heating potassium chlorate gives potassium chloride and oxygen. What mass of potassium chlorate is needed to make five point zero zero litres of oxygen at S T P?', show: 'q' },
        { say: 'Five point zero zero over twenty-two point four is zero point two two three two moles of oxygen.', show: 'm.0', focus: 'm.0' },
        { say: 'The wanted substance has the coefficient two, and the given oxygen has three. So multiply by two over three: zero point one four eight eight moles.', show: 'm.1', focus: 'm.1' },
        { say: 'At one hundred twenty-two point five five grams per mole, that is eighteen point two grams of potassium chlorate.', show: ['m.2', 'm.3'], focus: 'm.3' },
      ],
    },
    {
      chapter: 'Gases only, and gas to gas',
      layout: 'center',
      main: [
        { kind: 'callout', id: 'oops', tone: 'mistake', title: 'The molar volume is for gases only', md: '$V_m$ changes moles of a **gas** to litres. In $\\ce{CaCO3 -> CaO + CO2}$, only the $\\ce{CO2}$ has a molar volume; the calcium carbonate is weighed, so it goes through $n = \\dfrac{m}{M}$.' },
        { kind: 'callout', id: 'gas', tone: 'key', title: 'Gas to gas', md: 'At the same temperature and pressure, gas volumes are in the ratio of the coefficients. In $\\ce{C3H8 + 5O2 -> 3CO2 + 4H2O}$, $2.00\\ \\text{L}$ of propane needs $2.00 \\times \\dfrac{5}{1} = 10.0\\ \\text{L}$ of oxygen.' },
      ],
      lines: [
        { say: 'Take care: the molar volume changes moles of a gas to litres. It says nothing about a solid, a liquid or a solution. The calcium carbonate is weighed, so it goes through n equals m over M.', show: 'oops' },
        { say: 'When two gases are at the same temperature and pressure, every mole of each fills the same volume. So their volumes are in the same ratio as their coefficients.', show: 'gas' },
        { say: 'Propane burns with five oxygen molecules for each propane molecule. So two point zero zero litres of propane needs ten point zero litres of oxygen. This is Avogadro’s law at work.' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q',
          prompt: 'Magnesium reacts with excess hydrochloric acid: $\\ce{Mg + 2HCl -> MgCl2 + H2}$. What mass of $\\ce{Mg}$ is needed to make $3.00\\ \\text{L}$ of $\\ce{H2}$ at STP? Give the answer to the nearest hundredth. At STP, the molar volume of a gas is $22.4\\ \\text{L/mol}$. Use the molar mass Mg $24.31\\ \\text{g/mol}$.',
          choices: ['$3.26\\ \\text{g}$', '$2.94\\ \\text{g}$', '$72.93\\ \\text{g}$', '$1.63\\ \\text{g}$'],
          answer: 0,
          working: '$n(\\ce{H2}) = \\dfrac{3.00}{22.4} = 0.1339\\ \\text{mol}$, so $n(\\ce{Mg}) = 0.1339 \\times \\dfrac{1}{1} = 0.1339\\ \\text{mol}$, and $m = 0.1339 \\times 24.31 = 3.26\\ \\text{g}$.',
        },
      ],
      lines: [
        { say: 'Your turn. Magnesium reacts with excess hydrochloric acid. What mass of magnesium is needed to make three point zero zero litres of hydrogen at S T P? Pause the video and try it.', show: 'q', wait: 6 },
        { say: 'The answer is A, three point two six grams. Three point zero zero over twenty-two point four is zero point one three three nine moles of hydrogen, and so of magnesium. Choice B uses the molar volume at S A T P, and choice C multiplies the litres by the molar mass, skipping moles.', show: 'q.answer' },
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
          items: ['Backwards: $n = \\dfrac{V}{V_m}$ for the gas, the mole ratio, then $m = nM$.', 'The molar volume is for **gases only**; a solid is weighed.', 'Gases at the same temperature and pressure: volumes in the **ratio of the coefficients**.'],
        },
      ],
      lines: [
        { say: 'Let’s sum up. To work backwards, divide the gas volume by the molar volume, use the mole ratio, then multiply by the molar mass.', show: 'sum.0' },
        { say: 'The molar volume is for gases only. A solid is weighed.', show: 'sum.1' },
        { say: 'And gases at the same temperature and pressure have volumes in the ratio of their coefficients. In part three, you will use the ideal gas law for gases at other conditions. See you there!', show: 'sum.2' },
      ],
    },
  ],
};

export default video;
