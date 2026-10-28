import type { Explainer } from '@/video/script.ts';

const video: Explainer = {
  id: 'c20-4-6-c',
  lessonId: 'c20-4-6',
  title: 'Limiting and Excess Reagents, Part 3: How Much Product Forms?',
  thumbnailTitle: 'How Much Product Forms?',
  thumbnail: false,
  summary:
    'The reaction stops when the limiting reagent is gone, so the amount of product comes from the limiting reagent only: 0.500 mol of zinc and 0.800 mol of hydrochloric acid make 0.400 mol of zinc chloride, not 0.500 mol. With masses, change both to moles, find the limiting reagent, then use the mole ratio and m = nM: 16.0 g of methane and 48.0 g of oxygen make 33.0 g of carbon dioxide.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Quantitative Relationships in Chemical Changes · Part 3', title: 'How Much Product Forms?', subtitle: 'Only the limiting reagent counts' }],
      lines: [
        { say: 'Back in the bicycle factory, eighty wheels make forty bicycles, however many frames are piled up in the corner.', show: 'title' },
        { say: 'In this part, you will find how much product a reaction makes when one reactant runs out first.' },
      ],
    },
    {
      chapter: 'Zinc chloride',
      layout: 'center',
      main: [
        { kind: 'text', id: 'q', size: 'md', align: 'center', md: 'A mixture for $\\ce{Zn + 2HCl -> ZnCl2 + H2}$ holds $0.500\\ \\text{mol}$ of $\\ce{Zn}$ and $0.800\\ \\text{mol}$ of $\\ce{HCl}$. How many moles of $\\ce{ZnCl2}$ can form, to the nearest thousandth?' },
        {
          kind: 'math',
          id: 'm',
          size: 'md',
          lines: [
            'n(\\ce{HCl})\\text{ needed} = 0.500 \\times \\dfrac{2}{1} = 1.000\\ \\text{mol} > 0.800\\ \\text{mol}',
            '\\ce{Zn}\\text{: } \\dfrac{0.500}{1} = 0.500 \\qquad \\ce{HCl}\\text{: } \\dfrac{0.800}{2} = 0.400 \\qquad \\ce{HCl}\\text{ is limiting}',
            'n(\\ce{ZnCl2}) = 0.800 \\times \\dfrac{1}{2} = \\good{0.400\\ \\text{mol}}',
          ],
        },
      ],
      lines: [
        { say: 'The reaction stops when the limiting reagent is gone, however much of the excess reagent is left. So the amount of product comes from the limiting reagent only.' },
        { say: 'A mixture holds zero point five zero zero moles of zinc and zero point eight zero zero moles of hydrochloric acid. How many moles of zinc chloride can form?', show: 'q' },
        { say: 'First, find the limiting reagent. The zinc needs twice its amount of acid, one point zero zero zero moles, and there is only zero point eight zero zero. So the acid is limiting.', show: 'm.0', focus: 'm.0' },
        { say: 'The shortcut agrees: zero point five zero zero for zinc, and zero point four zero zero for the acid.', show: 'm.1', focus: 'm.1' },
        { say: 'Now use the limiting reagent in the mole ratio. Zinc chloride to the acid is one to two, so zero point eight zero zero times one half is zero point four zero zero moles of zinc chloride.', caption: 'Now use the limiting reagent in the mole ratio. Zinc chloride to the acid is 1 : 2, so 0.800 × ½ = 0.400 mol of zinc chloride.', show: 'm.2', focus: 'm.2' },
      ],
    },
    {
      chapter: 'Using the excess reagent',
      layout: 'center',
      main: [
        { kind: 'math', id: 'm', size: 'lg', lines: ['\\text{From }\\ce{HCl}\\text{: } 0.800 \\times \\dfrac{1}{2} = 0.400\\ \\text{mol} \\quad \\good{\\checkmark}', '\\text{From }\\ce{Zn}\\text{: } 0.500 \\times \\dfrac{1}{1} = 0.500\\ \\text{mol} \\quad \\bad{\\times}'] },
        { kind: 'callout', id: 'oops', tone: 'mistake', title: 'Using the excess reagent', md: 'Working from the excess reagent always gives **too much** product: the acid would run out after $0.400\\ \\text{mol}$ of $\\ce{ZnCl2}$.' },
      ],
      lines: [
        { say: 'Starting from the zinc instead gives zero point five zero zero moles of zinc chloride. That is more than can form.', show: ['m.0', 'm.1'], focus: 'm.1' },
        { say: 'The acid would run out after zero point four zero zero moles. Working from the excess reagent always gives too much product.', show: 'oops', focus: 'm.0' },
      ],
    },
    {
      chapter: 'Burning methane',
      layout: 'center',
      main: [
        { kind: 'text', id: 'q', size: 'md', align: 'center', md: '$\\ce{CH4 + 2O2 -> CO2 + 2H2O}$ with $16.0\\ \\text{g}$ of $\\ce{CH4}$ and $48.0\\ \\text{g}$ of $\\ce{O2}$. What mass of $\\ce{CO2}$ can form, to the nearest tenth? Use C $12.01$, H $1.01$ and O $16.00\\ \\text{g/mol}$.' },
        {
          kind: 'math',
          id: 'm',
          size: 'md',
          lines: [
            'M(\\ce{CH4}) = 12.01 + 4(1.01) = 16.05\\ \\text{g/mol}',
            'n(\\ce{CH4}) = \\dfrac{16.0}{16.05} = 0.9969\\ \\text{mol} \\qquad n(\\ce{O2}) = \\dfrac{48.0}{32.00} = 1.500\\ \\text{mol}',
            '\\ce{O2}\\text{ needed} = 0.9969 \\times \\dfrac{2}{1} = 1.994\\ \\text{mol} > 1.500\\ \\text{mol}',
            '\\good{\\ce{O2}\\text{ is limiting}}',
          ],
        },
      ],
      lines: [
        { say: 'With masses, the path is: both masses to moles, find the limiting reagent, the mole ratio from the limiting reagent to the product, then the product’s moles to a mass.' },
        { say: 'Sixteen point zero grams of methane burns in forty-eight point zero grams of oxygen. What mass of carbon dioxide can form?', show: 'q' },
        { say: 'Methane is sixteen point zero five grams per mole, so that is zero point nine nine six nine moles. Oxygen gas is thirty-two point zero zero, so one point five zero zero moles.', show: ['m.0', 'm.1'], focus: 'm.1' },
        { say: 'The methane needs twice its amount of oxygen, one point nine nine four moles, but there is only one point five zero zero. Oxygen is limiting.', show: ['m.2', 'm.3'], focus: ['m.2', 'm.3'] },
      ],
    },
    {
      chapter: 'From the limiting reagent',
      layout: 'center',
      main: [
        { kind: 'text', id: 't', size: 'md', align: 'center', md: '$\\ce{CH4 + 2O2 -> CO2 + 2H2O}$, with $1.500\\ \\text{mol}$ of $\\ce{O2}$, the limiting reagent' },
        {
          kind: 'math',
          id: 'm',
          size: 'lg',
          lines: ['n(\\ce{CO2}) = 1.500 \\times \\dfrac{1}{2} = 0.7500\\ \\text{mol}', 'M(\\ce{CO2}) = 12.01 + 2(16.00) = 44.01\\ \\text{g/mol}', 'm = 0.7500 \\times 44.01 = 33.01\\ \\text{g} \\approx \\good{33.0\\ \\text{g}}'],
        },
      ],
      lines: [
        { say: 'Now work from the oxygen. One carbon dioxide for every two oxygen molecules: zero point seven five zero zero moles of carbon dioxide.', show: ['t', 'm.0'], focus: 'm.0' },
        { say: 'Carbon dioxide is forty-four point zero one grams per mole, so the mass is thirty-three point zero grams.', show: ['m.1', 'm.2'], focus: 'm.2' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q',
          prompt: 'A mixture for the reaction $\\ce{4Al + 3O2 -> 2Al2O3}$ holds $0.600\\ \\text{mol}$ of $\\ce{Al}$ and $0.600\\ \\text{mol}$ of $\\ce{O2}$. How many moles of $\\ce{Al2O3}$ can form, to the nearest thousandth?',
          choices: ['$0.400\\ \\text{mol}$', '$0.600\\ \\text{mol}$', '$0.150\\ \\text{mol}$', '$0.300\\ \\text{mol}$'],
          answer: 3,
          working: '$0.600 \\div 4 = 0.150$ for $\\ce{Al}$ and $0.600 \\div 3 = 0.200$ for $\\ce{O2}$, so $\\ce{Al}$ is limiting. $n(\\ce{Al2O3}) = 0.600 \\times \\dfrac{2}{4} = 0.300\\ \\text{mol}$.',
        },
      ],
      lines: [
        { say: 'Your turn. Aluminium burns in oxygen. A mixture holds zero point six zero zero moles of each. How many moles of aluminium oxide can form? Pause the video and try it.', show: 'q', wait: 6 },
        { say: 'The answer is D, zero point three zero zero moles. Dividing by the coefficients gives zero point one five zero for aluminium and zero point two zero zero for oxygen, so aluminium is limiting, and it makes half its amount of aluminium oxide. Choice A works from the oxygen, the excess reagent, and gives too much.', show: 'q.answer' },
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
          items: ['The amount of product comes from the **limiting reagent only**.', 'Working from the excess reagent always gives **too much** product.', 'With masses: both to moles, find the limiting reagent, the mole ratio to the product, then $m = nM$.'],
        },
      ],
      lines: [
        { say: 'Let’s sum up. The amount of product comes from the limiting reagent only.', show: 'sum.0' },
        { say: 'Working from the excess reagent always gives too much.', show: 'sum.1' },
        { say: 'And with masses, change both to moles first. In part four, you will find how much of the excess reagent is left over. See you there!', show: 'sum.2' },
      ],
    },
  ],
};

export default video;
