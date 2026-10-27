import type { Explainer } from '@/video/script.ts';
import { figure } from '@/video/solids.ts';
import { massBar, room } from './lib/c20-4b-figures.ts';

// The masses before and after methane burns in too little oxygen: both bars are 64.0 g long.
const masses = figure(
  'bars',
  [
    massBar({
      name: 'start',
      at: [0, 4.4],
      title: '\\text{start}',
      total: '64.0\\ \\text{g}',
      pieces: [
        { id: 'ch4', top: '\\ce{CH4}', bottom: '16.0\\ \\text{g}', value: 16.0, tone: 'muted' },
        { id: 'o2', top: '\\ce{O2}', bottom: '48.0\\ \\text{g}', value: 48.0, tone: 'bad' },
      ],
    }),
    massBar({
      name: 'end',
      at: [0, 0],
      title: '\\text{end}',
      total: '64.00\\ \\text{g}',
      least: 0.2,
      pieces: [
        { id: 'co2', top: '\\ce{CO2}', bottom: '33.01\\ \\text{g}', value: 33.01, tone: 'theta' },
        { id: 'h2o', top: '\\ce{H2O}', bottom: '27.03\\ \\text{g}', value: 27.03, tone: 'adj' },
        { id: 'ch4', top: '\\ce{CH4}', bottom: '3.96\\ \\text{g}', value: 3.96, tone: 'muted' },
      ],
    }),
    room('pad', [-2.2, -1], [15, 6.6]),
  ],
  380,
);

