import type { Explainer } from '@/video/script.ts';
import { figure } from '@/video/solids.ts';
import { flow } from './lib/c20-4b-figures.ts';

const two = (top: string, bottom: string) => `\\begin{gathered}${top}\\\\ ${bottom}\\end{gathered}`;

// The theoretical yield of lime from 40.0 g of calcium carbonate, by gravimetric stoichiometry.
const lime = figure(
  'w',
  [
    flow({
      nodes: [
        { id: 'm1', tex: two('\\text{mass}', '\\ce{CaCO3}'), tone: 'opp', value: '40.0\\ \\text{g}' },
        { id: 'n1', tex: two('\\text{moles}', '\\ce{CaCO3}'), value: '0.3996\\ \\text{mol}' },
        { id: 'n2', tex: two('\\text{moles}', '\\ce{CaO}'), value: '0.3996\\ \\text{mol}' },
        { id: 'm2', tex: two('\\text{theoretical}', '\\ce{CaO}'), tone: 'brand', value: '22.41\\ \\text{g}' },
      ],
      arrows: [
        { id: 'a1', from: 'm1', to: 'n1', tex: '\\div 100.09', tone: 'good' },
        { id: 'a2', from: 'n1', to: 'n2', tex: '\\times \\dfrac{1}{1}', tone: 'theta' },
        { id: 'a3', from: 'n2', to: 'm2', tex: '\\times 56.08', tone: 'good' },
      ],
      width: 3.4,
      height: 1.9,
      gap: 3.3,
    }),
  ],
  250,
);

