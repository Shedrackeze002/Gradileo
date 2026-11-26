import type { Explainer } from '@/video/script.ts';
import { marbleInAcid } from '../../chem10/videos/lib/c10-particles.ts';
import { titrating } from '../../chem20/videos/lib/c20-particles.ts';

const video: Explainer = {
  id: 'cx-16-2',
  lessonId: 'cx-16-2',
  title: 'Back Titrations and Double Indicator Titrations',
  thumbnail: 'mb',
  summary:
    'In a back titration, a known excess of reagent is added to the sample, and the excess left is found by titration: the amount that reacted is the amount added minus the excess. It suits insoluble or slow-reacting samples such as limestone, and ammonium salts. In a double indicator titration, phenolphthalein marks carbonate turning to hydrogencarbonate and methyl orange marks hydrogencarbonate turning to carbon dioxide, and the two titres together give each part of a mixture.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Practical Analysis', title: 'Back Titrations and Double Indicator Titrations', subtitle: 'When one titration is not enough' }],
      lines: [
        { say: 'Some samples cannot be titrated directly. Limestone is a solid that reacts slowly with acid, so there is no sharp end point.', show: 'title' },
        { say: 'In this lesson, you will find the purity of a sample from a back titration, and the make-up of a mixture from a double indicator titration.' },
      ],
    },
    {
      chapter: 'Step one: excess acid',
      layout: 'center',
      main: [marbleInAcid('mb', 400)],
      lines: [
        { say: 'Here are limestone chips in more acid than they need, up close.', show: 'mb' },
        { say: 'The acid eats the solid away, and carbon dioxide escapes. Because there is an excess of acid, every bit of calcium carbonate reacts, however slowly, and some acid is left over at the end.', play: 'mb.fizz' },
      ],
    },
    {
      chapter: 'Step two: titrate what is left',
      layout: 'center',
      main: [titrating('ti', { seed: 29 })],
      lines: [
        { say: 'Now the acid that is left is titrated with sodium hydroxide. Each hydroxide ion takes one hydrogen ion and makes water.', show: ['ti', 'ti.labels', 'ti.key', 'ti.tally'], play: 'ti.titrate' },
        { say: 'When the indicator turns, you know how much acid was left over. The acid that reacted with the limestone is the acid added, minus that excess.', focus: 'ti.f' },
      ],
    },
    {
      chapter: 'The purity of limestone',
      layout: 'center',
      main: [
        { kind: 'text', id: 'q', size: 'md', md: '$1.50\\ \\text{g}$ of limestone + $50.0\\ \\text{cm}^3$ of $1.00\\ \\text{mol dm}^{-3}$ HCl. Excess acid needs $25.0\\ \\text{cm}^3$ of $1.00\\ \\text{mol dm}^{-3}$ NaOH. $\\ce{CaCO3 + 2HCl -> CaCl2 + H2O + CO2}$' },
        {
          kind: 'math',
          id: 'm',
          size: 'md',
          lines: ['\\text{added: } 0.0500 \\qquad \\text{excess: } 0.0250 \\qquad \\text{reacted: } 0.0250\\ \\text{mol HCl}', '\\ce{CaCO3} = 0.0250 \\div 2 = 0.0125\\ \\text{mol} = 1.25\\ \\text{g}', '1.25 \\div 1.50 \\times 100 = 83.3\\%'],
        },
      ],
      lines: [
        { say: 'One point five zero grams of limestone is added to fifty cubic centimetres of one molar hydrochloric acid. The excess acid then needs twenty-five cubic centimetres of one molar sodium hydroxide.', caption: '1.50 g of limestone is added to 50.0 cm³ of 1.00 mol dm⁻³ hydrochloric acid. The excess acid then needs 25.0 cm³ of 1.00 mol dm⁻³ sodium hydroxide.', show: 'q' },
        { say: 'The acid added is zero point zero five zero zero moles, and the excess is zero point zero two five zero moles. So zero point zero two five zero moles of acid reacted with the limestone.', caption: 'The acid added is 0.0500 mol, and the excess is 0.0250 mol. So 0.0250 mol of acid reacted with the limestone.', show: 'm.0', focus: 'm.0' },
        { say: 'Calcium carbonate reacts with acid one to two, so there was zero point zero one two five moles of it, which is one point two five grams.', caption: 'Calcium carbonate reacts with acid 1 : 2, so there was 0.0125 mol of it, which is 1.25 g.', show: 'm.1', focus: 'm.1' },
        { say: 'One point two five out of one point five zero is eighty-three point three percent calcium carbonate.', caption: '1.25 out of 1.50 is 83.3% calcium carbonate.', show: 'm.2', focus: 'm.2' },
      ],
    },
    {
      chapter: 'Double indicator titrations',
      layout: 'center',
      main: [
        { kind: 'math', id: 'm', size: 'md', lines: ['\\ce{Na2CO3 + HCl -> NaHCO3 + NaCl} \\quad \\text{(phenolphthalein)}', '\\ce{NaHCO3 + HCl -> NaCl + H2O + CO2} \\quad \\text{(methyl orange)}'] },
        { kind: 'callout', id: 'w', tone: 'mistake', title: 'Read which titre is which', md: 'Hydroxide + carbonate: the **first** titre is larger. Carbonate + hydrogencarbonate: the **second** is larger.' },
      ],
      lines: [
        { say: 'Hydrochloric acid reacts with sodium carbonate in two stages. First, carbonate becomes hydrogencarbonate, which phenolphthalein marks as it turns from pink to colourless.', show: 'm.0' },
        { say: 'Then hydrogencarbonate becomes carbon dioxide, which methyl orange marks. So you read one titre with phenolphthalein, add methyl orange, and carry on for a second titre.', show: 'm.1' },
        { say: 'In a carbonate and hydrogencarbonate mixture, the first titre gives the carbonate, and the second is larger, because it includes the hydrogencarbonate there at the start. In a hydroxide and carbonate mixture, the first titre is the larger one.', show: 'w', focus: 'w' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q',
          prompt: '$40.0\\ \\text{cm}^3$ of $0.500\\ \\text{mol dm}^{-3}$ HCl is added to a base. The excess acid needs $15.0\\ \\text{cm}^3$ of $0.500\\ \\text{mol dm}^{-3}$ NaOH. How many moles of HCl reacted with the base?',
          choices: ['$0.0200$', '$0.00750$', '$0.0275$', '$0.0125$'],
          answer: 3,
          working: 'Added: $0.500 \\times 0.0400 = 0.0200$. Excess: $0.500 \\times 0.0150 = 0.00750$. Reacted: $0.0200 - 0.00750 = 0.0125$ mol.',
        },
      ],
      lines: [
        { say: 'Your turn. Forty cubic centimetres of zero point five molar hydrochloric acid is added to a base. The excess needs fifteen cubic centimetres of zero point five molar sodium hydroxide. How many moles of acid reacted with the base? Pause the video and try it.', caption: 'Your turn. 40.0 cm³ of 0.500 mol dm⁻³ HCl is added to a base. The excess needs 15.0 cm³ of 0.500 mol dm⁻³ NaOH. How many moles of acid reacted with the base? Pause the video and try it.', show: 'q', wait: 6 },
        { say: 'The answer is D. The acid added was zero point zero two zero zero moles, and the excess was zero point zero zero seven five zero. So zero point zero one two five moles reacted.', caption: 'The answer is D. The acid added was 0.0200 mol, and the excess was 0.00750 mol. So 0.0125 mol reacted.', show: 'q.answer' },
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
            'Back titration: amount reacted = amount added − excess found by titration.',
            'It suits insoluble or slow-reacting samples, and ammonium salts.',
            'Phenolphthalein: CO₃²⁻ to HCO₃⁻. Methyl orange: HCO₃⁻ to CO₂.',
            'Use the two titres together to find each part of a mixture.',
          ],
        },
      ],
      lines: [
        { say: 'Let’s sum up. In a back titration, the amount that reacted is the amount added minus the excess found by titration.', show: 'sum.0' },
        { say: 'It suits insoluble or slow-reacting samples, such as limestone, and ammonium salts.', show: 'sum.1' },
        { say: 'In a double indicator titration, phenolphthalein marks carbonate turning to hydrogencarbonate, and methyl orange marks hydrogencarbonate turning to carbon dioxide.', show: 'sum.2' },
        { say: 'And the two titres together give each part of the mixture.', show: 'sum.3' },
      ],
    },
  ],
};

export default video;
