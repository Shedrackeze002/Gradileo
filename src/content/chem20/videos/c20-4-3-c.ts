import type { Explainer } from '@/video/script.ts';
import { figure } from '@/video/solids.ts';
import { flow } from './lib/c20-4a-figures.ts';

// Mass and amount, joined both ways through the molar mass.
const bridge = figure(
  'f',
  [
    flow({
      nodes: [
        { id: 'm', tex: '\\begin{gathered}\\text{mass}\\\\ m\\ (\\text{g})\\end{gathered}', tone: 'opp' },
        { id: 'n', tex: '\\begin{gathered}\\text{amount}\\\\ n\\ (\\text{mol})\\end{gathered}', tone: 'brand' },
      ],
      arrows: [
        { id: 'a1', from: 'm', to: 'n', tex: '\\div M', tone: 'good' },
        { id: 'a2', from: 'n', to: 'm', tex: '\\times M', tone: 'theta' },
      ],
      width: 3.2,
      height: 2,
      gap: 4.2,
    }),
  ],
  230,
);

const video: Explainer = {
  id: 'c20-4-3-c',
  lessonId: 'c20-4-3',
  title: 'The Mole and Molar Mass, Part 3: Mass and Amount',
  thumbnailTitle: 'Mass and Amount',
  thumbnail: 'f',
  summary:
    'The molar mass connects a mass with an amount in moles: n = m/M and m = nM. So 25.0 g of sodium chloride (58.44 g/mol) is 0.428 mol, and 2.50 mol of carbon dioxide (44.01 g/mol) is 110 g. When the molar mass is not given, work it out first, to two decimal places.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Quantitative Relationships in Chemical Changes · Part 3', title: 'Mass and Amount', subtitle: 'From grams to moles and back' }],
      lines: [
        { say: 'A balance measures grams, but chemists count particles in moles. The molar mass is the bridge between them.', show: 'title' },
        { say: 'In this part, you will change a mass into an amount in moles, and an amount back into a mass.' },
      ],
    },
    {
      chapter: 'Two formulas',
      layout: 'center',
      main: [
        bridge,
        { kind: 'math', id: 'm', size: 'lg', lines: ['n = \\dfrac{m}{M} \\qquad\\qquad m = nM'] },
        { kind: 'callout', id: 'tip', tone: 'tip', title: 'Let the units decide', md: '$\\text{g} \\div \\text{g/mol} = \\text{mol}$, and $\\text{mol} \\times \\text{g/mol} = \\text{g}$. An answer in $\\text{mol/g}$ means the fraction is upside down.' },
      ],
      lines: [
        { say: 'The molar mass connects the mass you can weigh with the amount in moles.', show: ['f.m', 'f.n'] },
        { say: 'To go from grams to moles, divide by the molar mass: n equals m over capital M.', caption: 'To go from grams to moles, divide by the molar mass: n = m/M.', show: ['f.a1', 'm'], focus: 'f.a1' },
        { say: 'To go back from moles to grams, multiply: m equals n times capital M.', caption: 'To go back from moles to grams, multiply: m = nM.', show: 'f.a2', focus: 'f.a2' },
        { say: 'Let the units decide. Grams divided by grams per mole leaves moles, and moles times grams per mole leaves grams. If your answer comes out in moles per gram, the fraction is upside down.', show: 'tip' },
      ],
    },
    {
      chapter: 'From mass to moles',
      layout: 'center',
      main: [
        { kind: 'text', id: 'q', size: 'md', align: 'center', md: 'How many moles are in $25.0\\ \\text{g}$ of sodium chloride, $\\ce{NaCl}$, to the nearest thousandth? The molar mass of sodium chloride is $58.44\\ \\text{g/mol}$.' },
        { kind: 'math', id: 'm', size: 'lg', lines: ['n = \\dfrac{m}{M} = \\dfrac{25.0\\ \\text{g}}{58.44\\ \\text{g/mol}} = 0.4278\\ \\text{mol}', 'n \\approx \\good{0.428\\ \\text{mol}}'] },
      ],
      lines: [
        { say: 'How many moles are in twenty-five point zero grams of sodium chloride? Its molar mass is fifty-eight point four four grams per mole.', show: 'q' },
        { say: 'Divide the mass by the molar mass. Twenty-five point zero over fifty-eight point four four is zero point four two seven eight moles. The grams cancel, leaving moles.', show: 'm.0', focus: 'm.0' },
        { say: 'To the nearest thousandth, zero point four two eight moles.', show: 'm.1', focus: 'm.1' },
      ],
    },
    {
      chapter: 'From moles to mass',
      layout: 'center',
      main: [
        { kind: 'text', id: 'q', size: 'md', align: 'center', md: 'What is the mass of $2.50\\ \\text{mol}$ of carbon dioxide, $\\ce{CO2}$, to the nearest whole number? The molar mass of carbon dioxide is $44.01\\ \\text{g/mol}$.' },
        { kind: 'math', id: 'm', size: 'lg', lines: ['m = nM = 2.50\\ \\text{mol} \\times 44.01\\ \\text{g/mol} = 110.025\\ \\text{g}', 'm \\approx \\good{110\\ \\text{g}}'] },
      ],
      lines: [
        { say: 'What is the mass of two point five zero moles of carbon dye-oxide? Its molar mass is forty-four point zero one grams per mole.', caption: 'What is the mass of 2.50 mol of carbon dioxide? Its molar mass is 44.01 g/mol.', show: 'q' },
        { say: 'Multiply the amount by the molar mass. Two point five zero times forty-four point zero one is one hundred ten point zero two five grams.', show: 'm.0', focus: 'm.0' },
        { say: 'To the nearest whole number, one hundred ten grams.', show: 'm.1', focus: 'm.1' },
      ],
    },
    {
      chapter: 'Molar mass first',
      layout: 'center',
      main: [
        { kind: 'text', id: 'q', size: 'md', align: 'center', md: 'A sample of sodium hydrogen carbonate, $\\ce{NaHCO3}$, has a mass of $12.5\\ \\text{g}$. Find the molar mass to the nearest hundredth, then the amount to the nearest thousandth. Use Na $22.99$, H $1.01$, C $12.01$ and O $16.00\\ \\text{g/mol}$.' },
        { kind: 'math', id: 'm', size: 'lg', lines: ['M = 22.99 + 1.01 + 12.01 + 3(16.00) = \\good{84.01\\ \\text{g/mol}}', 'n = \\dfrac{12.5}{84.01} = 0.1488\\ \\text{mol} \\approx \\good{0.149\\ \\text{mol}}'] },
      ],
      lines: [
        { say: 'When the molar mass is not given, work it out first, keeping two decimal places, and only then divide.' },
        { say: 'A sample of sodium hydrogen carbonate, baking soda, has a mass of twelve point five grams. How many moles is that?', show: 'q' },
        { say: 'The molar mass: twenty-two point nine nine, plus one point zero one, plus twelve point zero one, plus three times sixteen: eighty-four point zero one grams per mole.', show: 'm.0', focus: 'm.0' },
        { say: 'Then twelve point five over eighty-four point zero one is zero point one four eight eight, or zero point one four nine moles.', show: 'm.1', focus: 'm.1' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q',
          prompt: 'How many moles are in $45.0\\ \\text{g}$ of water, $\\ce{H2O}$, to the nearest hundredth? The molar mass of water is $18.02\\ \\text{g/mol}$.',
          choices: ['$810.9\\ \\text{mol}$', '$0.40\\ \\text{mol}$', '$2.50\\ \\text{mol}$', '$26.98\\ \\text{mol}$'],
          answer: 2,
          working: '$n = \\dfrac{m}{M} = \\dfrac{45.0}{18.02} = 2.497\\ \\text{mol} \\approx 2.50\\ \\text{mol}$.',
        },
      ],
      lines: [
        { say: 'Your turn. How many moles are in forty-five point zero grams of water, to the nearest hundredth? The molar mass of water is eighteen point zero two grams per mole. Pause the video and try it.', show: 'q', wait: 6 },
        { say: 'The answer is C, two point five zero moles: forty-five point zero over eighteen point zero two is two point four nine seven. Choice A multiplies instead of dividing, and choice B divides the wrong way round, so its units would be moles per gram.', show: 'q.answer' },
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
          items: ['$n = \\dfrac{m}{M}$: divide a mass by the molar mass to get moles.', '$m = nM$: multiply moles by the molar mass to get grams.', 'No molar mass given? Work it out first, to two decimal places.'],
        },
      ],
      lines: [
        { say: 'Let’s sum up. To get moles, divide the mass by the molar mass.', show: 'sum.0' },
        { say: 'To get grams, multiply the moles by the molar mass.', show: 'sum.1' },
        { say: 'And if the molar mass is not given, work it out first. In part four, you will turn moles into numbers of molecules and atoms. See you there!', show: 'sum.2' },
      ],
    },
  ],
};

export default video;