const video: Explainer = {
  id: 'c20-4-6-d',
  lessonId: 'c20-4-6',
  title: 'Limiting and Excess Reagents, Part 4: What Is Left Over?',
  thumbnailTitle: 'What Is Left Over?',
  thumbnail: 'bars',
  summary:
    'The excess reagent left over is the amount at the start minus the amount the limiting reagent uses up: when 16.0 g of methane burns in 48.0 g of oxygen, 3.96 g of methane is left, and the masses at the end still add up to 64.0 g. Chemists often add a cheap reactant in excess so that a costly one reacts completely.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Quantitative Relationships in Chemical Changes · Part 4', title: 'What Is Left Over?', subtitle: 'The amount at the start, minus the amount used' }],
      lines: [
        { say: 'When a reaction stops, the excess reagent is still sitting in the flask. How much of it is there?', show: 'title' },
        { say: 'In this last part, you will find how much of the excess reagent is left over, check it with the conservation of mass, and see why chemists add an excess on purpose.' },
      ],
    },
    {
      chapter: 'Methane left over',
      layout: 'center',
      main: [
        { kind: 'math', id: 'rule', size: 'lg', lines: ['\\text{left over} = \\text{amount at the start} - \\text{amount used}'] },
        {
          kind: 'table',
          id: 't',
          head: ['', '$\\ce{CH4}$, in excess', '$\\ce{O2}$, limiting'],
          rows: [
            ['At the start', '$0.9969\\ \\text{mol}$', '$1.500\\ \\text{mol}$'],
            ['Used', '$1.500 \\times \\dfrac{1}{2} = 0.7500\\ \\text{mol}$', '$1.500\\ \\text{mol}$'],
            ['Left over', '$0.9969 - 0.7500 = 0.2469\\ \\text{mol}$', '$0$'],
          ],
        },
        { kind: 'math', id: 'm', size: 'md', lines: ['m = 0.2469 \\times 16.05 = 3.96\\ \\text{g of }\\ce{CH4}'] },
      ],
      lines: [
        { say: 'The excess reagent does not all react. To find how much is left, work out how much of it the limiting reagent uses up, and subtract that from what was there at the start.', show: 'rule' },
        { say: 'In the last part, sixteen point zero grams of methane burned in forty-eight point zero grams of oxygen. The oxygen was limiting, so methane is the excess reagent.', show: 't.0', focus: 't.0' },
        { say: 'The oxygen uses half its amount of methane: one point five zero zero times one half is zero point seven five zero zero moles.', show: 't.1', focus: 't.1' },
        { say: 'So zero point nine nine six nine minus zero point seven five zero zero, or zero point two four six nine moles of methane, is left over, and no oxygen.', show: 't.2', focus: 't.2' },
        { say: 'Times sixteen point zero five grams per mole, that is three point nine six grams of methane.', show: 'm', focus: 'm' },
      ],
    },
    {
      chapter: 'Check with conservation of mass',
      layout: 'center',
      main: [
        masses,
        { kind: 'text', id: 'w', size: 'md', align: 'center', md: 'Water: $1.500\\ \\text{mol of }\\ce{O2} \\times \\dfrac{2}{2} = 1.500\\ \\text{mol}$, and $1.500 \\times 18.02 = 27.03\\ \\text{g}$' },
      ],
      lines: [
        { say: 'Mass is conserved, so you can check the answer. At the start there were sixteen point zero plus forty-eight point zero, or sixty-four point zero grams.', show: ['bars.start-ch4', 'bars.start-o2', 'bars.start-title', 'bars.start-total'] },
        { say: 'The one point five zero zero moles of oxygen also make one point five zero zero moles of water, which is twenty-seven point zero three grams.', show: 'w' },
        { say: 'At the end, thirty-three point zero one grams of carbon dioxide, twenty-seven point zero three of water, and three point nine six of methane add up to sixty-four point zero zero grams.', show: ['bars.end-co2', 'bars.end-h2o', 'bars.end-ch4', 'bars.end-title', 'bars.end-total'], focus: 'bars.end-ch4' },
      ],
    },
    {
      chapter: 'Excess on purpose',
      layout: 'center',
      main: [
        { kind: 'callout', id: 'oops', tone: 'mistake', title: 'The amount used is not the amount left', md: '$0.7500\\ \\text{mol}$ is the methane that **reacts**. Subtract it from the $0.9969\\ \\text{mol}$ at the start: amounts of the **same** substance.' },
        { kind: 'callout', id: 'note', tone: 'key', title: 'Excess on purpose', md: 'A cheap reactant, such as oxygen from the air or an inexpensive acid, is added in excess to make sure that every bit of a costly reactant reacts.' },
      ],
      lines: [
        { say: 'Careful: zero point seven five zero zero moles is the methane that reacts, not what is left. And always subtract amounts of the same substance: methane used from methane at the start.', show: 'oops' },
        { say: 'Chemists often add an excess on purpose. A cheap reactant, such as oxygen from the air or an inexpensive acid, makes sure that every bit of a costly reactant reacts.', show: 'note' },
        { say: 'A furnace burns its fuel with extra air for the same reason. With too little oxygen, the fuel burns incompletely, and forms poisonous carbon monoxide.' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q',
          prompt: 'A mixture for the reaction $\\ce{N2 + 3H2 -> 2NH3}$ holds $14.0\\ \\text{g}$ of $\\ce{N2}$ and $2.00\\ \\text{g}$ of $\\ce{H2}$. When the reaction stops, what mass of the excess reagent is left over, to the nearest hundredth? Use these molar masses: N $14.01\\ \\text{g/mol}$, H $1.01\\ \\text{g/mol}$.',
          choices: ['$9.25\\ \\text{g}$', '$12.00\\ \\text{g}$', '$4.75\\ \\text{g}$', '$0.17\\ \\text{g}$'],
          answer: 2,
          working: '$n(\\ce{N2}) = 14.0 \\div 28.02 = 0.4996\\ \\text{mol}$ and $n(\\ce{H2}) = 2.00 \\div 2.02 = 0.9901\\ \\text{mol}$. $0.9901 \\div 3 = 0.3300$ is smaller, so $\\ce{H2}$ is limiting and $0.3300\\ \\text{mol}$ of $\\ce{N2}$ is used. Left: $(0.4996 - 0.3300) \\times 28.02 = 4.75\\ \\text{g}$.',
        },
      ],
      lines: [
        { say: 'Your turn. A mixture for making ammonia holds fourteen point zero grams of nitrogen and two point zero zero grams of hydrogen. What mass of the excess reagent is left over? Pause the video and try it.', show: 'q', wait: 6 },
        { say: 'The answer is C, four point seven five grams of nitrogen. Hydrogen is limiting, and it uses zero point three three zero zero moles of nitrogen, which leaves zero point one six nine six moles. Choice A is the nitrogen used, not the nitrogen left, and choice B subtracts the masses directly.', show: 'q.answer' },
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
          items: ['Excess left over $=$ amount at the start $-$ amount used, both for the **excess reagent**.', 'Check with the conservation of mass: the masses at the end add up to the masses at the start.', 'A cheap reactant is often added **in excess**, so a costly one reacts completely.'],
        },
      ],
      lines: [
        { say: 'Let’s sum up. The excess left over is the amount at the start minus the amount used.', show: 'sum.0' },
        { say: 'The conservation of mass gives a check: the masses at the end add up to the masses at the start.', show: 'sum.1' },
        { say: 'And a cheap reactant is often added in excess, so a costly one reacts completely. That completes this lesson. Next, you will compare the product a reaction really gives with what it could give.', show: 'sum.2' },
      ],
    },
  ],
};

export default video;
