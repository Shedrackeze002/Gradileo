import type { Explainer } from '@/video/script.ts';
import { figure } from '@/video/solids.ts';
import { flow } from './lib/c30-2b-figures.ts';

// The path of every titration calculation: the titrant's concentration and volume give its
// amount, the mole ratio gives the sample's amount, and the sample's volume its concentration.
const path = figure(
  'f',
  [
    flow({
      nodes: [
        { id: 'v', tex: 'c,\\ V', tone: 'adj', value: '\\text{titrant}' },
        { id: 'nt', tex: 'n', value: '\\text{titrant}' },
        { id: 'ns', tex: 'n', value: '\\text{sample}' },
        { id: 'cs', tex: 'c', tone: 'good', value: '\\text{sample}' },
      ],
      arrows: [
        { id: 'a1', from: 'v', to: 'nt', tex: 'n = cV' },
        { id: 'a2', from: 'nt', to: 'ns', tex: '\\text{mole ratio}' },
        { id: 'a3', from: 'ns', to: 'cs', tex: 'c = \\tfrac{n}{V}' },
      ],
      width: 2.4,
      height: 1.4,
      gap: 4.4,
    }),
  ],
  300,
);

const video: Explainer = {
  id: 'c30-2-5-b',
  lessonId: 'c30-2-5',
  title: 'Redox Titrations, Part 2: From Titration Data to a Concentration',
  thumbnailTitle: 'From Data to a Concentration',
  thumbnail: 'f',
  summary:
    'A redox titration is solution stoichiometry: n = cV for the titrant, the mole ratio from the balanced redox equation, and c = n/V for the sample. 18.40 mL of 0.0200 mol/L permanganate shows that a 25.00 mL sample holds 0.0736 mol/L of iron(II) ions, and 17.30 mL shows that a 10.00 mL sample of hydrogen peroxide is 0.0865 mol/L. Write the ratio as the wanted coefficient over the given one, or the answer can be 25 times too small.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Electrochemical Changes · Part 2', title: 'From Titration Data to a Concentration', subtitle: 'Solution stoichiometry with electrons' }],
      lines: [
        { say: 'A titration gives you a volume of titrant. Solution stoichiometry turns that volume into the concentration of the sample.', show: 'title' },
        { say: 'In this part, you will find the concentrations of iron two ions and of hydrogen peroxide from permanganate titrations, and avoid a common mistake with the mole ratio.', caption: 'In this part, you will find the concentrations of iron(II) ions and of hydrogen peroxide from permanganate titrations, and avoid a common mistake with the mole ratio.' },
      ],
    },
    {
      chapter: 'Three steps',
      layout: 'center',
      main: [path, { kind: 'text', id: 'note', size: 'md', align: 'center', md: 'The mole ratio comes from the **balanced redox equation**: balance it first, with half-reactions if necessary.' }],
      lines: [
        { say: 'The calculation is solution stoichiometry, just as for acid-base titrations. First, n equals c V gives the amount of titrant, with the volume in litres.', show: ['f.v', 'f.v-value', 'f.a1', 'f.nt', 'f.nt-value'], focus: 'f.a1' },
        { say: 'Second, the mole ratio gives the amount of the sample.', show: ['f.a2', 'f.ns', 'f.ns-value'], focus: 'f.a2' },
        { say: 'Third, c equals n over V gives the concentration of the sample.', show: ['f.a3', 'f.cs', 'f.cs-value'], focus: 'f.a3' },
        { say: 'The mole ratio comes from the balanced redox equation, so balance it first, with half-reactions if you need to.', show: 'note', focus: 'f' },
      ],
    },
    {
      chapter: 'Iron(II) ions',
      layout: 'center',
      main: [
        {
          kind: 'text',
          id: 'q',
          size: 'md',
          align: 'center',
          md: 'A $25.00\\ \\text{mL}$ sample of iron(II) sulfate solution is acidified and titrated with $0.0200\\ \\text{mol/L}$ $\\ce{KMnO4}$: $\\ce{MnO4^- + 5Fe^2+ + 8H+ -> Mn^2+ + 5Fe^3+ + 4H2O}$. The endpoint is reached after $18.40\\ \\text{mL}$. Find $[\\ce{Fe^2+}]$, to three significant figures.',
        },
        {
          kind: 'math',
          id: 'm',
          size: 'md',
          lines: [
            'n(\\ce{MnO4^-}) = cV = 0.0200 \\times 0.01840 = 3.680 \\times 10^{-4}\\ \\text{mol}',
            'n(\\ce{Fe^2+}) = 3.680 \\times 10^{-4} \\times \\dfrac{5}{1} = 1.840 \\times 10^{-3}\\ \\text{mol}',
            '[\\ce{Fe^2+}] = \\dfrac{n}{V} = \\dfrac{1.840 \\times 10^{-3}}{0.02500} = \\good{0.0736\\ \\text{mol/L}}',
          ],
        },
      ],
      lines: [
        {
          say: 'A twenty-five point zero zero millilitre sample of iron two sulfate is titrated with zero point zero two zero zero moles per litre permanganate, and the endpoint comes after eighteen point four zero millilitres. What is the concentration of the iron two ions?',
          caption: 'A 25.00 mL sample of iron(II) sulfate is titrated with 0.0200 mol/L permanganate, and the endpoint comes after 18.40 mL. What is the concentration of the iron(II) ions?',
          show: 'q',
        },
        { say: 'First, the permanganate. Zero point zero two zero zero, times zero point zero one eight four zero litres, is three point six eight zero times ten to the negative four moles.', show: 'm.0', focus: 'm.0' },
        {
          say: 'One permanganate ion reacts with five iron two ions, so multiply by five over one. That gives one point eight four zero times ten to the negative three moles of iron two ions.',
          caption: 'One permanganate ion reacts with five iron(II) ions, so multiply by five over one. That gives 1.840 × 10⁻³ moles of iron(II) ions.',
          show: 'm.1',
          focus: 'm.1',
        },
        { say: 'Divide by the volume of the sample, zero point zero two five zero zero litres. The concentration is zero point zero seven three six moles per litre.', show: 'm.2', focus: 'm.2' },
      ],
    },
    {
      chapter: 'The ratio upside down',
      layout: 'center',
      main: [
        {
          kind: 'callout',
          id: 'oops',
          tone: 'mistake',
          title: 'Turning the mole ratio upside down',
          md: 'Each permanganate ion reacts with **five** iron(II) ions, so there are more moles of iron(II) than of permanganate. Dividing by 5 gives a concentration 25 times too small. Write the ratio as $\\dfrac{\\text{wanted coefficient}}{\\text{given coefficient}}$.',
        },
        { kind: 'math', id: 'm', size: 'md', lines: ['\\bad{3.680 \\times 10^{-4} \\times \\dfrac{1}{5} = 7.36 \\times 10^{-5}\\ \\text{mol}} \\quad \\bad{\\times}', '\\good{3.680 \\times 10^{-4} \\times \\dfrac{5}{1} = 1.840 \\times 10^{-3}\\ \\text{mol}} \\quad \\good{\\checkmark}'] },
      ],
      lines: [
        {
          say: 'A common mistake is to turn the mole ratio upside down. Each permanganate ion reacts with five iron two ions, so there must be more moles of iron two than of permanganate.',
          caption: 'A common mistake is to turn the mole ratio upside down. Each permanganate ion reacts with five iron(II) ions, so there must be more moles of iron(II) than of permanganate.',
          show: 'oops',
        },
        { say: 'Dividing by five gives seven point three six times ten to the negative five moles, and a concentration twenty-five times too small.', show: 'm.0', focus: 'm.0' },
        { say: 'To get it right every time, write the ratio as the wanted coefficient over the given coefficient: here, five over one.', show: 'm.1', focus: 'm.1' },
      ],
    },
    {
      chapter: 'Hydrogen peroxide',
      layout: 'center',
      main: [
        {
          kind: 'text',
          id: 'q',
          size: 'md',
          align: 'center',
          md: 'A $10.00\\ \\text{mL}$ sample of hydrogen peroxide solution is acidified and titrated with $0.0200\\ \\text{mol/L}$ $\\ce{KMnO4}$: $\\ce{2MnO4^- + 5H2O2 + 6H+ -> 2Mn^2+ + 5O2 + 8H2O}$. The endpoint is reached after $17.30\\ \\text{mL}$. Find $[\\ce{H2O2}]$.',
        },
        {
          kind: 'math',
          id: 'm',
          size: 'md',
          lines: [
            'n(\\ce{MnO4^-}) = 0.0200 \\times 0.01730 = 3.460 \\times 10^{-4}\\ \\text{mol}',
            'n(\\ce{H2O2}) = 3.460 \\times 10^{-4} \\times \\dfrac{5}{2} = 8.650 \\times 10^{-4}\\ \\text{mol}',
            '[\\ce{H2O2}] = \\dfrac{8.650 \\times 10^{-4}}{0.01000} = \\good{0.0865\\ \\text{mol/L}}',
          ],
        },
      ],
      lines: [
        { say: 'Now hydrogen peroxide. A ten point zero zero millilitre sample needs seventeen point three zero millilitres of the same permanganate solution.', show: 'q' },
        { say: 'The permanganate used is three point four six zero times ten to the negative four moles.', show: 'm.0', focus: 'm.0' },
        { say: 'This time, two permanganate ions react with five hydrogen peroxide molecules. Wanted over given is five over two, which gives eight point six five zero times ten to the negative four moles.', show: 'm.1', focus: 'm.1' },
        { say: 'In zero point zero one zero zero zero litres, that is zero point zero eight six five moles per litre.', show: 'm.2', focus: 'm.2' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q',
          prompt: 'A $25.00\\ \\text{mL}$ sample of oxalic acid needs $21.60\\ \\text{mL}$ of $0.0200\\ \\text{mol/L}$ $\\ce{KMnO4}$: $\\ce{2MnO4^- + 5H2C2O4 + 6H+ -> 2Mn^2+ + 10CO2 + 8H2O}$. What is the concentration of the oxalic acid?',
          choices: ['$0.0432\\ \\text{mol/L}$', '$0.00691\\ \\text{mol/L}$', '$0.0173\\ \\text{mol/L}$', '$0.0864\\ \\text{mol/L}$'],
          answer: 0,
          working: '$n(\\ce{H2C2O4}) = 0.0200 \\times 0.02160 \\times \\tfrac{5}{2} = 1.080 \\times 10^{-3}$ mol, and $1.080 \\times 10^{-3} \\div 0.02500 = 0.0432$ mol/L.',
        },
      ],
      lines: [
        {
          say: 'Your turn. A twenty-five point zero zero millilitre sample of oxalic acid needs twenty-one point six zero millilitres of zero point zero two zero zero moles per litre permanganate, with the equation shown. What is the concentration of the oxalic acid? Pause the video and try it.',
          caption: 'Your turn. A 25.00 mL sample of oxalic acid needs 21.60 mL of 0.0200 mol/L permanganate, with the equation shown. What is the concentration of the oxalic acid? Pause the video and try it.',
          show: 'q',
          wait: 6,
        },
        {
          say: 'The answer is A, zero point zero four three two moles per litre. The permanganate is four point three two zero times ten to the negative four moles, and wanted over given is five over two. Choice B turns the ratio upside down.',
          caption: 'The answer is A, 0.0432 mol/L. The permanganate is 4.320 × 10⁻⁴ moles, and wanted over given is five over two. Choice B turns the ratio upside down.',
          show: 'q.answer',
        },
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
            '$n = cV$ for the titrant, the **mole ratio** from the balanced redox equation, then $c = \\dfrac{n}{V}$ for the sample.',
            'Write the ratio as $\\dfrac{\\text{wanted}}{\\text{given}}$: from $\\ce{MnO4^-}$ to $\\ce{Fe^2+}$ it is $\\dfrac{5}{1}$.',
            'Use volumes in litres: $18.40\\ \\text{mL} = 0.01840\\ \\text{L}$.',
          ],
        },
      ],
      lines: [
        { say: 'Let’s sum up. Use n equals c V for the titrant, the mole ratio from the balanced redox equation, then c equals n over V for the sample.', show: 'sum.0' },
        { say: 'Write the ratio as wanted over given. From permanganate to iron two ions, it is five over one.', caption: 'Write the ratio as wanted over given. From permanganate to iron(II) ions, it is five over one.', show: 'sum.1' },
        { say: 'And use volumes in litres. In part three, you will average several trials, and find the iron in an ore. See you there!', show: 'sum.2' },
      ],
    },
  ],
};

export default video;
