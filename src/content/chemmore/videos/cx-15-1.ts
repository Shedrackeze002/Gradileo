import type { Explainer } from '@/video/script.ts';
import { diluting, saltDissolving } from '../../chem20/videos/lib/c20-particles.ts';

const video: Explainer = {
  id: 'cx-15-1',
  lessonId: 'cx-15-1',
  title: 'Standard Solutions',
  thumbnail: 'dl',
  summary:
    'A standard solution has an accurately known concentration, made from a primary standard: a pure, stable solid weighed exactly. Use n = cV with V in dm³ and m = nM, and mass concentration in g dm⁻³ is the concentration times the molar mass. Dilution keeps the amount of solute fixed, so c₁V₁ = c₂V₂, and a concentrated reagent has a concentration of 1000 × density × percentage ÷ 100 ÷ molar mass.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Solutions, Salts and Solubility', title: 'Standard Solutions', subtitle: 'A concentration you can trust' }],
      lines: [
        { say: 'Every titration result depends on one solution whose concentration is known exactly. If that solution is wrong, every answer worked out from it is wrong too.', show: 'title' },
        { say: 'In this lesson, you will work out the mass needed for a standard solution, convert between units of concentration, and dilute stock solutions.' },
      ],
    },
    {
      chapter: 'Making a solution',
      layout: 'center',
      main: [{ ...saltDissolving('sd'), key: true }],
      lines: [
        { say: 'Here is a weighed crystal dropped into water, up close.', show: ['sd', 'sd.key'] },
        { say: 'Water molecules pull its ions away one by one, until they are spread through the whole solution. Every ion weighed out ends up in the flask, which is why the mass you weigh sets the concentration exactly.', play: 'sd.drop' },
      ],
    },
    {
      chapter: 'A standard solution',
      layout: 'center',
      main: [
        { kind: 'callout', id: 'def', tone: 'definition', title: 'Standard solution', md: 'A solution whose concentration is known accurately. A **primary standard** is a pure, stable solid that can be weighed exactly, such as anhydrous sodium carbonate.' },
        { kind: 'math', id: 'f', size: 'md', lines: ['n = c \\times V \\qquad m = n \\times M', '\\text{g dm}^{-3} = \\text{mol dm}^{-3} \\times M'] },
      ],
      lines: [
        { say: 'A standard solution is one whose concentration is known accurately. It is made from a primary standard: a pure, stable solid that can be weighed exactly, such as anhydrous sodium carbonate.', show: 'def' },
        { say: 'The amount in moles is the concentration times the volume in cubic decimetres, and the mass is the amount times the molar mass. A concentration in grams per cubic decimetre is the concentration in moles per cubic decimetre times the molar mass.', caption: 'The amount in moles is the concentration times the volume in dm³, and the mass is the amount times the molar mass. A concentration in g dm⁻³ is the concentration in mol dm⁻³ times the molar mass.', show: 'f', focus: 'f' },
      ],
    },
    {
      chapter: 'A worked example',
      layout: 'center',
      main: [
        { kind: 'text', id: 'q', size: 'md', md: 'What mass of anhydrous $\\ce{Na2CO3}$ ($M = 106$) makes $250\\ \\text{cm}^3$ of a $0.100\\ \\text{mol dm}^{-3}$ solution?' },
        { kind: 'math', id: 'm', size: 'md', lines: ['n = 0.100 \\times \\dfrac{250}{1000} = 0.0250\\ \\text{mol}', 'm = 0.0250 \\times 106 = 2.65\\ \\text{g}'] },
      ],
      lines: [
        { say: 'What mass of anhydrous sodium carbonate, with a molar mass of one hundred six, makes two hundred fifty cubic centimetres of a zero point one zero zero molar solution?', caption: 'What mass of anhydrous sodium carbonate (M = 106) makes 250 cm³ of a 0.100 mol dm⁻³ solution?', show: 'q' },
        { say: 'Change the volume to cubic decimetres by dividing by one thousand. The amount is zero point one zero zero times zero point two five zero, which is zero point zero two five zero moles.', caption: 'Change the volume to dm³ by dividing by 1000. The amount is 0.100 × 0.250 = 0.0250 mol.', show: 'm.0', focus: 'm.0' },
        { say: 'The mass is zero point zero two five zero times one hundred six, which is two point six five grams. Dissolve it, pour it into a volumetric flask with all the rinsings, and make it up to the mark.', caption: 'The mass is 0.0250 × 106 = 2.65 g. Dissolve it, pour it into a volumetric flask with all the rinsings, and make it up to the mark.', show: 'm.1', focus: 'm.1' },
      ],
    },
    {
      chapter: 'Diluting a stock solution',
      layout: 'center',
      main: [diluting('dl', { start: 25, unit: 'cm³', from: 0.25, n: 6 }), { kind: 'math', id: 'm', size: 'md', lines: ['c_1V_1 = c_2V_2'] }],
      lines: [
        { say: 'Here are twenty-five cubic centimetres of a stock solution. Watch the solute particles as water is added up to one hundred cubic centimetres.', caption: 'Here are 25 cm³ of a stock solution. Watch the solute particles as water is added up to 100 cm³.', show: ['dl', 'dl.labels', 'dl.volume'] },
        { say: 'The particles spread out to fill four times the volume, but there are exactly as many as before. Dilution does not change the amount of solute.', play: 'dl.dilute', focus: 'dl.d' },
        { say: 'So the concentration before times the volume before equals the concentration after times the volume after. Here, the concentration falls to a quarter.', show: 'm', focus: 'm' },
      ],
    },
    {
      chapter: 'Concentrated reagents',
      layout: 'center',
      main: [
        { kind: 'math', id: 'm', size: 'md', lines: ['c = \\dfrac{1000 \\times \\rho \\times \\%/100}{M}', 'c = \\dfrac{1000 \\times 1.84 \\times 0.98}{98} = 18.4\\ \\text{mol dm}^{-3}'] },
        { kind: 'callout', id: 'w', tone: 'mistake', title: 'Add acid to water', md: 'Always add concentrated acid **slowly to water**, never water to the acid.' },
      ],
      lines: [
        { say: 'A bottle of concentrated acid gives its density and its percentage by mass. One cubic decimetre has a mass of one thousand times the density, and that percentage of it is the acid.', caption: 'A bottle of concentrated acid gives its density and its percentage by mass. One dm³ has a mass of 1000 × the density, and that percentage of it is the acid.', show: 'm.0' },
        { say: 'Sulfuric acid that is ninety-eight percent acid, with a density of one point eight four, has a concentration of eighteen point four moles per cubic decimetre.', caption: 'Sulfuric acid that is 98% acid, with a density of 1.84 g cm⁻³, has a concentration of 18.4 mol dm⁻³.', show: 'm.1', focus: 'm.1' },
        { say: 'And a safety point: when diluting it, always add the acid slowly to the water, never water to the acid.', show: 'w' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q',
          prompt: 'What volume of $2.0\\ \\text{mol dm}^{-3}$ acid is made up to $250\\ \\text{cm}^3$ to give $0.20\\ \\text{mol dm}^{-3}$ acid?',
          choices: ['$2.5\\ \\text{cm}^3$', '$25\\ \\text{cm}^3$', '$50\\ \\text{cm}^3$', '$225\\ \\text{cm}^3$'],
          answer: 1,
          working: '$V_1 = \\dfrac{0.20 \\times 250}{2.0} = 25\\ \\text{cm}^3$',
        },
      ],
      lines: [
        { say: 'Your turn. What volume of two point zero molar acid is made up to two hundred fifty cubic centimetres to give zero point two zero molar acid? Pause the video and try it.', caption: 'Your turn. What volume of 2.0 mol dm⁻³ acid is made up to 250 cm³ to give 0.20 mol dm⁻³ acid? Pause the video and try it.', show: 'q', wait: 6 },
        { say: 'The answer is B. V one equals zero point two zero times two hundred fifty, divided by two point zero, which is twenty-five cubic centimetres.', caption: 'The answer is B. V₁ = 0.20 × 250 ÷ 2.0 = 25 cm³.', show: 'q.answer' },
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
            'n = cV, with V in dm³, and m = nM.',
            'A primary standard is pure, stable and weighed exactly.',
            'Dilution keeps the amount of solute fixed: c₁V₁ = c₂V₂.',
            'A concentrated reagent: c = 1000 × ρ × %/100 ÷ M.',
          ],
        },
      ],
      lines: [
        { say: 'Let’s sum up. The amount is the concentration times the volume in cubic decimetres, and the mass is the amount times the molar mass.', show: 'sum.0' },
        { say: 'A primary standard is pure, stable and weighed exactly.', show: 'sum.1' },
        { say: 'Dilution keeps the amount of solute fixed, so c one V one equals c two V two.', caption: 'Dilution keeps the amount of solute fixed, so c₁V₁ = c₂V₂.', show: 'sum.2' },
        { say: 'And a concentrated reagent’s concentration comes from its density and its percentage by mass.', show: 'sum.3' },
      ],
    },
  ],
};

export default video;
