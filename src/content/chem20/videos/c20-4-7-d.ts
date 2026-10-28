import type { Explainer } from '@/video/script.ts';
import { figure } from '@/video/solids.ts';
import { yieldBars } from './lib/c20-4b-figures.ts';

// To collect 20.0 g at a yield of 80%, the reaction must be set up for 25.0 g in theory.
const plan = figure('y', [yieldBars({ theoretical: 25.0, actual: 20.0, values: ['25.0\\ \\text{g}', '20.0\\ \\text{g}'], names: ['\\text{needed in theory}', '\\text{wanted, } 80\\%'], nameRoom: 5.4 })], 290);

const video: Explainer = {
  id: 'c20-4-7-d',
  lessonId: 'c20-4-7',
  title: 'Percent Yield, Part 4: Planning for a Known Yield',
  thumbnailTitle: 'Planning for a Known Yield',
  thumbnail: 'y',
  summary:
    'To collect a mass of product from a process with a known percent yield, divide the mass wanted by the yield as a decimal to get the theoretical yield needed, then work back through moles to the reactant: at a yield of 75%, collecting 10.0 g of copper needs 13.7 g of zinc, and at 85%, collecting 50.0 g of ammonia needs 48.4 g of nitrogen. Multiplying by the yield instead plans for too little.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Quantitative Relationships in Chemical Changes · Part 4', title: 'Planning for a Known Yield', subtitle: 'Aim higher than you need' }],
      lines: [
        { say: 'A chemist who knows that a process has a yield of eighty percent has to plan for it.', show: 'title' },
        { say: 'In this last part, you will work out how much reactant to use when the percent yield is known.' },
      ],
    },
    {
      chapter: 'Aim higher',
      layout: 'center',
      main: [plan, { kind: 'math', id: 'm', size: 'md', lines: ['\\text{theoretical yield needed} = \\dfrac{\\text{mass wanted}}{\\text{percent yield as a decimal}}', '= \\dfrac{20.0\\ \\text{g}}{0.80} = 25.0\\ \\text{g}'] }],
      lines: [
        { say: 'To collect twenty point zero grams of product, the reaction must be set up to make more than that, in theory, because only eighty percent of the theoretical yield ends up in the bottle.', show: ['y.actual', 'y.theo', 'y.full'] },
        { say: 'So divide the mass wanted by the percent yield as a decimal. Twenty point zero over zero point eight zero is twenty-five point zero grams.', show: 'm', focus: 'm.1' },
        { say: 'Then work back through moles, from the product to the reactant, to find the mass of reactant to use.' },
      ],
    },
    {
      chapter: 'Collecting copper',
      layout: 'center',
      main: [
        { kind: 'text', id: 'q', size: 'md', align: 'center', md: '$\\ce{Zn + CuSO4 -> ZnSO4 + Cu}$ has a percent yield of 75%. What mass of $\\ce{Zn}$ is needed to collect $10.0\\ \\text{g}$ of $\\ce{Cu}$, to the nearest tenth? Use Zn $65.38$ and Cu $63.55\\ \\text{g/mol}$.' },
        {
          kind: 'math',
          id: 'm',
          size: 'md',
          lines: [
            '\\text{theoretical yield needed} = \\dfrac{10.0}{0.75} = 13.33\\ \\text{g of }\\ce{Cu}',
            'n(\\ce{Cu}) = \\dfrac{13.33}{63.55} = 0.2098\\ \\text{mol}',
            'n(\\ce{Zn}) = 0.2098 \\times \\dfrac{1}{1} = 0.2098\\ \\text{mol}',
            'm = 0.2098 \\times 65.38 = 13.72\\ \\text{g} \\approx \\good{13.7\\ \\text{g}}',
          ],
        },
      ],
      lines: [
        { say: 'Zinc is added to excess copper two sulfate solution, and the copper is collected. The process has a yield of seventy-five percent. What mass of zinc is needed to collect ten point zero grams of copper?', caption: 'Zinc is added to excess copper(II) sulfate solution, and the copper is collected. The process has a yield of 75%. What mass of zinc is needed to collect 10.0 g of copper?', show: 'q' },
        { say: 'First, the theoretical yield needed: ten point zero over zero point seven five is thirteen point three three grams of copper.', show: 'm.0', focus: 'm.0' },
        { say: 'That is zero point two zero nine eight moles of copper, and one to one, the same amount of zinc.', show: ['m.1', 'm.2'], focus: 'm.2' },
        { say: 'Times sixty-five point three eight: thirteen point seven grams of zinc.', show: 'm.3', focus: 'm.3' },
      ],
    },
    {
      chapter: 'Multiply or divide?',
      layout: 'center',
      main: [
        { kind: 'math', id: 'm', size: 'lg', lines: ['\\dfrac{10.0}{0.75} = 13.33\\ \\text{g} \\quad \\good{\\checkmark}', '10.0 \\times 0.75 = 7.50\\ \\text{g} \\quad \\bad{\\times}'] },
        { kind: 'callout', id: 'oops', tone: 'mistake', title: 'Multiply or divide by the yield?', md: 'With a yield below 100%, you always need more reactant than a perfect reaction would, so the theoretical yield must come out **larger** than the mass wanted. Divide.' },
      ],
      lines: [
        { say: 'Multiplying by the yield instead plans for a theoretical yield of only seven point five zero grams, smaller than the mass you want, and leads to only seven point seven two grams of zinc.', show: ['m.0', 'm.1'], focus: 'm.1' },
        { say: 'With a yield below one hundred percent, you always need more reactant than a perfect reaction would. So the theoretical yield must come out larger than the mass wanted. Divide.', show: 'oops', focus: 'm.0' },
      ],
    },
    {
      chapter: 'Making ammonia',
      layout: 'center',
      main: [
        { kind: 'text', id: 'q', size: 'md', align: 'center', md: '$\\ce{N2 + 3H2 -> 2NH3}$ has a percent yield of 85%. What mass of $\\ce{N2}$ is needed to collect $50.0\\ \\text{g}$ of $\\ce{NH3}$, to the nearest tenth? Use N $14.01$ and H $1.01\\ \\text{g/mol}$.' },
        {
          kind: 'math',
          id: 'm',
          size: 'md',
          lines: [
            '\\text{theoretical yield needed} = \\dfrac{50.0}{0.85} = 58.82\\ \\text{g}',
            'M(\\ce{NH3}) = 14.01 + 3(1.01) = 17.04\\ \\text{g/mol}',
            'n(\\ce{NH3}) = \\dfrac{58.82}{17.04} = 3.452\\ \\text{mol}',
            'n(\\ce{N2}) = 3.452 \\times \\dfrac{1}{2} = 1.726\\ \\text{mol}',
            'm = 1.726 \\times 28.02 = 48.36\\ \\text{g} \\approx \\good{48.4\\ \\text{g}}',
          ],
        },
      ],
      lines: [
        { say: 'Nitrogen reacts with excess hydrogen to make ammonia, with a yield of eighty-five percent. What mass of nitrogen is needed to collect fifty point zero grams of ammonia?', show: 'q' },
        { say: 'Fifty point zero over zero point eight five is fifty-eight point eight two grams of ammonia in theory. At seventeen point zero four grams per mole, that is three point four five two moles.', show: ['m.0', 'm.1', 'm.2'], focus: 'm.2' },
        { say: 'One nitrogen molecule makes two ammonia molecules, so half as much nitrogen: one point seven two six moles. At twenty-eight point zero two grams per mole, that is forty-eight point four grams.', show: ['m.3', 'm.4'], focus: 'm.4' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q',
          prompt: 'Calcium carbonate is heated to make lime: $\\ce{CaCO3 -> CaO + CO2}$. The process has a percent yield of 90%. What mass of $\\ce{CaCO3}$ is needed to collect $28.0\\ \\text{g}$ of $\\ce{CaO}$? Give the answer to the nearest tenth. Use these molar masses: Ca $40.08\\ \\text{g/mol}$, C $12.01\\ \\text{g/mol}$, O $16.00\\ \\text{g/mol}$.',
          choices: ['$45.0\\ \\text{g}$', '$50.0\\ \\text{g}$', '$31.1\\ \\text{g}$', '$55.5\\ \\text{g}$'],
          answer: 3,
          working: 'Theoretical yield needed: $28.0 \\div 0.90 = 31.11\\ \\text{g}$ of $\\ce{CaO}$, which is $31.11 \\div 56.08 = 0.5548\\ \\text{mol}$. The ratio is $1 : 1$, so $m = 0.5548 \\times 100.09 = 55.5\\ \\text{g}$.',
        },
      ],
      lines: [
        { say: 'Your turn. Lime is made with a yield of ninety percent. What mass of calcium carbonate is needed to collect twenty-eight point zero grams of calcium oxide? Pause the video and try it.', show: 'q', wait: 6 },
        { say: 'The answer is D, fifty-five point five grams. Twenty-eight point zero over zero point nine zero is thirty-one point one one grams of calcium oxide in theory, which is zero point five five four eight moles, and so the same amount of calcium carbonate. Choice A multiplies by the yield instead of dividing, and choice B ignores the yield.', show: 'q.answer' },
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
          items: ['Theoretical yield needed $= \\dfrac{\\text{mass wanted}}{\\text{percent yield as a decimal}}$.', 'Then work back through moles to the mass of reactant.', '**Divide** by the yield: you always need more reactant than a perfect reaction would.'],
        },
      ],
      lines: [
        { say: 'Let’s sum up. Divide the mass wanted by the percent yield as a decimal, to find the theoretical yield needed.', show: 'sum.0' },
        { say: 'Then work back through moles to the mass of reactant.', show: 'sum.1' },
        { say: 'And divide, never multiply. That completes this lesson. Next, you will see how a titration finds the concentration of a solution.', show: 'sum.2' },
      ],
    },
  ],
};

export default video;
