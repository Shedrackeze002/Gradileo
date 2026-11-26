import type { Explainer } from '@/video/script.ts';
import { heatingSaturated, saturating } from '../../chem20/videos/lib/c20-particles.ts';

const video: Explainer = {
  id: 'cx-15-3',
  lessonId: 'cx-15-3',
  title: 'Solubility Curves and Solubility Calculations',
  thumbnail: 'hs',
  summary:
    'Solubility is the most solute that dissolves in a given amount of solvent at a stated temperature, giving a saturated solution. In g dm⁻³ it is the mass × 1000 ÷ the volume in cm³, and dividing by the molar mass gives mol dm⁻³. A solubility curve shows how solubility changes with temperature, and the crystals formed on cooling are the drop in solubility × the mass of water ÷ 100. Most solids get more soluble when heated, but gases get less soluble.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Solutions, Salts and Solubility', title: 'Solubility Curves and Solubility Calculations', subtitle: 'How much will dissolve?' }],
      lines: [
        { say: 'Sugar dissolves in tea, but only up to a point. Keep adding it, and some stays at the bottom of the cup.', show: 'title' },
        { say: 'In this lesson, you will calculate solubility, read solubility curves, and work out the mass of crystals formed on cooling.' },
      ],
    },
    {
      chapter: 'A saturated solution',
      layout: 'center',
      main: [saturating('sa')],
      lines: [
        { say: 'Here is the same water twice. A little solid goes into one, and a lot into the other.', show: ['sa', 'sa.labels'] },
        { say: 'Watch them. The little all dissolves, but in the other, the water soon holds all the solid it can, and the rest stays on the bottom.', play: 'sa.drop' },
        { say: 'A solution that holds all it can at that temperature, with solid left over, is saturated. The amount that dissolves is the solubility.' },
      ],
    },
    {
      chapter: 'Warming dissolves more',
      layout: 'center',
      main: [heatingSaturated('hs')],
      lines: [
        { say: 'Here is a saturated solution with solid left on the bottom.', show: ['hs', 'hs.thermo'], play: 'hs.drop' },
        { say: 'Now heat it. The particles move faster, and the hot water pulls the rest of the solid into solution.', play: 'hs.heat' },
        { say: 'Most solids are more soluble when hot. So when a hot saturated solution cools, the extra solute comes back out as crystals.' },
      ],
    },
    {
      chapter: 'Solubility in numbers',
      layout: 'center',
      main: [
        { kind: 'math', id: 'f', size: 'md', lines: ['\\text{g dm}^{-3} = \\dfrac{\\text{mass} \\times 1000}{\\text{volume in cm}^3} \\qquad \\text{mol dm}^{-3} = \\dfrac{\\text{g dm}^{-3}}{M}'] },
        { kind: 'text', id: 'q', size: 'md', md: '$25.0\\ \\text{cm}^3$ of saturated $\\ce{KCl}$ ($M = 74.5$) leaves $8.94\\ \\text{g}$ of solid.' },
        { kind: 'math', id: 'm', size: 'md', lines: ['8.94 \\times 1000 \\div 25.0 = 357.6\\ \\text{g dm}^{-3}', '357.6 \\div 74.5 = 4.80\\ \\text{mol dm}^{-3}'] },
      ],
      lines: [
        { say: 'Solubility in grams per cubic decimetre is the mass of solute times one thousand, divided by the volume of saturated solution in cubic centimetres. Divide by the molar mass for moles per cubic decimetre.', caption: 'Solubility in g dm⁻³ is the mass of solute × 1000, divided by the volume of saturated solution in cm³. Divide by the molar mass for mol dm⁻³.', show: 'f' },
        { say: 'Twenty-five cubic centimetres of saturated potassium chloride leaves eight point nine four grams of solid when it is evaporated.', caption: '25.0 cm³ of saturated potassium chloride leaves 8.94 g of solid when it is evaporated.', show: 'q' },
        { say: 'That is three hundred fifty-seven point six grams per cubic decimetre. Divided by seventy-four point five, it is four point eight zero moles per cubic decimetre.', caption: 'That is 357.6 g dm⁻³. Divided by 74.5, it is 4.80 mol dm⁻³.', show: 'm', focus: 'm' },
      ],
    },
    {
      chapter: 'Crystals on cooling',
      layout: 'center',
      main: [
        { kind: 'table', id: 't', head: ['Temperature (°C)', '0', '20', '40', '60', '80'], rows: [['Potassium nitrate (g per 100 g)', '13', '32', '64', '110', '169'], ['Sodium chloride (g per 100 g)', '36', '36', '37', '37', '38']] },
        { kind: 'math', id: 'm', size: 'md', lines: ['(110 - 32) \\times \\dfrac{50}{100} = 39\\ \\text{g}'] },
      ],
      lines: [
        { say: 'A solubility curve shows solubility against temperature. Potassium nitrate rises steeply, while sodium chloride hardly changes at all.', show: 't' },
        { say: 'Cool a solution of potassium nitrate in fifty grams of water from sixty degrees to twenty. The solubility drops from one hundred ten to thirty-two grams per hundred grams of water. That drop, times fifty over one hundred, gives thirty-nine grams of crystals.', caption: 'Cool a solution of potassium nitrate in 50 g of water from 60 °C to 20 °C. The solubility drops from 110 to 32 g per 100 g of water. That drop, × 50/100, gives 39 g of crystals.', show: 'm', focus: 'm' },
        { say: 'Cooling sodium chloride gives almost no crystals, which is why salt is made from sea water by evaporation. And gases are the other way round: they become less soluble as water warms.' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q',
          prompt: 'Potassium nitrate in $100\\ \\text{g}$ of water, saturated at 40 °C (64 g per 100 g), is cooled to 0 °C (13 g per 100 g). What mass of crystals forms?',
          choices: ['$51\\ \\text{g}$', '$77\\ \\text{g}$', '$13\\ \\text{g}$', '$25.5\\ \\text{g}$'],
          answer: 0,
          working: '$(64 - 13) \\times \\dfrac{100}{100} = 51\\ \\text{g}$',
        },
      ],
      lines: [
        { say: 'Your turn. Potassium nitrate in one hundred grams of water, saturated at forty degrees, is cooled to zero. The solubilities are sixty-four and thirteen grams per hundred grams of water. What mass of crystals forms? Pause the video and try it.', caption: 'Your turn. Potassium nitrate in 100 g of water, saturated at 40 °C, is cooled to 0 °C. The solubilities are 64 and 13 g per 100 g of water. What mass of crystals forms? Pause the video and try it.', show: 'q', wait: 6 },
        { say: 'The answer is A. The solubility drops by sixty-four minus thirteen, which is fifty-one grams, and there are exactly one hundred grams of water, so fifty-one grams of crystals form.', caption: 'The answer is A. The solubility drops by 64 − 13 = 51 g, and there are exactly 100 g of water, so 51 g of crystals form.', show: 'q.answer' },
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
            'g dm⁻³ = mass × 1000 ÷ volume in cm³; ÷ M for mol dm⁻³.',
            'A solubility curve shows solubility against temperature.',
            'Crystals on cooling = drop in solubility × mass of water ÷ 100.',
            'Most solids get more soluble when heated; gases get less soluble.',
          ],
        },
      ],
      lines: [
        { say: 'Let’s sum up. Solubility in grams per cubic decimetre is the mass times one thousand over the volume in cubic centimetres, and dividing by the molar mass gives moles per cubic decimetre.', caption: 'Let’s sum up. Solubility in g dm⁻³ is the mass × 1000 over the volume in cm³, and dividing by the molar mass gives mol dm⁻³.', show: 'sum.0' },
        { say: 'A solubility curve shows how solubility changes with temperature.', show: 'sum.1' },
        { say: 'The crystals on cooling are the drop in solubility times the mass of water over one hundred.', show: 'sum.2' },
        { say: 'And most solids get more soluble when heated, while gases get less soluble.', show: 'sum.3' },
      ],
    },
  ],
};

export default video;