const video: Explainer = {
  id: 'c20-4-7-c',
  lessonId: 'c20-4-7',
  title: 'Percent Yield, Part 3: Finding the Theoretical Yield',
  thumbnailTitle: 'Finding the Theoretical Yield',
  thumbnail: 'w',
  summary:
    'Given the mass of reactant used, find the theoretical yield by gravimetric stoichiometry first, then the percent yield: 40.0 g of calcium carbonate could make 22.4 g of lime, so collecting 20.5 g is a yield of 91.5%, and 2.50 g of copper could make 8.49 g of silver, so collecting 7.50 g is 88.4%. Divide by the unrounded theoretical yield.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Quantitative Relationships in Chemical Changes · Part 3', title: 'Finding the Theoretical Yield', subtitle: 'From the mass of reactant used' }],
      lines: [
        { say: 'Usually, nobody hands you the theoretical yield. You know the mass of reactant you used, and the mass of product you collected.', show: 'title' },
        { say: 'In this part, you will find the theoretical yield with gravimetric stoichiometry, then the percent yield.' },
      ],
    },
    {
      chapter: 'Lime from limestone',
      layout: 'center',
      main: [
        { kind: 'text', id: 'q', size: 'md', align: 'center', md: '$\\ce{CaCO3 -> CaO + CO2}$. $40.0\\ \\text{g}$ of $\\ce{CaCO3}$ is used, and $20.5\\ \\text{g}$ of $\\ce{CaO}$ is collected. Find the theoretical yield, then the percent yield, each to the nearest tenth. Use Ca $40.08$, C $12.01$ and O $16.00\\ \\text{g/mol}$.' },
        lime,
        { kind: 'math', id: 'm', size: 'md', lines: ['M(\\ce{CaCO3}) = 40.08 + 12.01 + 3(16.00) = 100.09\\ \\text{g/mol}', '\\text{percent yield} = \\dfrac{20.5}{22.41} \\times 100\\% = \\good{91.5\\%}'] },
      ],
      lines: [
        { say: 'Calcium carbonate is heated to make lime, calcium oxide. Forty point zero grams of calcium carbonate is used, and twenty point five grams of calcium oxide is collected.', show: ['q', 'w.m1', 'w.m1-value'] },
        { say: 'Calcium carbonate is one hundred point zero nine grams per mole, so that is zero point three nine nine six moles.', show: ['m.0', 'w.a1', 'w.n1', 'w.n1-value'], focus: 'w.a1' },
        { say: 'One to one, so zero point three nine nine six moles of calcium oxide could form.', show: ['w.a2', 'w.n2', 'w.n2-value'], focus: 'w.a2' },
        { say: 'Calcium oxide is forty point zero eight plus sixteen point zero zero, or fifty-six point zero eight grams per mole. So the theoretical yield is twenty-two point four one grams, or twenty-two point four to the nearest tenth.', show: ['w.a3', 'w.m2', 'w.m2-value'], focus: 'w.a3' },
        { say: 'The percent yield is twenty point five over twenty-two point four one, times one hundred percent: ninety-one point five percent.', show: 'm.1', focus: 'm.1' },
      ],
    },
    {
      chapter: 'Silver from copper',
      layout: 'center',
      main: [
        { kind: 'text', id: 'q', size: 'md', align: 'center', md: '$\\ce{Cu + 2AgNO3 -> Cu(NO3)2 + 2Ag}$. $2.50\\ \\text{g}$ of $\\ce{Cu}$ is used, and $7.50\\ \\text{g}$ of $\\ce{Ag}$ is collected. Use Cu $63.55$ and Ag $107.87\\ \\text{g/mol}$.' },
        {
          kind: 'math',
          id: 'm',
          size: 'md',
          lines: [
            'n(\\ce{Cu}) = \\dfrac{2.50}{63.55} = 0.03934\\ \\text{mol}',
            'n(\\ce{Ag}) = 0.03934 \\times \\dfrac{2}{1} = 0.07868\\ \\text{mol}',
            '\\text{theoretical yield} = 0.07868 \\times 107.87 = 8.487\\ \\text{g} \\approx 8.49\\ \\text{g}',
            '\\text{percent yield} = \\dfrac{7.50}{8.487} \\times 100\\% = \\good{88.4\\%}',
          ],
        },
      ],
      lines: [
        { say: 'A copper wire is placed in excess silver nitrate solution, and the silver is collected. Two point five zero grams of copper is used, and seven point five zero grams of silver is collected.', show: 'q' },
        { say: 'Two point five zero over sixty-three point five five is zero point zero three nine three four moles of copper. Each copper atom gives two silver atoms, so zero point zero seven eight six eight moles of silver.', show: ['m.0', 'm.1'], focus: 'm.1' },
        { say: 'Times one hundred seven point eight seven: the theoretical yield is eight point four eight seven grams, or eight point four nine to the nearest hundredth.', show: 'm.2', focus: 'm.2' },
        { say: 'Seven point five zero over eight point four eight seven, times one hundred percent, is eighty-eight point four percent.', show: 'm.3', focus: 'm.3' },
      ],
    },
    {
      chapter: 'Keep the unrounded value',
      layout: 'center',
      main: [
        { kind: 'math', id: 'm', size: 'lg', lines: ['\\dfrac{7.50}{8.487} \\times 100\\% = 88.4\\% \\quad \\good{\\checkmark}', '\\dfrac{7.50}{8.49} \\times 100\\% = 88.3\\% \\quad \\bad{\\times}'] },
        { kind: 'callout', id: 'tip', tone: 'tip', title: 'Keep the unrounded theoretical yield', md: 'Round the theoretical yield only for the answer you write down, and divide by the unrounded value. Keep every digit in your calculator until the last step.' },
      ],
      lines: [
        { say: 'Notice that the percent yield divides by eight point four eight seven, not by the rounded eight point four nine. Dividing by the rounded value gives eighty-eight point three percent instead.', show: ['m.0', 'm.1'], focus: 'm.1' },
        { say: 'So round the theoretical yield only for the answer you write down, and keep every digit in your calculator until the last step.', show: 'tip', focus: 'm.0' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q',
          prompt: 'Zinc is added to excess copper(II) sulfate solution: $\\ce{Zn + CuSO4 -> ZnSO4 + Cu}$. $5.00\\ \\text{g}$ of $\\ce{Zn}$ is used, and $4.12\\ \\text{g}$ of $\\ce{Cu}$ is collected. What is the percent yield, to the nearest tenth? Use these molar masses: Zn $65.38\\ \\text{g/mol}$, Cu $63.55\\ \\text{g/mol}$.',
          choices: ['$84.8\\%$', '$82.4\\%$', '$118.0\\%$', '$80.1\\%$'],
          answer: 0,
          working: '$n(\\ce{Zn}) = 5.00 \\div 65.38 = 0.07648\\ \\text{mol} = n(\\ce{Cu})$, so the theoretical yield is $0.07648 \\times 63.55 = 4.860\\ \\text{g}$, and $4.12 \\div 4.860 \\times 100\\% = 84.8\\%$.',
        },
      ],
      lines: [
        { say: 'Your turn. Zinc is added to excess copper two sulfate solution. Five point zero zero grams of zinc is used, and four point one two grams of copper is collected. What is the percent yield? Pause the video and try it.', caption: 'Your turn. Zinc is added to excess copper(II) sulfate solution. 5.00 g of zinc is used, and 4.12 g of copper is collected. What is the percent yield? Pause the video and try it.', show: 'q', wait: 6 },
        { say: 'The answer is A, eighty-four point eight percent. Five point zero zero grams of zinc is zero point zero seven six four eight moles, which could make the same amount of copper: four point eight six zero grams. Choice B divides by the mass of zinc, which is not the theoretical yield.', show: 'q.answer' },
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
          items: ['Find the **theoretical yield** first: given mass → moles → mole ratio → mass of product.', 'Then $\\text{percent yield} = \\dfrac{\\text{actual}}{\\text{theoretical}} \\times 100\\%$.', 'Divide by the **unrounded** theoretical yield.'],
        },
      ],
      lines: [
        { say: 'Let’s sum up. Find the theoretical yield first, with gravimetric stoichiometry.', show: 'sum.0' },
        { say: 'Then divide the actual yield by it, and multiply by one hundred percent.', show: 'sum.1' },
        { say: 'And divide by the unrounded theoretical yield. In part four, you will plan how much reactant to use when the percent yield is known. See you there!', show: 'sum.2' },
      ],
    },
  ],
};

export default video;
